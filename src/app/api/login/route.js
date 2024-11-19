import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log('Login attempt:', { email, password }); // Debugging log

    // Connect to the database
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Find the user in the database
    const user = await collection.findOne({ username: email, pass: password });

    if (!user) {
      console.log('User not found or password mismatch'); // Debugging log
      return NextResponse.json({ success: false, message: 'Invalid email or password' });
    }

    console.log('Login successful:', { email, role: user.acc_type }); // Debugging log

    // Return user role
    return NextResponse.json({ success: true, role: user.acc_type });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
