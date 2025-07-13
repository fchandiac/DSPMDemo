# Pruebas E2E con WebdriverIO

Este proyecto utiliza WebdriverIO para ejecutar pruebas end-to-end que validan la funcionalidad de la aplicación en un navegador real.

## Requisitos previos

Asegúrate de tener instalado:
- Node.js (versión recomendada: 16 o superior)
- npm o yarn
- Un navegador moderno (Chrome es el recomendado)

## Configuración

El archivo de configuración principal es `wdio.conf.js` ubicado en la raíz del proyecto. Este archivo define:

- Los navegadores en los que se ejecutarán las pruebas
- Las rutas a los archivos de prueba
- Los reporteros para visualizar los resultados
- Comportamiento antes y después de las pruebas

## Estructura de las pruebas

Las pruebas están organizadas en la carpeta `/test`:

```
/test
  /specs              # Archivos de pruebas
    /homePage.e2e.ts  # Prueba de la página principal y login
  /helpers            # Funciones de ayuda para las pruebas
  /data               # Datos de prueba
```

## Ejecutar las pruebas

Para ejecutar todas las pruebas:

```bash
npm run test:e2e
```

Para ejecutar una prueba específica:

```bash
npm run test:e2e:single
```

## Pruebas de autenticación

Las pruebas de autenticación utilizan los siguientes usuarios de prueba:

| Tipo de Usuario | Email | Contraseña | Rol |
|-----------------|-------|------------|-----|
| Administrador | admin@example.com | admin123 | admin |
| Usuario | user@example.com | user123 | user |
| Operador | operator@example.com | operator123 | operator |

## Capturas de pantalla

Durante la ejecución de las pruebas, si ocurre un error, WebdriverIO automáticamente tomará una captura de pantalla y la guardará en la carpeta `errorShots/`.

## Extender las pruebas

Para agregar nuevas pruebas:

1. Crea un nuevo archivo en `/test/specs` con el sufijo `.e2e.ts`
2. Usa la sintaxis de WebdriverIO y Mocha:

```typescript
import { browser } from '@wdio/globals';

describe('Mi nueva prueba', () => {
  it('debería hacer algo específico', async () => {
    await browser.url('/ruta-a-probar');
    const elemento = await $('#id-elemento');
    await elemento.click();
    
    // Aserciones
    expect(await browser.getUrl()).toContain('/nueva-ruta');
  });
});
```
