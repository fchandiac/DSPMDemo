'use client';

import { ReactNode } from 'react';
import { useSplashScreen } from '@/hooks/useSplashScreen';
import SplashScreen from '@/components/SplashScreen';

export default function RootWrapper({ children }: { children: ReactNode }) {
  const { showSplash, hideSplash } = useSplashScreen(8500); // 8.5 segundos incluyendo fade-out

  // Si hay que mostrar el splash, renderizarlo
  if (showSplash) {
    return <SplashScreen onComplete={hideSplash} duration={8000} />;
  }

  // Una vez completado el splash, mostrar el contenido normal
  return children;
}
