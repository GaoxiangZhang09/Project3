//////////////////////
// DATABASE
//////////////////////
import { MongoClient, ObjectId } from "mongodb";

function myMintDB() {
  const myDB = {};
  const client = new MongoClient("mongodb://localhost:27017");

  // 連結既有 DB and Collections 以便在client.js里面用
  const db = client.db("mern_tut");
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
    const cursor = mints.find({}).sort({ _id: -1 });
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
  return myDB;
}

export default myMintDB();
