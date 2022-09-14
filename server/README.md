# 🚀 NWL eSports - Server 🚀

> Projeto criado durante o evento NLW 09 - eSports da Rocketseat

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Typescript : Linguagem programação
- NodeJs : JavaScript runtime
- Express : Framework web minimalista para NodeJs
- Prisma : ORM (Object Relational Mapping)
- SQLite : Banco de dados relacional

### 📚 bibliotecas adicionais 🗃️

- cors

## 📃 Guia 📖

### Iniciando o projeto

- Iniciando um projeto node: npm init -y
- Instalando o Typescript no escopo de desenvolvimento: npm install typescript -D
- Criando o arquivo de configuração do Typescript: npx tsc --init
- Configurando o rootDir do Typescript:
  remover comentário e alterar a linha do tsconfig.json: "rootDir": "./src"
- Configurando o outDir do Typescript:
  remover comentário e alterar a linha do tsconfig.json: "outDir": "./build"
- Configurando o moduleResolution do Typescript:
  remover comentário da linha do tsconfig.json: "moduleResolution": "node"
- Adicionando script de build no package.json dentro de scripts: "build": "tsc"
- Instalando o ts-node-dev para live reload em desenvolvimento: npm install -D ts-node-dev
- Adicionando script de desenvolvimento para live reload no package.json:

### Entidades

- Game:
  - id
  - title
  - bannerUrl
- Ads:
  - id
  - gameId
  - name
  - yearsPlaying
  - discord
  - weekDays
  - hourStart
  - hourEnd
  - useVoiceChannel
  - createdAt

### Casos de uso

- Listagem de games com contagem de anúncios
- Criação de novos anúncios
- Listagem de anúncios por game
- Buscar discord pelo ID do anúncio

### Prisma

- instalando como dependência de desenvolvimento: npm i prisma -D
- iniciando o prisma no projeto com SQLite: npx prisma init --datasource-provider SQLite
- criar migration: npx prisma migrate dev
- instalando o prisma client: npm i @prisma/client

## 🔗 Links úteis ✨

- https://github.com/colinhacks/zod
