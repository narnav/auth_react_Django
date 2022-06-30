import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MyLog = () => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const history = useHistory();
  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      // setAuthTokens(data)
      setUser(jwt_decode(data.access));
      console.log(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      {user && <p>Hello {user.username}</p>}
      <form onSubmit={loginUser}>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default MyLog;
