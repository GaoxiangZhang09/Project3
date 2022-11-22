//////////////////////
// DATABASE
//////////////////////
import { MongoClient, ObjectId } from "mongodb";

function myCommuDB() {
  const myDB = {};
  const client = new MongoClient("mongodb://localhost:27017");

  // 連結既有 DB and Collections 以便在client.js里面用
  const db = client.db("mern_tut");
  const friends = db.collection("friends");

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
    const cursor = friends.find({}).sort({ _id: -1 });
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

export default myCommuDB();
