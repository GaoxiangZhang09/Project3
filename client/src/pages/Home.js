import React, { useState, useEffect } from "react";
import {nanoid} from "nanoid"
import HomePageImg from "../images/HomePageImg.jpeg";
import HomeMintResult from "../components/Home/HomeMintResult";
import Homehistory from "../components/Home/Homehistory";


function Home( ) {
  const [number, setNumber] = useState(null);
  const [mintDate, setMintDate] = useState(null)
  let [date, setDate] = useState(null)
  let [mintHistory, setMintHistory] = useState({})
  let [mintHistorys, setMintHistorys] = useState([])

  // SHOW CURRENT TIME
  useEffect(() => { 
    setInterval(() => { 
      setDate(date1 => Date())
    },1000)
  },[])

  // SET THE NUMBER AND TIME OF THIS MINT
  function mintResult(){
    setNumber(nanoid())
    setMintDate(Date())
  }

  // UPDATE THIS MINT HISTORY
  useEffect(()=>{
    setMintHistory({number: number, mintDate: mintDate})
  }, [number, mintDate]);


  

  // CREATE
  const addMint = async () => {
    async function fetchPOST_addMint(input_number, input_date) {
      let data = new URLSearchParams();
      // URLSearchParams() take the current URL and get the object after "?"
      // https://googlechrome.github.io/samples/urlsearchparams/
      data.append("number", input_number);
      data.append("date", input_date);

    //   await fetch("https://five610-project3-server.onrender.com/addMint", {
      await fetch("http://localhost:3001/addMint", {
        method: "post",
        body: data,
      })
        .then((res) => res.text())
        .then((txt) => {
          setMintHistorys([...mintHistorys, {number: number, date: mintDate}])
          console.log(txt);
          console.log(mintHistorys)
        })
        .catch((err) => {
          console.log(err);
          alert("it doesn't worked!")
        });
    }
    await fetchPOST_addMint(number, mintDate);
  };

  // READ
  // update all mint historys
  useEffect(()=>{
    async function fetchGET_findAllMints() {
      // await fetch("https://five610-project3-server.onrender.com/findAllFriends")
      await fetch("http://localhost:3001/findAllMints")
        .then((res) => res.json())
        .then((txt) => {  
          setMintHistorys(txt);
          console.log(txt);
        })
        .catch((err) => { console.log(err) });
    }
    fetchGET_findAllMints();
    setMintHistorys([mintHistory, ...mintHistorys]);
    if (number !== null && mintDate !== null){
      addMint();
    }
  }, [mintHistory])

// UPDATE
const updateMintNameById = async (id) => {
  const newName = prompt("Enter new name: ");
  async function fetchPOST_updateMintNameById(target_id, newName) {
    let data = new URLSearchParams();
    data.append("_id", target_id);
    data.append("new_name", newName);

    // await fetch("https://five610-project3-server.onrender.com/updateCommentById", {
    await fetch("http://localhost:3001/updateMintNameById", {
      method: "post",
      body: data,
    })
      .then((res) => res.text())
      .then((txt) => {
        console.log(txt);
        setMintHistorys(mintHistorys.map((val) => {
          return val._id === id ? {_id: id, name:val.name, comment:newComment} : val
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await fetchPOST_updateCommentById(id, newComment);
}

// DELETE
const deleteFriend = async (id) => {
  async function fetchPOST_deleteById(target_id) {
    let data = new URLSearchParams();
    data.append("_id", target_id);

    // fetch("https://five610-project3-server.onrender.com/deleteById", {
    fetch("http://localhost:3001/deleteById", {
      method: "post",
      body: data,
    })
      .then((res) => res.text())
      .then((txt) => {
        console.log(txt);
        setListOfFriends(listOfFriends.filter((val) => {
          return val._id !== id;
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  fetchPOST_deleteById(id)
}

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