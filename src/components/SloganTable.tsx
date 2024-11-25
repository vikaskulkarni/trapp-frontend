import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { ListContainer } from "./Container";
import DOMPurify from "dompurify";

export interface Slogan {
  id: number;
  slogan: string;
  likes: number;
}

interface SloganProps {
  slogans: Slogan[];
  loadingSlogans: boolean;
  setSlogans: React.Dispatch<React.SetStateAction<Slogan[]>>;
}

const SloganTable: React.FC<SloganProps> = ({
  slogans,
  loadingSlogans,
  setSlogans,
}) => {
  useEffect(() => {
    const handleClick = () => {
      setErrorMessage(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [adding, setAdding] = useState<boolean>(false);
  const [newSlogan, setNewSlogan] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const newSlogans = [...slogans];
  const storedLikes = JSON.parse(localStorage.getItem("likedSlogans") || "{}");

  const handleToggleLike = async (index: number) => {
    let slogan = newSlogans[index];

    try {
      const latestSloganResponse = await axios.get(
        `${backendUrl}/slogans/${slogan.id}`
      );
      const latestSlogan = latestSloganResponse.data;

      const response = await axios.put(`${backendUrl}/slogans/${slogan.id}`, {
        likes: storedLikes[slogan.id]
          ? latestSlogan.likes - 1
          : latestSlogan.likes + 1,
      });
      slogan = newSlogans[index] = response.data;

      if (response.status === 200) {
        if (storedLikes[slogan.id]) {
          delete storedLikes[slogan.id];
        } else {
          storedLikes[slogan.id] = true;
        }
        localStorage.setItem("likedSlogans", JSON.stringify(storedLikes));
        setSlogans(newSlogans);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleAddSlogan = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedSlogan = DOMPurify.sanitize(newSlogan);
    if (sanitizedSlogan.trim() === "") return;
    if (newSlogans.length > 50) {
      setErrorMessage("Only 50 slogans are allowed.");
      return false;
    }
    setAdding(true);
    try {
      const response = await axios.post(`${backendUrl}/slogans`, {
        slogan: sanitizedSlogan,
      });
      if (response.status === 201) {
        if (response.data && response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setSlogans([...newSlogans, response.data]);
          setNewSlogan("");
        }
      }
    } catch (error) {
      console.error("Error adding slogan:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <ListContainer className="overflow-auto max-h-[20rem]">
      <div className="flex items-center mb-2">
        <h4 className="mr-4 mb-[-25px]">
          Tee Shirt Slogans (<span className="text-sm">{slogans.length}</span>)
        </h4>
        <form
          onSubmit={handleAddSlogan}
          className="flex-grow flex items-center"
        >
          <input
            type="text"
            value={newSlogan}
            onChange={(e) => setNewSlogan(e.target.value)}
            placeholder="Add my own slogan"
            className="flex-grow p-2 border rounded mr-2"
          />
          <button
            type="submit"
            className="p-2 text-white rounded transition-opacity duration-200 hover:opacity-70"
            style={{ backgroundColor: "#075985", width: "50px" }}
          >
            {adding ? (
              <span className="cursor-not-allowed">⏳</span>
            ) : (
              <span>✙</span>
            )}
          </button>
        </form>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {/* {loadingSlogans ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <output className="spinner-border text-primary">
              <span>Loading</span>
            </output>
          </div>
        </div>
      ) : ( */}
      <MDBTable>
        <MDBTableBody>
          {slogans.map((slogan, index) => (
            <MDBRow key={index}>
              <MDBCol className="d-flex">
                <button
                  onClick={() => handleToggleLike(index)}
                  className="bg-transparent border-none p-0"
                >
                  <span className="text-sm text-blue-300 underline cursor-pointer">
                    {storedLikes[slogan.id] ? "Dislike" : "Like"}
                  </span>
                  <span className="mx-2 text-white">
                    (
                    <span className="text-xs italic text-emerald-300">
                      Likes:
                    </span>
                    <span className="font-semibold text-orange-300">
                      {slogan.likes}
                    </span>
                    )
                  </span>
                </button>

                {/* <span className="text-white">{slogan.likes}</span> */}
                <div className="mx-2 title-container">
                  <h1 className="mb-0">{slogan.slogan}</h1>
                </div>
                <aside></aside>
              </MDBCol>
            </MDBRow>
          ))}
        </MDBTableBody>
      </MDBTable>
      {/* )} */}
    </ListContainer>
  );
};

export default SloganTable;
