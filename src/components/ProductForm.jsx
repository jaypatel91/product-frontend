import React, { useState, useEffect } from "react";

function ProductForm({ onSave, editingProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({ name: "", category: "", price: "", quantity: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingProduct
      ? `https://nodebackend-weld.vercel.app/api/products/${editingProduct._id}`
      : "https://nodebackend-weld.vercel.app/api/products";

    const method = editingProduct ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    onSave(data);
    setFormData({ name: "", category: "", price: "", quantity: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
      <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} value={formData.price} required />
      <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} value={formData.quantity} required />
      <button type="submit">{editingProduct ? "Update" : "Add"}</button>
    </form>
  );
}

export default ProductForm;
