'use client';

import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Container,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAlertContext } from '@/context/AlertContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlertContext();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result?.ok) {
        showAlert('Credenciales inválidas', 'error');
        return;
      }

      showAlert('Inicio de sesión exitoso', 'success');
      router.push('/panicButton');
    } catch (error) {
      showAlert('Error al iniciar sesión', 'error');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom align="center">
          Aplicación Demo Dirección de Seguridad Pública Municipal
          <br />
          <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>Ilustre Municipalidad de Parral</span>
        </Typography>
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="nextjs-mui-auth-starter-email"
                label="Email"
                name="email"
                autoComplete="off"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="nextjs-mui-auth-starter-password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </Box>
            
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
              Usuarios de prueba:
            </Typography>
            <Box sx={{ mt: 1, bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
              <Typography variant="body2" component="div">
                Admin: admin@dspm.cl / admin
              </Typography>
              <Typography variant="body2" component="div">
                Usuario: test@dspm.cl / test
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
