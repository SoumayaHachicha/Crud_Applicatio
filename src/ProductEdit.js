import React, { useState } from "react";

function ProductEdit({ product, onUpdateProduct }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [quantity, setQuantity] = useState(String(product.quantity));

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: product.id,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    onUpdateProduct(updatedProduct);
  };

  return (
    <div>
      <h2>Modifier le produit</h2>
      <form onSubmit={handleFormSubmit}>
        {/* ... (rest of the form inputs) ... */}
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}

export default ProductEdit;




	
