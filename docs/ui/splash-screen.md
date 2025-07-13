# Pantalla de Bienvenida (SplashScreen)

Este proyecto incluye una pantalla de bienvenida (splash screen) personalizada para "NextJS MUI Auth Starter" que se muestra durante la primera carga de la aplicación en cada sesión del navegador.

## Características

- **Mostrada solo una vez por sesión**: Utilizando `sessionStorage` para recordar si ya se mostró
- **Animación secuencial**: Muestra diferentes elementos con transiciones suaves
- **Totalmente personalizable**: Duración, estilos y animaciones configurables
- **Fade-out automático**: Transición suave hacia la aplicación principal
- **Integrada con MUI Theme**: Utiliza el tema actual de Material UI

## Implementación

La funcionalidad está implementada a través de:

- **Hook `useSplashScreen`**: Maneja la lógica de cuándo mostrar la pantalla
- **Componente `SplashScreen`**: Renderiza la interfaz de usuario con animaciones
- **Componente `RootWrapper`**: Integra el splash screen en el árbol de componentes

## Uso del Hook

```tsx
import { useSplashScreen } from '@/hooks/useSplashScreen';

// Duración en milisegundos (opcional, por defecto 8500ms)
const { showSplash, hideSplash, isFirstLoad } = useSplashScreen(8500); 

// showSplash: boolean - Indica si se debe mostrar la pantalla
// hideSplash: () => void - Función para ocultar manualmente la pantalla
// isFirstLoad: boolean - Indica si es la primera carga en esta sesión
```

## Personalización

Para personalizar la apariencia del splash screen, modifica el componente `SplashScreen.tsx`. Puedes cambiar:

- Logo y elementos visuales
- Duración de las animaciones
- Colores y estilos
- Secuencia de las animaciones

## Integración

El splash screen está integrado a nivel del layout raíz de la aplicación a través del componente `RootWrapper`, por lo que no necesitas configuración adicional para usarlo.

## Desactivación

Si deseas desactivar el splash screen:

1. Elimina el componente `RootWrapper` del `layout.tsx`
2. Renderiza directamente los componentes hijos:

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <MuiProvider>
            <AlertProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </AlertProvider>
          </MuiProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```
