import React, { useState, useEffect, useCallback } from "react";
import { GlobalStyles } from "./styles/global";
import axios from "axios";
import AddFriend from "./components/AddFriend";
import TShirtDisplay from "./components/TShirtDisplay";
import { Friend } from "./components/TShirtDisplay";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import MapComponent from "./components/MapComponent";
import SloganTable, { Slogan } from "./components/SloganTable";

const App: React.FC = ({}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [slogans, setSlogans] = useState<Slogan[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSlogans, setLoadingSlogans] = useState<boolean>(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const generateSessionId = () => {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem("sessionId", sessionId);
    }

    const fetchSlogans = async () => {
      setLoadingSlogans(true);
      try {
        const response = await axios.get(`${backendUrl}/slogans`);
        setSlogans(response.data);
      } catch (error) {
        setErrorMessage("Failed to load slogans");
      } finally {
        setLoadingSlogans(true);
      }
    };

    fetchSlogans();
  }, [backendUrl]);

  useEffect(() => {
    const loadFriends = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/friends`);
        setFriends(response.data);
      } catch (error) {
        console.error("Error loading friends:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFriends();
  }, [backendUrl]);

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
    if (friends.length >= 25) {
      setErrorMessage("Only 25 friends are allowed.");
      return false;
    }
    try {
      const response = await axios.post(`${backendUrl}/friends`, friend);
      setFriends([...friends, response.data]);
    } catch (error) {
      console.error("Error adding friend:", error);
      return false;
    }
    return true;
  };

  return (
    <>
      <GlobalStyles />

      <MDBContainer>
        <MDBRow className="title">
          <div className="box"></div>
          <h3>Tee👕Size Buddy</h3>
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
            <TShirtDisplay friends={friends} loading={loading} />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="col-12 pb-2">
            <SloganTable
              slogans={slogans}
              loadingSlogans={loadingSlogans}
              setSlogans={setSlogans}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default App;
