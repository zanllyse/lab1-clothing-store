const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const prisma = require('../config/prisma');
const {
  id, categorySchema, productSchema, customerSchema, orderSchema, orderItemSchema
} = require('../validators/schemas');

const router = express.Router();

function resourceRoutes({ model, schema, include }) {
  const r = express.Router();

  r.get('/', asyncHandler(async (req, res) => {
    const data = await model.findMany({ include, orderBy: { id: 'asc' } });
    res.json(data);
  }));

  r.get('/:id', asyncHandler(async (req, res) => {
    const recordId = id.parse(req.params.id);
    const data = await model.findUnique({ where: { id: recordId }, include });
    if (!data) return res.status(404).json({ error: 'Запис не знайдено' });
    res.json(data);
  }));

  r.post('/', validate(schema), asyncHandler(async (req, res) => {
    const data = await model.create({ data: req.validatedBody, include });
    res.status(201).json(data);
  }));

  r.put('/:id', validate(schema), asyncHandler(async (req, res) => {
    const recordId = id.parse(req.params.id);
    const data = await model.update({
      where: { id: recordId }, data: req.validatedBody, include
    });
    res.json(data);
  }));

  r.delete('/:id', asyncHandler(async (req, res) => {
    const recordId = id.parse(req.params.id);
    await model.delete({ where: { id: recordId } });
    res.json({ message: 'Запис успішно видалено' });
  }));

  return r;
}

router.use('/categories', resourceRoutes({
  model: prisma.category, schema: categorySchema
}));
router.use('/products', resourceRoutes({
  model: prisma.product, schema: productSchema, include: { category: true }
}));
router.use('/customers', resourceRoutes({
  model: prisma.customer, schema: customerSchema
}));
router.use('/orders', resourceRoutes({
  model: prisma.order, schema: orderSchema,
  include: { customer: true, items: { include: { product: true } } }
}));
router.use('/order-items', resourceRoutes({
  model: prisma.orderItem, schema: orderItemSchema,
  include: { product: true, order: true }
}));

module.exports = router;
