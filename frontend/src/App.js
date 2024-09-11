import React, { useState, useEffect } from "react";
import axios from "axios";
import { firestore } from "./firebase/firebase";
import ChatSidebar from "./components/ChatSidebar";
import { collection, addDoc, query, orderBy, getDocs } from "firebase/firestore";

function App() {
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleQuery = async () => {
    try {
      const res = await axios.post("http://localhost:5000/query", {
        query_text: queryText,
      });
      setResponse(res.data.response);

      // Save chat to Firestore
      await addDoc(collection(firestore, "chats"), {
        queryText: queryText,
        responseText: res.data.response,
        timestamp: new Date(),
      });

      // Fetch updated chat messages
      fetchChatMessages();
    } catch (error) {
      console.error("Error querying the API", error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const q = query(collection(firestore, "chats"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const messages = querySnapshot.docs.map(doc => doc.data());
      setChatMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        <ChatSidebar chatMessages={chatMessages} />
      </div>
      <div className="main-content">
        <h1>Query the AI</h1>
        <input type="text" value={queryText} onChange={e => setQueryText(e.target.value)} />
        <button onClick={handleQuery}>Submit</button>
        <div>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
