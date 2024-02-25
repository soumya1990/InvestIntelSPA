import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

const appbarTheme = createTheme({
  palette: {
    primary: {
      main: "#00ff00", // Your primary color
      title: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          // Your custom styles for AppBar using classes
          backgroundColor: "transparent",
          boxShadow: "none", // Remove default shadow
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          // Your custom styles for Toolbar using classes
          justifyContent: "space-between",
        },
      },
    },
    // Add other components and style overrides as needed
  },
});

const theme = createTheme({ appbarTheme });

function FixedWidthAppBar(props) {
  const { title, sections } = props;
  return (
    <ThemeProvider theme={theme}>
        <AppBar position="fixed" sx={{ backgroundColor: "#00ff00" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            {sections.map((section) => (
              <Link
                color={theme.palette.primary.title}
                noWrap
                key={section.title}
                variant="body2"
                href={section.url}
                sx={{ p: 1,  flexGrow: 1 }}
              >
                {section.title}
              </Link>
            ))}
            <Button variant="outlined" size="small">
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
    </ThemeProvider>
  );
}
FixedWidthAppBar.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};
export default FixedWidthAppBar;
