# Documentación - NextJS MUI Auth Starter

## Estructura del Proyecto

Este proyecto es una plantilla base que integra NextJS, Material UI y NextAuth.js con un sistema de roles de usuario. A continuación, se presenta la documentación principal para entender y extender el proyecto.

## Usuarios de prueba

El sistema viene preconfigurado con los siguientes usuarios de prueba:

| Tipo de Usuario | Email | Contraseña | Rol |
|-----------------|-------|------------|-----|
| Administrador | admin@example.com | admin123 | admin |
| Usuario | user@example.com | user123 | user |
| Operador | operator@example.com | operator123 | operator |

## Estructura de Carpetas

```
/app                 # Páginas y rutas de la aplicación
  /admin             # Panel de administración (solo accesible por admin)
  /user              # Panel de usuario (accesible por user)
  /dashboard         # Dashboard principal (accesible por todos los usuarios)
  /operator          # Panel de operador (accesible por operator y admin)
  
/components          # Componentes reutilizables
  /auth              # Componentes de autenticación
  /layout            # Componentes de diseño (header, footer)
  
/MUI                 # Configuración de Material UI
  
/test                # Pruebas E2E con WebdriverIO
```

## Autenticación y Autorización

El sistema de autenticación está implementado con NextAuth.js y utiliza JWT para mantener las sesiones. La configuración principal se encuentra en:

- `auth.config.ts` - Configuración de proveedores de autenticación
- `auth.ts` - Configuración de callbacks y estrategias
- `middleware.ts` - Protección de rutas basada en roles

## Control de Acceso

El sistema implementa un control de acceso basado en roles:

- **Admin**: Acceso completo a todas las secciones
- **Operator**: Acceso a dashboard y sección de operador
- **User**: Acceso a dashboard y sección de usuario

## Ejecución de Pruebas E2E

Para ejecutar las pruebas E2E, utiliza el siguiente comando:

```bash
npm run test:e2e
```

## Documentación Detallada

- [Usuarios y Autenticación](./auth/users.md)
- [Gestión de Usuarios](./auth/user-management.md)
- [Pruebas E2E](./testing/e2e-tests.md)
- [Integración MUI](./ui/mui-integration.md)
- [Pantalla de Bienvenida](./ui/splash-screen.md)

## Configuración del Entorno

Para el desarrollo local, crea un archivo `.env.local` con las siguientes variables:

```
NEXTAUTH_SECRET=tu_secreto_aqui
NEXTAUTH_URL=http://localhost:3000
```
