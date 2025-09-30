FROM denoland/deno:2.5.2

WORKDIR /app

COPY . .

EXPOSE 8080

CMD ["run", "-A", "main.ts"]