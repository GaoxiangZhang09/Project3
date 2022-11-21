import React, { useState, useEffect } from "react";

import CommunicationItems from "../components/Communication/CommunicationItems"
import CommunicationImg from "../images/HomePageImg.jpeg"

function Communication() {
  const[item, setItem]=useState(["Say something"])
  const[items, setItems]=useState([])


  function handleKeyUp(event){
    if (event.keyCode !== 13) return
    if(event.target.value.trim()=== ""){
      alert("Can not input empty!")
      return
    }
    setItem([event.target.value])
    event.target.value= ""
  }
  
  useEffect(()=>{
    setItems([item, ...items])
  },[item])
    



  
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h1>BPQ-331</h1>
          <p>
            Communication! <br/>
            Message Board！
          </p>
        </div>
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
            src={CommunicationImg}
            alt="Nice nft mining website"
          />
          {/* Picture from{"../images/HomePageImg.jpeg"}
          <a href="../images/HomePageImg.jpeg">
            rd.com
          </a> */}
        </div>
        <div className="col-12">
          <input onKeyUp={handleKeyUp} type="text" placeholder="Feel free say what your want to say!" />
          <CommunicationItems item={items}/>
        </div>
      </div>
    </div>
  );
}

export default Communication;