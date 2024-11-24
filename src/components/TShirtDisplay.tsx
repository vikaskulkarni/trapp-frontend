import React from "react";
import { ListContainer } from "./Container";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export interface Friend {
  name: string;
  email: string;
  size: string;
  priceRange?: string;
}

interface TShirtDisplayProps {
  friends: Friend[];
  loading: boolean;
}

const TShirtDisplay: React.FC<TShirtDisplayProps> = ({ friends, loading }) => {
  return (
    <ListContainer className="overflow-auto h-[30rem]">
      <h4>Registered Sizes</h4>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <output className="spinner-border text-primary">
              <span className="m-[5px]">Loading</span>
            </output>
          </div>
        </div>
      ) : (
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
                  {!friend.priceRange && <td>{friend.name}</td>}
                  {friend.priceRange && (
                    <td>
                      {friend.name}
                      <br></br>
                      <span className="text-xs">
                        Price Range:{" "}
                        <span className="text-emerald-300">
                          {friend.priceRange}
                        </span>
                      </span>
                    </td>
                  )}
                  <td>{friend.size}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      )}
    </ListContainer>
  );
};

export default TShirtDisplay;
