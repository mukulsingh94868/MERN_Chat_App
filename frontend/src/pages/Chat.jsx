import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(async () => {
  //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (!storedUserData) {
          navigate("/login");
        } else {
          const userData = JSON.parse(storedUserData);
          if (!mounted) {
            return;
          }
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    let mounted = true;
    fetchData();
  }, [navigate, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const controller = new AbortController();
          const signal = controller.signal;
          if (currentUser.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`, { signal });
            setContacts(response.data);
          } else {
            navigate("/setAvatar");
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('Request was aborted');
          } else {
            console.error('Error fetching data:', error);
          }
        }
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          {/* <Contacts contacts={contacts} changeChat={handleChatChange} /> */}
          {currentChat === undefined ? (
            // <Welcome />
            <></>
          ) : (
            // <ChatContainer currentChat={currentChat} socket={socket} />
            <></>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;