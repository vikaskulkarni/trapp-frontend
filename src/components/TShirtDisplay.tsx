import React from "react";

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
    <div className="overflow-x-auto w-85">
      <div className="bg-gray-200 bg-opacity-40 px-4 border-b text-center text-2xl">
        Registered Sizes
      </div>
      <div
        className="overflow-y-auto bg-opacity-40"
        style={{ height: "34rem" }}
      >
        <table className="min-w-full bg-white bg-opacity-40">
          <thead>
            <tr className="bg-gray-200 bg-opacity-45">
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Size</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{friend.name}</td>
                <td className="py-2 px-4 border-b">{friend.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TShirtDisplay;
