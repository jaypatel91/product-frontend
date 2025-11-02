import React, { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("https://nodebackend-weld.vercel.app/api/products");
    const data = await res.json();
    setProducts(data.items || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`https://nodebackend-weld.vercel.app/api/products/${id}`, {
        method: "DELETE"
      });
      fetchProducts();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Product Management App</h1>
      <ProductForm onSave={handleSave} editingProduct={editingProduct} />
      <ProductList products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
    </div>
  );
}

export default App;
