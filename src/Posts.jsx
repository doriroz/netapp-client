import React from "react";
import styled from "styled-components";

let ListStyle = styled.ul({
  listStyle: "none",
  padding: "0",
  margin: "0",
});

let ItemStyled = styled.li({
  //   width: "100%",
  padding: "10px 0 10px 5px",
  border: "1px solid gray",
  cursor: "pointer",
});

export function Posts(props) {
  return (
    <ListStyle>
      {props.posts.map((p) => (
        <ItemStyled key={p.id} onClick={() => props.onSelectPost(p.id)}>
          {p.title}
        </ItemStyled>
      ))}
    </ListStyle>
  );
}
