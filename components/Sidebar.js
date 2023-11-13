import React from 'react'
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import  EmailValidator from "email-validator";
import { auth, db } from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import ChatI from './Chat';


function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users",'array-contains',user.email);

  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = ()=>{
    const input = prompt('Please enter the email for the user you wish to chat with?');
     
    if (!input) return null;

    if(EmailValidator.validate(input) && !ChatAlreadyExists(input) && input !==user.email){
     db.collection("chats").add({
       users: [user.email,input],
     })
    }

  };
   const ChatAlreadyExists = (receiptEmail)=>
   
     !!chatsSnapshot?.docs.find(
      (chat)=> chat.data().users.find((user)=>user === receiptEmail)?.length>0
     );


  return (
<Container>
    <Header>
   <UserAvatar 
    src={user.photoURL}
   style={{ height: '50px', width: '50px' }}
   onClick={()=> auth.signOut()}/>
   <IconsContainer>
    <IconButton>
    <ChatIcon/>
    </IconButton>
    <IconButton>
    <MoreVertIcon/>
    </IconButton>
   </IconsContainer>
    </Header>
    <Search>
        <SearchIcon/>
        <SearchInput placeholder='search in chats'/>
    </Search>
    <SidebarButton onClick={createChat}>
        Start a New Chat
    </SidebarButton>
    {/* List of chats */}
    {chatsSnapshot?.docs.map(chat=>(

       <ChatI
       key={chat.id}
       id={chat.id}
       users={chat.data().users}
       />
    ))}
</Container>
  )
}

export default Sidebar

const Container = styled.div`
  flex: 0.45;
  border-right:1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y:scroll;
   @media (max-width:590px){
    min-width: 250px;
  }
  @media (max-width:486px){
    min-width:180px;
  }
  @media (max-width:375px){
    min-width: 140px;
  }



  ::-webkit-scrollbar {
    display: none;
  }

`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;

`;
const SearchInput = styled.input`
 outline-width: 0;
 border: none;
 flex: 1;
`;
const SidebarButton = styled(Button)`
 width: 100%;
 &&&{
    border-top: 1px solid whitesmoke;
     border-bottom: 1px solid whitesmoke;
 }

`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(AccountCircleOutlinedIcon)`
  cursor: pointer;

  :hover{
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div`
`;




