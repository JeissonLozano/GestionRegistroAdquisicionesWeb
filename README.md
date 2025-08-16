# Sistema de Gestión de Adquisiciones - Frontend

Este proyecto es el **frontend** de nuestra aplicación, desarrollada con **Angular 19 y NgRx** para una gestión eficiente del estado global y una experiencia de usuario moderna y atractiva.

## ✨ ¿Qué te ofrece este frontend?

*   **🎨 Interfaz moderna y elegante:** Diseño con gradientes, efectos glassmorphism y animaciones suaves
*   **📊 Dashboard inteligente:** Estadísticas en tiempo real con tarjetas interactivas
*   **🔍 Búsqueda avanzada:** Filtrado inteligente por múltiples criterios
*   **📱 Diseño responsive:** Adaptable a cualquier dispositivo con mobile-first approach
*   **💰 Gestión de adquisiciones:** Crea, edita y desactiva adquisiciones con validaciones robustas
*   **📈 Historial de modificaciones:** Controla y visualiza el historial de cada cambio realizado
*   **🌐 Integración con API REST:** Persistencia de datos garantizada con conexión a backend
*   **⚡ Manejo de estado con NgRx:** Gestión del estado global robusta y eficiente
*   **🎯 Paginación inteligente:** Navegación fluida entre grandes volúmenes de datos

## 🚀 Instalación y configuración

### Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

*   **Node.js** (versión LTS recomendada - 18.x o superior)
*   **Angular CLI** (Ejecuta: `npm install -g @angular/cli`)

### Pasos de instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/titoespitia/gestion-adquisiciones-frontend.git
    cd gestion-adquisiciones-frontend
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecuta el proyecto:**

    ```bash
    npm start
    # o
    ng serve
    ```

    La aplicación estará disponible en `http://localhost:4200/`.

## 🏗️ Estructura del proyecto

```
src/
├── app/
│   ├── core/                          # Lógica central y servicios
│   │   ├── interceptors/              # Interceptores HTTP
│   │   ├── models/                    # Modelos de datos
│   │   ├── services/                  # Servicios principales
│   │   └── state/                     # Gestión de estado con NgRx
│   │       ├── adquisiciones/         # Estado de adquisiciones
│   │       ├── historial/             # Estado del historial
│   │       └── ui/                    # Estado de la interfaz
│   ├── features/                      # Módulos funcionales
│   │   ├── adquisiciones/             # Gestión de adquisiciones
│   │   └── historial/                 # Historial de cambios
│   ├── pages/                         # Páginas principales
│   │   ├── home/                      # Página de inicio
│   │   └── not-found/                 # Página 404
│   └── shared/                        # Componentes reutilizables
│       ├── components/                # Componentes compartidos
│       └── services/                  # Servicios compartidos
├── assets/                            # Imágenes y recursos estáticos
├── environments/                      # Configuración de entornos
├── styles.scss                        # Estilos globales
└── index.html                         # Entrada principal
```

## 🎯 Funcionalidades implementadas

### 🏠 Página de Inicio (Home)
*   **Header moderno:** Navegación con efecto glassmorphism
*   **Hero section:** Título principal con gradiente y descripción
*   **Botones CTA:** Crear nuevo requerimiento y consultar adquisiciones
*   **Estadísticas visuales:** Métricas destacadas con números grandes
*   **Dashboard preview:** Vista previa 3D con rotación y efectos hover
*   **Elementos animados:** Formas flotantes con animaciones suaves

### 📋 Gestión de Adquisiciones
*   **Lista inteligente:** Tabla moderna con filtros y paginación
*   **Búsqueda en tiempo real:** Por proveedor, tipo de bien, documentación
*   **Estadísticas dinámicas:** Presupuesto total, conteo de adquisiciones, proveedores únicos
*   **Acciones rápidas:** Editar, ver historial y desactivar con botones modernos
*   **Paginación avanzada:** Navegación intuitiva con contador de registros
*   **Responsive design:** Adaptación completa para dispositivos móviles

### ✏️ Formulario de Adquisiciones
*   **Diseño moderno:** Layout de dos columnas con gradientes
*   **Campos monetarios:** Con símbolo de peso colombiano ($) integrado
*   **Validaciones robustas:** Mensajes de error claros y específicos
*   **Campo de fecha:** Con icono de calendario integrado
*   **Textarea expandible:** Para documentación con altura ajustable
*   **Botones atractivos:** Gradientes y efectos hover modernos

### 📊 Historial de Cambios
*   **Registro detallado:** Cada modificación con fecha y usuario
*   **Vista organizada:** Información estructurada y fácil de leer
*   **Navegación fluida:** Integración con el sistema de rutas

## 🎨 Estilos y diseño

### 🎭 Características visuales
*   **Gradientes modernos:** Transiciones suaves de azul a teal
*   **Glassmorphism:** Efectos de transparencia y blur
*   **Sombras suaves:** Profundidad visual con box-shadows
*   **Animaciones CSS:** Transiciones y keyframes fluidos
*   **Tipografía moderna:** Fuentes del sistema con pesos variables

### 🌈 Paleta de colores
*   **Primarios:** Azules (#1e40af, #1e3a8a, #0891b2)
*   **Secundarios:** Teal (#06b6d4, #7dd3fc)
*   **Acentos:** Verde (#059669), Púrpura (#7c3aed)
*   **Neutros:** Blancos y grises con transparencias
*   **Moneda:** Peso colombiano ($) en campos monetarios

### 📱 Responsive Design
*   **Mobile-first:** Enfoque en dispositivos móviles
*   **Grid adaptativo:** Cambios de layout según tamaño de pantalla
*   **Flexbox y CSS Grid:** Layouts modernos y flexibles
*   **Breakpoints optimizados:** 768px, 1200px para diferentes dispositivos

## 🔧 Tecnologías utilizadas

*   **Angular 19:** Framework principal con standalone components
*   **NgRx:** Gestión de estado global (actions, effects, reducers, selectors)
*   **Angular Material:** Componentes UI de alta calidad
*   **Reactive Forms:** Formularios reactivos con validaciones
*   **CSS3 avanzado:** Gradientes, animaciones, efectos modernos
*   **TypeScript:** Tipado estático para mayor robustez

## 📱 Funcionalidades técnicas

### 🔍 Búsqueda y filtrado
*   **Búsqueda en tiempo real:** Actualización automática de resultados
*   **Filtros múltiples:** Por presupuesto, unidad, tipo, cantidad, etc.
*   **Validación de entrada:** Sanitización y validación de datos

### 📊 Gestión de datos
*   **Estado reactivo:** Actualización automática de la interfaz
*   **Caché inteligente:** Optimización de rendimiento
*   **Manejo de errores:** Interceptores HTTP para errores globales

### 🎯 Validaciones
*   **Campos requeridos:** Validación de obligatoriedad
*   **Formato de datos:** Validación de tipos y formatos
*   **Mensajes de error:** Feedback claro al usuario

## 🚀 Comandos útiles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo
ng serve              # Alternativa para desarrollo

# Construcción
npm run build         # Construye para producción
ng build             # Alternativa para construcción

# Testing
npm run test         # Ejecuta pruebas unitarias
ng test              # Alternativa para testing

# Linting
npm run lint         # Verifica calidad del código
ng lint              # Alternativa para linting
```

## 🔄 Flujo de desarrollo

1.  **🏠 Página de inicio:** Dashboard con estadísticas y navegación principal
2.  **📋 Lista de adquisiciones:** Vista con filtros, búsqueda y paginación
3.  **✏️ Crear/Editar:** Formulario moderno con validaciones robustas
4.  **📊 Historial:** Seguimiento de cambios y modificaciones
5.  **🔄 Gestión de estado:** Actualización automática con NgRx

## 🌟 Características destacadas

*   **Performance optimizado:** Lazy loading de módulos
*   **SEO friendly:** Meta tags y estructura semántica
*   **Accesibilidad:** ARIA labels y navegación por teclado
*   **Cross-browser:** Compatibilidad con navegadores modernos
*   **PWA ready:** Preparado para Progressive Web App

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

*   **Desarrollador:** Julian
*   **Organización:** ADRES
*   **Proyecto:** Sistema de Gestión de Adquisiciones

---

**¡Disfruta de una experiencia de usuario moderna y eficiente con nuestro sistema de gestión de adquisiciones!** 🚀
