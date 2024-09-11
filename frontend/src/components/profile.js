import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css"; // Import the CSS file
import { auth, firestore } from "./firebase"; // Firestore from firebase.js
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore"; // Firestore methods

function Profile() {
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // Stores previous chat history

  // Function to handle user query
  const handleQuery = async () => {
    try {
      // Send the query to the backend API
      const res = await axios.post("http://localhost:5000/query", {
        query_text: queryText,
      });
      setResponse(res.data.response);

      // Save the query and response to Firestore
      await addDoc(collection(firestore, "chats"), {
        queryText: queryText,
        responseText: res.data.response,
        timestamp: new Date(),
      });

      // Fetch updated chat messages
      fetchChatMessages();

      // Clear the input field after submission
      setQueryText("");
    } catch (error) {
      console.error("Error querying the API or storing the query", error);
    }
  };

  // Function to fetch chat messages from Firestore
  const fetchChatMessages = async () => {
    try {
      const q = query(collection(firestore, "chats"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const messages = querySnapshot.docs.map(doc => ({
        prompt: doc.data().queryText,
        response: doc.data().responseText,
        timestamp: doc.data().timestamp,
      }));
      setChatMessages(messages); // Store messages in state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch chat history when the component mounts
  useEffect(() => {
    fetchChatMessages();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="profile">
      <div className="header">
        <h1>Money Mosaic</h1>
      </div>
      <div className="main-container">
        <div className="sidebar">
          <h2>Previous Prompts</h2>
          <div className="prompts">
            {chatMessages.length > 0 ? (
              chatMessages.map((chat, index) => (
                <div key={index}>
                  <p>
                    <strong>Prompt:</strong> {chat.prompt}
                  </p>
                  <p>
                    <strong>Response:</strong> {chat.response}
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No previous prompts available.</p>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="main-content">
          <h1>Query the AI</h1>
          <input
            type="text"
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            placeholder="Enter your query here..."
          />
          <button onClick={handleQuery} className="submit-button">
            Submit
          </button>
          <div className="response-section">
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
