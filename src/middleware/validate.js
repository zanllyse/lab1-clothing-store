const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Помилка валідації',
      details: result.error.issues.map((item) => ({
        field: item.path.join('.'),
        message: item.message
      }))
    });
  }
  req.validatedBody = result.data;
  next();
};

module.exports = validate;
