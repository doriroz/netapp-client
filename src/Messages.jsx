import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const Message = styled.div({
  borderRadius: "15px",
  margin: "10px 5px",
  padding: "5px 50px",
  width: "50%",
  // margin: "10px 5px 10px auto",
});

// moment("12-25-1995", "MM-DD-YYYY");

export function Messages(props) {
  if (!props.messages) {
    console.log(props.messages);
    return "";
  }

  return (
    <div>
      {props.messages.map((message) => {
        // debugger;
        let fullUser = props.userContext.allUser[message.author._id] || {};
        //props.userContext.allUser[message.author._id] || {};
        console.log("message.author._id : " + message.author._id);
        console.log("props.myUser : " + props.myUser._id);
        return (
          <Message
            key={message._id}
            style={{
              background:
                props.myUser._id == message.author._id ? "#f7f4f4" : "#b3efd2",
              margin:
                props.myUser._id == message.author._id
                  ? "15px 10px 15px auto"
                  : "15px auto 15px 10px",
            }}
          >
            <p>
              Name: {fullUser?.userName} || Date:{" "}
              <Moment format="DD/MM/YYYY">{message.date}</Moment>
            </p>
            <p>{message.context}</p>
          </Message>
        );
      })}
    </div>
  );
}
