import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    const existingUser = await collection.findOne({ username: email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already registered' });
    }

    await collection.insertOne({ username: email, pass: password, acc_type: 'customer' });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
