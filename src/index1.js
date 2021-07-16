import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

ReactDOM.render(<App />, document.getElementById("root"));

function App() {
  const [posts, setPost] = useState([]);
  const [selectedID, setSelectedID] = useState(1);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((postsRender) => setPost(postsRender));
  }, []);

  useEffect(() => {
    if (selectedID) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=" + 
      ${selectedID}`)
        .then((res) => res.json())
        .then((comments) => setComments(comments));
    } else {
      return;
    }
  }, [selectedID]);

  let selectedPost = posts.find((post) => post.id === selectedID);

  const container = {
    height: "100vh",
    width: "100vw",
  };

  return (
    <main style={container}>
      <Panels posts={posts} onSelectedPost={setSelectedID} />
    </main>
  );
}

function Panels(props) {
  console.log(props);
  let div = {
    display: "flex",
    height: "100vh",
  };

  let bgImage =
    "url('https://i.pinimg.com/originals/98/da/8f/98da8f9306de27424460d16e53938b72.jpg')";

  return (
    <div style={div}>
      <Panel
        width={"35%"}
        backgrndCLR={"white"}
        overFlowY={"scroll"}
        overFlowX={"hidden"}
      >
        <Posts posts={props.posts} onSelectPost={props.onSelectedPost} />
      </Panel>
      <Panel width={"65%"} backgrndIMG={bgImage} overFlowY={"hidden"}>
        <Comments />
      </Panel>
    </div>
  );
}

function Panel(props) {
  const panelStyle = {
    overflowX: props.overFlowX,
    overflowY: props.overFlowY,
    backgroundColor: props.backgrndCLR,
    border: "1px solid",
    width: props.width,
    backgroundImage: props.backgrndIMG,
    backgroundPosition: "center",
    backgroundSize: "150px 250px",
  };

  return <div style={panelStyle}>{props.children}</div>;
}

function Posts(props) {
  let ul = {
    listStyle: "none",
    padding: "0",
  };
  return (
    <ul style={ul}>
      {props.posts.map((p) => (
        <Post post={p.title} id={p.id} onSelect={props.onSelect} key={p.id} />
      ))}
    </ul>
  );
}
function Post(props) {
  let li = {
    width: "100%",
    padding: "10px 0 10px 5px",
    border: "1px solid gray",
    cursor: "pointer",
  };

  return (
    <li style={li} comments={comments}>
      {props.post}
    </li>
  );
}

function Comments(props) {
  return <div>{/* {props.comments.map((comment) => {})} */}</div>;
}
