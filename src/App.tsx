import React, { useState, useEffect, useCallback } from "react";
import { GlobalStyles } from "./styles/global";
import axios from "axios";
import AddFriend from "./components/AddFriend";
import TShirtDisplay from "./components/TShirtDisplay";
import { Friend } from "./components/TShirtDisplay";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import MapComponent from "./components/MapComponent";

const App: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  useEffect(() => {
    const handleClick = () => {
      setErrorMessage(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const addFriend = async (friend: Friend): Promise<boolean> => {
    if (friends.some((f) => f.email === friend.email)) {
      setErrorMessage("Email already exists.");
      return false;
    }
    try {
      const response = await axios.post(`${backendUrl}/friends`, friend);
      setFriends([...friends, response.data]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
    return true;
  };

  return (
    <>
      <GlobalStyles />
      <MDBContainer>
        <MDBRow>
          <h1 className="text-5xl font-extrabold my-4 mx-auto text-white text-center transform rotate-2 skew-y-2">
            Tee Size Buddy
          </h1>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4" className="col-12 pb-2">
            <AddFriend addFriend={addFriend} />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </MDBCol>
          <MDBCol md="4" className="col-12 pb-2">
            <MapComponent />
          </MDBCol>
          <MDBCol md="4" className="col-12 pb-2">
            <TShirtDisplay friends={friends} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default App;
