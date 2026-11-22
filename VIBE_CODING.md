# Proceso de Desarrollo con Vibe Coding - Liss Store

Aca registro el flujo de trabajo iterativo, los prompts utilizados, las decisiones técnicas y la resolución de errores asistida por Inteligencia Artificial durante el desarrollo del proyecto **Liss Store**.

## 1. Herramientas Utilizadas
* **Asistente IA:** ChatGPT (GPT-4o / o3)
* **Editor de Código:** Visual Studio Code
* **Control de Versiones:** Git y GitHub
* **Despliegue:** Vercel

---

## 2. Prompts Principales e Iteraciones

### Iteración 1: Definición de Arquitectura y Estructura
Establecer la estructura de carpetas y planificación técnica antes de generar código.
* **Prompt:**
  > "Actua como un desarrollador Ful Stack Senior especializado en Next.js 16+, TypeScript y Tailwind CSS, necesito desarrollar desde cero una aplicacion web de comercio electronico llamada Liss Store. Caracteristicas del proyecto: Tienda online de productos tecnologicos, diseño minimalista, pagina de inicio, cagtalogo con productos, pagina con detalle de cada producto, carrito de compras integrado, integracion con una API externa para obtener los productos, manejos de estados mediante React Hooks, implementar server components y client components, manejo de errores. Las tecnologias que necesito son las siguientes: Next.js 16 o superior con App Router, TypeScript, Tailwind o CSS Modules. Necesito trabajar por etapas, primero analiza los requerimientos, dame una estructura de carpetas, no crees el proyecto de sin antes haber revisado las decisiones tecnicas."
* **Resultado:** La IA propuso la organización de carpetas bajo App Router separando páginas, componentes reutilizables y servicios.

### Iteración 2: Ajuste de Requisitos Técnicos y Creación del Proyecto
* **Objetivo:** Asegurar el uso de Route Handlers, Hooks (`useState`, `useEffect`), estados de carga/error y variables de entorno.
* **Prompt:**
  > "Listo, ejecuté create-next-app con TypeScript, Tailwind CSS y App Router, y comprobé que el proyecto arranca correctamente y está subido a GitHub. El siguiente Paso: Variables de entorno y Route Handler (API interna). Necesito configurar un archivo .env.local (y un .env.example para GitHub) con la URL base de una API pública de productos (https://fakestoreapi.com ), crear una interfaz de TypeScript (types/product.ts) para tipar los productos, crear un Route Handler en app/api/productos/route.ts que consuma esa API usando la variable de entorno y devuelva los productos en formato JSON con manejo de errores (try/catch). Damelo paso a paso, indicándome exactamente qué carpeta/archivo crear, el código completo de ese archivo y cómo probar en el navegador que funciona antes de pasar a las páginas."
* **Resultado:** Se inicializó el proyecto base con TypeScript y Tailwind CSS configurado.

### Iteración 3: Creación de Route Handler y Variables de Entorno
* **Objetivo:** Conectar la API externa de productos de forma segura mediante `.env.local` y `app/api/productos/route.ts`.
* **Prompt:**
  >Ya funciona el link y me devuelve el JSON de productos electrónicos sin errores en TypeScript. El siguiente Paso seria Navegación global y Página de Inicio (/). Necesito paso a paso: un componente de barra de navegación (Navbar.tsx) con enlaces a las 4 rutas obligatorias: Inicio (/), Productos (/productos), Detalle (desde cada producto) y Carrito (/carrito), incluyendo un contador dinámico del carrito usando useState y useEffect, integrar esa barra de navegación en layout.tsx., crear la página de Inicio (app/page.tsx) con un diseño limpio en Tailwind CSS para Liss Store y un botón que lleve a /productos. Dámelo archivo por archivo probar que no haya errores antes de pasar al catálogo."

### Iteración 4: Desarrollo de Vistas, Hooks y Manejo de UI
* **Objetivo:** Implementar las rutas `/`, `/productos`, `/productos/[id]` y `/carrito` combinando Server y Client Components.
* **Prompt:**
  >Ya tengo la barra de navegación y la página de inicio (/) funcionando sin errores. El siguiente paso seria el catálogo de Productos (/productos) y manejo de estados UI. Necesito lo siguiente: la página src/app/productos/page.tsx que consuma nuestro Route Handler (/api/productos) y muestre los productos en tarjetas con Tailwind CSS, incluyendo un enlace a /productos/[id] y un botón para agregar al carrito, un archivo src/app/productos/loading.tsx para mostrar un estado de carga visual mientras se obtienen los datos, un archivo src/app/productos/error.tsx para manejar errores de carga en la interfaz de forma amigable."

---

## 3. Decisiones Técnicas Tomadas
* **App Router y Next.js 16+:** Elegido para aprovechar el renderizado en servidor (Server Components) en el catálogo inicial y mejorar el rendimiento.
* **Route Handlers (`app/api/productos/route.ts`):** Se decidió crear un endpoint interno en lugar de llamar a la API externa directamente desde el navegador para ocultar la URL/llave de origen en `.env.local` y formatear los datos antes de enviarlos al cliente.
* **Separación de Server y Client Components:** Se mantuvieron las páginas principales como Server Components para cargar datos rápidos, delegando el uso de `'use client'`, `useState` y `useEffect` exclusivamente a componentes interactivos como el carrito de compras y filtros.
* **Tailwind CSS:** Utilizado para construir un diseño minimalista y adaptable (responsive) rápidamente sin crear múltiples archivos CSS externos.

---

## 4. Desafíos Encontrados y Resolución con IA

### Desafío: Conflicto de rutas entre `route.ts` y `page.tsx` en Next.js App Router
* **Problema:** Al intentar crear la vista de detalle de producto, se ubicó por error el archivo `page.tsx` dentro de `src/app/api/productos/[id]/`, donde ya existía un Route Handler (`route.ts`). Esto provocó el error de compilación: `Conflicting route and page at /api/productos/[id]`, ya que Next.js no permite que un mismo segmento de ruta responda simultáneamente como endpoint de API y como página de interfaz de usuario.
* **Prompt de solución:**
  > "Me apareció el siguiente Build Error en Next.js: 'Conflicting route and page at /api/productos/[id]'. ¿Por qué ocurre este conflicto en la estructura de carpetas y dónde debo ubicar la página visual?"
* **Solución aplicada:** Se eliminó el archivo `page.tsx` de la carpeta `src/app/api/productos/[id]/` (dejando allí únicamente el `route.ts` encargado de devolver los datos JSON) y se creó la vista de interfaz de usuario en la ruta pública correspondiente: `src/app/productos/[id]/page.tsx`.

