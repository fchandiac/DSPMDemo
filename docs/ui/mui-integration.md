# Integración con Material UI (MUI)

Este proyecto utiliza Material UI v6 para los componentes de interfaz de usuario. A continuación, se describen los aspectos clave de la implementación.

## Configuración

La configuración de MUI se encuentra en la carpeta `/MUI` e incluye:

- `theme.ts` - Definición del tema personalizado
- `cache.ts` - Configuración del caché de Emotion
- `MuiProvider.tsx` - Proveedor del tema para la aplicación

## Tema personalizado

El tema está definido en `theme.ts` y puedes personalizarlo según tus necesidades:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Puedes cambiar este color
    },
    secondary: {
      main: '#9c27b0',  // Puedes cambiar este color
    },
  },
  // Más configuraciones...
});
```

## Componentes principales

### Layout

- `Header.tsx` - Barra de navegación principal con menú adaptativo según el rol del usuario
- Incluye un menú lateral (drawer) con opciones específicas para cada rol

### Autenticación

- `LoginForm.tsx` - Formulario de inicio de sesión con validación
- Muestra información de los usuarios de prueba para facilitar el desarrollo

| Tipo de Usuario | Email | Contraseña | Rol |
|-----------------|-------|------------|-----|
| Administrador | admin@example.com | admin123 | admin |
| Usuario | user@example.com | user123 | user |
| Operador | operator@example.com | operator123 | operator |

## Uso de componentes

### Ejemplo de uso básico

```tsx
import { 
  Button, 
  TextField, 
  Typography, 
  Box 
} from '@mui/material';

export default function MyComponent() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Mi componente</Typography>
      <TextField label="Ejemplo" fullWidth margin="normal" />
      <Button variant="contained">Acción</Button>
    </Box>
  );
}
```

## Sistema de Grids

MUI proporciona un sistema de rejilla responsive basado en Flexbox que puedes utilizar para crear layouts complejos:

```tsx
import { Grid, Paper } from '@mui/material';

<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Paper sx={{ p: 2 }}>Contenido</Paper>
  </Grid>
  <Grid item xs={12} md={6}>
    <Paper sx={{ p: 2 }}>Contenido</Paper>
  </Grid>
</Grid>
```

## DataGrid

Para tablas y grids de datos más avanzados, puedes utilizar `@mui/x-data-grid` que ya está instalado:

```tsx
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Nombre', width: 150 },
  // Más columnas...
];

const rows = [
  { id: 1, name: 'Usuario 1' },
  { id: 2, name: 'Usuario 2' },
  // Más filas...
];

<DataGrid
  rows={rows}
  columns={columns}
  pageSize={5}
  checkboxSelection
/>
```
