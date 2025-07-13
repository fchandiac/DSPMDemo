'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useUser as useUserHook } from '@/hooks/useUser';
import { User } from '@/types/user';

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

// Valor por defecto del contexto
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Usamos el hook para obtener los datos del usuario y estado
  const { user, loading, refreshUser } = useUserHook();

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto
export const useUser = () => useContext(UserContext);
