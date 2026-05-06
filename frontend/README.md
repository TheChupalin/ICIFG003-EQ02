# Frontend Angular - Sistema de Gestión de Personas y Familias

Interfaz SPA moderna con Angular 21 para administración de personas y familias.

## 📋 Requisitos

- Node.js 20+ (npm 11+)
- Puerto 4200 disponible

## 🚀 Inicio rápido

### 1. Instalar dependencias
```bash
cd angular
npm install
```

### 2. Ejecutar desarrollo
```bash
npm start
```
La app se abre automáticamente en `http://localhost:4200`

## 🔐 Credenciales (Demo)

Para acceder, usa cualquier combinación:
- **Email:** `admin@test.com` o cualquiera
- **Contraseña:** `123456` o cualquiera

(El login es mock. Para producción, conectar con backend en puerto 8882)

## 📱 Funcionalidades

- ✅ Landing page responsiva
- ✅ Autenticación con guards
- ✅ CRUD Personas (con mock data)
- ✅ CRUD Familias (con mock data)
- ✅ Formularios reactivos con validación
- ✅ Confirmación de eliminaciones
- ✅ Diseño Bootstrap 5

## 🏗️ Estructura

```
angular/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── landing/         (Landing + Login)
│   │   │   ├── personas/        (CRUD Personas)
│   │   │   ├── familias/        (CRUD Familias)
│   │   ├── core/
│   │   │   ├── services/        (AuthService)
│   │   │   ├── guards/          (authGuard)
│   │   │   └── interceptors/    (errorInterceptor)
│   │   ├── shared/
│   │   │   ├── components/      (ConfirmDialog)
│   │   │   └── data/            (Mock data)
│   │   └── app.routes.ts        (Lazy loading)
│   └── index.html
└── package.json
```

## 🔗 Conectar con Backend

Cuando tengas demo02 corriendo en puerto 8882:

1. En `src/app/features/personas/services/persona.service.ts`:
   - Cambiar de mock data a llamadas HTTP
   
2. En `src/app/features/familias/services/familia.service.ts`:
   - Cambiar de mock data a llamadas HTTP

3. Actualizar `AuthService` en `src/app/core/services/auth.service.ts`

## 📦 Build Producción

```bash
npm run build
# Output en: dist/crud-personas
```

## 🛠️ Herramientas

- Angular 21.2.7
- Bootstrap 5 (CDN)
- Reactive Forms
- RxJS
- TypeScript 5.9

## 📝 Notas

- Lazy loading habilitado para features
- Signal-based state management en stores
- Mock data en memoria (se pierde al recargar)
- Error interceptor global
