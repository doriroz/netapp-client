import React, { useState } from "react";
import styled from "styled-components";
const Utils = require("./utils.js");

let Input = styled.input({
  //   overflow: "hidden",
  width: "80%",
  padding: "10px",
  margin: "10px auto",
  borderRadius: "50px",
  border: "none",
});

// input:focus{outline:"none"}

let Form = styled.form({
  background: "#f4efef",
  display: "flex",
});

const ImgSearch = styled.img(() => ({
  width: "30px",
  height: "30px",
  margin: "7px auto",
  padding: "5px 0",
}));

let List = styled.ul({
  listStyle: "none",
  display: "flex",
  padding: "0 0 0 10px",
});

let Link = styled.a({
  textDecoration: "none",
});

export function SearchForm(props) {
  const [foundUsers, setFoundUsers] = useState([]);

  function onChangeUser(e) {
    getUserBySearch(e);
  }

  // function get(route) {
  //   return fetch("http://localhost:8080/api/" + route, {
  //     credentials: "include",
  //     mode: "cors",
  //   }).then((response) => response.json());
  // }

  function getUserBySearch(e) {
    if (!e.target.value) {
      setFoundUsers([]);
      return;
    }

    return Utils.get("users?search=" + e.target.value).then((user) => {
      console.log(user);
      setFoundUsers(user);
    });
  }

  return (
    <div>
      <Form>
        <Input
          type="text"
          id={"newMessage"}
          onChange={(e) => onChangeUser(e)}
        />
        <ImgSearch src="searching.png" />
      </Form>
      <List>
        Found Users :
        {foundUsers?.map((usr) => {
          console.log(usr);
          return (
            <li key={usr._id}>
              <Link
                href="#"
                data-user-id={usr._id}
                onClick={(e) => {
                  props.foundUser(e.target.dataset.userId);
                }}
              >
                {usr.userName + " || "}
              </Link>
            </li>
          );
        })}
      </List>
    </div>
  );
}
