# 🧠 Gestion de Psicologos App

Una aplicación web completa para la gestión de consultas psicológicas, diseñada para facilitar la administración de psicólogos, pacientes y sesiones terapéuticas.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Sistema de Roles](#-sistema-de-roles)
- [Tecnologías](#️-tecnologías)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Testing](#-testing)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

### 🔐 Autenticación y Autorización

- **Sistema de login seguro** con JWT y verificación de tokens
- **Control de acceso basado en roles** (RBAC) implementado
- **3 niveles de usuarios:**
  - **👑 Administrador**: Gestión completa de psicólogos
  - **👨‍⚕️ Psicólogo**: Gestión completa de pacientes y sesiones
  - **👤 Paciente**: Agendamiento público sin registro
- **Rutas protegidas** con middleware de autorización
- **Headers Authorization** en todas las peticiones autenticadas
- **Manejo de errores** 401/403 con mensajes descriptivos
- **Endpoint público** para lista básica de psicólogos

### 👨‍⚕️ Gestión de Psicólogos

- **CRUD completo** de psicólogos (solo admin)
- **Especialidades configurables** con validación
- **Vista responsive** (tabla en desktop, cards en mobile)
- **Botones de acción integrados** y tooltips
- **Endpoint público** para agendamiento de pacientes
- **Autenticación requerida** para operaciones administrativas

### 👥 Gestión de Pacientes

- **CRUD completo** de pacientes (solo psicólogos autenticados)
- **Historial clínico** y datos personales
- **Asignación a psicólogos** con validación
- **Formulario de agendamiento autónomo** para pacientes (público)
- **Control de acceso** por rol de usuario

### 📅 Sistema de Sesiones

- Programación de citas con date/time picker
- Estados de sesión con chips coloreados (pendiente, realizada, cancelada, reagendada)
- Vista dual responsive (tabla desktop vs cards mobile)
- Formato de precios en pesos chilenos (CLP)
- Gestión de notas y observaciones
- Iconos contextuales para mejor UX
- Filtrado por psicólogo automático
- **Formulario de agendamiento para pacientes** con validación completa

### 📝 Agendamiento de Citas

- Formulario responsive con 4 secciones organizadas:
  - **Información Personal:** Datos del paciente con iconos contextuales
  - **Selección de Profesional:** Dropdown con psicólogos disponibles
  - **Programación de la Sesión:** Date/Time picker, duración y precio
  - **Confirmación:** Términos y condiciones con validación
- Validación completa de formularios
- Notificaciones SweetAlert2 para confirmación
- Diseño adaptativo mobile/desktop

### 📱 Diseño Responsive

- Interfaz adaptativa para todos los dispositivos
- Componentes optimizados para mobile y desktop
- Diseño moderno con Material-UI

## � Sistema de Roles

La aplicación implementa un **Control de Acceso Basado en Roles (RBAC)** con tres niveles de usuario:

### 👑 **Administrador**

- **Permisos**: Gestión completa de psicólogos
- **Acceso a**:
  - ✅ CRUD completo de psicólogos
  - ✅ Ver todas las especialidades
  - ✅ Activar/desactivar cuentas
- **Rutas**: `/admin/psychs`
- **Login**: Cuenta admin predeterminada

### 👨‍⚕️ **Psicólogo**

- **Permisos**: Gestión completa de pacientes
- **Acceso a**:
  - ✅ CRUD completo de pacientes
  - ✅ Ver sesiones asignadas
  - ✅ Gestionar historial clínico
- **Rutas**: `/admin/patients`, `/psychologist/sessions`
- **Login**: Cuenta creada por admin

### 👤 **Paciente (Público)**

- **Permisos**: Agendamiento sin registro
- **Acceso a**:
  - ✅ Agendar sesiones libremente
  - ✅ Ver lista básica de psicólogos
  - ✅ Seleccionar profesional y horario
- **Rutas**: `/patient-entry` (público)
- **Login**: No requerido

### 🔒 **Implementación Técnica**

#### Backend:

```javascript
// Middleware de autenticación
authMiddleware → Verifica JWT válido
checkRole(['admin']) → Verifica permisos específicos
```

#### Frontend:

```typescript
// Componente de ruta protegida
<PrivateRoute requiredRole="admin">
  <AdminPage />
</PrivateRoute>
```

#### Headers Authorization:

```javascript
// Todas las requests autenticadas
Authorization: Bearer <jwt_token>
```

## �🛠️ Tecnologías

### Frontend

- **React 18** con TypeScript
- **Material-UI (MUI)** para componentes UI
- **Vite** como bundler y dev server
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **Context API** para manejo de estado

### Backend

- **Node.js** con Express
- **MongoDB** con Mongoose
- **JWT** para autenticación
- **bcryptjs** para encriptación de contraseñas
- **Jest** para testing
- **CORS** habilitado

## 📸 Capturas de Pantalla

### 🔑 Sistema de Login

#### Desktop

![Login Desktop](frontend/public/images/login-desktop.png)
_Pantalla de login con diseño moderno y gradientes glassmorphism_

#### Mobile

![Login Mobile](frontend/public/images/login-mobile.png)

_Versión móvil del login completamente responsive_

### 👨‍⚕️ Gestión de Psicólogos

#### Desktop - Vista de Tabla

![Admin Desktop](frontend/public/images/admin-desktop.png)
_Vista de administración en desktop con tabla completa mostrando profesionales, especialidades y acciones_

#### Mobile - Vista de Cards

![Admin Mobile](frontend/public/images/admin-mobile.png)

_Vista móvil optimizada con cards compactas, botones de acción integrados y mejor uso del espacio_

### 📅 Gestión de Sesiones

#### Desktop - Vista de Tabla

![Sessions Desktop](frontend/public/images/psychologist-desktop.jpeg)
_Vista completa de sesiones en desktop con tabla organizada mostrando pacientes, fechas, estados y acciones_

#### Mobile - Vista de Cards

![Sessions Mobile](frontend/public/images/psychologist-mobile.jpeg)

_Vista móvil optimizada para sesiones con cards informativas, iconos contextuales y chips de estado coloreados_

### 📝 Agendamiento de Sesiones para Pacientes

#### Desktop - Formulario Completo

![Patient Entry Desktop](frontend/public/images/patient-desktop.jpeg)
_Formulario responsive de agendamiento en desktop con secciones organizadas, iconos contextuales y validación completa_

#### Mobile - Vista Optimizada

![Patient Entry Mobile](frontend/public/images/patient-mobile.jpeg)

_Vista móvil del formulario de agendamiento optimizada para dispositivos táctiles con campos apilados y navegación fácil_

## 🚀 Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- MongoDB (local o Atlas)
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/matiasjaque-dev/managment-psychology-app.git
cd managment-psychology-app
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuración

### Backend (.env)

Crear un archivo `.env` en la carpeta `backend/`:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/psychology_app
# O para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/psychology_app

# JWT
JWT_SECRET=tu_jwt_secret_muy_seguro_aqui
JWT_EXPIRE=7d

# Servidor
PORT=5000
NODE_ENV=development
```

### Frontend

El frontend está configurado para conectarse automáticamente con el backend en `http://localhost:5000`. Si necesitas cambiar la URL, modifica `src/services/` en los archivos de servicio.

## 🖥️ Uso

### Desarrollo

1. **Iniciar el backend:**

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

2. **Iniciar el frontend:**

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

1. **Build del frontend:**

```bash
cd frontend
npm run build
```

2. **Iniciar el backend:**

```bash
cd backend
npm start
```

## 🔌 API Endpoints

### 🔑 Autenticación

- `POST /api/auth/login` - **Público** - Iniciar sesión

### 👨‍⚕️ Psicólogos

- `GET /api/psychologists/public` - **Público** - Lista básica para agendamiento
- `GET /api/psychologists` - **🔒 Admin** - Obtener todos los psicólogos
- `GET /api/psychologists/:id` - **🔒 Admin** - Obtener psicólogo específico
- `POST /api/psychologists` - **🔒 Admin** - Crear psicólogo
- `PUT /api/psychologists/:id` - **🔒 Admin** - Actualizar psicólogo
- `DELETE /api/psychologists/:id` - **🔒 Admin** - Eliminar psicólogo

### 👥 Pacientes

- `GET /api/patients` - **🔒 Psychologist** - Obtener todos los pacientes
- `GET /api/patients/:id` - **🔒 Psychologist** - Obtener paciente específico
- `POST /api/patients` - **🔒 Psychologist** - Crear paciente
- `PUT /api/patients/:id` - **🔒 Psychologist** - Actualizar paciente
- `DELETE /api/patients/:id` - **🔒 Psychologist** - Eliminar paciente

### 📅 Sesiones

- `GET /api/sessions` - **Público** - Obtener todas las sesiones
- `GET /api/sessions/:id` - **Público** - Obtener sesión específica
- `POST /api/sessions` - **Público** - Crear sesión (agendamiento)
- `PUT /api/sessions/:id` - **Público** - Actualizar sesión
- `DELETE /api/sessions/:id` - **Público** - Eliminar sesión

### 🔐 Headers de Autorización

```javascript
// Para rutas protegidas, incluir en headers:
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

### 📋 Códigos de Respuesta

- **200** - Operación exitosa
- **201** - Recurso creado exitosamente
- **401** - Token no válido o ausente
- **403** - Sin permisos para esta operación
- **404** - Recurso no encontrado
- **500** - Error interno del servidor

## 📁 Estructura del Proyecto

```
managment-psychology-app/
├── backend/
│   ├── src/
│   │   ├── controllers/          # Controladores de la API
│   │   ├── middlewares/         # Middlewares de autenticación
│   │   ├── models/             # Modelos de MongoDB
│   │   ├── routes/             # Definición de rutas
│   │   ├── tests/              # Tests unitarios e integración
│   │   ├── app.js              # Configuración de Express
│   │   └── index.js            # Punto de entrada
│   ├── package.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── admin/         # Componentes de administración
│   │   │   ├── layout/        # Layout y navegación
│   │   │   ├── patients/      # Componentes de pacientes
│   │   │   └── psychologists/ # Componentes de psicólogos
│   │   ├── pages/             # Páginas principales
│   │   ├── services/          # Servicios para API calls
│   │   ├── types/             # Definiciones TypeScript
│   │   ├── context/           # Context API
│   │   └── hooks/             # Custom hooks
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🧪 Testing

### Backend

```bash
cd backend
npm test                    # Ejecutar todos los tests
npm run test:unit          # Solo tests unitarios
npm run test:integration   # Solo tests de integración
npm run test:coverage     # Tests con coverage
```

### Frontend

```bash
cd frontend
npm test
```

## 🎨 Características de Diseño

### Responsive Design

- **Breakpoints:** Utiliza Material-UI breakpoints para adaptarse perfectamente
- **Mobile-first:** Diseño optimizado primero para móviles
- **Desktop enhancement:** Funcionalidades expandidas en pantallas grandes

### Tema y Colores

- **Gradientes modernos:** Azul a púrpura para elementos principales
- **Glassmorphism:** Efectos de cristal translúcido en tarjetas
- **Material Design:** Siguiendo las mejores prácticas de Google

### Componentes Adaptativos

- **Tablas → Cards:** En mobile, las tablas se convierten en cards compactas e informativas
- **Navegación:** Topbar responsive que se adapta al tamaño de pantalla
- **Botones:** Tamaños y espaciados optimizados por dispositivo
- **Formularios:** Secciones organizadas con iconos contextuales y validación
- **Estados visuales:** Chips coloreados para estados (verde=realizada, amarillo=pendiente, etc.)
- **Formato de datos:** Precios en CLP, fechas/horas localizadas
- **Acciones integradas:** Botones de editar/eliminar integrados en headers mobile
- **Formulario de agendamiento:** Multi-sección con validación completa y UX optimizada
- **Date/Time Picker:** Componente nativo de Material-UI para selección de fechas
- **Notificaciones:** SweetAlert2 para confirmaciones y alertas elegantes

## 🤝 Contribuir

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Convenciones de Código

- **TypeScript:** Tipado estricto en frontend
- **ESLint:** Linting configurado con reglas estrictas
- **Prettier:** Formateo automático de código
- **Commits:** Mensajes descriptivos en español

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Matías Jaque** - [matiasjaque-dev](https://github.com/matiasjaque-dev)

---

## 🔄 Estado del Proyecto

**Versión Actual:** v1.0.0
**Estado:** En desarrollo activo

### ✅ Características Completadas:

- [x] Sistema de autenticación con JWT
- [x] CRUD completo de psicólogos y pacientes
- [x] Gestión de sesiones con estados visuales
- [x] Diseño responsive completo
- [x] Formulario de agendamiento para pacientes
- [x] Validación completa de formularios
- [x] Componentes adaptativos (tablas → cards)

### 🚀 Próximas características:

- [ ] Dashboard con estadísticas
- [ ] Notificaciones push
- [ ] Exportación de reportes
- [ ] Chat en tiempo real
- [ ] Integración con calendario
- [ ] Sistema de recordatorios automáticos

---

_Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactarme directamente._
