import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import TShirtDisplay from './components/TShirtDisplay';

interface Friend {
  name: string;
  size: string;
}

const App: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  const loadFriends = async () => {
    try {
      const response = await axios.get(`${backendUrl}/friends`);
      setFriends(response.data);
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  const addFriend = async (friend: Friend) => {
    try {
      const response = await axios.post(`${backendUrl}/friends`, friend);
      setFriends([...friends, response.data]);
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <div className="App">
      <h1>T-Shirt Size Collector</h1>
      <Form addFriend={addFriend} />
      <TShirtDisplay friends={friends} />
    </div>
  );
};

export default App;