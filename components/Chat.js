
import React from 'react'
import styled from "styled-components"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import getRecipientEmail from '../utilis/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

function ChatI ({id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection("users").where('email','==',getRecipientEmail(users,user)));

    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }
  
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users,user);
 
  return (
     
    <Container onClick={enterChat}>
     {recipient ? (
        <UserAvatar src={recipient?.photoURL}/>
     ):(
        <UserAvatar style={{ height: '43px', width: '43px' }}  >{recipientEmail[0]}</UserAvatar>
     )}
     
        <p>{recipientEmail}</p>
    </Container>
  )
}

export default ChatI

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break:break-word;

  :hover{
    background-color:#e9eaeb;
  }
`;

const UserAvatar = styled(AccountCircleOutlinedIcon)`  

 margin: 5px;
 margin-right: 15px;


 `;

