"use client";

import React, { useEffect, useState } from 'react';
import { Box, Fade, Typography, useTheme } from '@mui/material';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // Duración en milisegundos
}

export default function SplashScreen({ onComplete, duration = 8000 }: SplashScreenProps) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Secuencia de animaciones
    const timer1 = setTimeout(() => {
      setLogoVisible(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setTitleVisible(true);
    }, 1200);

    const timer3 = setTimeout(() => {
      setTaglineVisible(true);
    }, 2000);

    // Iniciar fade-out 1 segundo antes del final
    const timer4 = setTimeout(() => {
      setFadeOut(true);
    }, duration - 1000);

    // Completar splash después del fade-out
    const timer5 = setTimeout(() => {
      onComplete();
    }, duration + 500); // 500ms extra para fade-out completo

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete, duration]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Fade in={!fadeOut} timeout={1000}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Logo con animación */}
          <Fade in={logoVisible} timeout={1000}>
            <Box
              sx={{
                mb: 3,
                animation: logoVisible 
                  ? 'logoFloat 3s ease-in-out infinite' 
                  : 'none',
                '@keyframes logoFloat': {
                  '0%, 100%': {
                    transform: 'translateY(0px) scale(1)',
                  },
                  '25%': {
                    transform: 'translateY(-10px) scale(1.05)',
                  },
                  '50%': {
                    transform: 'translateY(0px) scale(1.1)',
                  },
                  '75%': {
                    transform: 'translateY(-5px) scale(1.05)',
                  },
                },
              }}
            >
              <Image
                src="/logo.svg"
                alt="NextJS MUI Auth Starter"
                width={140}
                height={140}
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                }}
              />
            </Box>
          </Fade>

          {/* Título del proyecto */}
          <Fade in={titleVisible} timeout={800}>
            <Box textAlign="center" mb={2}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  animation: titleVisible 
                    ? 'textGlow 2s ease-in-out infinite alternate' 
                    : 'none',
                  '@keyframes textGlow': {
                    '0%': {
                      color: theme.palette.primary.main,
                    },
                    '100%': {
                      color: theme.palette.primary.light,
                    },
                  },
                }}
              >
                NextJS MUI Auth Starter
              </Typography>
            </Box>
          </Fade>

          {/* Tagline */}
          <Fade in={taglineVisible} timeout={600}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'center',
                mb: 1,
                animation: taglineVisible 
                  ? 'fadeInScale 1s ease-out' 
                  : 'none',
                '@keyframes fadeInScale': {
                  '0%': {
                    opacity: 0,
                    transform: 'scale(0.8)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'scale(1)',
                  },
                },
              }}
            >
              Una plantilla para proyectos con NextJS, Material UI y NextAuth
            </Typography>
          </Fade>

          {/* Versión */}
          <Fade in={taglineVisible} timeout={600}>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.disabled,
                fontSize: '0.8rem',
                mb: 3,
                fontWeight: 500,
              }}
            >
              Versión 1.0.0
            </Typography>
          </Fade>

          {/* Puntos de carga animados */}
          <Fade in={taglineVisible} timeout={800}>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                gap: 1,
              }}
            >
              {[0, 1, 2].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    animation: `loadingDots 1.5s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                    '@keyframes loadingDots': {
                      '0%, 80%, 100%': {
                        transform: 'scale(0.8)',
                        opacity: 0.5,
                      },
                      '40%': {
                        transform: 'scale(1.2)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Fade>

          {/* Información adicional en la parte inferior */}
          <Fade in={taglineVisible} timeout={1000}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                }}
              >
                © {new Date().getFullYear()} - Desarrollado con ❤️
              </Typography>
            </Box>
          </Fade>
        </Box>
      </Fade>
    </Box>
  );
}
