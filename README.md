# API Consumer Website

Este proyecto muestra cómo consumir una API (The Movie Database) utilizando tanto JavaScript puro como jQuery, implementando infinite scroll y diseño responsive con TailwindCSS.

## Características

- Dos versiones del mismo sitio: una con JavaScript puro y otra con jQuery
- Consumo de la API de The Movie Database
- Infinite scroll para carga progresiva de contenido
- Diseño responsive con TailwindCSS
- Componentes de Flowbite (navbar) y Material Tailwind (footer)
- Efectos hover en las tarjetas de películas
- Control de errores en las llamadas a la API

## Componentes externos utilizados

1. **Flowbite**: Utilizado para el navbar responsive con menú desplegable en móviles.
2. **Material Tailwind**: Utilizado para el footer con múltiples columnas y estilos modernos.

## Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/api-consumer-website.git
2. Instala las dependencias
   ```bash
   npm install
3. Inicia el servidor de desarrollo en http://localhost:5173
   ```bash
   npm run dev
4. Genera los archivos optimizados en la carpeta dist
   ```bash
   npm run build
5. Previsualizar build
   ```bash
   npm run preview