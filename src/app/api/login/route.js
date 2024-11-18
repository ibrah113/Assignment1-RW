import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function POST(request) {
  try {
    const { email, pass } = await request.json();

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login'); 

    // Find user with matching email and password
    const user = await collection.findOne({ username: email, pass });

    if (user) {
      // Return account type for redirection
      return NextResponse.json({ valid: true, role: user.acc_type });
    } else {
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error('Error during login API:', error);
    return NextResponse.json({ valid: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
