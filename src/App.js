import React from "react";
import { Container, Typography } from "@mui/material";
import ProductTable from "./components/ProductTable";

export default function App() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        🛒 MERN Product Dashboard
      </Typography>
      <ProductTable />
    </Container>
  );
}
