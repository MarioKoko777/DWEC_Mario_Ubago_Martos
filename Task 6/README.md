# 🎬 API Consumer Website

Este proyecto muestra cómo consumir la API de [The Movie Database (TMDB)](https://www.themoviedb.org/) utilizando **JavaScript puro** y **jQuery**, implementando desplazamiento infinito (_infinite scroll_), control de errores y un diseño responsive basado en **Tailwind CSS**.

---

## ✅ Características principales

- 🔁 Dos versiones del mismo sitio: una usando **JavaScript** y otra usando **jQuery**
- 🔗 Consumo de datos desde la API pública de TMDB
- ⬇️ Carga progresiva mediante scroll infinito
- 📱 Diseño totalmente responsive con Tailwind CSS
- 💡 Efectos visuales (hover, transición) en las tarjetas
- 🚨 Control de errores al fallar las peticiones
- 📦 Flujo de trabajo basado en **Node.js**, **Vite** y **PostCSS**

---

## 🧩 Componentes externos utilizados

1. **[Flowbite](https://flowbite.com/)**  
   → Componente usado: `Navbar` responsive con menú desplegable para móviles.
2. **[Material Tailwind](https://www.material-tailwind.com/)**  
   → Componente usado: `Footer` moderno con múltiples columnas e iconos.

---

## 🗂️ Estructura del proyecto

```
api-consumer-website/
├── public/
│   └── index.html
├── src/
│   ├── css/
│   │   └── input.css         # Entrada de Tailwind
│   ├── js/
│   │   ├── app.js            # Versión en JS puro
│   │   └── app-jquery.js     # Versión con jQuery
├── dist/                     # Carpeta generada tras build
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## ⚙️ Configuración del entorno de desarrollo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/api-consumer-website.git
   cd api-consumer-website
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Genera los archivos de producción optimizados:
   ```bash
   npm run build
   ```

5. Previsualiza la versión de producción:
   ```bash
   npm run preview
   ```

---

## 🛠️ Tecnologías y herramientas

- **Tailwind CSS**: Utilizado para estilos rápidos y adaptativos.
- **Node.js + Vite**: Flujo de trabajo moderno para desarrollo web.
- **PostCSS**: Usado para compilar Tailwind y generar los estilos finales.
- **jQuery** (en una versión del código).
- **Fetch API** y **Promesas** en ambas versiones.
- **Flowbite** y **Material Tailwind** como fuentes externas de componentes.

---

## 🚫 Exclusiones importantes

- El directorio `node_modules/` está correctamente excluido mediante `.gitignore`.
- No se incluyen archivos innecesarios ni carpetas temporales (`dist/`, `build/`, etc.) en el repositorio.

---

## 📄 Licencia

Este proyecto es de uso educativo y no tiene fines comerciales. Puedes modificarlo o adaptarlo según tus necesidades.

---

### ✅ Cumple con los requisitos de:

- Flujo de trabajo con Node y Tailwind
- Diseño responsive sin componentes propios
- Uso de 2 componentes externos (navbar y footer)
- Control de errores y scroll infinito
- Organización y documentación correcta en GitHub
