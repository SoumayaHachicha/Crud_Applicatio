import React from "react";
import axios from 'axios';

function ProductList({ products, onDeleteProduct }) {
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      onDeleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Liste des produits</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Prix : {product.price} - Quantité : {product.quantity}
            <button onClick={() => handleDeleteProduct(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

	

	
