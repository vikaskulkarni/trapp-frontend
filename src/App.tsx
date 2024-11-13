import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import AddFriend from "./components/AddFriend";
import TShirtDisplay from "./components/TShirtDisplay";
import { Friend } from "./components/TShirtDisplay";
import headerImage from "./assets/header.jpg"; // Import the image

const App: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const loadFriends = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/friends`);
      setFriends(response.data);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }, [backendUrl]);

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  const addFriend = async (friend: Friend) => {
    try {
      const response = await axios.post(`${backendUrl}/friends`, friend);
      setFriends([...friends, response.data]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className="App min-h-screen bg-gray-100">
      <div
        className="relative flex bg-contain bg-center bg-no-repeat min-h-screen"
        // style={{ backgroundImage: `url(${headerImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-15"></div>{" "}
        {/* <div className="mx-auto">
          <div className="shadow-md rounded p-4">
            <AddFriend addFriend={addFriend} />
          </div>
          <div className="p-4 shadow-md rounded">
            <TShirtDisplay friends={friends} />
          </div>
        </div> */}
        <h1 className="text-5xl font-extrabold my-4 mx-auto text-white text-center transform rotate-2 skew-y-2 shadow-lg">
          Tee Size Buddy
        </h1>
        <div className="absolute bottom-5 left-5 shadow-md rounded">
          <AddFriend addFriend={addFriend} />
        </div>
        <div className="absolute top-5 right-5 shadow-md rounded">
          <TShirtDisplay friends={friends} />
        </div>
        {/* <div className="relative max-w-7xl mx-auto p-4 pt-0">
          <h1 className="text-5xl font-extrabold mb-6 text-white text-center transform rotate-3 skew-y-3 shadow-lg">
            Tee Size Buddy
          </h1>
          <div className="flex flex-col md:flex-row md:space-x-40 space-y-40 md:space-y-0">
            <div className="md:w-1/2 p-4 bg-white shadow-md rounded">
              <AddFriend addFriend={addFriend} />
            </div>
            <div className="md:w-1/2 p-4 bg-white shadow-md rounded">
              <TShirtDisplay friends={friends} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default App;
