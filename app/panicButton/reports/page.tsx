"use client";
import { Box, Typography, AppBar, Toolbar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stepper, Step, StepLabel, TextField } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PanicSideBar from '@/components/panic/PanicSideBar';
import { useState, useEffect } from 'react';

export default function ReportsPage() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100dvh', width: '100vw', p: 2 }}>
        <Box sx={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
            label="Dirección"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                // Aquí podrías agregar lógica de envío
              }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
