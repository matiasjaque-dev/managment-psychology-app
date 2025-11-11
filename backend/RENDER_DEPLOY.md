# Despliegue del Backend - Render (Recomendado)

## ¿Por qué Render?
- ✅ 750 horas gratuitas/mes (más que Railway)
- ✅ Se pausa automáticamente al llegar al límite
- ✅ NUNCA cobra extra en plan gratuito
- ✅ Muy fácil de configurar
- ✅ Mejor para proyectos personales/académicos

## Pasos para desplegar en Render:

### 1. Preparar MongoDB Atlas (si no lo has hecho)
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster (tier gratuito)
3. Crea un usuario de base de datos
4. Whitelist todas las IPs (0.0.0.0/0)
5. Obtén la connection string

### 2. Desplegar en Render

1. **Ve a [Render.com](https://render.com)**
2. **Sign up** con GitHub
3. **New** → **Web Service**
4. **Connect repository**: Selecciona `managment-psychology-app`
5. **Configuración**:
   - **Name**: `psychology-app-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3. Variables de entorno en Render

En la configuración del servicio → Environment:

```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/psychology_app?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_muy_largo_y_seguro
PORT=10000
```

### 4. Configurar dominio personalizado (opcional)
Render te da una URL como: `https://psychology-app-backend.onrender.com`

### 5. Límites del plan gratuito:
- ✅ 750 horas/mes de ejecución
- ✅ Se pausa automáticamente después de 15 min sin actividad
- ✅ Se reactiva automáticamente con la primera request
- ✅ 500MB RAM, compartida CPU
- ✅ NUNCA cobra extra

### 6. Actualizar frontend
Una vez desplegado, actualiza la URL del backend en el frontend.

## Ventajas sobre Railway:
- Más horas gratuitas (750 vs 500)
- Política más clara de "no cobros extra"
- Se reactiva automáticamente
- Mejor para proyectos estudiantiles/personales
