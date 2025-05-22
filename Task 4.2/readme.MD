# Proyecto: Task 4.2 – Sistema de Gestión Académica

Este proyecto es una aplicación web que gestiona estudiantes y asignaturas utilizando JavaScript. Incluye entrada por consola, operaciones con clases, y generación automática de documentación con **JSDoc**.

---

## 📁 Estructura del Proyecto

```
Task 4.2/
├── index.html
├── js/
│   ├── SGAEA.js
│   ├── Estudiante.js
│   └── Asignatura.js
├── test/
│   └── pruebas.js
├── jsdoc.json
├── package.json
├── package-lock.json
├── .gitignore
└── docs/  (se genera automáticamente con JSDoc)
```

---

## 🚀 Cómo subir el proyecto a GitHub desde la terminal

### 1. Crear un repositorio en GitHub

- Ve a [https://github.com](https://github.com)
- Crea un nuevo repositorio vacío (sin README ni .gitignore)

### 2. Subir el proyecto desde tu PC

```bash
cd ruta/a/Task\ 4.2
git init
git add .
git commit -m "Primer commit: proyecto Task 4.2"
git remote add origin https://github.com/MarioKoko777/task-4.2.git
git branch -M main
git push -u origin main
```

---

## 📦 Ignorar node_modules

Asegúrate de que el archivo `.gitignore` contiene:

```
node_modules/
```

Si ya fue subido por error:

```bash
git rm -r --cached node_modules
git commit -m "Eliminar node_modules del repositorio"
git push
```

---

## 🧾 Generar documentación automáticamente con JSDoc

### 1. Instalar JSDoc como dependencia de desarrollo

```bash
npm install --save-dev jsdoc
```

### 2. Crear archivo de configuración `jsdoc.json`

Ejemplo básico:

```json
{
  "tags": {
    "allowUnknownTags": true
  },
  "source": {
    "include": ["js"],
    "includePattern": ".js$"
  },
  "opts": {
    "destination": "./docs"
  }
}
```

### 3. Añadir un script en `package.json`

Dentro del bloque `"scripts"`:

```json
"scripts": {
  "doc": "if exist docs rmdir /s /q docs && npx jsdoc -c jsdoc.json"
}
````

### 4. Generar la documentación

```bash
npm run doc
```

Se generará una carpeta `docs/` con la documentación navegable en HTML.

---

## 🔍 Ver la documentación

Abre el archivo `docs/index.html` en tu navegador para consultar la documentación generada automáticamente.


## ✍️ Autor

[MarioKoko777]