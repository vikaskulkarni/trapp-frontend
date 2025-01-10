import React from "react";
import { ListContainer } from "./Container";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

export interface Friend {
  name: string;
  email: string;
  size: string;
  type: string;
  color: string;
  priceRange?: string;
}

interface TShirtDisplayProps {
  friends: Friend[];
  loading: boolean;
}

const TShirtDisplay: React.FC<TShirtDisplayProps> = ({ friends, loading }) => {
  const getColorCode = (colorName: string): React.CSSProperties => {
    let colorCode = "";
    switch (colorName.toLowerCase()) {
      case "sky blue":
        colorCode = "#87CEEB";
        break;
      case "royal blue":
        colorCode = "#4169E1";
        break;
      case "red":
        colorCode = "#FF0000";
        break;
      case "maroon":
        colorCode = "#800000";
        break;
      case "white":
        colorCode = "#FFFFFF";
        break;
      default:
        colorCode = "#FFFFFF";
    }
    return {
      color: colorCode,
      backgroundColor:
        colorName.toLowerCase() === "white" ? "#000000" : "#FFFFFF",
      padding: "2px 4px",
      borderRadius: "4px",
      display: "inline-block",
      fontWeight: 600,
    };
  };
  return (
    <ListContainer className="overflow-auto h-[38rem]">
      <h4>
        Registered Sizes<span className="ml-1 text-sm">{friends.length}</span>
      </h4>
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
                  <td>
                    {friend.name}
                    <br></br>
                    <span className="text-xs">
                      Type:{" "}
                      <span style={getColorCode(friend.color)}>
                        {friend.type}
                      </span>
                    </span>
                    <br></br>
                    <span className="text-xs">
                      Color:{" "}
                      <span style={getColorCode(friend.color)}>
                        {friend.color}
                      </span>
                    </span>
                    <br></br>
                    <span className="text-xs">
                      Price Range:{" "}
                      <span style={getColorCode(friend.color)}>
                        {friend.priceRange}
                      </span>
                    </span>
                  </td>

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
