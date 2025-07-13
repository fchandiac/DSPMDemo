"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// ...existing code...
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MapView from '@/components/MapView';
import SOSDialog from '@/components/SOSDialog';
import { useEffect, useState } from 'react';

export default function PanicButtonPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [sosOpen, setSosOpen] = useState(false);

  useEffect(() => {
    // Solicitar permisos de geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => setGeoError('No se pudo obtener la ubicación. Permite el acceso a la geolocalización.'),
        { enableHighAccuracy: true }
      );
    } else {
      setGeoError('Geolocalización no soportada en este dispositivo.');
    }

    // Solicitar permisos de micrófono
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          // Permiso concedido
        })
        .catch(() => {
          // Permiso denegado
          // Puedes mostrar un mensaje si lo deseas
        });
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
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            dspmDemo
          </Typography>
          {/* Título eliminado, solo dspmDemo y menú */}
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mapa */}
      <Box sx={{ position: 'relative', width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {coords ? (
          <MapView latitude={coords.latitude} longitude={coords.longitude} />
        ) : (
          <MapView />
        )}
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
          onClick={() => setSosOpen(true)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WarningAmberIcon sx={{ fontSize: 40, color: 'white', animation: 'blinker 1s linear infinite' }} />
            <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16, mt: -0.5, letterSpacing: 2 }}>SOS</Typography>
          </Box>
        </IconButton>
      </Box>

      <SOSDialog open={sosOpen} onClose={() => setSosOpen(false)} />

      {/* BottomBar */}
      <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <BottomNavigation
          showLabels
          sx={{
            width: '100%',
            borderTop: '1px solid #eee',
            bgcolor: '#1976d2', // primary color
            zIndex: 100,
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
          <BottomNavigationAction label="Pánico" icon={<PhoneAndroidIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
          <BottomNavigationAction label="Info" icon={<InfoIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
