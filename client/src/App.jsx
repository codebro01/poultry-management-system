import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Typography, Button, Container, Box } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CredentialsSignInPage from './pages/auth/signin'
import { ApolloProvider } from '@apollo/client'
import { client } from './apolloClient'
import './index.css'
import { SidebarComponent } from './global/sidebar'
import { Topbar } from './global/topbar'
import { Dashboard } from './pages/dashboard'
import { useState } from 'react'
import { theme } from '../theme'
import { FarmMgntBird } from './pages/farm management/FarmMgntBIrd'
import { FarmMgntEgg } from './pages/farm management/FarmMgntEgg'
import { PoultryFeedList } from './pages/farm management/FarmMgntFeed'
import { BirdSalesRep } from './pages/sales report/BirdSalesRep'
import { EggSalesRep } from './pages/sales report/EggSalesRep'
import { Users } from './pages/users/users'
import { Orders } from './pages/orders/orders'
import { ProductsPage } from './pages/marketPlace/products'
import { ResponsiveAppBar } from './components/AppBar'
import { CartProvider } from './context/cartContext.jsx'
import { CheckOutPage } from './pages/marketPlace/checkOutPage.jsx'
import { PredictChickenHealthStatus } from './components/PredictChickenHealthStatus.jsx'

const App = () => {
  const [isCollasped, setIsCollapsed] = useState(false)
  const [predictForm, setPredictForm] = useState(false)
  const handleSidebarToggle = () => setIsCollapsed(!isCollasped)
  const path = getPath()

  // path.includes("dashboard") ? console.log("admin") : console.log("user");

  if (path.includes('dashboard') || path.includes('admin')) {
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
                marginTop: '80px',
                display: 'flex',
                gap: '20px',
                height: '100%',
                overflowX: 'hidden',
                maxWidth: '100%',
                width: '100%',
                // position: 'relative'
              }}
            >
              {
                <SidebarComponent
                  handleSidebarToggle={handleSidebarToggle}
                  isCollasped={isCollasped}
                />
              }
              <Box
                id="main-content"
                sx={{
                  paddingLeft: isCollasped ? '80px' : '270px',
                  transition: '0.3s',
                  paddingTop: '10px',
                  // position: 'relative',
                  width: {
                    xs: isCollasped ? '100%' : '650px',
                    sm: isCollasped ? '100%' : '100%',
                  },

                  // minHeight: "100vh",
                  // overflowY: "scroll"
                }}
              >
                {/* Admin Routes  */}
                <Routes>
                  <Route
                    path="/admin/sign-in"
                    element={<CredentialsSignInPage />}
                  ></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  {/* Farm Management Routes */}
                  <Route
                    path="/dashboard/farm-management/bird"
                    element={<FarmMgntBird />}
                  ></Route>
                  <Route
                    path="/dashboard/farm-management/egg"
                    element={<FarmMgntEgg />}
                  ></Route>
                  <Route
                    path="/dashboard/farm-management/feed"
                    element={<PoultryFeedList />}
                  ></Route>

                  {/* Sales Report Routes */}
                  <Route
                    path="/dashboard/sales-report/bird"
                    element={<BirdSalesRep />}
                  ></Route>
                  <Route
                    path="/dashboard/sales-report/egg"
                    element={<EggSalesRep />}
                  ></Route>

                  {/* Users Route */}
                  <Route path="/dashboard/users" element={<Users />}></Route>

                  {/* Orders Route */}
                  <Route path="/dashboard/orders" element={<Orders />}></Route>
                </Routes>

                <Box
                  component="section"
                  sx={{
                    position: 'fixed',
                    bottom: '5%',
                    right: '5%',
                    width: '100px',
                    height: '100px',
                    // zIndex: "1000",
                    borderRadius: '50%',
                    background: 'transparent',
                    cursor: 'pointer',
                    // display: 'none'
                  }}
                >
                  {predictForm ? (
                    <PredictChickenHealthStatus setPredictForm = {setPredictForm} />
                  ) : (
                    <Box
                      onClick={() => setPredictForm(!predictForm)}
                      component="img"
                      src="/Robot.png"
                      alt="Robot.png"
                      sx={{
                        height: '100%',
                        width: '100%',
                        borderRadius: '50%',
                        padding: '10px',
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Container>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    )
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <CssBaseline />
          <Router>
            <Container
              id="container"
              maxWidth={false}
              sx={{
                display: 'flex',
                gap: '20px',
                height: '100%',
                overflowX: 'hidden',
                maxWidth: '100%',
                width: '100%',
                padding: {
                  xs: 0,
                },
              }}
            >
              <ResponsiveAppBar />
              <Box
                id="main-content"
                sx={{
                  transition: '0.3s',
                  width: '100%',
                  // minHeight: "100vh",
                  // overflowY: "scroll"
                  background: theme.palette.text.white,
                }}
              >
                <Routes>
                  {/* Client Routes */}
                  <Route path="/" element={<ProductsPage />}></Route>
                  <Route path="/checkout" element={<CheckOutPage />}></Route>
                  <Route
                    path="/sign-in"
                    element={<CredentialsSignInPage />}
                  ></Route>
                </Routes>
              </Box>
            </Container>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const getPath = () => {
  const location = window.location.href.split('/')
  return location
}

export default App
