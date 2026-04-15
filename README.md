# Palladium Hub

App de gestão do Grupo Palladium / VBM — Bruna Marçal Carvalho Mendes

---

## Como publicar (passo a passo)

### 1. Subir no GitHub

1. Acesse **github.com** e faça login
2. Clique em **"New repository"** (botão verde no canto superior direito)
3. Nomeie: `palladium-hub`
4. Deixe como **Public** (necessário para o plano gratuito da Vercel)
5. Clique em **"Create repository"**
6. Na próxima tela, clique em **"uploading an existing file"**
7. Arraste **todos os arquivos e pastas** desta pasta para a área de upload
8. Clique em **"Commit changes"**

### 2. Publicar na Vercel

1. Acesse **vercel.com** e faça login (pode usar a conta GitHub)
2. Clique em **"Add New Project"**
3. Selecione o repositório `palladium-hub`
4. Clique em **"Deploy"** — sem precisar alterar nenhuma configuração
5. Aguarde ~1 minuto
6. Seu app vai estar no ar em um link como `palladium-hub.vercel.app`

### 3. Instalar no celular (Android ou iPhone)

**Android (Chrome):**
1. Abra o link do app no Chrome
2. Toque nos três pontos (⋮) no canto superior direito
3. Toque em **"Adicionar à tela inicial"**
4. Confirme — o app aparece como ícone na tela inicial

**iPhone (Safari):**
1. Abra o link do app no Safari
2. Toque no ícone de compartilhar (quadrado com seta)
3. Role e toque em **"Adicionar à tela de início"**
4. Confirme

---

## Como atualizar o app

Quando Claude gerar arquivos atualizados:

1. Acesse seu repositório no GitHub
2. Clique no arquivo que foi modificado
3. Clique no ícone de lápis (✏️) para editar
4. Cole o novo conteúdo
5. Clique em **"Commit changes"**
6. A Vercel re-publica automaticamente em ~30 segundos

---

## Estrutura do projeto

```
palladium-hub/
├── index.html          → estrutura principal do app
├── manifest.json       → configuração PWA (instalar no celular)
├── vercel.json         → configuração de deploy
├── css/
│   └── style.css       → todos os estilos visuais
├── js/
│   └── app.js          → toda a lógica e dados
└── assets/             → ícones (adicionar posteriormente)
```

---

## Dados

Os dados ficam salvos no **localStorage do navegador** — ou seja, ficam no dispositivo que você usa. Para sincronizar entre dispositivos (celular e computador), o próximo passo será adicionar um banco de dados na nuvem (Supabase, gratuito).

---

Desenvolvido com Claude (Anthropic) · Abril 2026
