'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import Header from '@/components/layout/Header';

export default function AdminPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Panel de Administración
          </Typography>
          <Typography variant="body1">
            Esta página solo es accesible para usuarios con rol de administrador.
          </Typography>
        </Paper>
      </Container>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          NextJS MUI Auth Starter &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
