import React, { useState } from "react";

interface AddFriendProps {
  addFriend: (friend: { name: string; size: string; email: string }) => void;
}

const AddFriend: React.FC<AddFriendProps> = ({ addFriend }) => {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && size) {
      addFriend({ name, size, email });
      setName("");
      setSize("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="w-85">
        <div className="bg-gray-200 bg-opacity-40 px-4 border-b text-center text-2xl">
          Register Tee Size
        </div>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select Size</option>
            <option value="Small (38 in)">Small (38 in)</option>
            <option value="Medium (40 in)">Medium (40 in)</option>
            <option value="Large (42 in)">Large (42 in)</option>
            <option value="Extra Large (44 in)">Extra Large (44 in)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddFriend;
