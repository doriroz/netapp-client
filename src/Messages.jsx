import React from "react";
import styled from "styled-components";

const Message = styled.div({
  borderRadius: "15px",
  margin: "10px 5px",
  padding: "5px 50px",
  width: "50%",
  // margin: "10px 5px 10px auto",
});

export function Messages(props) {
  if (!props.messages) {
    console.log(props.messages);
    return "";
  }
  // console.log(props);
  // props.messages.map((message) => console.log(message.author.firstName));
  // console.log(props.messages);

  // let fullUser = props.userContext.allUser;
  // console.log("Full user array : " + fullUser);

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
              Name: {fullUser?.userName} || Meassage ID: {message._id}
            </p>
            <p>{message.context}</p>
          </Message>
        );
      })}
    </div>
  );
}
