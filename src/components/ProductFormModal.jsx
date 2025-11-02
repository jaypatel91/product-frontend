import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ProductFormModal({ open, onClose, onSave, editingProduct }) {
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
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    onSave(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          {editingProduct ? "Edit Product" : "Add Product"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingProduct ? "Update" : "Add"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
