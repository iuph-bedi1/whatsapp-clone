import React from 'react'
import Image from 'next/image';
import ab from "./wa.jpg";
import {Circle} from "better-react-spinkit";
function Loading () {
  return (
  
      <center style={{display:"grid",placeItems:"center",height:"80vh"}}>
        <div>
          <Image 
          className='loade'
          src={ab}/>
        </div>
        <Circle color="#3CBC28"
        size={60}
         />
      </center>
  )
}

export default Loading;