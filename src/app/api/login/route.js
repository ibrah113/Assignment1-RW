import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Invalid input' });
    }

    // Connect to the database
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Find user in the database
    const user = await collection.findOne({ username: email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    // Compare entered password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.pass);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    return NextResponse.json({ success: true, role: user.acc_type });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
