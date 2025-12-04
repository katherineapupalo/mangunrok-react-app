import mongoose from 'mongoose';

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  items: IOrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema<IOrder>({
  items: { type: [orderItemSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], default: 'pending' }
}, {
  timestamps: true
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

