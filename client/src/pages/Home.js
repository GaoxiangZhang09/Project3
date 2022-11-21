import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types"; // import propTypes from "eslint-plugin-react/lib/rules/prop-types";
import HomePageImg from "../images/HomePageImg.jpeg";
// eslint-disable-next-line no-unused-vars
import HomeMintResult from "../components/Home/HomeMintResult";
// eslint-disable-next-line no-unused-vars
import Homehistory from "../components/Home/Homehistory";
import nameForUsers from "../nameForUsers/nameForUsers.js";

function Home() {
  const [name, setName] = useState(0);
  const [number, setNumber] = useState(null);
  const [mintDate, setMintDate] = useState(null);
  let [date, setDate] = useState(null);
  let [mintHistory, setMintHistory] = useState({});
  let [mintHistorys, setMintHistorys] = useState([]);

  // SHOW CURRENT TIME
  useEffect(() => {
    setInterval(() => {
      setDate(() => Date());
    }, 1000);
  }, []);

  // SET THE NAME NUMBER AND TIME OF THIS MINT (can use to populate DB)
  function mintResult() {
    setNumber(nanoid());
    setMintDate(Date());
    setName(() => nameForUsers());
  }

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

  // UPDATE THIS MINT HISTORY
  useEffect(() => {
    setMintHistory({ name: name, number: number, mintDate: mintDate });
  }, [number]);

  // CREATE
  const addMint = async () => {
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
    await fetchPOST_addMint(name, number, mintDate);
  };

  // READ
  // update all mint historys
  useEffect(() => {
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
    if (mintHistorys.length === 0) {
      fetchGET_findAllMints();
    }
    setMintHistorys([mintHistory, ...mintHistorys]);
    console.log("setMintHistory");
    if (number !== null && mintDate !== null) {
      addMint();
    }
  }, [mintHistory]);

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
      <h1>
        Welcome to NFT-Minter! <br />
        Instructions:
      </h1>
      <div className="row">
        <div className="col-12">
          <p>
            This website/app is designed for people who want to Mint NFT <br />
            By clicking the mint button below, you can choose to mint 1 to 3
            NFTs. Its value is initially set to 0.001 ETH. <br />
            After you have selected it, you can click the "mint for 0.001 ETH"
            button to connect to your mint Coinbase wallet, <br />
            Ledger ect... Then you can confirm the purchase and put it in your
            wallet. If you don't have these wallets, pressing <br />
            the mint button will also display your unique fakeUsername on the
            page, as well as your own unique id, and the time <br />
            you minted the nft. This result will then be added to the history
            below, and you can modify or delete the history by <br />
            clicking UpdateName button and Delete button.
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
          <button id="mint-button" onClick={mintResult}>
            Mint
          </button>
          <button onClick={mintAlot}>Mint Alot</button>
        </div>

        <div className="col-12">
          <HomeMintResult name={name} number={number} mintDate={mintDate} />
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
