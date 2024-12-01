import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pname = searchParams.get('pname');

    await client.connect();
    const db = client.db(dbName);

    const product = await db.collection('products').findOne({ pname });
    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' });
    }

    const cartItem = {
      pname: product.pname,
      price: product.price, 
      username: 'user@example.com', 
    };

    await db.collection('shopping_cart').insertOne(cartItem);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
