import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import moment from "moment";

const Message = styled.div({
  borderRadius: "15px",
  margin: "10px 5px",
  padding: "5px 50px",
  width: "50%",
});

const MessageFlex = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const MessageButton = styled.button({
  border: "none",
  outline: "none",
  fontSize: "20px",
  borderRadius: "50%",
  height: "5vh",
  margin: "2vh",
});

export function Messages(props) {
  let dateTmp = "";
  let counter = 0;
  if (!props.messages) {
    console.log(props.messages);
    return "";
  }

  function renderDate(date) {
    let dateMoment = moment(date);
    dateMoment = dateMoment.subtract(10, "days").calendar();
    if (dateTmp != dateMoment) {
      dateTmp = dateMoment;
      return (
        <p style={{ textAlign: "center" }}>
          {<Moment format="DD/MM/YYYY">{dateMoment}</Moment>}
        </p>
      );
    }
    return;
  }

  return (
    <div>
      {props.messages.map((message) => {
        // debugger;
        counter++;
        let fullUser = props.userContext.allUser[message.author._id] || {};
        return (
          <div key={counter}>
            {renderDate(message.date)}
            <Message
              key={message._id}
              style={{
                background:
                  props.myUser._id == message.author._id
                    ? "#f7f4f4"
                    : "#b3efd2",
                margin:
                  props.myUser._id == message.author._id
                    ? "15px 10px 15px auto"
                    : "15px auto 15px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Name: {fullUser?.userName}</p>
              <MessageFlex>
                <p>{message.context}</p>
                <MessageButton>&times;</MessageButton>
              </MessageFlex>
            </Message>
          </div>
        );
      })}
    </div>
  );
}
