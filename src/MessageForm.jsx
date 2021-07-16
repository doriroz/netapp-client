import React from "react";
import styled from "styled-components";

let Input = styled.input({
  //   overflow: "hidden",
  width: "80%",
  padding: "10px",
  margin: "10px auto",
  borderRadius: "50px",
  border: "none",
});

let Form = styled.form({
  background: "#f4efef",
  display: "flex",
});

const ImgSend = styled.img(() => ({
  width: "45px",
  height: "45px",
  margin: "5px",
}));

export function MessageForm({ onNewMassege }) {
  function onSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    alert("sending message to server: " + e.target.newMessage.value);
    onNewMassege(e.target.newMessage.value);
  }

  return (
    <Form onSubmit={onSubmit}>
      {/* the value of input id and name related as form attribute */}
      {/* <input type="text" id={"newMessage"} /> */}
      <Input type="text" id={"newMessage"} />
      <ImgSend src="sending.png" />
    </Form>
  );
}
