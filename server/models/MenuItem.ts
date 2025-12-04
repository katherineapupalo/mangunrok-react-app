import mongoose from 'mongoose';

export interface IMenuItem {
  name: string;
  price: number;
  category: 'appetizers' | 'mains' | 'sushi';
}

const menuItemSchema = new mongoose.Schema<IMenuItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['appetizers', 'mains', 'sushi'], required: true }
}, {
  timestamps: true
});

export const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', menuItemSchema);

