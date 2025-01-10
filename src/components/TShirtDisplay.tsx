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

type CombinedCounts = {
  typeCounts: Record<string, number>;
  colorCounts: Record<string, number>;
  priceRangeCounts: Record<string, number>;
};

interface TShirtDisplayProps {
  friends: Friend[];
  loading: boolean;
  combinedCounts: CombinedCounts;
}

const TShirtDisplay: React.FC<TShirtDisplayProps> = ({
  friends,
  loading,
  combinedCounts,
}) => {
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
        Registered Sizes
        <span className="ml-1 text-sm text-white">{friends.length}</span>
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
          <div className="votes-table">
            <MDBTable bordered>
              <MDBTableHead>
                <tr>
                  <th>Votes 4 Type</th>
                  <th>Votes 4 Color</th>
                  <th></th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <ul>
                      <li>
                        Round: {combinedCounts.typeCounts["Round Neck"] || 0}
                      </li>
                      <li>
                        Collared: {combinedCounts.typeCounts["Collared"] || 0}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>
                        Sky Blue: {combinedCounts.colorCounts["Sky Blue"] || 0}
                      </li>
                      <li>
                        Royal Blue:{" "}
                        {combinedCounts.colorCounts["Royal Blue"] || 0}
                      </li>
                      <li>Red: {combinedCounts.colorCounts["Red"] || 0}</li>
                      <li>
                        Maroon: {combinedCounts.colorCounts["Maroon"] || 0}
                      </li>
                      <li>White: {combinedCounts.colorCounts["White"] || 0}</li>
                    </ul>
                  </td>
                  <td style={{ width: "43%" }}>
                    <span className="underline">Note</span>:{" "}
                    <span style={{ color: "#FF5733" }}>
                      Based on the votes, we will finalize ONE Type and ONE
                      Color for ALL
                    </span>
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </div>
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
