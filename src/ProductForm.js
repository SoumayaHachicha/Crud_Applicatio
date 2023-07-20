import React, { useState } from "react";
import axios from 'axios';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/products', {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity)
      });
      const newProduct = response.data;
      onAddProduct(newProduct);
      setName("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter un nouveau produit</h2>
      <form onSubmit={handleFormSubmit}>
        {/* ... Vos champs de formulaire avec les onChange correspondants ... */}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default ProductForm;

	


	
