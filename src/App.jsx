import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Chats } from "./Chats.jsx";
//distructuring create parameter from what returns
//module is object with key and value
import { Messages } from "./Messages.jsx";
import { MessageForm } from "./MessageForm.jsx";
import { SearchForm } from "./SearchForm.jsx";
import { Panels, Panel } from "./Panels.jsx";

const APP_URL = "https://netapp-server-doriroz.herokuapp.com/api/";

export function App() {
  //my user
  const [myUser, setMyUser] = useState({});
  //my friends
  const [myFriends, setMyFriends] = useState([]);
  //chats
  const [chats, setChats] = useState([]);
  //chatID
  const [chatId, setChatId] = useState(null);
  //messages
  const [messages, setMessages] = useState([]);
  //lastPoll hold the current time
  const [lastPoll, setLastPoll] = useState(Date.now());
  //userContext
  const [userContext, setUserContext] = useState({ allUser: {} });

  //timer - for holding the time key returns from setTimeOut
  //ref = parameter that save between renders
  //the value of ref is inside the current
  let timer = useRef(null);

  let lastChatId = useRef(null);

  //my user - holding my user id as a global parameter
  // let myUserID = "60c2523497fb4f41c011ad1b";

  useEffect(loadMyUser, []);

  useEffect(loadAllUsers, []);

  useEffect(loadMyFriends, [myUser]);

  //when myFriends or myUser is change, want to trigger
  //allUser context that connected to me
  useEffect(updateUserContext, [myFriends, myUser]);

  //useEffect triggers every re-render
  useEffect(loadChats, [myUser?._id]);

  //or chatId or lastPoll changes and trigger the useEffect
  //chatId => everytime we selecting chat from chats list
  //lastPoll => everytime we send request to the server
  useEffect(loadMessage, [chatId, lastPoll]);

  useEffect(startTimer, [lastPoll]);

  //get route
  function get(route) {
    // return fetch("http://localhost:8080/api/" + route).then((response) =>
    return fetch(APP_URL + route).then((response) =>
      response.json()
    );
  }

  // let get = (route) =>
  //   fetch("http://localhost:8080/api/" + route).then((response) =>
  //     response.json()
  //   );

  //post route
  function post(route, msg) {
    // return fetch("http://localhost:8080/api/" + route, {
    return fetch(APP_URL + route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(msg),
    });
  }

  // let post = (route, body) =>
  //   fetch(`http://localhost:8080/api/${route}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });

  function loadAllUsers() {
    get("users/")
      .then((users) => console.log(users))
      .catch((err) => console.log("There is an internal error: " + err));
  }

  function loadChats() {
    if (!myUser._id) return;
    get("chats?userid=" + myUser._id).then((chats) => {
      // get("chats/").then((chats) => {
      console.log(chats);
      setChats(chats);
      // if (!chats) return;
      // let defaultChat = lastChatId.current || chats[0]._id;
      // setChatId(defaultChat);
      setChatId(chats[0]._id);
    });
  }

  function loadMessage() {
    if (!chatId) return;
    get("chats/" + chatId + "/messages/").then((messages) => {
      console.log(messages);
      setMessages(messages);
    });
  }

  function loadMyUser() {
    if (!myUser) return;

    //when using import => return module that wrap the object of myUser
    //so in order to use the object , we use then({myUser})
    //when using fetch => return what the object include (the content object)
    //so in order to use the object , we use then(myUser)
    // fetch("http://localhost:8080/api/users/" + myUserID)
    // fetch("http://localhost:8080/api/me", {
    fetch(APP_URL + "me/", {  
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((myUser) => {
        console.log("Dori user : " + myUser._id);
        setMyUser(myUser);
      });
  }

  function loadMyFriends() {
    // fetch("http://localhost:8080/api/users/")
    fetch(APP_URL+"users/")
      .then((response) => response.json())
      .then((mf) => {
        let friends = mf.filter((friend) => friend._id !== myUser);
        console.log(friends);
        setMyFriends(friends);
      })
      .catch((err) => console.log("Error : " + err));
  }

  function startTimer() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLastPoll(Date.now());
    }, 5000);
  }

  //find the selected chat using selectedID => find method
  //return the first element in chats array equal to chatId
  //every elemnt in the array is an object
  let selectedChat = chats.find((chat) => chat._id === chatId);
  console.log(selectedChat);

  function getUserByChat(chat) {
    return chat?.userIds
      .map((usr) => {
        let fullUser = userContext.allUser[usr] || {};
        console.log(fullUser);
        return fullUser.userName;
      })
      .join(",");
  }

  function onNewMassege(body) {
    let msg = {
      author: myUser,
      chat: chatId,
      context: body,
      picText: "",
      date: Date.now(),
    };

    post("chats/" + chatId + "/messages/", msg).then((data) => {
      console.log(JSON.stringify(data));
      setLastPoll(Date.now());
    });
  }

  // function onClickFoundUsr(foundUser) {
  //   post("chats/", chats.userIds[(myUser._id, foundUser)]).then((newChat) => {
  //     setNewChatId(newChat._id);
  //   });
  // }

  //create context of all users
  function updateUserContext() {
    console.log("update", myFriends);
    //when the map is passed in the callback is empty
    // myFriends is an array of users which upload at first when
    // my user is set
    setUserContext({
      // allUser: myFriends.concat(myUser).reduce((map, user) => {
      allUser: myFriends.reduce((map, user) => {
        map[user._id] = user;
        return map;
      }, {}),
    });
    console.log(userContext);
  }

  const backgroundImage =
    "url('https://i.pinimg.com/originals/98/da/8f/98da8f9306de27424460d16e53938b72.jpg')";

  return (
    <Panels>
      <Panel
        width={"35%"}
        myUser={myUser.profilePic}
        header={"User: " + myUser.userName}
        // header={"User: " + myUser.userName + " || Timing Delay: " + lastPoll}
        body={
          <div>
            <SearchForm userContext={userContext} />
            <p style={{ padding: "0 10px" }}>Chats:</p>
            <Chats
              chats={chats}
              onSelectChat={setChatId}
              userContext={userContext}
              myUser={myUser}
            />
          </div>
        }
      />

      <Panel
        width={"65%"}
        backgroundImage={backgroundImage}
        header={
          "ChatId: " +
          selectedChat?._id +
          " || Friend on chat:  " +
          getUserByChat(selectedChat)
          // selectedChat?.userIds.filter((user) => user.userName).join(",")
        }
        //we pass allUser context to message in order to see all
        //messages belong to users connected to me
        body={
          <Messages
            messages={messages}
            userContext={userContext}
            myUser={myUser}
          />
        }
        footer={<MessageForm onNewMassege={onNewMassege} />}
        // lastScroll is passing the lastPoll to the pane
        // lastPoll is changed when sending call to the server for messages
        // when sending call to server the lastPoll is chnged and the pane will scroll the scrollbar down to the new message

        lastScroll={lastPoll}
      />
    </Panels>
  );
}
