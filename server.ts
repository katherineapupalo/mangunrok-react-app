import express, { Request, Response } from 'express';
import next from 'next';
import connectDB from './server/config/db';
import { MenuItem } from './server/models/MenuItem';
import { Order } from './server/models/Order';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// 初始化 Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 中间件
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // API 路由

  // 菜单数据（用于自动播种）
  const menuData = [
    // Appetizers
    { name: 'Gyoza (Pork or Veggie)', price: 8, category: 'appetizers' },
    { name: 'Spring Rolls (4 pcs)', price: 7, category: 'appetizers' },
    { name: 'Edamame with Sea Salt', price: 6, category: 'appetizers' },
    { name: 'Takoyaki (Octopus Balls)', price: 10, category: 'appetizers' },
    
    // Main Dishes
    { name: 'Tonkotsu Ramen', price: 16, category: 'mains' },
    { name: 'Curry with Rice', price: 14, category: 'mains' },
    { name: 'Korean BBQ Beef Bowl', price: 18, category: 'mains' },
    { name: 'Teriyaki Salmon Bento', price: 20, category: 'mains' },
    
    // Sushi
    { name: 'California Roll (8 pcs)', price: 12, category: 'sushi' },
    { name: 'Spicy Tuna Roll', price: 14, category: 'sushi' },
    { name: 'Dragon Roll', price: 16, category: 'sushi' },
    { name: 'Sashimi Platter', price: 22, category: 'sushi' }
  ];

  // 菜单 API
  server.get('/api/menu', async (req: Request, res: Response) => {
    try {
      await connectDB();
      const menuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
      
      // 按类别分组
      const grouped = {
        appetizers: menuItems.filter(item => item.category === 'appetizers'),
        mains: menuItems.filter(item => item.category === 'mains'),
        sushi: menuItems.filter(item => item.category === 'sushi')
      };

      // 如果所有类别都为空，自动播种数据
      if (grouped.appetizers.length === 0 && grouped.mains.length === 0 && grouped.sushi.length === 0) {
        console.log('Menu is empty, seeding initial data...');
        await MenuItem.insertMany(menuData);
        console.log(`Seeded ${menuData.length} menu items`);
        
        // 重新查询菜单项
        const newMenuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
        const newGrouped = {
          appetizers: newMenuItems.filter(item => item.category === 'appetizers'),
          mains: newMenuItems.filter(item => item.category === 'mains'),
          sushi: newMenuItems.filter(item => item.category === 'sushi')
        };
        
        return res.status(200).json(newGrouped);
      }

      res.status(200).json(grouped);
    } catch (error: any) {
      console.error('Error fetching menu:', error);
      res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  });

  // 订单 API
  server.post('/api/orders', async (req: Request, res: Response) => {
    try {
      await connectDB();
      
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          error: 'Invalid order data. Items array is required.'
        });
      }

      // 计算总价
      const total = items.reduce((sum: number, item: any) => {
        return sum + (item.price * item.quantity);
      }, 0);

      // 创建订单
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

      res.status(201).json({
        message: 'Order placed successfully',
        orderId: order._id,
        total: order.total
      });
    } catch (error: any) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  server.get('/api/orders', async (req: Request, res: Response) => {
    try {
      await connectDB();
      const orders = await Order.find({}).sort({ createdAt: -1 }).limit(50);
      res.status(200).json(orders);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // 所有其他请求由 Next.js 处理
  server.use((req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

