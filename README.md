# Sistema de Gestión de Registro de Adquisiciones (WEB)

## Descripción

Aplicación web frontend desarrollada en Angular 19 para la gestión integral de requerimientos de adquisiciones de la entidad ADRES. Esta aplicación proporciona una interfaz moderna y responsiva para administrar todo el ciclo de vida de las adquisiciones, desde la creación hasta el seguimiento histórico.

## Características Principales

### Gestión de Adquisiciones
- Creación y edición de requerimientos de adquisición
- Listado paginado con búsqueda y filtros avanzados
- Toggle para activar/desactivar adquisiciones
- Validación de formularios en tiempo real
- Integración completa con API REST

### Sistema de Historial
- Seguimiento completo de cambios en adquisiciones
- Auditoría de modificaciones por usuario
- Visualización de valores anteriores y nuevos
- Estadísticas de cambios por período

### Dashboard Interactivo
- Estadísticas dinámicas en tiempo real
- Métricas de presupuesto y adquisiciones
- Preview del dashboard de gestión
- Consumo de datos desde API

### Interfaz de Usuario Moderna
- Diseño responsivo para todos los dispositivos
- Sistema de notificaciones toast elegante
- Confirmaciones de acciones críticas
- Animaciones y transiciones suaves
- Gradientes y efectos visuales modernos

## Tecnologías Utilizadas

### Framework Principal
- **Angular 19**: Framework de desarrollo frontend
- **TypeScript**: Lenguaje de programación tipado
- **SCSS**: Preprocesador de CSS para estilos avanzados

### Gestión de Estado
- **NgRx**: Arquitectura de estado global
- **Actions, Reducers, Effects**: Patrón unidireccional de datos
- **Selectors**: Consultas optimizadas del estado

### Estilos y UI
- **Angular Material MDC**: Componentes de Material Design
- **CSS3 Avanzado**: Gradientes, animaciones, flexbox
- **Responsive Design**: Mobile-first approach
- **Glassmorphism**: Efectos visuales modernos

### Herramientas de Desarrollo
- **Angular CLI**: Herramientas de línea de comandos
- **ESLint**: Linting de código
- **Prettier**: Formateo automático de código
- **Git**: Control de versiones

## Arquitectura del Proyecto

### Estructura de Carpetas
```
src/
├── app/
│   ├── core/                    # Servicios y modelos centrales
│   │   ├── models/             # Interfaces de datos
│   │   ├── services/           # Servicios de API
│   │   └── state/              # Gestión de estado NgRx
│   ├── features/               # Módulos de funcionalidad
│   │   ├── adquisiciones/      # Gestión de adquisiciones
│   │   └── historial/          # Sistema de historial
│   ├── pages/                  # Páginas principales
│   │   ├── home/               # Dashboard principal
│   │   └── not-found/          # Página 404
│   └── shared/                 # Componentes compartidos
│       ├── components/         # Componentes reutilizables
│       └── services/           # Servicios compartidos
├── assets/                     # Recursos estáticos
└── styles/                     # Estilos globales
```

### Patrones de Diseño
- **Componentes Standalone**: Arquitectura moderna de Angular 19
- **Lazy Loading**: Carga diferida de módulos
- **Repository Pattern**: Abstracción de acceso a datos
- **Service Layer**: Lógica de negocio centralizada
- **Observer Pattern**: Manejo de datos reactivos

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm 9+ o yarn
- Angular CLI 19+

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/JeissonLozano/GestionRegistroAdquisicionesWeb.git

# Navegar al directorio
cd GestionRegistroAdquisicionesWeb

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Configuración del Entorno
```bash
# Archivo .env
API_BASE_URL=https://localhost:7195/api
ENVIRONMENT=development
```

### Ejecución
```bash
# Servidor de desarrollo
npm start

# Construcción para producción
npm run build

# Ejecutar pruebas
npm test

# Linting del código
npm run lint
```

## Configuración de la API

### Endpoints Principales
- **Base URL**: `https://localhost:7195/api`
- **Adquisiciones**: `/adquisiciones`
- **Historial**: `/historial`
- **Estadísticas**: `/estadisticas`

### Servicios Implementados
- **AdquisicionService**: CRUD completo de adquisiciones
- **HistorialService**: Consulta de historial de cambios
- **EstadisticasService**: Métricas y estadísticas del sistema

## Funcionalidades del Sistema

### Dashboard Principal
- Estadísticas en tiempo real
- Métricas de presupuesto total
- Conteo de adquisiciones activas
- Proveedores únicos registrados
- Adquisiciones del mes actual

### Gestión de Adquisiciones
- Formulario de creación/edición
- Validaciones en tiempo real
- Cálculo automático de valores totales
- Integración con API REST
- Manejo de estados de carga

### Sistema de Historial
- Seguimiento de cambios por campo
- Auditoría de modificaciones
- Filtros por usuario y fecha
- Estadísticas de actividad
- Exportación de datos

### Notificaciones y Feedback
- Sistema de toast elegante
- Confirmaciones de acciones críticas
- Estados de carga visuales
- Manejo de errores robusto
- Feedback inmediato al usuario

## Características Técnicas

### Performance
- Lazy loading de módulos
- Optimización de bundles
- Compresión de assets
- Caching inteligente
- Lazy loading de imágenes

### Seguridad
- Validación de entrada de datos
- Sanitización de contenido
- Headers de seguridad HTTP
- Manejo seguro de tokens
- Protección contra XSS

### Accesibilidad
- Navegación por teclado
- Indicadores de focus
- Textos alternativos
- Contraste de colores optimizado
- Compatibilidad con lectores de pantalla

### Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptativos
- Touch-friendly interfaces
- Optimización para diferentes dispositivos

## Contacto

- **Desarrollador**: Jeisson Lozano
- **Repositorio**: [GitHub](https://github.com/JeissonLozano/GestionRegistroAdquisicionesWeb)
- **Backend API**: [GitHub](https://github.com/JeissonLozano/GestionRegistroAdquisicionesAPI)


