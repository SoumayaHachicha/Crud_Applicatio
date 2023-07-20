import axios from 'axios';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =  useState(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  async function fetchProducts() {
    try {
      const response = await axios.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  return (
    <Router>
      <div>
        <h1>Mon Application de Gestion de Produits</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <Switch>
            {/* ... (rest of the routes) ... */}
          </Switch>
        )}
      </div>
    </Router>
  );
    
}

export default App;

	


/*App.js
import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import ProductDelete from "./ProductDelete";
import { productData } from "./data";

function App() {
  const [products, setProducts] = useState(productData);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log("Liste des produits après ajout :", products);
  };

  const handleSelectProduct = (productId) => {
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
  };

  const handleEditProduct = (editedProduct) => {
    setProducts(products.map((product) => (product.id === editedProduct.id ? editedProduct : product)));
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== selectedProduct.id));
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Mon Application de Gestion de Produits</h1>
      <ProductList products={products} onSelectProduct={handleSelectProduct} />
      <ProductForm onAddProduct={handleAddProduct} />
      {selectedProduct && (
        <>
          <ProductDetail product={selectedProduct} />
          <ProductEdit product={selectedProduct} onEditProduct={handleEditProduct} />
          <ProductDelete onDeleteProduct={handleDeleteProduct} />
        </>
      )}
    </div>
  );
}

export default App;*/

	

