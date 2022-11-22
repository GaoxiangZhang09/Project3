import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types"; // import propTypes from "eslint-plugin-react/lib/rules/prop-types";
import HomePageImg from "../images/HomePageImg.jpeg";
import HomeMintResult from "../components/Home/HomeMintResult";
import Homehistory from "../components/Home/Homehistory";
import nameForUsers from "../nameForUsers/nameForUsers.js";

function Home() {
  const [name, setName] = useState(0);
  const [number, setNumber] = useState(null);
  const [mintDate, setMintDate] = useState(null);
  let [date, setDate] = useState(null);
  let [mintHistorys, setMintHistorys] = useState([]);

  // SHOW CURRENT TIME
  useEffect(() => {
    setInterval(() => {
      setDate(() => Date());
    }, 1000);
  }, []);

  // CREATE
  const mintAlot = async () => {
    async function fetchPOST_addMint(input_name, input_number, input_date) {
      let data = new URLSearchParams();
      data.append("name", input_name);
      data.append("number", input_number);
      data.append("date", input_date);
      await fetch("http://localhost:3001/addMint", {
        method: "post",
        body: data
      }).catch((err) => {
        console.log(err);
        console.log("it doesn't worked!");
      });
    }
    for (let i = 0; i < 50; i++) {
      await fetchPOST_addMint(nameForUsers(), nanoid(), Date());
      console.log("yeaah");
    }
  };

  const mintResult = (number, date, name) => {
    setNumber(number);
    setMintDate(date);
    setName(name);
  };

  const addMint = async () => {
    // SET THE NAME NUMBER AND TIME OF THIS MINT (can use to populate DB)
    async function fetchPOST_addMint(input_name, input_number, input_date) {
      let data = new URLSearchParams();
      // URLSearchParams() take the current URL and get the object after "?"
      // https://googlechrome.github.io/samples/urlsearchparams/
      data.append("name", input_name);
      data.append("number", input_number);
      data.append("date", input_date);

      //   await fetch("https://five610-project3-server.onrender.com/addMint", {
      await fetch("http://localhost:3001/addMint", {
        method: "post",
        body: data
      })
        .then((res) => res.text())
        .catch((err) => {
          console.log(err);
          console.log("it doesn't worked!");
        });
    }
    let nameA = nameForUsers();
    let numberA = nanoid();
    let dateA = Date();
    mintResult(numberA, dateA, nameA);
    await fetchPOST_addMint(nameA, numberA, dateA);
    await fetchGET_findAllMints();
  };

  // READ
  // update all mint historys
  async function fetchGET_findAllMints() {
    // await fetch("https://five610-project3-server.onrender.com/findAllFriends")
    await fetch("http://localhost:3001/findAllMints")
      .then((res) => res.json())
      .then((txt) => {
        setMintHistorys(txt);
        console.log(txt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function updateThis() {
      if (mintHistorys.length === 0) {
        await fetchGET_findAllMints();
      }
    }
    updateThis();
  }, []);

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
        body: data
      })
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
          setMintHistorys(
            mintHistorys.map((val) => {
              return val._id === id
                ? { _id: id, name: newName, number: val.number, date: date }
                : val;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    await fetchPOST_updateMintNameById(id, newName);
  };

  // DELETE
  const deleteMintById = async (id) => {
    async function fetchPOST_deleteMintById(target_id) {
      let data = new URLSearchParams();
      data.append("_id", target_id);

      // fetch("https://five610-project3-server.onrender.com/deleteById", {
      fetch("http://localhost:3001/deleteMintById", {
        method: "post",
        body: data
      })
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
          setMintHistorys(
            mintHistorys.filter((val) => {
              return val._id !== id;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchPOST_deleteMintById(id);
  };

  return (
    <div>
      <h1>Welcome to BPQ-331!</h1>
      <div className="row">
        <div className="col-12">
          <p>
            This website/app is designed for customers who want to be the vip of
            BPQ331 <br />
            restaurant customers who want to order online for dishes.
          </p>
        </div>
        <div className="col-12">
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain"
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
          <h2>Time is : {date}</h2>
        </div>

        {/* effets happen when onClick mint btn */}
        <div className="col-12">
          <button id="mint-button" onClick={addMint}>
            Mint
          </button>
          <button onClick={mintAlot}>Mint Alot</button>
        </div>

        <div className="col-12">
          <div>
            <h2>⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣</h2>
            <h2>The Mint Result You Got</h2>
            <h2>⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣</h2>
          </div>
          <div>
            <h3> you can go to opensea testnet to check your NFTs !!</h3>
          </div>
          <HomeMintResult name={name} number={number} mintDate={mintDate} />
        </div>

        <div>
          <h2>⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣</h2>
          <h2>Mint History</h2>
          <h2>⇣⇣⇣⇣⇣⇣⇣⇣⇣⇣</h2>
        </div>

        <div className="col-12">
          <Homehistory
            history={mintHistorys}
            deleteMintById={deleteMintById}
            updateMintNameById={updateMintNameById}
          />
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  mintDate: PropTypes.string,
  history: PropTypes.object,
  deleteMintHistory: PropTypes.func,
  updateMintNameById: PropTypes.func
};

export default Home;
