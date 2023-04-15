# NestJS Boilerplate

npm install

1. Criar o arquivo .env `cp .env.example .env`

2. para gerar chaves rodar  `openssl rand -base64 32`

3. Definir variáveis .env  
DATABASE_NAME e DATABASE_PASSWORD
JWT_SECRET e SESSION_SECRET

4. Levantar o banco de dados  
`docker compose up -d`

5. Iniciar a Aplicação
`npm run start`