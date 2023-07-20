const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const db = require('./database');

const app = express();

// Créer un flux de sortie pour enregistrer les logs d'accès dans un fichier
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Configurer morgan pour enregistrer les logs d'accès dans le fichier
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

// Route pour récupérer tous les produits
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// Route pour récupérer un produit par son ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    db.get('SELECT * FROM products WHERE id = ?', productId, (err, row) => {
      if (err) {
        console.error('Error fetching product:', err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else if (row) {
        res.json(row);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    });
  });
  
  // Route pour créer un nouveau produit
  app.post('/api/products', (req, res) => {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      res.status(400).json({ error: 'Please provide name, price, and quantity for the product' });
    } else {
      db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity], function (err) {
        if (err) {
          console.error('Error creating product:', err.message);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json({ id: this.lastID, name, price, quantity });
        }
      });
    }
  });
  
      
  

// Reste de vos routes existantes pour gérer les produits...

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Route pour créer un nouveau produit
app.post('/api/products', (req, res) => {
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    res.status(400).json({ error: 'Please provide name, price, and quantity for the product' });
  } else {
    db.run('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity], function (err) {
      if (err) {
        console.error('Error creating product:', err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ id: this.lastID, name, price, quantity });
      }
    });
  }
});

// Route pour récupérer un produit par son ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.get('SELECT * FROM products WHERE id = ?', productId, (err, row) => {
    if (err) {
      console.error('Error fetching product:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

// Route pour mettre à jour un produit par son ID
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    res.status(400).json({ error: 'Please provide name, price, and quantity for the product' });
  } else {
    db.run('UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?', [name, price, quantity, productId], function (err) {
      if (err) {
        console.error('Error updating product:', err.message);
        res.status(500).json({ error: 'Internal server error' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ id: productId, name, price, quantity });
      }
    });
  }
});

// Route pour supprimer un produit par son ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.run('DELETE FROM products WHERE id = ?', productId, function (err) {
    if (err) {
      console.error('Error deleting product:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ id: productId });
    }
  });
});
	
