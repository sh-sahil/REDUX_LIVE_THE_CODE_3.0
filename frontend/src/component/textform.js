import React from 'react'
import axios from "axios";
import { useState } from 'react';
export default function Textform() {
    const [queryText, setQueryText] = useState("");
    const [response, setResponse] = useState("");
  
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
  return (
    
       <div className="App">
      <h1>Query the AI</h1>
      <input type="text" value={queryText} onChange={e => setQueryText(e.target.value)} />
      <button onClick={handleQuery}>Submit</button>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
    
  )
}
