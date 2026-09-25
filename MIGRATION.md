# Football Paymaster — migración Replit → GitHub → Netlify

## Arquitectura de despliegue

La versión funcional publicada en Replit se ejecuta como una SPA de React/Vite. Los datos funcionales de la aplicación se mantienen en el navegador mediante `localStorage`; el servidor Express/PostgreSQL incluido en el proyecto original no es necesario para reproducir el comportamiento actual del sitio.

## Netlify

La configuración de despliegue está definida en `netlify.toml`.

- Publicación: `dist/public`
- Tipo: sitio estático / SPA
- Fallback de rutas: `/*` → `/index.html` con estado 200
- No se requieren variables de entorno para el comportamiento actual del build publicado.

El directorio `dist/public` se genera a partir del deployment público existente de Replit mediante GitHub Actions, validando que exista `index.html` y al menos un bundle JavaScript antes de confirmar la preparación.

## Fuente original

El ZIP exportado desde Replit se conserva como respaldo fuera del repositorio durante la migración. No deben subirse secretos, credenciales ni archivos `.env` al repositorio.

## Importación en Netlify

Importar el repositorio `Carlitros0101/Football-Paymaster` como proyecto existente desde GitHub. Netlify debe leer automáticamente `netlify.toml`; no es necesario configurar Express, PostgreSQL ni un servidor persistente para esta versión.
