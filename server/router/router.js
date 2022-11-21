import express from "express";
import mintDB from "../db/dbMint.js";
import commuDB from "../db/dbCommu.js";
const router = express.Router();

/////////////////
// MINTING
/////////////////
// CREATE
router.post("/addMINT", async (req, res) => {
  let number = req.body.number;
  let date = req.body.date;
  let name = req.body.name;
  console.log(number, date);
  await mintDB.addMint(name, number, date);
  res.send(`/addMint added ${number} when ${date}`);
});

// READ
router.get("/findAllMints", async (req, res) => {
  let respond = await mintDB.findAllMints();
  res.send(respond);
});

// UPDATE
router.post("/updateMintNameById", async (req, res) => {
  let target_id = req.body._id;
  let new_name = req.body.new_name;
  console.log("router/updateMintNameById", target_id, new_name);
  await mintDB.updateMintNameById(target_id, new_name);
  res.send(`/updateMintNameById ${target_id} to ${new_name}`);
});

// DELETE
router.get("/cleanMintDB", async (req, res) => {
  await mintDB.cleanMintDB();
  res.send("Mints data base is empty");
});

router.post("/deleteMintById", async (req, res) => {
  let target_id = req.body._id;
  await mintDB.deleteMintById(target_id);
  res.send(`/deleteMint ${target_id}`);
});

/////////////////
// COMMUNICATION
/////////////////
// CREATE
router.post("/addFriend", async (req, res) => {
  let name = req.body.name;
  let comment = req.body.comment;
  console.log(name, comment);
  await commuDB.addFriend(name, comment);
  res.send(`/addFriend added ${name} says ${comment}`);
});

// READ
router.post("/findFriendByName", async (req, res) => {
  let target_name = req.body.name;
  console.log("router app.post(/findFriendByName)", target_name);
  let target = await commuDB.findFriendByName(target_name);
  res.send(
    `/findFriendByName found that ${target.name} says ${target.comment}`
  );
});

router.get("/findAllFriends", async (req, res) => {
  let respond = await commuDB.findAllFriends();
  res.send(respond);
});

// UPDATE
router.post("/updateCommentById", async (req, res) => {
  let target_id = req.body._id;
  let new_comment = req.body.comment;
  console.log("router/updateCommentById", target_id, new_comment);
  await commuDB.updateCommentById(target_id, new_comment);
  res.send(`/updateCommentById ${target_id} to ${new_comment}`);
});

// DELETE
router.post("/deleteById", async (req, res) => {
  let target_id = req.body._id;
  await commuDB.deleteById(target_id);
  res.send(`/deleteFriends ${target_id}`);
});

router.get("/cleanDB", async (req, res) => {
  await commuDB.cleanDB();
  res.send("data base is empty");
});

export default router;
