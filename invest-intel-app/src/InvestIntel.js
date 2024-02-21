import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stock from "./Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const sections = [
  { title: "Stock", url: "stocks" },
  { title: "Health", url: "health" },
  { title: "Time", url: "time" },
];

const InvestIntel = () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Invest-Intel" sections={sections} />
      </Container>
      <Router>
        <Routes>
          <Route path="/stocks" element={<Stock />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default InvestIntel;
