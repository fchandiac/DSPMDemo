'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import Header from '@/components/layout/Header';

export default function OperatorPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Panel de Operador
          </Typography>
          <Typography variant="body1">
            Esta página es accesible para operadores y administradores.
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
