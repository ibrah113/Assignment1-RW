import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function GET() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shopping_cart');

    const cartItems = await collection.find({}).toArray();

    const validCartItems = cartItems.map((item) => ({
      ...item,
      price: item.price || 0, 
    }));

    return NextResponse.json(validCartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Failed to fetch cart items' });
  } finally {
    await client.close();
  }
}
