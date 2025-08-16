import React from 'react';
import { Box, Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import InfoIcon from '@mui/icons-material/Info';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        minHeight: 56,
        bgcolor: '#1976d2',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        fontWeight: 500,
        fontSize: 16,
        boxShadow: 2,
        borderTop: '1px solid #eee',
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          width: '100%',
          bgcolor: 'transparent',
        }}
      >
        <BottomNavigationAction label="Inicio" icon={<HomeIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
        <BottomNavigationAction label="Pánico" icon={<PhoneAndroidIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
        <BottomNavigationAction label="Info" icon={<InfoIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
      </BottomNavigation>
      <Typography sx={{ mt: 0.5, fontSize: 14 }}>
        © {new Date().getFullYear()} Municipalidad de Parral - Seguridad Pública
      </Typography>
    </Box>
  );
}
