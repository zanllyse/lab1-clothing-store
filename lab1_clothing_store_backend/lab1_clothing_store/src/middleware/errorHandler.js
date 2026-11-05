function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.code === 'P2002') {
    return res.status(409).json({ error: 'Запис з таким унікальним значенням уже існує' });
  }
  if (error.code === 'P2025') {
    return res.status(404).json({ error: 'Запис не знайдено' });
  }
  if (error.code === 'P2003') {
    return res.status(400).json({ error: 'Неможливо виконати операцію: пов’язаний запис відсутній' });
  }

  res.status(500).json({ error: 'Внутрішня помилка сервера' });
}

module.exports = errorHandler;
