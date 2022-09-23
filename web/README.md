# 🚀 NWL eSports - Web 🚀

> Projeto criado durante o evento NLW 09 - eSports da Rocketseat

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Typescript : Linguagem programação
- Vite : Ferramenta de criação de Front-end
- React : Biblioteca criação de interfaces
- Tailwind CSS : Framework css

### 📚 bibliotecas adicionais 🗃️

- phosphor-react : Uma família de ícones limpa e amigável para React
- @radix-ui/react-dialog
- @radix-ui/react-checkbox
- @radix-ui/react-toggle-group
- @radix-ui/react-select
- axios
- react-hook-form
- @hookform/resolvers
- zod
- keen-slider

## 📃 Iniciando o projeto 📖

- criando projeto React + Typescript com Vite.js:
  npm create vite@latest
  Ok to proceed? y
  Project name: web
  Select a framework: React
  Select a variant: Typescript
- instalando as dependências do projeto: npm install

## ➕ Sugestões de melhorias ✨

- autenticação com discord

## ➕ O que fiz além ✨

- responsividade
- carrousel com biblioteca keen-slider
- uso do radix select para escolha do game
- validação com zod e react-hook-forms
- adicionada página de anúncios do game selecionado, parecido com a do mobile,
  com carrousel dos anúncios, modal de conectar e botão de copiar o discord para
  o clipboard.

## 🔗 Links úteis ✨

- https://tailwindcss.com/docs/installation/using-postcss
- https://www.radix-ui.com/docs/primitives/components/dialog
- https://www.radix-ui.com/docs/primitives/components/checkbox
- https://www.radix-ui.com/docs/primitives/components/toggle-group
- https://www.radix-ui.com/docs/primitives/components/select
- https://github.com/colinhacks/zod
- https://react-hook-form.com/get-started
- https://github.com/react-hook-form/resolvers
- https://keen-slider.io/docs

## 🔐 Resumo do fluxo de autenticação Oauth 🚫

### 🖥️ Front-End 💻

- Solicitação de login : https://discord.com/api/oauth2/authorize?client_id=1022654586537906178&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin%2Fcallback&response_type=code&scope=identify%20email
- Autorização e Credenciais do discord se preciso
- Callback da solicitação do Login : exemplo http://localhost:5173/login/callback para receber o código para login
- Enviar o código para o back-end: post para http://localhost:3333/oauth/login com o código no corpo da requisição (code)
- Recebe um token do back-end para acesso aos recursos

### ⚙️ Back-End 🗄️

- Recebe código fornecido pelo discord do front-end
- Recupera o access_token no discord : https://discord.com/api/oauth2/token com header
  'Content-Type': 'application/x-www-form-urlencoded' e no corpo da requisição os dados:
  client_id, client_secret, grant_type, code, redirect_uri.
- Recupera informações do usuário no discord : https://discord.com/api/v10/users/@me
- Verificar se o usuário já existe no banco de dados
  - caso Sim: Gera um token
  - caso Não: Cria novo usuário no banco de dados e gera um token
- Retornar ao front-end um token e as informações do usuário

## 🔗 Links para os Readme.md dos projetos do evento✨

- [Projeto server - readme.md](server/README.md)
- [Projeto web - readme.md](web/README.md)
- [Projeto mobile - readme.md](mobile/README.md)
