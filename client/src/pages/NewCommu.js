/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NewCommuItem from "../components/Communication/NewCommuItem";
import { loremIpsum } from "lorem-ipsum";
import names from "../nameForUsers/names";

function NewCommu() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  // CREATE
  const addFriend = async () => {
    async function fetchPOST_addFriend(input_name, input_comment) {
      let data = new URLSearchParams();
      // URLSearchParams() take the current URL and get the object after "?"
      // https://googlechrome.github.io/samples/urlsearchparams/
      data.append("name", input_name);
      data.append("comment", input_comment);

      //   await fetch("https://five610-project3-server.onrender.com/addFriend", {
      await fetch("http://localhost:3001/addFriend", {
        method: "post",
        body: data
      })
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
        })
        .catch((err) => {
          console.log(err);
          alert("it doesn't worked!");
        });
    }
    await fetchPOST_addFriend(name, comment);
    await fetchGET_updateAllFriends();
  };

  const addTonsOfFriends = async () => {
    async function fetchPOST_addFriend(input_name, input_comment) {
      let data = new URLSearchParams();
      // URLSearchParams() take the current URL and get the object after "?"
      // https://googlechrome.github.io/samples/urlsearchparams/
      data.append("name", input_name);
      data.append("comment", input_comment);

      //   await fetch("https://five610-project3-server.onrender.com/addFriend", {
      await fetch("http://localhost:3001/addFriend", {
        method: "post",
        body: data
      }).catch((err) => {
        console.log(err);
        alert("it doesn't worked!");
      });
    }

    function nameGenerator() {
      return names[Math.floor(Math.random() * names.length)];
    }
    function commentGenerator() {
      return loremIpsum();
    }
    for (let i = 0; i < 100; i++) {
      let name = nameGenerator();
      let comment = commentGenerator();
      console.log("auto gnerate name and comment", name, comment);
      await fetchPOST_addFriend(name, comment);
    }
  };

  // UPDATE
  const updateFriend = async (id) => {
    const newComment = prompt("Enter new comment: ");
    async function fetchPOST_updateCommentById(target_id, newComment) {
      let data = new URLSearchParams();
      data.append("_id", target_id);
      data.append("comment", newComment);

      // await fetch("https://five610-project3-server.onrender.com/updateCommentById", {
      await fetch("http://localhost:3001/updateCommentById", {
        method: "post",
        body: data
      })
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
          setListOfFriends(
            listOfFriends.map((val) => {
              return val._id === id
                ? { _id: id, name: val.name, comment: newComment }
                : val;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    await fetchPOST_updateCommentById(id, newComment);
  };

  async function fetchGET_updateAllFriends() {
    // await fetch("https://five610-project3-server.onrender.com/findAllFriends")
    await fetch("http://localhost:3001/findAllFriends")
      .then((res) => res.json())
      .then((txt) => {
        setListOfFriends(txt);
        console.log(txt);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // everytime the listOfFriends state change
  // fetch all data from database again, and rerender
  useEffect(() => {
    async function updateThis() {
      await fetchGET_updateAllFriends();
    }
    updateThis();
  }, []);

  // DELETE
  const deleteFriend = async (id) => {
    async function fetchPOST_deleteById(target_id) {
      let data = new URLSearchParams();
      data.append("_id", target_id);

      // fetch("https://five610-project3-server.onrender.com/deleteById", {
      fetch("http://localhost:3001/deleteById", {
        method: "post",
        body: data
      })
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
          setListOfFriends(
            listOfFriends.filter((val) => {
              return val._id !== id;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchPOST_deleteById(id);
  };

  return (
    <div>
      <h1>
        Welcome to NFT-Minter! <br />
        Instructions:
      </h1>
        <div className="row">
          <p>
            This page is designed for people who want to leave comments <br />
            You can input your comments in the input box below, after type your <br/>
            name and comments, Click "add comment" button will add your comments <br/>
            into our databasem, and render in the history area below.
          </p>
        </div>
    
      <input
        type="text"
        placeholder="User name..."
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Make a comment..."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button onClick={addFriend}>add comment</button>
      <button onClick={addTonsOfFriends}>add Tons of comments</button>
      <NewCommuItem
        listOfFriends={listOfFriends}
        deleteFriend={deleteFriend}
        updateFriend={updateFriend}
      />
    </div>
  );
}
NewCommu.propTypes = {
  listOfFriends: PropTypes.array,
  deleteFriend: PropTypes.func,
  updateFriend: PropTypes.func
};
export default NewCommu;
