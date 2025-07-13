'use client';

import LoginForm from '@/components/auth/LoginForm';
import { Box, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            NextJS MUI Auth Starter
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Una plantilla para proyectos con NextJS, Material UI y NextAuth
          </Typography>
        </Box>
        
        <LoginForm />
      </Container>
    </Box>
  );
}
