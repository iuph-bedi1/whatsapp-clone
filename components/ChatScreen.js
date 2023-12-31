
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from "styled-components"
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { IconButton } from '@mui/material';
import {useCollection} from "react-firebase-hooks/firestore";
import Message from './Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import getRecipientEmail from '../utilis/getRecipientEmail';
import TimeAgo from "timeago-react";

function Chatscreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const [input,setInput] = useState("");
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db.collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timestamp","asc")
        
    );

    const [recipientSnapshot] = useCollection(
      db
      .collection('users')
      .where('email','==',getRecipientEmail(chat.users,user))
    );

    const showMessages = ()=>{
      if(messagesSnapshot){
        return messagesSnapshot.docs.map(message=>(
          <Message
          key={message.id} 
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),

          }}
          
          />
        ));
      } else {
        return JSON.parse(messages).map(message=>(
          <Message key={message.id} user={message.user} message={message} />
        ))
      }

    };

     const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },
        {merge:true}
        );
        db.collection('chats').doc(router.query.id).collection('messages').add({
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          message:input,
          user:user.email,
          photoURL:user.photoURL,
        });
        setInput('');
     };

      const recipient = recipientSnapshot?.docs?.[0]?.data()
      const recipientEmail = getRecipientEmail(chat.users,user);
  return (
     <Container>
     
      <Header>
      { recipient? (
       <Avatar src={recipient?.photoURL} style={{width:'39px',height:'39px'}}  />
      ) : (
          <Avatar></Avatar>
      )}
       
        
          

        <HeaderInformation>
            <h3>{recipientEmail}</h3>
            { recipientSnapshot ? (
              <p>
                Last Active:{""} 
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate() } />
              ):(
                "Unavailable"
            
            )}
              </p>
            ):(
              <p>Loading Last Active...</p>
            )}
           
        </HeaderInformation>
        <HeaderIcons>
            <IconButton>
             <AttachFileIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>

        </HeaderIcons>
      </Header>
      <MessageContainer>
         {showMessages()} 
        <EndofMessage/>
      </MessageContainer>
      <InputContainer>
         <InsertEmoticonIcon />
         <Input value={input} onChange={e=>setInput(e.target.value)} />
          <button hidden disabled={!input} type='submit' onClick={sendMessage} >Send Message</button>
         <MicIcon/>
      </InputContainer>
     </Container>
  )
}

export default Chatscreen;

const Container = styled.div`
 @media (max-width:520px){
    padding: 21px;
 }
 @media (max-width:498px){
  padding: 15px;
 }

`;
const Input = styled.input`
flex: 1;
outline: 0;
border: none;
border-radius: 10px;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: whitesmoke;
padding: 20px;
margin-left: 15px;
margin-right: 15px;

`;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 10px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const Avatar = styled(AccountCircleOutlinedIcon)`
    
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;


  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div`
 

`;
const EndofMessage = styled.div`
  
`;
const MessageContainer = styled.div`
 padding: 30px;
 background-color: #e5ded8;
 min-height: 90vh;
  @media (max-width:520px){
  padding: 20px;
 }
 @media (max-width:498px){
  padding: 15px;
 }

`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color:white;
  z-index:100;

`;

