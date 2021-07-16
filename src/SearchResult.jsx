import React, { useState } from "react";
import styled from "styled-components";

// let Input = styled.input({
//   width: "80%",
//   padding: "10px",
//   margin: "10px auto",
//   borderRadius: "50px",
//   border: "none",
// });

let List = styled.ul({
  listStyle: "none",
  display: "flex",
  padding: "0 0 0 10px",

  //   background: "yellow",
});

let Link = styled.a({
  textDecoration: "none",
});

export function SearchResult(props) {
  console.log(props.userContext);
  // const [foundUsers, setFoundUsers] = useState([]);

  // function get(route) {
  //   return fetch("http://localhost:8080/api/" + route).then((response) =>
  //     response.json()
  //   );
  // }

  // function loadAllUsers() {
  //   get("users/").then((users) => {
  //     console.log(users);
  //     setFoundUsers(users);
  //   });
  //   console.log(foundUsers);
  //   return foundUsers;
  // }

  function chkFoundUser(props) {
    console.log(props);
    if (props.foundUsers) {
      setListUsers(props.foundUsers);
    } else {
      // console.log(props.userContext);
      setListUsers(props.userContext);
    }
  }

  function setListUsers(props) {
    console.log(props);
    return props.userContext.map((usr) => {
      // if (!usr) {
      //   usr = usr.userName;
      // }
      return (
        <li>
          <Link href="#" onClick="">
            {usr.usrName + " || "}
            {/* {usr.userName + " || "} */}
          </Link>
        </li>
      );
    });
  }

  // <List>All Users : {setListUsers(props.userContext)}</List>
  return <List>All Users : </List>;
}
