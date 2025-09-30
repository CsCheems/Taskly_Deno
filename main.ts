import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import webpush from "npm:web-push";

const VAPID_PUBLIC_KEY = "BD84b3_4YjcrhpVnsSPRNAlsB88M0IT16lR6Jv2H8XRmhT3IGskt8Z6w7Zy2pX5gT01F1D1ANr-BdO8zRlkU88s";
const VAPID_PRIVATE_KEY = "1xVkbo6VSKuPsTmKMwEkEI_pgmhBfrXqzBa4ScA6MrI";

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.error("Por favor, genera las claves VAPID usando 'deno run --allow-net --allow-write generate-vapid.ts' y pégalas aquí.");
  Deno.exit(1);
}

webpush.setVapidDetails(
  "mailto:j.Dev.mx@outlook.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

let pushSubscription: webpush.PushSubscription | null = null;

const router = new Router( );

// Endpoint de prueba para obtener tareas
router.get("/api/tasks", (ctx) => {
  const tasks = [
    { id: 1, title: "Configurar el backend con Deno", status: "Completada" },
    { id: 2, title: "Configurar el frontend con Next.js", status: "Completada" },
    { id: 3, title: "Conectar frontend con backend", status: "Completada" },
    { id: 4, title: "Implementar Notificaciones Push", status: "Completada" },
    { id: 5, title: "Recibir notificaciones Push", status: "Pendiente" },
  ];
  ctx.response.body = tasks;
});

router.post("/api/subscribe", async (ctx) => {
  const subscription = await ctx.request.body.json();
  pushSubscription = subscription;
  ctx.response.status = 201;
  ctx.response.body = {message: "Suscripcion guardada"};
});

router.post("/api/send-notification", async (ctx) =>{
  if(pushSubscription){
    const payload = JSON.stringify({
      title: "Notificación de Taskly",
      body: "¡Tienes una nueva tarea pendiente!",
      icon: "/logo/taskly-logo.png"
    });
    try{
      await webpush.sendNotification(pushSubscription, payload);
      ctx.response.body = {message: "Notificacion enviada con exito"};
    }catch(error){
      console.error("Error enviando la notificación:", error);
      ctx.response.status = 500;
      ctx.response.body = {message: "Error enviando la notificación"};
    }
  }else{
    ctx.response.status = 404;
    ctx.response.body = {message: "No hay suscripción guardada"};
  }
});

const app = new Application();

// Usamos CORS para permitir que nuestro frontend (en otro puerto) haga peticiones
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("🚀 Servidor Deno corriendo en http://localhost:8000" );
await app.listen({ port: 8000 });
