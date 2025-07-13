# Sistema de Gestión de Usuarios

## Hooks y Contextos de Usuario

El sistema proporciona una API completa para gestionar usuarios a través de hooks y contextos:

### `useUser` Hook

El hook `useUser` proporciona acceso a los datos del usuario actual y funciones para manipularlo:

```tsx
import { useUser } from '@/context/UserContext';

function MiComponente() {
  const { user, loading, refreshUser } = useUser();
  
  // Verifica si está cargando la información del usuario
  if (loading) return <LoadingComponent />;
  
  // Usa la información del usuario
  return <div>Bienvenido, {user?.name}</div>;
}
```

### Propiedades disponibles

- `user`: Objeto con la información del usuario actual (o null si no hay sesión)
- `loading`: Booleano que indica si se está cargando la información del usuario
- `refreshUser`: Función para actualizar los datos del usuario desde el servidor

### Integración con NextAuth

El hook `useUser` se integra con NextAuth para:

1. Obtener información básica de la sesión
2. Complementar con datos adicionales del usuario desde el servidor
3. Proporcionar acceso consistente a los datos del usuario en toda la aplicación

## Uso del contexto

El contexto de usuario (`UserContext`) está integrado en el layout raíz, por lo que está disponible en toda la aplicación sin necesidad de configuración adicional.

## Arquitectura

- `hooks/useUser.tsx`: Hook base que obtiene y gestiona los datos del usuario
- `context/UserContext.tsx`: Contexto que provee los datos del usuario a toda la aplicación
- `app/actions/user.ts`: Acciones del servidor para obtener información detallada del usuario

## Ejemplo de uso

```tsx
'use client';
import { useUser } from '@/context/UserContext';
import { Button } from '@mui/material';

export default function ProfileComponent() {
  const { user, refreshUser } = useUser();
  
  const handleRefresh = async () => {
    await refreshUser();
    // Datos actualizados disponibles
  };
  
  return (
    <div>
      <h1>Perfil de {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
      <Button onClick={handleRefresh}>Actualizar perfil</Button>
    </div>
  );
}
```
