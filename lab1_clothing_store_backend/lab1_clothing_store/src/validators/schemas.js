const { z } = require('zod');

const id = z.coerce.number().int().positive();
const categorySchema = z.object({
  name: z.string().trim().min(2, 'Назва має містити щонайменше 2 символи')
});
const productSchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  size: z.string().trim().min(1),
  color: z.string().trim().min(1),
  stock: z.coerce.number().int().min(0),
  categoryId: z.coerce.number().int().positive()
});
const customerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'CUSTOMER']).optional()
});
const orderSchema = z.object({
  customerId: z.coerce.number().int().positive(),
  total: z.coerce.number().positive(),
  status: z.enum(['NEW', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED']).optional()
});
const orderItemSchema = z.object({
  orderId: z.coerce.number().int().positive(),
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive()
});

module.exports = { id, categorySchema, productSchema, customerSchema, orderSchema, orderItemSchema };
