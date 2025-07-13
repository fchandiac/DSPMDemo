'use client';

import { Box, Container, Typography, Paper, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import Header from '@/components/layout/Header';
import { useSession } from 'next-auth/react';
import { useAlertContext } from '@/context/AlertContext';
import { useUser } from '@/context/UserContext';

export default function Dashboard() {
  const { data: session } = useSession();
  const { showAlert } = useAlertContext();
  const { user, loading } = useUser();
  
  const handleShowAlert = (severity: "success" | "error" | "info" | "warning") => {
    const messages = {
      success: '¡Operación realizada con éxito!',
      error: 'Se ha producido un error',
      info: 'Información importante',
      warning: 'Advertencia: acción pendiente'
    };
    
    showAlert(messages[severity], severity);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Bienvenido al Dashboard
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : user ? (
                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nombre:</strong> {user.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>ID:</strong> {user.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Rol:</strong> {user.role}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Estado:</strong> {user.status || 'N/A'}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1">
                  Información del usuario no disponible
                </Typography>
              )}
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Ejemplos de alertas:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => handleShowAlert('success')}
                  >
                    Mostrar Éxito
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleShowAlert('error')}
                  >
                    Mostrar Error
                  </Button>
                  <Button 
                    variant="contained" 
                    color="info" 
                    onClick={() => handleShowAlert('info')}
                  >
                    Mostrar Info
                  </Button>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => handleShowAlert('warning')}
                  >
                    Mostrar Advertencia
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* Tarjetas de información */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Información General
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Panel de información general del sistema.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Acciones Rápidas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acciones frecuentes según tu rol en el sistema.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Estadísticas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualización de estadísticas y métricas importantes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          NextJS MUI Auth Starter &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
