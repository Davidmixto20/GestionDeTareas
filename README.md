# 📌 Gestor de Tareas Académicas (CRUD)

Este proyecto es una aplicación web sencilla que permite **crear, leer, editar y eliminar tareas académicas** (CRUD). Está hecha únicamente con **HTML, CSS y JavaScript**, y guarda la información usando **localStorage** del navegador, sin necesidad de servidor ni base de datos.

---

## 📁 Estructura del proyecto

```
/ (raíz del proyecto)
│
├── index.html
├── assets/
│   ├── styles.css
│   └── script.js
```

### Descripción de los archivos

* **index.html**
  Contiene la estructura principal de la aplicación (formulario, lista de tareas, filtros y modal).

* **assets/styles.css**
  Se encarga del diseño visual: colores, distribución, tarjetas, formulario y modal.

* **assets/script.js**
  Contiene toda la lógica del CRUD, manejo del formulario, filtros, ordenamiento y guardado en localStorage.

---

## 📄 Estructura del JSON (localStorage)

Las tareas se guardan en el navegador usando **localStorage** bajo la clave `tasks`.
El contenido se almacena como un **arreglo de objetos JSON**.

### Ejemplo de una tarea guardada:

```json
{
  "id": 1737049300000,
  "dueDate": "2025-02-20",
  "subject": "Matemáticas",
  "priority": "Alta",
  "title": "Resolver ejercicios",
  "description": "Resolver los ejercicios del capítulo 5"
}
```

### Significado de cada campo:

* **id**: identificador único de la tarea (se genera con `Date.now()`)
* **dueDate**: fecha de entrega
* **subject**: materia o área
* **priority**: prioridad de la tarea (Alta, Media o Baja)
* **title**: título corto de la tarea
* **description**: descripción detallada

Todas las tareas se guardan en un arreglo como este:

```json
[
  { tarea 1 },
  { tarea 2 },
  { tarea 3 }
]
```

---

## ▶️ Cómo ejecutar la app localmente

1. Descarga o clona el repositorio:

```
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Abre la carpeta del proyecto.

3. Haz doble clic en **index.html** o ábrelo con tu navegador (Chrome, Edge, Firefox, etc.).

✅ La aplicación funcionará correctamente sin instalar nada adicional.

> ⚠️ Nota: Los datos se guardan solo en el navegador que uses (localStorage).

---

## 🌐 Cómo ejecutar la app desde GitHub Pages

1. Sube el proyecto a un repositorio en GitHub.

2. En el repositorio, ve a:

**Settings → Pages**

3. En **Source**, selecciona:

* Branch: `main`
* Folder: `/root`

4. Guarda los cambios.

5. GitHub te dará una URL similar a:

```
https://tu-usuario.github.io/tu-repositorio/
```

6. Abre ese enlace y la aplicación se ejecutará directamente en línea.

---

## ✨ Funcionalidades principales

* Agregar tareas académicas
* Editar tareas existentes
* Eliminar tareas
* Filtrar por materia y prioridad
* Ordenar por fecha o prioridad
* Ver detalles en un modal
* Guardado automático en localStorage

---

## 🛠 Tecnologías usadas

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* localStorage

---

📚 **Proyecto educativo** — ideal para practicar lógica, CRUD y manejo de datos en el navegador.
