"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MobileStepper, IconButton, AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PanicSideBar from '@/components/panic/PanicSideBar';
import MapSelectPoint from '@/components/MapSelectPoint';

const steps = [
  "¿Qué es una alerta?",
  "Descripción",
  "Adjuntar imagen",
  "Enviar"
];

export default function AlertaPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [mapPoint, setMapPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  // Handler para el mapa (simulado, deberás conectar con el MapView real)
  const handleMapClick = (lat: number, lng: number) => {
    setMapPoint({ lat, lng });
  };

  // Handler para imágenes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevas = Array.from(e.target.files);
      setImagenes(prev => {
        // Evitar duplicados por nombre
        const nombres = new Set(prev.map(f => f.name));
        return [...prev, ...nuevas.filter(f => !nombres.has(f.name))];
      });
    }
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ minHeight: '100dvh', height: '100dvh', display: 'flex', flexDirection: 'column', maxWidth: 400, margin: '0 auto', boxShadow: 2, bgcolor: '#fafafa' }}>
      <PanicSideBar open={sideBarOpen} toggleDrawer={setSideBarOpen} />
      {/* TopBar */}
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            dspmDemo
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setSideBarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Formulario con Stepper en la mitad superior */}
      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              ¿Qué es una alerta?
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Una <b>alerta</b> es una notificación para informar una situación de mediana urgencia. Será informada de forma inmediata a la central de monitoreo, pero su atención dependerá de la disponibilidad de recursos. Utiliza esta opción para situaciones que requieren atención, pero no son emergencias críticas.
            </Typography>
          </Box>
        )}
        {activeStep === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>Describe la alerta</Typography>
            <TextField
              label="Descripción"
              multiline
              rows={4}
              fullWidth
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </Box>
        )}
        {activeStep === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Adjunta una o varias imágenes (opcional)
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
              sx={{ mb: 2 }}
            >
              Subir imágenes
              <input
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleImageChange}
              />
            </Button>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {imagenes.map((img, idx) => (
                <Box key={idx} sx={{ width: 56, height: 56, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={img.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {activeStep === 3 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>¡Listo para enviar tu alerta!</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} fullWidth>
              Enviar alerta
            </Button>
          </Box>
        )}
        <MobileStepper
          variant="dots"
          steps={4}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep < 3 ? (
              <Button size="small" onClick={handleNext} disabled={activeStep === 3}>
                Siguiente
              </Button>
            ) : null
          }
          backButton={
            activeStep > 0 ? (
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                Atrás
              </Button>
            ) : null
          }
          sx={{ mt: 2, bgcolor: 'transparent' }}
        />
      </Box>
      {/* Mapa en la mitad inferior */}
      <Box sx={{ flex: 1, minHeight: '50vh', borderTop: '1px solid #eee', position: 'relative' }}>
        <MapSelectPoint
          marker={mapPoint}
          onSelect={handleMapClick}
        />
        {mapPoint && (
          <Typography variant="caption" sx={{ position: 'absolute', bottom: 8, left: 8, bgcolor: 'white', px: 1, borderRadius: 1 }}>
            Ubicación seleccionada: {mapPoint.lat.toFixed(5)}, {mapPoint.lng.toFixed(5)}
          </Typography>
        )}
      </Box>
      {/* BottomBar */}
      <Box sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
        <BottomNavigation
          showLabels
          sx={{
            width: '100%',
            borderTop: '1px solid #eee',
            bgcolor: '#1976d2',
            zIndex: 100,
          }}
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon sx={{ color: 'white' }} />} sx={{ color: 'white' }} />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
