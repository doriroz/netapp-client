import React, { useEffect } from "react";
import { useState } from "react";
// import styled from "styled-components";
import { Posts } from "./Posts.jsx";
import { Comments } from "./Comments.jsx";
import { Panels, Panel } from "./Panels.jsx";

// const Div = styled.div({
//   display: "flex",
//   height: "100vh",
//   width: "100vw",
// });

export function App() {
  const [posts, setPost] = useState([]);
  const [selectedID, setSelectedID] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    import("./data/posts.js").then((p) => setPost(p.posts));
  });
  // fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((postsRender) => setPost(postsRender));
  // }, []);

  useEffect(() => {
    if (selectedID) {
      fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${selectedID}`
      )
        .then((res) => res.json())
        .then((commentsRender) => setComments(commentsRender));
    } else {
      return;
    }
  }, [selectedID]);

  let selectedPost = posts.find((post) => post.id === selectedID);

  const backgroundImage =
    "url('https://i.pinimg.com/originals/98/da/8f/98da8f9306de27424460d16e53938b72.jpg')";

  //   const allPost = "All Posts";
  return (
    <Panels>
      {/* <Div> */}
      <Panel
        width={"45%"}
        // backgroundColor={"white"}
        header={"All Post"}
        body={<Posts posts={posts} onSelectPost={setSelectedID} />}
      />

      <Panel
        width={"55%"}
        backgroundImage={backgroundImage}
        header={selectedPost?.id + "  " + selectedPost?.title}
        //   {selectedPost?.id + "  " + selectedPost?.title}
        body={<Comments selectedPost={selectedPost} comments={comments} />}
      />
    </Panels>
  );
}
