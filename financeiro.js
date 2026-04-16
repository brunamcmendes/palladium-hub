# Como configurar o Palladium Hub — Automação Gmail + Calendar

## O que este script faz

- **Todo dia às 8h**, automaticamente:
  - Busca e-mails de compras no Gmail (Shein, TikTok, iFood, Uber, boletos, faturas...)
  - Extrai valores e categoriza os gastos numa planilha Google Sheets
  - Cria eventos de vencimento no Google Calendar com lembretes 2 dias antes e no dia
  - Atualiza o resumo mensal com totais por categoria

---

## Passo a passo (15 minutos)

### 1. Abrir o Google Apps Script

1. Acesse **script.google.com**
2. Clique em **"Novo projeto"**
3. Renomeie o projeto para **"Palladium Hub"** (clique em "Projeto sem título" no topo)

### 2. Colar o código

1. Apague o conteúdo do editor (Ctrl+A, Delete)
2. Abra o arquivo `palladium-financeiro.gs` nesta pasta
3. Copie todo o conteúdo (Ctrl+A, Ctrl+C)
4. Cole no editor do Apps Script (Ctrl+V)
5. Clique em **Salvar** (ícone de disquete ou Ctrl+S)

### 3. Autorizar as permissões

1. No menu suspenso de funções, selecione **`configurarTrigger`**
2. Clique em **Executar** (botão ▶)
3. Vai aparecer um popup de autorização — clique em **"Revisar permissões"**
4. Escolha sua conta Google (a mesma do Gmail e Calendar)
5. Clique em **"Avançado"** → **"Acessar Palladium Hub (não seguro)"**
   *(Aparece "não seguro" porque é um script seu, não publicado — é normal)*
6. Clique em **"Permitir"**

### 4. Verificar que funcionou

1. Ainda com `configurarTrigger` selecionado, veja o log abaixo do editor
2. Deve aparecer: `✓ Trigger configurado: executarDiario todos os dias às 8h`

### 5. Testar agora

1. Mude a função selecionada para **`executarDiario`**
2. Clique em **Executar** ▶
3. Aguarde ~30 segundos
4. Veja os logs — deve aparecer o que foi encontrado no Gmail e criado no Calendar

### 6. Ver a planilha gerada

1. Acesse **drive.google.com**
2. Procure por **"Palladium Hub — Financeiro"**
3. Abra a planilha — vai ter 3 abas: **Gastos**, **Fixos** e **Resumo**

---

## Verificar os triggers

Para confirmar que a automação está ativa:

1. No Apps Script, clique em **⏰ Acionadores** (ícone de relógio na barra lateral)
2. Deve aparecer um trigger: `executarDiario` → `Baseado em tempo` → `Diariamente` → `8h`

---

## Personalizar os padrões de busca

Se quiser adicionar mais lojas ou serviços, edite a seção `PADROES_GMAIL` no script.

Exemplo para adicionar a Zara:
```javascript
{ query: 'from:zara OR from:noreply@zara.com', cat: 'Compras', nome: 'Zara' },
```

---

## Marcar conta como paga

No editor do Apps Script, você pode executar manualmente:

```javascript
marcarComoPago('Linq Internet')
```

Isso marca como paga na planilha E muda o evento do Calendar para verde.

---

## Integrar com o app (próximo passo)

Depois que a planilha estiver funcionando por alguns dias e acumulando dados, podemos:
1. Publicar a planilha como JSON (sem dados sensíveis)
2. O app lê esse JSON e exibe os gastos atualizados automaticamente
3. Sem precisar você digitar nada

---

## Dúvidas comuns

**O script não encontrou nenhum e-mail — é normal?**
Sim, se você não recebeu e-mails de compra nos últimos 3 dias. Tente mudar `DIAS_BUSCA: 30` para buscar o último mês inteiro.

**Posso mudar o horário de execução?**
Sim — na função `configurarTrigger`, mude `.atHour(8)` para o horário desejado (0-23).

**O Calendar não criou os eventos?**
Verifique se a conta Google usada na autorização é a mesma do Calendar que você usa.
