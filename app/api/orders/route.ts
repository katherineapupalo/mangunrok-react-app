import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/config/db';
import { Order } from '@/server/models/Order';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { items } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid order data. Items array is required.' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create order
    const order = new Order({
      items: items.map((item: any) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      status: 'pending'
    });

    await order.save();

    return NextResponse.json(
      {
        message: 'Order placed successfully',
        orderId: order._id,
        total: order.total
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
