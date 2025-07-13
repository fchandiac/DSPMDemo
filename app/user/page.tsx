'use client';

import { Box, Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import Header from '@/components/layout/Header';
import { useUser } from '@/context/UserContext';

export default function UserPage() {
  const { user, loading } = useUser();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                Panel de Usuario
              </Typography>
              <Typography variant="body1" paragraph>
                Bienvenido al área de usuario. Aquí podrás gestionar tu perfil y acceder a las funciones básicas.
              </Typography>
              
              {user && (
                <Box sx={{ mt: 2, mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Información de tu cuenta
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nombre:</strong> {user.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Rol:</strong> {user.role}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Mis Datos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestiona tu información personal y preferencias.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Actividad Reciente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Revisa tu historial de actividades en el sistema.
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
