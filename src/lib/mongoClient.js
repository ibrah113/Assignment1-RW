import { MongoClient } from 'mongodb';

const url = process.env.DB_ADDRESS; 
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(url, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
