//////////////////////
// DATABASE
//////////////////////
import { MongoClient, ObjectId } from "mongodb";

function myMongoDB() {
  const myDB = {};
  // const client = new MongoClient("mongodb+srv://wasa:nono@cluster0.zxq65pg.mongodb.net/?retryWrites=true&w=majority" || "mongodb://localhost:27017");
  const client = new MongoClient("mongodb://localhost:27017");

  // 連結既有 DB and Collections 以便在client.js里面用
  const db = client.db("mern_tut");
  const friends = db.collection("friends");
  const mints = db.collection("mints");


/////////////////
// MINTING
/////////////////
// CREATE
myDB.addMint = async function (input_name, input_number, input_date) {
  await client.connect();
  const doc = { name: input_name, number: input_number, date: input_date };
  const result = await mints.insertOne(doc);
  console.log(`A mint was inserted with the _id: ${result.insertedId}`);
  await client.close();
};

// READ
myDB.findAllMints = async function () {
  await client.connect();
  const cursor = mints.find({});
  const allValues = await cursor.toArray();
  console.log(allValues);
  await client.close();
  return allValues;
};

// UPDATE
myDB.updateMintNameById = async function (target_id, new_name) {
  await client.connect();
  const filter = { _id: ObjectId(target_id) };
  const updateDocument = { $set: { name: new_name } };
  const options = { upsert: true };
  console.log("DB/updateMintNameById", filter, updateDocument);
  const res = await mints.updateOne(filter, updateDocument, options);
  console.log(res);
  console.log(`mint name of ${target_id} has been updated`);
  await client.close();
};


// DELETE
myDB.deleteMintById = async function (target_id) {
  await client.connect();
  const doc = { _id: ObjectId(target_id) };
  const deleteResult = await mints.deleteOne(doc);
  console.log(deleteResult);
  await client.close();
};

myDB.cleanMintDB = async function () {
  await client.connect();
  await mints.deleteMany({});
  await client.close();
};

/////////////////
// COMMUNICATION
/////////////////
  // CREATE
  myDB.addFriend = async function (input_name, input_comment) {
    await client.connect();
    const doc = { name: input_name, comment: input_comment };
    const result = await friends.insertOne(doc);
    console.log(`A friend was inserted with the _id: ${result.insertedId}`);
    await client.close();
  };

  // READ
  myDB.findFriendByName = async function (input_name) {
    await client.connect();
    const result = await friends.findOne({ name: input_name });
    console.log(input_name, result);
    console.log(
      `A friend was found with the name: ${result.name}, with comment: ${result.comment}`
    );
    await client.close();
    return result;
  };

  myDB.findAllFriends = async function () {
    await client.connect();
    const cursor = friends.find({});
    const allValues = await cursor.toArray();
    console.log(allValues);
    await client.close();
    return allValues;
  };

  // UPDATE
  myDB.updateCommentById = async function (target_id, new_comment) {
    await client.connect();
    const filter = { _id: ObjectId(target_id) };
    const updateDocument = { $set: { comment: new_comment } };
    const options = { upsert: true };
    console.log("DB/updateCommentById", filter, updateDocument);
    const res = await friends.updateOne(filter, updateDocument, options);
    console.log(res);
    console.log(`comment of ${target_id} has been updated`);
    await client.close();
  };

  // DELETE
  myDB.cleanDB = async function () {
    await client.connect();
    await friends.deleteMany({});
    await client.close();
  };

  myDB.deleteById = async function (target_id) {
    await client.connect();
    const doc = { _id: ObjectId(target_id) };
    const deleteResult = await friends.deleteOne(doc);
    console.log(deleteResult);
    await client.close();
  };

  return myDB;
}

export default myMongoDB();
