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

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Connect to the database
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Check if the user already exists
    const existingUser = await collection.findOne({ username: email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already registered' });
    }

    // Insert the new user with the hashed password
    await collection.insertOne({
      username: email,
      pass: hashedPassword,
      acc_type: 'customer',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
