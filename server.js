import { create, router as _router, defaults } from 'json-server';
const app = create();
const router = _router('db.json');
const middlewares = defaults();

// Agregar el enrutador personalizado antes del enrutador de JSON Server
app.use(customRoutes);

// Agregar el enrutador de JSON Server
app.use(router);

// Configurar los middleware
app.use(middlewares);

// Iniciar el servidor
app.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});