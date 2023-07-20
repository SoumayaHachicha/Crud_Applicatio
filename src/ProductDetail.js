import React from "react";
import axios from 'axios';

function ProductDetail({ product }) {
  // Vous pouvez utiliser les données du produit ici
  return (
    <div>
      <h2>Détails du produit</h2>
      <p>Nom: {product.name}</p>
      <p>Prix unitaire: {product.price}</p>
      <p>Quantité: {product.quantity}</p>
    </div>
  );
}

export default ProductDetail;

	


	
