import React from "react";
import styled from "styled-components";

let ListStyle = styled.ul({
  listStyle: "none",
  padding: "0",
  margin: "0",
});

let ItemStyled = styled.li({
  padding: "10px 5px 10px 5px",
  border: "1px solid #f4f2f2",
  cursor: "pointer",
  fontSize:"18px",
  // verticalAlign:"middle"
});

const ImgSearch = styled.img(() => ({
  width: "30px",
  height: "30px",
  margin: "0 10px",
  padding: "2px",
}));

function joinUser(c, allUser) {
  return c.userIds
    .map((usr) => {
      let fullUser = allUser[usr] || {};
      console.log(fullUser);
      return fullUser.userName;
    })
    .join(",");
}

export function Chats(props) {
  props.chats.map((c) => console.log(c.userIds.userName));
  return (
    <ListStyle>
      {props.chats.map((c) => (
        <ItemStyled key={c._id} onClick={() => props.onSelectChat(c._id)}>
          <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <ImgSearch src="users.png" />
          {joinUser(c, props.userContext.allUser)}
          </div>
          
        </ItemStyled>
      ))}
    </ListStyle>
  );
}
