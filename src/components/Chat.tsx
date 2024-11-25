import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/huggingface/chat", {
        params: { query },
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 flex-grow"
          placeholder="Type your question..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Ask
        </button>
      </form>
      <div className="mt-4 p-2 border-t border-gray-300 flex-grow overflow-auto">
        {response}
      </div>
    </div>
  );
};

export default Chat;
