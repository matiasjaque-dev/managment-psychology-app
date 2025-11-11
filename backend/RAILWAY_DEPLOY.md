# Despliegue del Backend - Railway

## Pasos para desplegar el backend:

### 1. Configurar MongoDB Atlas (si no lo has hecho)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster (tier gratuito)
3. Crea un usuario de base de datos
4. Whitelist todas las IPs (0.0.0.0/0)
5. Obtén la connection string

### 2. Desplegar en Railway

1. **Ve a [Railway.app](https://railway.app)**
2. **Regístrate/Inicia sesión** con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecciona tu repositorio**: `managment-psychology-app`
5. **Root Directory**: Cambia a `backend`

### 3. Configurar variables de entorno en Railway

En Railway Dashboard → Variables:

```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/psychology_app?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_muy_largo_y_seguro
PORT=4000
```

### 4. Verificar el despliegue

1. Railway te dará una URL como: `https://tu-proyecto.railway.app`
2. Verifica que `/api/auth` responda
3. Anota la URL para el siguiente paso

### 5. Actualizar frontend para usar el backend

Una vez que tengas la URL de Railway, actualiza el frontend para que use esa URL.

## Configuración actual:
- ✅ Puerto dinámico configurado
- ✅ MongoDB URI flexible
- ✅ CORS configurado para Vercel y Railway
- ✅ Scripts de build listos
