import React from 'react'
import { Box, Typography, Button, Container, Stack } from '@mui/material'
import EggIcon from '@mui/icons-material/Egg'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Leaf as LeafIcon } from 'lucide-react'

const HeroSection = () => {
  return (
    <Box
      position="relative"
      width="100%"
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src="/chickens-bg.jpg"
          alt="Poultry farm background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content Overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 3,
          px: { xs: 2, sm: 4, lg: 6 },
          py: { xs: 8, sm: 12, lg: 16 },
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            mb: { xs: 4, sm: 6 },
            width: { xs: 64, sm: 80 },
            height: { xs: 64, sm: 80 },
            color: 'primary.main',
          }}
        >
          <LeafIcon style={{ width: '100%', height: '100%' }} />
        </Box>

        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: {
              xs: '2rem',
              sm: '3rem',
              lg: '4rem',
            },
            color: 'white',
          }}
        >
          Welcome to{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            Wura Ola Poultry Farm
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            color: 'grey.300',
            maxWidth: { xs: '100%', md: '80%', lg: '60%' },
            mx: 'auto',
            mb: 5,
          }}
        >
          Streamline your poultry farm management with our intuitive and
          powerful system. Track, analyze, and optimize your operations for peak
          efficiency and sustainable growth.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            size="large"
            variant="contained"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              px: 4,
              py: 1.5,
              textTransform: 'none',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <EggIcon sx={{ mr: 1 }} /> Get Started
          </Button>

          <Button
            size="large"
            variant="outlined"
            sx={{
              fontSize: { xs: '1rem', sm: '1.125rem' },
              px: 4,
              py: 1.5,
              textTransform: 'none',
              borderColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderColor: 'primary.main',
                color: 'primary.main',
              },
            }}
          >
            Learn More <ChevronRightIcon sx={{ ml: 1 }} />
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export  {HeroSection}
