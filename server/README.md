# NWL eSports - Server

> Projeto criado durante o evento NLW 09 - eSports da Rocketseat

## Iniciando o projeto

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
