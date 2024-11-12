import React from 'react';

export interface Friend {
  name: string;
  email: string;
  size: string;
}

interface TShirtDisplayProps {
  friends: Friend[];
}

const TShirtDisplay: React.FC<TShirtDisplayProps> = ({ friends }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Size</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{friend.name}</td>
              <td className="py-2 px-4 border-b">{friend.email}</td>
              <td className="py-2 px-4 border-b">{friend.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TShirtDisplay;