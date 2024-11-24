const express = require('express');
const db = require('./connection');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM orders', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener órdenes');
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  const { product_id, user_id, quantity } = req.body;
  const sql = 'INSERT INTO orders (product_id, user_id, quantity) VALUES (?, ?, ?)';
  db.query(sql, [product_id, user_id, quantity], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al insertar orden');
    } else {
      res.json(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM orders WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar orden');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
