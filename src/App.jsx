import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Chats } from "./Chats.jsx";
//distructuring create parameter from what returns
//module is object with key and value
import { Messages } from "./Messages.jsx";
import { MessageForm } from "./MessageForm.jsx";
import { SearchForm } from "./SearchForm.jsx";
import { Panels, Panel } from "./Panels.jsx";
const Utils = require("./utils.js");

export function App() {
  //my user
  const [myUser, setMyUser] = useState({});
  //my friends
  const [myFriends, setMyFriends] = useState([]);
  //chats
  const [chats, setChats] = useState([]);
  //chatID
  const [chatId, setChatId] = useState(null);
  //newChatId
  const [newChatId, setNewChatId] = useState(null);
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

  let savedChatId = useRef(null);

  //my user - holding my user id as a global parameter
  // let myUserID = "60c2523497fb4f41c011ad1b";

  useEffect(loadMyUser, []);

  useEffect(loadAllUsers, []);

  // useEffect(loadAllUsers, [newUser]);

  useEffect(loadMyFriends, [myUser]);

  //when myFriends or myUser is change, want to trigger
  //allUser context that connected to me
  useEffect(updateUserContext, [myFriends, myUser]);

  //useEffect triggers every re-render
  useEffect(loadChats, [myUser?._id, newChatId, lastPoll]);

  //or chatId or lastPoll changes and trigger the useEffect
  //chatId => everytime we selecting chat from chats list
  //lastPoll => everytime we send request to the server
  useEffect(loadMessage, [chatId, lastPoll]);

  //when chatId is change, want to trigger
  //savedLastChatid function that save the chat id
  useEffect(savedLastChatid, [chatId]);

  useEffect(startTimer, [lastPoll]);

  function loadAllUsers() {
    Utils.get("users/")
      .then((users) => console.log(users))
      .catch((err) => console.log("There is an internal error: " + err));
  }

  function loadChats() {
    if (!myUser._id) return;
    Utils.get("chats?userid=" + myUser._id).then((chats) => {
      setChats(chats);
      if (!chats) return;

      //except of the first time that chats[0]._id is null
      //** chats[0]._id will always have value after the first time
      //** but || statemant will search the value on the first opherand
      //** only if it doesn't has any value it search on the second ophrand
      //after setChatId will change the chatId render the component
      //changing chatId will trigger saveLastChatId
      let defaultChat = savedChatId.current || chats[0]._id;
      setChatId(defaultChat);
    });
  }

  function loadMessage() {
    if (!chatId) return;
    Utils.get("chats/" + chatId + "/messages/").then((messages) => {
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
    // Utils.get("me", {
    // fetch("https://netapp-server-doriroz.herokuapp.com/api/me", {
    fetch("http://localhost:8080/api/me", {
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((myUser) => {
        setMyUser(myUser);
      });
  }

  function loadMyFriends() {
    Utils.get("users")
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

  function savedLastChatid() {
    savedChatId.current = chatId;
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

    Utils.post("chats/" + chatId + "/messages/", msg).then((data) => {
      console.log(JSON.stringify(data));
      setLastPoll(Date.now());
    });
  }

  function onClickFoundUsr(foundUser) {
    Utils.post("chats/", { userIds: [(myUser._id, foundUser)] }).then(
      (newChat) => {
        setNewChatId(newChat._id);
      }
    );
  }

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
        headerPic={myUser.profilePic}
        header={"User: " + myUser.userName}
        newUserPic={""}
        body={
          <div>
            <SearchForm userContext={userContext} foundUser={onClickFoundUsr} />
            <p style={{ padding: "0 10px" }}>Chats:</p>
            <Chats
              chats={chats}
              onSelectChat={setChatId}
              userContext={userContext}
              myUser={myUser}
              savedChat={savedChatId}
            />
          </div>
        }
      />

      <Panel
        width={"65%"}
        backgroundImage={backgroundImage}
        headerPic={"chats.png"}
        newUserPic={"add-user.png"}
        header={
          "Friend on chat:  " + getUserByChat(selectedChat)
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
        // when sending call to server the lastPoll is chnged and the pane /// will scroll the scrollbar down to the new message

        lastScroll={lastPoll}
      />
    </Panels>
  );
}
