import React from "react";

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div>
      <h2>Product List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>{new Date(p.dateAdded).toLocaleString()}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => onDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
