import React from "react";
import styled from "styled-components";

const Comment = styled.div({
  border: "1px solid gray",
  borderRadius: "50px",
  margin: "10px 5px",
  padding: "5px 50px",
  backgroundColor: "#f7f4f4",
});

export function Comments(props) {
  if (!props.selectedPost || !props.comments) {
    return "";
  }

  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>
        {props.selectedPost.id}
        {props.selectedPost.title}
      </h1> */}

      {props.comments.map((comment) => (
        <Comment key={comment.id}>
          <p>Name: {comment.name}</p>
          <p>Email: {comment.email}</p>
          <p>{comment.body}</p>
        </Comment>
      ))}
    </div>
  );
}
