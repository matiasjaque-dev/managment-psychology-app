# Guía de Despliegue en Vercel

## Pasos para desplegar el proyecto en Vercel:

### 1. Preparar la base de datos MongoDB Atlas

1. Crear una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un nuevo cluster (puedes usar el tier gratuito)
3. Crear un usuario de base de datos con permisos de lectura/escritura
4. Configurar las IP permitidas (0.0.0.0/0 para permitir todas las IPs)
5. Obtener la cadena de conexión (connection string)

### 2. Preparar el repositorio

1. Asegúrate de que todos los cambios estén commiteados:
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Vercel"
   git push origin main
   ```

### 3. Configurar Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta/inicia sesión
2. Conecta tu repositorio de GitHub
3. Importa el proyecto `managment-psychology-app`

### 4. Configurar variables de entorno en Vercel

En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

```
MONGODB_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/psychology_app?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_muy_seguro_y_largo_para_produccion_de_al_menos_64_caracteres
PORT=3000
CORS_ORIGIN=https://tu-dominio-de-vercel.vercel.app
```

**Importante:**

- Genera un JWT_SECRET seguro (puedes usar: `openssl rand -base64 64`)
- Reemplaza los valores de MongoDB con los reales de tu cluster
- El CORS_ORIGIN se actualizará después del primer despliegue

### 5. Configuración del proyecto en Vercel

Vercel debería detectar automáticamente la configuración gracias al archivo `vercel.json`, pero asegúrate de que:

- **Framework Preset**: Vite
- **Root Directory**: `./` (raíz del proyecto)
- **Build Command**: Se usa el comando del vercel.json
- **Output Directory**: `frontend/dist`

### 6. Desplegar

1. Haz clic en "Deploy"
2. Espera a que termine el build (puede tomar unos minutos)
3. Una vez desplegado, verás la URL de tu aplicación

### 7. Actualizar CORS_ORIGIN

1. Copia la URL de tu aplicación desplegada
2. Ve a Settings > Environment Variables en Vercel
3. Actualiza `CORS_ORIGIN` con tu URL real
4. Redespliega la aplicación

### 8. Verificar el funcionamiento

1. Abre tu aplicación en la URL de Vercel
2. Prueba el login con las credenciales de administrador
3. Verifica que todas las funcionalidades trabajen correctamente

## Solución de problemas comunes:

### Error de CORS

- Verifica que `CORS_ORIGIN` tenga la URL correcta de tu aplicación
- Asegúrate de incluir https:// en la URL

### Error de conexión a MongoDB

- Verifica que la cadena de conexión sea correcta
- Asegúrate de que las IPs estén configuradas correctamente en Atlas
- Verifica que el usuario de DB tenga los permisos correctos

### Error 404 en rutas del frontend

- El archivo `vercel.json` debería manejar esto automáticamente
- Verifica que el routing de React Router esté configurado correctamente

### Variables de entorno no funcionan

- Asegúrate de que las variables estén configuradas en Vercel
- Redespliega después de cambiar variables de entorno

## Comandos útiles para debugging:

```bash
# Probar el build localmente (frontend)
cd frontend
npm run build
npm run preview

# Probar el backend localmente
cd backend
npm start
```

## Estructura de URLs en producción:

- Frontend: `https://tu-app.vercel.app`
- API: `https://tu-app.vercel.app/api/*`
- Login: `https://tu-app.vercel.app/login`
- Admin: `https://tu-app.vercel.app/admin`
