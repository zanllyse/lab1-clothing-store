require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./config/prisma');
const crudRoutes = require('./routes/crudRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Clothing Store API працює', docs: '/api' });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Clothing Store API',
    version: '1.0.0',
    resources: ['/api/categories', '/api/products', '/api/customers', '/api/orders', '/api/order-items'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  });
});

app.use('/api', crudRoutes);
app.use((req, res) => res.status(404).json({ error: 'Маршрут не знайдено' }));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});

async function shutdown() {
  await prisma.$disconnect();
  server.close();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
