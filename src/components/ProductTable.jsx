import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Stack,
  Button,
  Typography
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import ProductFormModal from "./ProductFormModal";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

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
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`https://nodebackend-weld.vercel.app/api/products/${id}`, {
        method: "DELETE"
      });
      fetchProducts();
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">📦 Product Management</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => {
            setEditingProduct(null);
            setOpenModal(true);
          }}
        >
          Add Product
        </Button>
      </Stack>

      <TextField
        label="Search by Name or Category"
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.200" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{new Date(p.dateAdded).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => { setEditingProduct(p); setOpenModal(true); }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
    </Paper>
  );
}
