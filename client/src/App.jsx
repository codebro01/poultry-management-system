import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Typography, Button, Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CredentialsSignInPage from "./pages/auth/signin";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import './index.css';
import { SidebarComponent } from "./global/sidebar";
import { Topbar } from "./global/topbar";
import { Dashboard } from "./pages/dashboard";
import { useState } from "react";
import { theme } from "../theme";
import { FarmMgntBird } from "./pages/farm management/FarmMgntBIrd";
import { FarmMgntEgg } from "./pages/farm management/FarmMgntEgg";
import { PoultryFeedList } from "./pages/farm management/FarmMgntFeed";
import { BirdSalesRep } from "./pages/sales report/BirdSalesRep";
import { EggSalesRep } from "./pages/sales report/EggSalesRep";
import { Users } from "./pages/users/users";
import { Orders } from "./pages/orders/orders";

const App = () => {
  const authPage = window.location.pathname === '/';
  const [isCollasped, setIsCollapsed] = useState(false);
  const handleSidebarToggle = () => setIsCollapsed(!isCollasped);


  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>

          {<Topbar />}
          <Container
            id="container"
            maxWidth={false}
            sx={{
              marginTop: "80px",
              display: "flex",
              gap: "20px",
              height: "100%",
              overflowX: "hidden",
              maxWidth: "100%",
              width: "100%",
            }}
          >
            {<SidebarComponent handleSidebarToggle={handleSidebarToggle} isCollasped={isCollasped} />}
            <Box id="main-content" sx={{
              paddingLeft: isCollasped ? "80px" : "270px",
              transition: "0.3s",
              paddingTop: "10px",
              width: {
                xs: isCollasped ? "100%" : "650px",
                sm: isCollasped ? "100%" : "100%",
              },

              // minHeight: "100vh", 
              // overflowY: "scroll"

            }}>
              <Routes>
                <Route path="/" element={<CredentialsSignInPage />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                {/* Farm Management Routes */}
                <Route path="/dashboard/farm-management/bird" element={<FarmMgntBird />}></Route>
                <Route path="/dashboard/farm-management/egg" element={<FarmMgntEgg />}></Route>
                <Route path="/dashboard/farm-management/feed" element={<PoultryFeedList />}></Route>

                {/* Sales Report Routes */}
                <Route path="/dashboard/sales-report/bird" element={<BirdSalesRep />}></Route>
                <Route path="/dashboard/sales-report/egg" element={<EggSalesRep />}></Route>


                {/* Users Route */}
                <Route path="/dashboard/users" element={<Users />}></Route>

                {/* Orders Route */}
                <Route path="/dashboard/orders" element={<Orders />}></Route>


              </Routes>
            </Box>
          </Container>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;

