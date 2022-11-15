//////////////////////
// SERVER
//////////////////////
import bodyParser from "body-parser";
import express from "express";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.listen(3001, () => {
  console.log("you are connected");
});



//////////////////////
// DATABASE
//////////////////////
import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");

// 連結既有 DB and Collections 以便在client.js里面用
const db = client.db("mern_tut");
const friends = db.collection("friends");

// CREATE
async function addFriend(input_name, input_age) {
  await client.connect();
  const doc = { name: input_name, age: input_age };
  const result = await friends.insertOne(doc);
  console.log(`A friend was inserted with the _id: ${result.insertedId}`);
  await client.close();
}

// READ
async function findFriendByName(input_name) {
  await client.connect();
  const result = await friends.findOne({ name: input_name });
  console.log(input_name, result);
  console.log(
    `A friend was found with the name: ${result.name}, with age: ${result.age}`
  );
  await client.close();
  return result;
}

// UPDATE
async function updateAgeByName(target_name, new_age) {
  await client.connect();
  const filter = { name: target_name };
  // update the value of the 'z' field to 42
  const updateDocument = { $set: { age: new_age } };
  await friends.updateOne(filter, updateDocument);
  console.log(`age of ${target_name} has been updated`);
  await client.close();
}

// DELETE
async function cleanDB() {
  await friends.deleteMany({});
}

async function deleteFriends(target_name, target_age) {
  await client.connect();
  const doc = { name: target_name, age: target_age };
  const deleteResult = await friends.deleteOne(doc);
  console.log(deleteResult);
  await client.close();
}

// DB test
async function test() {
  await cleanDB();
  await addFriend("James", 30);
  await findFriendByName("James");
  await updateAgeByName("James", 80);
  await findFriendByName("James");
  await deleteFriends("James", 80);
}



//////////////////////
// ROUTER
//////////////////////

// CREATE
app.post("/addFriend", async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  console.log(name, age);
  await addFriend(name, age);
  res.send(`/addFriend added ${name} ${age}`);
});

// READ
app.post("/findFriendByName", async (req, res) => {
  let target_name = req.body.name;
  console.log("router app.post(/findFriendByName)", target_name);
  let target = await findFriendByName(target_name);
  res.send(
    `/findFriendByName found that ${target.name} is ${target.age} years old`
  );
});

// UPDATE
app.post("/updateAgeByName", async (req, res) => {
  let target_name = req.body.name;
  let new_age = req.body.age;
  await updateAgeByName(target_name, new_age);
  res.send(`/updateAgeByName ${target_name} to ${new_age}`);
});

// DELETE
app.post("/deleteFriends", async (req, res) => {
  let target_name = req.body.name;
  let target_age = req.body.age;
  await deleteFriends(target_name, target_age);
  res.send(`/deleteFriends ${target_name} who is ${target_age}`);
});



//////////////////////
// FRONTEND (can be done with AJAX, asio)
// POST & GET In Javascript
// https://code-boxx.com/post-get-javascript-without-html-form/
//////////////////////
import fetch from "node-fetch"; // only have to do it in node.js, if browser, no need

// CREATE
async function fetchPOST_addFriend(input_name, input_age) {
  let data = new URLSearchParams();
  // URLSearchParams() take the current URL and get the object after "?"
  // https://googlechrome.github.io/samples/urlsearchparams/
  data.append("name", input_name);
  data.append("age", input_age);

  await fetch("http://localhost:3001/addFriend", {
    method: "post",
    body: data,
  })
    .then((res) => res.text())
    .then((txt) => {
      console.log(txt);
    })
    .catch((err) => {
      console.log(err);
    });
}

// READ
async function fetchGET_findFriendByName(target_name) {
  let data = new URLSearchParams();
  data.append("name", target_name);

  await fetch("http://localhost:3001/findFriendByName", {
    method: "post",
    body: data,
  })
    .then((res) => res.text())
    .then((txt) => {
      console.log(txt);
    })
    .catch((err) => {
      console.log(err);
    });
}

// UPDATE
async function fetchPOST_updateAgeByName(target_name, new_age) {
  let data = new URLSearchParams();
  data.append("name", target_name);
  data.append("age", new_age);

  fetch("http://localhost:3001/updateAgeByName", {
    method: "post",
    body: data,
  })
    .then((res) => res.text())
    .then((txt) => {
      console.log(txt);
    })
    .catch((err) => {
      console.log(err);
    });
}

// DELETE
async function fetchPOST_deleteFriends(target_name, target_age) {
  let data = new URLSearchParams();
  data.append("name", target_name);
  data.append("age", target_age);

  fetch("http://localhost:3001/deleteFriends", {
    method: "post",
    body: data,
  })
    .then((res) => res.text())
    .then((txt) => {
      console.log(txt);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function frontend_test() {
  console.log("--------frontend_test---------");
  await cleanDB();
  await fetchPOST_addFriend("Tiffany", 16);
  await fetchPOST_addFriend("James", 26);
  await fetchGET_findFriendByName("Tiffany");
//   await fetchPOST_updateAgeByName("James", 33);
  await fetchPOST_deleteFriends("James", 26);
}

frontend_test();
