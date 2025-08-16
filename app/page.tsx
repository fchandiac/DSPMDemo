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
        minHeight: '100dvh',
        height: '100dvh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
        margin: 0,
        padding: 0,
      }}
    >
      <Container maxWidth="md" sx={{ width: '100%' }}>
        <LoginForm />
      </Container>
    </Box>
  );
}
