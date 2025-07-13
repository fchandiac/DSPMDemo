"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MapView from '@/components/MapView';
import { useEffect, useState } from 'react';

export default function PanicButtonPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => setGeoError('No se pudo obtener la ubicación. Permite el acceso a la geolocalización.'),
        { enableHighAccuracy: true }
      );
    } else {
      setGeoError('Geolocalización no soportada en este dispositivo.');
    }
  }, []);

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: '#fafafa',
      maxWidth: 400,
      margin: '0 auto',
      boxShadow: 2,
    }}>
      {/* TopBar */}
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Botón de Pánico
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mapa */}
      <Box sx={{ position: 'relative', width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <MapView latitude={coords?.latitude} longitude={coords?.longitude} />
        {geoError && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {geoError}
          </Typography>
        )}
      </Box>

      {/* Botón de pánico fijo en el extremo inferior */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 70, left: 0, zIndex: 10 }}>
        <IconButton
          color="error"
          sx={{
            backgroundColor: '#d32f2f',
            boxShadow: 3,
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '3px solid #b71c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            animation: 'blinker 1s linear infinite',
            '@keyframes blinker': {
              '50%': { opacity: 0.5 }
            }
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 48, color: 'white', animation: 'blinker 1s linear infinite' }} />
        </IconButton>
      </Box>

      {/* BottomBar */}
      <BottomNavigation showLabels sx={{ width: '100%', borderTop: '1px solid #eee' }}>
        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        <BottomNavigationAction label="Pánico" icon={<PhoneAndroidIcon color="error" />} />
        <BottomNavigationAction label="Info" icon={<InfoIcon />} />
      </BottomNavigation>
    </Box>
  );
}
