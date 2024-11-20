import React from "react";
import { ListContainer } from "./Container";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

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
    <ListContainer className="overflow-auto">
      <h4 className="text-white">Registered Sizes</h4>
      <div>
        <MDBTable bordered className="table-custom">
          <MDBTableHead>
            <tr>
              <th>Name</th>
              <th>Size</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {friends.map((friend, index) => (
              <tr key={index}>
                <td>{friend.name}</td>
                <td>{friend.size}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </ListContainer>
  );
};

export default TShirtDisplay;
