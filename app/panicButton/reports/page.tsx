"use client";
import { Box, Typography, AppBar, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, TextField, IconButton as MIconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import dynamic from "next/dynamic";
import MenuIcon from '@mui/icons-material/Menu';
import PanicSideBar from '@/components/panic/PanicSideBar';
import { useState, useEffect } from 'react';
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
  "Título y descripción",
  "Dirección",
  "Ubicación",
  "Subir imágenes",
  "Resumen"
];

export default function ReportsPage() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapPoint, setMapPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleMapClick = (lat: number, lng: number) => {
    setMapPoint({ lat, lng });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevas = Array.from(e.target.files);
      setImages(prev => {
        const nombres = new Set(prev.map(f => f.name));
        return [...prev, ...nuevas.filter(f => !nombres.has(f.name))];
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100dvh', width: '100vw', position: 'relative', bgcolor: '#fafafa' }}>
      <AppBar position="static" color="primary" sx={{ width: '100%' }}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Reports
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => setSideBarOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <PanicSideBar open={sideBarOpen} toggleDrawer={setSideBarOpen} />
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
        <DialogTitle>Información sobre los reportes</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Los reportes enviados en esta sección corresponden a información proporcionada por la comunidad y no requieren atención inmediata. El equipo de la Dirección de Seguridad Pública Municipal acudirá al lugar reportado cuando los recursos estén disponibles y según la prioridad de los casos.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoOpen(false)} color="primary" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
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
                Selecciona la categoría que mejor describe el reporte:
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
                {categories.map(cat => (
                  <Box key={cat.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <MIconButton
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
                    </MIconButton>
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
              <TextField
                label="Título del reporte"
                variant="outlined"
                size="small"
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={description}
                onChange={e => setDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ mt: 3 }}>
              <TextField
                label="Dirección"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                value={address}
                onChange={e => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
          {activeStep === 3 && (
            <Box sx={{ mt: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Seleccione la ubicación exacta en el mapa.
              </Typography>
              <Box sx={{ mt: 2, width: '100%', maxWidth: 600, minHeight: 400, height: '50vh', borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                <MapSelectPoint onSelect={handleMapClick} marker={mapPoint} />
              </Box>
              {mapPoint && (
                <Typography variant="caption" sx={{ mt: 2, bgcolor: 'white', px: 1, borderRadius: 1 }}>
                  Ubicación seleccionada: {mapPoint.lat.toFixed(5)}, {mapPoint.lng.toFixed(5)}
                </Typography>
              )}
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
                {images.map((img, idx) => (
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
                Resumen del reporte
              </Typography>
              {selectedCategory && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Categoría:</Typography>
                  <Typography variant="body1">{selectedCategory}</Typography>
                </Box>
              )}
              {title && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Título:</Typography>
                  <Typography variant="body1">{title}</Typography>
                </Box>
              )}
              {description && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Descripción:</Typography>
                  <Typography variant="body1">{description}</Typography>
                </Box>
              )}
              {address && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Dirección:</Typography>
                  <Typography variant="body1">{address}</Typography>
                </Box>
              )}
              {mapPoint && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Ubicación seleccionada:</Typography>
                  <Typography variant="body2">Lat: {mapPoint.lat.toFixed(5)}, Lng: {mapPoint.lng.toFixed(5)}</Typography>
                </Box>
              )}
              {images.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary">Imágenes adjuntas:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {images.map((img, idx) => (
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
                // Aquí podrías agregar lógica de envío en el último paso
              }}
            >
              {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
