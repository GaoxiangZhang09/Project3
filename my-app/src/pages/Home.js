import React, { useState } from "react";
// import propTypes from "eslint-plugin-react/lib/rules/prop-types";
import {nanoid} from "nanoid"
// import usernames from "usernames";
import HomePageImg from "../images/HomePageImg.jpeg";
import HomeMintResult from "../components/Home/HomeMintResult";
import Homehistory from "../components/Home/Homehistory";

// import classes from "./Home.modual.css"

function Home( ) {
  const [number, setNumber] = useState(null);
  const [mintDate, setMintDate] = useState(null)
  let [date, setDate] = useState(null)
  // let [mintHistory, setmintHistory] = useState({history:[{id:"1",name:"asdf"}, {id:"2",name:"zzzzz"}]})
  let [mintHistory, setMintHistory] = useState({})
  let [mintHistorys, setMintHistorys] = useState([])

  // const [fakeUsername, setfakeUsername] = useState(null)

  //let page show the date
  React.useEffect(() => { 
    setInterval(() => { 
      setDate(date1 => Date())
    },1000)
  },[])

  function mintResult(){
    // setNumber(Math.floor(Math.random() * 10000000))
    setNumber(nanoid())
    setMintDate(Date())
    // setfakeUsername(usernames({
    //   length      : 8, // only chars, separator not included
    //   separator   : '-',
    //   patterns    : [['adjectives', 'nouns'],['adverbs', 'verbs']]
    // }))
  }

  React.useEffect(()=>{
    setMintHistory({number: number, mintDate: mintDate})
  }, [number, mintDate]);

  React.useEffect(()=>{
    if (number !== null && mintDate !== null){setMintHistorys([mintHistory, ...mintHistorys])}
    
  }, [mintHistory]);
  
  return (
    <div>
      <h1>Welcome to BPQ-331!</h1>
      <div className="row">
        <div className="col-12">
          <p>
            This website/app is designed for customers who want to be the vip of BPQ331 <br/>
            restaurant customers who want to order online for dishes.
          </p>
        </div>
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
            }}
            src={HomePageImg}
            alt="Nice nft mining website"
          />
          {/* Picture from{""}
          <a href="../images/HomePageImg.jpeg">
            rd.com
          </a> */}
        </div>

        <div className="col-12">
          <h2>Time is :  {date}</h2>
        </div >

        {/* effets happen when onClick mint btn */}
        <div className="col-12">
          <button onClick={mintResult} >Mint</button>
        </div>
        
        <div className="col-12">
            <HomeMintResult number={number} mintDate={mintDate} />
        </div> 

        <div className="col-12">
          <Homehistory history={mintHistorys} />
        </div> 

      </div>
    </div>
  );
}

// Home.propTypes = {
//   HomeMintResult: propTypes.array,
//   Homehistory: propTypes.array,
// };

export default Home;