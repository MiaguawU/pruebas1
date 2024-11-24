const express = require('express');
const multer = require('multer');
const db = require('./connection');

const router = express.Router();

// Configuración para subir imágenes
const storage = multer.diskStorage({
  destination: './src/backend/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Rutas CRUD
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener usuarios');
    } else {
      res.json(result);
    }
  });
});

router.post('/', upload.single('profile_image'), (req, res) => {
  const { name, email } = req.body;
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = 'INSERT INTO users (name, email, profile_image) VALUES (?, ?, ?)';
  db.query(sql, [name, email, profileImage], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al insertar usuario');
    } else {
      res.json(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar usuario');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
