import React from "react";

function ProductDelete({ onDeleteProduct }) {
  return (
    <div>
      <h2>Supprimer le produit</h2>
      <button onClick={onDeleteProduct}>Supprimer</button>
    </div>
  );
}

export default ProductDelete;

