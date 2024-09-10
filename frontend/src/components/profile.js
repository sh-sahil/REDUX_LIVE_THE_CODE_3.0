import React, { useState } from "react";
import axios from "axios";
import './profile.css'; // Import the CSS file
import { auth } from "./firebase";

function Profile() {
  const [queryText, setQueryText] = useState("");
  const [response, setResponse] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([
    "Prompt 1",
    "Prompt 2",
    "Prompt 3",
  ]); // Sample previous prompts

  const handleQuery = async () => {
    try {
      const res = await axios.post("http://localhost:5000/query", {
        query_text: queryText,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error querying the API", error);
    }
  };

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
    <div className="App">
      <div className="sidebar">
        <h1>Money Mosaic</h1>
        <div className="prompts">
          {previousPrompts.map((prompt, index) => (
            <p key={index}>{prompt}</p>
          ))}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <h1>Query the AI</h1>
        <input
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Enter your query here..."
        />
        <button onClick={handleQuery}>Submit</button>
        <div className="response-section">
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      </div>
    </div>
  );
}

export default Profile;
