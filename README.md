# Backend con Deno 🦕

Este es el servicio de backend para la aplicación **Taskly PWA**. Es una API RESTful construida con **Deno** y el framework **Oak**.

Sus responsabilidades principales son:
-   Servir los datos de las tareas.
-   Gestionar las suscripciones a notificaciones push.
-   Enviar notificaciones push a los clientes suscritos usando el protocolo VAPID.

---

## 🛠️ Tecnologías y Dependencias

-   **Entorno de Ejecución:** [Deno](https://deno.land/ ) (v2.x recomendado)
-   **Framework Web:** [Oak](https://deno.land/x/oak ) - Un middleware robusto para Deno inspirado en Koa.
-   **CORS:** [oakCors](https://deno.land/x/cors ) - Middleware para gestionar Cross-Origin Resource Sharing.
-   **Notificaciones Push:** [web-push](https://www.npmjs.com/package/web-push ) - Librería para enviar notificaciones usando el protocolo VAPID (ejecutada a través de `npm:` en Deno).

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos
-   Tener [Deno](https://deno.land/ ) instalado en tu sistema.

### Pasos de Configuración

1.  **Clonar el Repositorio (si aplica):**
    Si estás empezando desde cero, clona el repositorio y navega a esta carpeta.
    ```bash
    cd Taskly
    ```

2.  **Generar Claves VAPID:**
    Las notificaciones push requieren un par de claves VAPID (Voluntary Application Server Identification). Ejecuta primero:
    ```bash
    deno run -A generate-vapid.ts
    ```
    Este comando creará en consola la clave publica y privada copialas y pegalas en las variables correspondientes dentro de `main.ts`.

3.  **Configurar las Claves en el Servidor:**
    Abre el archivo `main.ts` y asegúrate de que las constantes `VAPID_PUBLIC_KEY` y `VAPID_PRIVATE_KEY` estén correctamente configuradas. El script ya está preparado para leerlas desde el archivo `vapid-keys.json`, por lo que no deberías necesitar hacer cambios manuales.

4.  **Iniciar el Servidor:**
    Usa el script definido en `deno.json` para iniciar el servidor. Este comando utiliza la bandera `--watch` para reiniciar automáticamente el servidor cuando detecta cambios en los archivos.
    ```bash
    deno task start
    ```

¡Listo! El servidor de la API estará corriendo y escuchando en `http://localhost:8000`.

---

## 🔌 Endpoints de la API

-   `GET /api/tasks`: Devuelve una lista de tareas de ejemplo.
-   `POST /api/subscribe`: Recibe y almacena en memoria un objeto de suscripción push enviado desde el cliente.
-   `POST /api/send-notification`: Dispara el envío de una notificación de prueba al cliente suscrito.

---

## 📝 Notas Adicionales

-   La suscripción push se almacena en memoria, por lo que se perderá cada vez que se reinicie el servidor. Para un entorno de producción real, esta suscripción debería guardarse en una base de datos.
-   El servidor está configurado para aceptar peticiones desde cualquier origen (`CORS` ), facilitando el desarrollo con el frontend corriendo en un puerto diferente.
