"use client";
import { useState, useEffect, useRef } from "react";
import AlertaInfoDialog from '@/components/AlertaInfoDialog';
import dynamic from "next/dynamic";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, MobileStepper, IconButton, AppBar, Toolbar, BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PanicSideBar from '@/components/panic/PanicSideBar';

const MapSelectPoint = dynamic(() => import('@/components/MapSelectPoint'), { ssr: false });

const categories = [
  { label: "Robo a persona", color: "#d32f2f" },
  { label: "Robo a casa", color: "#1976d2" },
  { label: "Individuo sospechoso", color: "#ffa000" },
  { label: "Urgencia médica", color: "#388e3c" },
  { label: "Accidente vehicular", color: "#7b1fa2" },
];

const steps = [
  "Categoría",
  "Dirección",
  "Ubicación",
  "Descripción",
  "Adjuntar imagen",
  "Enviar"
];

export default function AlertaPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [direccion, setDireccion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const ubicacionRef = useRef<HTMLInputElement>(null);
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [mapPoint, setMapPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(true);

  useEffect(() => {
    setInfoDialogOpen(true);
    // Focus automático en el TextField de ubicación al cargar
    setTimeout(() => {
      ubicacionRef.current?.focus();
    }, 300);
  }, []);

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
    <Box sx={{ minHeight: '100dvh', height: '100dvh', width: '100vw', display: 'flex', flexDirection: 'column', margin: 0, padding: 0, boxShadow: 2, bgcolor: '#fafafa' }}>
      <AlertaInfoDialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)} />
      <PanicSideBar open={sideBarOpen} toggleDrawer={setSideBarOpen} />
      {/* TopBar */}
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            dspmDemo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, color: 'white', mr: 1 }}>
              Alerta
            </Typography>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setSideBarOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Formulario con Stepper en la mitad superior */}
      <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', minHeight: '0', height: '100%', maxHeight: '100dvh', overflow: 'auto' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'auto' }}>
          {activeStep === 0 && (
            <Box sx={{ mt: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                Categoría
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Selecciona la categoría que mejor describe la alerta:
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                {categories.map(cat => (
                  <Box key={cat.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton
                      size="large"
                      onClick={() => setSelectedCategory(cat.label)}
                      sx={{
                        bgcolor: selectedCategory === cat.label ? cat.color : '#eee',
                        color: selectedCategory === cat.label ? 'white' : 'black',
                        border: selectedCategory === cat.label ? `2px solid ${cat.color}` : '2px solid #ccc',
                        mb: 1,
                        width: 64,
                        height: 64,
                        transition: 'all 0.2s',
                      }}
                    >
                      <InfoIcon sx={{ fontSize: 36 }} />
                    </IconButton>
                    <Typography sx={{ fontWeight: selectedCategory === cat.label ? 700 : 400, color: selectedCategory === cat.label ? cat.color : 'inherit', fontSize: 14 }}>
                      {cat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              {selectedCategory && (
                <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 700 }}>
                  Seleccionado: {selectedCategory}
                </Typography>
              )}
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Indique la dirección del incidente. Puede ser una intersección, una dirección con calle y número, o una referencia cercana.
              </Typography>
              <TextField
                label="Dirección (ej: Calle 123 y Av. Principal, o referencia)"
                multiline
                rows={2}
                fullWidth
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                sx={{ mb: 1 }}
                autoFocus
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Seleccione la ubicación exacta en el mapa.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <MapSelectPoint onSelect={handleMapClick} marker={mapPoint} />
              </Box>
              {mapPoint && (
                <Typography variant="caption" sx={{ mt: 2, bgcolor: 'white', px: 1, borderRadius: 1 }}>
                  Ubicación seleccionada: {mapPoint.lat.toFixed(5)}, {mapPoint.lng.toFixed(5)}
                </Typography>
              )}
            </Box>
          )}
          {activeStep === 3 && (
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
          {activeStep === 4 && (
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
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {imagenes.map((img, idx) => (
                  <Box key={idx} sx={{ width: 60, height: 60, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`miniatura-${idx}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {activeStep === 5 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Resumen de la alerta
              </Typography>
              {selectedCategory && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Categoría:</Typography>
                  <Typography variant="body1">{selectedCategory}</Typography>
                </Box>
              )}
              {direccion && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Dirección:</Typography>
                  <Typography variant="body1">{direccion}</Typography>
                </Box>
              )}
              {mapPoint && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Ubicación seleccionada:</Typography>
                  <Typography variant="body2">Lat: {mapPoint.lat.toFixed(5)}, Lng: {mapPoint.lng.toFixed(5)}</Typography>
                </Box>
              )}
              {descripcion && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Descripción:</Typography>
                  <Typography variant="body1">{descripcion}</Typography>
                </Box>
              )}
              {imagenes.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Imágenes adjuntas:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {imagenes.map((img, idx) => (
                      <Box key={idx} sx={{ width: 60, height: 60, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`miniatura-resumen-${idx}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
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
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {imagenes.map((img, idx) => (
                  <Box key={idx} sx={{ width: 60, height: 60, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`miniatura-${idx}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {activeStep === 3 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Resumen de la alerta
              </Typography>
              {ubicacion && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Ubicación:</Typography>
                  <Typography variant="body1">{ubicacion}</Typography>
                </Box>
              )}
              {mapPoint && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Coordenadas seleccionadas:</Typography>
                  <Typography variant="body2">Lat: {mapPoint.lat.toFixed(5)}, Lng: {mapPoint.lng.toFixed(5)}</Typography>
                </Box>
              )}
              {descripcion && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Descripción:</Typography>
                  <Typography variant="body1">{descripcion}</Typography>
                </Box>
              )}
              {imagenes.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Imágenes adjuntas:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {imagenes.map((img, idx) => (
                      <Box key={idx} sx={{ width: 60, height: 60, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`miniatura-resumen-${idx}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
        {/* Stepper Controls */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <MobileStepper
            variant="dots"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep === steps.length - 1 ? (
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => {/* lógica de envío aquí */}}
                >
                  Enviar
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  Siguiente
                </Button>
              )
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                Atrás
              </Button>
            }
            sx={{ bgcolor: 'transparent' }}
          />
        </Box>
      </Box>
  {/* El mapa solo se muestra en el paso de ubicación */}
      {/* BottomBar */}
      <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', height: 48, bgcolor: '#1976d2', borderTop: '1px solid #eee' }} />
    </Box>
  );
}
