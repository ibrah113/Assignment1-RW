export async function GET(req, res) {
    // Make a note we are on the API. This goes to the console.
    console.log("In the putInCart API page");

    // Get the values that were sent across to us.
    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname');
    console.log(pname);

    // =================================================
    const { MongoClient } = require('mongodb');

    const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);

    const dbName = 'app'; // Database name

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('shopping_cart'); // Collection name

    // Add product to the shopping cart
    var myobj = { pname: pname, username: "sample@test.com" };
    const insertResult = await collection.insertOne(myobj);

    console.log(insertResult);

    // ===========================================================

    // At the end of the process, we need to send something back.
    return new Response(
        JSON.stringify({ data: "Inserted" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
