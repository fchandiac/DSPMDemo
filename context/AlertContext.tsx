'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAlert } from '@/hooks/useAlert';

// Define el tipo para el contexto
type AlertContextType = {
  showAlert: (message: string, severity: "success" | "error" | "info" | "warning") => void;
};

// Crea el contexto
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const { showAlert, AlertComponent } = useAlert();

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {AlertComponent}
    </AlertContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlertContext debe ser usado dentro de un AlertProvider');
  }
  return context;
};
