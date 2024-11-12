import React from 'react';

interface Friend {
  name: string;
  size: string;
}

interface TShirtDisplayProps {
  friends: Friend[];
}

const TShirtDisplay: React.FC<TShirtDisplayProps> = ({ friends }) => {
  return (
    <div className="tshirt-grid">
      {friends.map((friend, index) => (
        <div className="tshirt-card" key={index}>
          <div>{friend.name}</div>
          <div>{friend.size}</div>
        </div>
      ))}
    </div>
  );
}

export default TShirtDisplay;