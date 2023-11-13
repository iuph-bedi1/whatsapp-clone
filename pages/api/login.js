import Head from 'next/head';
import React from 'react';
import styled from "styled-components";
import Image from 'next/image'
import ba from "../images/wa.jpg"
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';






function Logini() {
   
    const signIn = ()=>{
        auth.signInWithPopup(provider).catch(alert);

    };


  return (
    <Container>
       <Head>
      
     
        <title>Login page</title>
       </Head>

       <LoginContainer>
  
          <Image
          
          className='image'
          src={ba}/>
          <Button onClick={signIn} variant='outlined'>Sign In with google</Button>
        
       </LoginContainer>
    </Container>

  )
}

export default Logini;

const Container = styled.div`
 display: grid;
 place-items:center;
 height: 100vh;
 background-color: whitesmoke;
`;

const LoginContainer = styled.div`
 padding: 100px;
 display: flex;
 flex-direction: column;
 align-items: center;
 background-color:white;
 border-radius: 5px;
 box-shadow: 0px 4px 14px -3px rgba(0,0,0.7);
 @media (max-width:550px){
  padding:30px;
}
@media (max-width:350px){
  padding: 17px;
}
@media (max-width:275px){
  padding: 10px;
}
@media (max-width:250px){
  padding: 3px;
}
@media (max-width:220px){
  padding: 1px;
}
`;



 







