const express = require('express');
const db = require('./connection');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener productos');
    } else {
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(sql, [name, price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al insertar producto');
    } else {
      res.json(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar producto');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
