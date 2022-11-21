import express from "express";
import DB from "../db/db.js";
const router = express.Router();

/////////////////
// MINTING
/////////////////
// CREATE
router.post("/addMINT", async (req, res) => {
  let number = req.body.number;
  let date = req.body.date;
  console.log(number, date);
  await DB.addMint(number, date);
  res.send(`/addMint added ${number} when ${date}`);
});

// READ
router.get("/findAllMints", async(req, res) => {
  let respond = await DB.findAllMints();
  res.send(respond);
})

// UPDATE
router.post("/updateMintNameById", async (req, res) => {
  let target_id = req.body._id;
  let new_name = req.body.new_name;
  console.log("router/updateMintNameById", target_id, new_name)
  await DB.updateCommentById(target_id, new_name);
  res.send(`/updateMintNameById ${target_id} to ${new_name}`);
});

// DELETE
router.get("/cleanMintDB", async (req, res) => {
  await DB.cleanMintDB();
  res.send("Mints data base is empty")
})

router.post("/deleteMintById", async (req, res) => {
  let target_id = req.body._id;
  await DB.deleteMintById(target_id);
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
  await DB.addFriend(name, comment);
  res.send(`/addFriend added ${name} says ${comment}`);
});

// READ
router.post("/findFriendByName", async (req, res) => {
  let target_name = req.body.name;
  console.log("router app.post(/findFriendByName)", target_name);
  let target = await DB.findFriendByName(target_name);
  res.send(
    `/findFriendByName found that ${target.name} says ${target.comment}`
  );
});

router.get("/findAllFriends", async(req, res) => {
  let respond = await DB.findAllFriends();
  res.send(respond);
})

// UPDATE
router.post("/updateCommentById", async (req, res) => {
  let target_id = req.body._id;
  let new_comment = req.body.comment;
  console.log("router/updateCommentById", target_id, new_comment)
  await DB.updateCommentById(target_id, new_comment);
  res.send(`/updateCommentById ${target_id} to ${new_comment}`);
});

// DELETE
router.post("/deleteById", async (req, res) => {
  let target_id = req.body._id;
  await DB.deleteById(target_id);
  res.send(`/deleteFriends ${target_id}`);
});

router.get("/cleanDB", async (req, res) => {
  await DB.cleanDB();
  res.send("data base is empty")
})

export default router;
