import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import FixedWidthAppBar from "./AppBar";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stock from "./Stock";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComingSoon from "./ComingSoon";
import { Box } from "@mui/material";

const sections = [
  { title: "Stock", url: "stocks" },
  { title: "Health", url: "health" },
  { title: "Task", url: "task" },
];

const mytheme = createTheme();

const InvestIntel = () => {
  return (
    <ThemeProvider theme={mytheme}>
      <CssBaseline />
      <CssBaseline />
      <Container maxWidth="lg">
        <FixedWidthAppBar title="Invest-Intel" sections={sections} />
      </Container>
      <Box style={{ marginTop: "70px", width: "100%", padding: 10 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Stock />} />
            <Route path="/stocks" element={<Stock />} />
            <Route path="/health" element={<ComingSoon />} />
            <Route path="/task" element={<ComingSoon />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default InvestIntel;
