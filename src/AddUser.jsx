import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const Utils = require("./utils.js");

const Button = styled.button(() => ({
  border: "none",
  outline: "none",
  borderRadius: "45%",
}));

const Image = styled.img(() => ({
  height: "30px",
  width: "30px",
  padding: "2px 0",
  margin: "0",
  border: "none",
  outline: "none",
  color: "e2dcdc",
}));

export function AddUser(props) {
  const [newUser, setNewUser] = useState({});
  //if we don't really render the application
  //check if the application need the state

  function onAddUser() {
    let newUser = {
      userName: "ramiroz",
      email: "ramiroz@gmail.com",
      firstName: "Rami",
      lastName: "Rozen",
      phone: "0546302121",
      country: "",
      profilePic: "rami.jpg",
    };

    Utils.post("users", newUser).then((user) => {
      console.log(user);
      alert(user);
      setNewUser(user);
    });
  }

  return (
    <Button
      style={{
        backgroundColor: props.newUserPic === "" ? "#e2dcdc" : "none",
      }}
      onClick={onAddUser}
    >
      <Image
        src={props.newUserPic}
        style={{ opacity: props.newUserPic !== "" ? "1" : "0" }}
      />
    </Button>
  );
}
