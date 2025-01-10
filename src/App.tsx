import React, { useState, useEffect, useRef, useCallback } from "react";
import { GlobalStyles } from "./styles/global";
import axios from "axios";
import AddFriend from "./components/AddFriend";
import TShirtDisplay from "./components/TShirtDisplay";
import { Friend } from "./components/TShirtDisplay";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import MapComponent from "./components/MapComponent";
import SloganTable, { Slogan } from "./components/SloganTable";

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const App: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [slogans, setSlogans] = useState<Slogan[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSlogans, setLoadingSlogans] = useState<boolean>(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [registrationTimer, setRegistrationTimer] = useState("00:00:00");
  const [destinationTimer, setDestinationTimer] = useState("00:00:00");

  const registrationRef = useRef<NodeJS.Timeout | null>(null);
  const destinationRef = useRef<NodeJS.Timeout | null>(null);

  const [combinedCounts, setCombinedCounts] = useState({
    typeCounts: {},
    colorCounts: {},
    priceRangeCounts: {},
  });

  const getTimeRemaining = (e: Date): TimeRemaining => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countOccurrences = (key: keyof Friend, friendsData: Friend[]) => {
    return friendsData.reduce((acc, friendData) => {
      const value = friendData[key];
      if (value) {
        acc[value] = (acc[value] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  };

  const updateCounts = useCallback((friends: Friend[]) => {
    const newTypeCounts = countOccurrences("type", friends);
    const newColorCounts = countOccurrences("color", friends);
    const newPriceRangeCounts = countOccurrences("priceRange", friends);

    setCombinedCounts({
      typeCounts: newTypeCounts,
      colorCounts: newColorCounts,
      priceRangeCounts: newPriceRangeCounts,
    });
  }, []);

  useEffect(() => {
    const startTimer = (
      e: Date,
      setTimerCallback: (timer: string) => void
    ): void => {
      let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
      if (total >= 0) {
        setTimerCallback(
          `<span style="color: rgb(153 246 228);">${days}d</span>:<span style="color: rgb(254 205 211);">${hours}h</span>:<span style="color: rgb(187 247 208);">${minutes}m</span>:<span style="color: rgb(191 219 254);">${seconds}s</span>`
        );
      }
    };
    const clearTimer = (
      e: Date,
      setTimerCallback: (timer: string) => void,
      ref: React.MutableRefObject<NodeJS.Timeout | null>
    ): void => {
      if (ref.current) clearInterval(ref.current);
      const id = setInterval(() => {
        startTimer(e, setTimerCallback);
      }, 1000);
      ref.current = id;
    };

    clearTimer(
      new Date("2025-01-19T16:00:00"),
      setRegistrationTimer,
      registrationRef
    );
    clearTimer(
      new Date("2025-02-21T21:00:00"),
      setDestinationTimer,
      destinationRef
    );
  }, []);

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
  }, [backendUrl, updateCounts]);

  useEffect(() => {
    const loadFriends = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/friends`);
        setFriends(response.data);
        updateCounts(response.data);
      } catch (error) {
        console.error("Error loading friends:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFriends();
  }, [backendUrl, updateCounts]);

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
    if (friends.length >= 30) {
      setErrorMessage("Only 30 friends are allowed.");
      return false;
    }
    friend["priceRange"] = friend.priceRange || "<Not Specified>";
    try {
      const response = await axios.post(`${backendUrl}/friends`, friend);
      const updatedFriends = [response.data, ...friends];
      setFriends(updatedFriends);
      updateCounts(updatedFriends);
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
            <AddFriend
              addFriend={addFriend}
              registrationTimer={registrationTimer}
            />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </MDBCol>
          <MDBCol md="4" className="col-12 pb-2">
            <MapComponent destinationTimer={destinationTimer} />
          </MDBCol>
          <MDBCol md="4" className="col-12 pb-2">
            <TShirtDisplay
              friends={friends}
              loading={loading}
              combinedCounts={combinedCounts}
            />
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
      {/* <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        Chat
      </button>
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <Chat />
        </div>
      )} */}
    </>
  );
};

export default App;
