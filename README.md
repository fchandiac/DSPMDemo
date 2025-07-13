# NextJS MUI Auth Starter

Un proyecto base que integra NextJS, Material UI y NextAuth.js con roles de usuario (admin, user, operator).

## Características

- NextJS 14 con App Router
- Material UI (MUI) para la interfaz de usuario
- Autenticación con NextAuth.js
- Soporte para múltiples roles (admin, user, operator)
- Pruebas E2E con WebdriverIO

## Cómo empezar

1. Clona este repositorio
2. Instala las dependencias
   ```bash
   npm install
   ```
3. Crea un archivo `.env.local` con las siguientes variables:
   ```
   NEXTAUTH_SECRET=tu_secreto_aqui
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Inicia el servidor de desarrollo
   ```bash
   npm run dev
   ```

## Usuarios de prueba

- Admin: admin@example.com / admin123
- Usuario: user@example.com / user123
- Operador: operator@example.com / operator123

## Estructura del proyecto

```
/app                 # Páginas y rutas de la aplicación
  /admin             # Panel de administración
  /user              # Panel de usuario
  /dashboard         # Dashboard principal
  /operator          # Panel de operador
  
/components          # Componentes reutilizables
  /auth              # Componentes de autenticación
  /layout            # Componentes de diseño (header, footer)
  
/MUI                 # Configuración de Material UI
  
/test                # Pruebas E2E con WebdriverIO
```

## Pruebas E2E

Para ejecutar las pruebas E2E:

```bash
npm run test:e2e
```

## Personalización

Este proyecto está diseñado como punto de partida. Puedes personalizar:

- Tema de MUI en `/MUI/theme.ts`
- Lógica de autenticación en `/auth.ts` y `/auth.config.ts`
- Estructura de navegación en `/components/layout/Header.tsx`
