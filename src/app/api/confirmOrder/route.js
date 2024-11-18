import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://root:myPassword123@cluster0.hunn6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app';

export async function POST(request) {
  try {
    const { cartItems, totalPrice } = await request.json();

    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection('orders');

    // Insert order into the database
    const order = {
      items: cartItems,
      total: totalPrice,
      timestamp: new Date(),
      customerEmail: 'user@sample.ie', 
    };

    await ordersCollection.insertOne(order);

    // Simulate sending an email
    console.log('Order confirmation email sent to:', order.customerEmail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error confirming order:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
