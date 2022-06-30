import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

//   useEffect(() => {
//     getNotes();
//   }, []);

  const getNotes = async () => {
    console.log(String(authTokens.access))
    let response = await fetch("http://127.0.0.1:8000/api/notes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
      console.log("get data");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  const getOne = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/one/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setNotes(data);
      console.log("get data");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };



  return (
    <div>
      <button onClick={()=>getNotes()}>get data</button>
      <button onClick={()=>getOne()}>get one</button>
      <p>You are logged to the home page!</p>

      {notes.length}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
