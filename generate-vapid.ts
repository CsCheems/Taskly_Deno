// Fichero: generate-vapid.ts
import webpush from "npm:web-push";

console.log("Generando claves VAPID...");
const vapidKeys = webpush.generateVAPIDKeys();

console.log("---------------------------");
console.log("Copia estas claves y guárdalas de forma segura:");
console.log("Clave Pública (para el frontend):");
console.log(vapidKeys.publicKey);
console.log("\nClave Privada (para el backend):");
console.log(vapidKeys.privateKey);
console.log("---------------------------");
