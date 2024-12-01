import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('orders'); 

    const orders = await collection.find({}).toArray();

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' });
  } finally {
    await client.close();
  }
}
