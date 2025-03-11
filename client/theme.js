import { createTheme, responsiveFontSizes  } from "@mui/material";
import { useTheme } from "@emotion/react";
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/300.css"; // Light
import "@fontsource/roboto/700.css"; // Bold
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/700.css"; // Bold

 let theme = createTheme({
  palette: {
    primary: {
      main: "#FFA500", // Golden Yellow
    },
    secondary: {
      main: "#2E7D32", // Deep Green
      light: "#73B376;"
    },
    background: {
      default: "#FFF8E1", // Soft Beige
      paper: "#ffffff",
    },
    error: {
      main: "#D32F2F", // Reddish Brown
    },
    text: {
      primary: "#333333", // Dark grey for readability
      secondary: "#555555",
      white: "#f5f5f5", 
      darkGrey: "rgb(173, 170, 170)",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 900,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      
    },
    h3: {
      fontSize: "1.85rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.4rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,    // Extra small devices (phones)
      sm: 690,  // Small devices (tablets)
      md: 960,  // Medium devices (desktops)
      lg: 1280, // Large devices (wider screens)
      xl: 1920, // Extra large screens
    },
  },
});
theme = responsiveFontSizes(theme, {
  breakpoints: ["xs", "sm", "md", "lg", "xl"], // Define custom breakpoints
  factor: 5, // Increase/decrease scaling effect (default is 2)
  disableAlign: false, // If true, prevents rounding to nearest px value
  variants: ["h1", "h2", "h3", "h4", "h5", "h6", "body1"], // Apply only to these variants
})
export {theme};


