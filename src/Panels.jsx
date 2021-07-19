import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Footer = styled.div(() => ({
  // border: "1px solid",
}));

const Search = styled.div(() => ({
  // border: "1px solid",
}));

const SearchList = styled.div(() => ({
  // border: "1px solid",
}));

const Image = styled.img(() => ({
  height: "35px",
  width: "35px",
  padding: "0 10px",
  margin: "0",
}));

const Body = styled.div((props) => ({
  overflow: "auto",
  minHeight: "82vh",
  backgroundPosition: "center",
  backgroundSize: "150px 250px",
  backgroundColor: props.backgroundColor,
  backgroundImage: props.backgroundImage,
  //   ...props,
  //spread props does not doing well with user-defined parameter name
  //that does not known as css property
  // backgroundColor: props.backgrndCLR,
  // backgroundImage: props.backgrndIMG,
}));

const Header = styled.div({
  backgroundColor: "#e2dcdc",
  padding: "10px",
  textAlign: "left",
  borderRight: ".5px solid #ccc5c5",
});

let Container = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  width: props.width,
}));

export const Panels = styled.main({
  height: "100vh",
  width: "100vw",
  display: "flex",
});

export function Panel(props) {
  let width = props.width;
  let body = props.body;
  let header = props.header;
  let footer = props.footer;
  //lastScroll is a number
  //when the lastScroll changes the useEffect is trigger
  let lastScroll = props.lastScroll;

  let ref = useRef(null);
  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [lastScroll]);

  // props.myUser
  console.log(props.myUser);
  return (
    <Container width={width}>
      <Header>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            src={props.headerPic}
            alt=""
            style={{
              borderRadius: props.headerPic != "chats.png" ? "50%" : "none",
            }}
          />
          {header}
        </div>
      </Header>
      <Body {...props} ref={ref}>
        <Search>{props.search}</Search>
        <SearchList />
        {body}
      </Body>
      <Footer>{footer}</Footer>
    </Container>
  );
}
