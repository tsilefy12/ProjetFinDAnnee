import React, { useEffect, useState } from "react"
import '../compnents/Navrbar.css';
import Navbar from '../compnents/Navbar';
function Home() {
 
  return (
    <div className='home'>
      <Navbar/>
        <img src='./paris.jpg' className='img'></img>
       
    </div>
  )
}

export default Home