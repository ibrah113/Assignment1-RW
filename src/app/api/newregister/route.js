export async function GET(req, res) {

  console.log("Register new user:");


  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const address = searchParams.get('address');
  const number = searchParams.get('number');
  

  console.log(email);
  console.log(pass);
  console.log(address);
  console.log(number);



// insert
  // =================================================
  const { MongoClient } = require('mongodb');
  const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app'; 
  
  await client.connect();
  
  console.log('Connected successfully to server');
  
  const db = client.db(dbName);
  
  const collection = db.collection('login'); 
  
  const findResult = await collection.insertOne({"username": email, "pass":pass, "tel": "000"});
  
  
return Response.json({ "data":"valid" })
}