---

# 🌐 Frontend – Next.js App

Frontend desarrollado con **Next.js**, diseñado para consumir la API en Render y mostrar productos.
Incluye páginas, componentes reutilizables y manejo de estados.

---

## 🚀 Tecnologías

* Next.js
* React
* TypeScript *(si aplica)*
* TailwindCSS
* Axios / Fetch API

---

## 📁 Estructura del proyecto

```
/
│── app/ o pages/    → rutas/páginas
│── components/      → componentes UI
│── services/        → conexión API
│── public/          → imágenes estáticas
│── styles/          → estilos
│── next.config.js   → config global
│── package.json
```

---

## ⚙️ Variables de entorno

Crear archivo `config.ts`:

```
NEXT_PUBLIC_API_URL=https://tu-backend.onrender.com
```

> En producción, configurar en el dashboard de la plataforma donde se despliegue.

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone <url>
cd project
```

Instalar dependencias:

```bash
npm install
```

---

## ▶️ Ejecución

Modo desarrollo:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Producción:

```bash
npm start
```

---

## 🌐 Funcionalidades

✅ Listado de productos
✅ Visualización de detalle
✅ Consumo de API REST
✅ Navegación dinámica
✅ Estilos con Tailwind

---

## 🔗 APIs

La aplicación consume el backend desplegado en Render:

```
GET  /products
GET  /products/:id
POST /products
PUT  /products/:id
DELETE /products/:id
```

---

## 🛠 Configuración extra

### **next.config.js**

Si consumes imágenes remotas, habilita:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

> `images.domains` está obsoleto, usar `remotePatterns`.

---

## 👨‍💻 Autor

**Luis Carrión**

---
