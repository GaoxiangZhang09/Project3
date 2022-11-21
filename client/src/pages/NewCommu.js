import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import NewCommuItem from "../components/Communication/NewCommuItem";
import { loremIpsum } from "lorem-ipsum";
import names from "./names.js";

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
        body: data,
      })
        // .then(()=>alert("yey it worked!"))
        .then((res) => res.text())
        .then((txt) => {
          console.log(txt);
          setListOfFriends([
            { name: name, comment: comment },
            ...listOfFriends,
          ]);
          // console.log("addFriend()",listOfFriends)
        })
        .catch((err) => {
          console.log(err);
          alert("it doesn't worked!");
        });
    }
    await fetchPOST_addFriend(name, comment);
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
        body: data,
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
        body: data,
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

  // everytime the listOfFriends state change
  // fetch all data from database again, and rerender
  useEffect(() => {
    async function fetchGET_findAllFriends() {
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
    fetchGET_findAllFriends();
  }, []);

  return (
    <div>
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
  updateFriend: PropTypes.func,
};
export default NewCommu;
