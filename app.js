// ═══════════════════════════════════════════════════════════════════════════════
// PALLADIUM HUB — Google Apps Script
// Roda automaticamente todo dia às 8h
// Funções: buscar gastos no Gmail + criar eventos de vencimento no Calendar
// ═══════════════════════════════════════════════════════════════════════════════

// ── CONFIGURAÇÕES ─────────────────────────────────────────────────────────────
const CONFIG = {
  // Nome da planilha que será criada/usada no Google Sheets
  PLANILHA_NOME: 'Palladium Hub — Financeiro',

  // Quantos dias de e-mails buscar a cada execução
  DIAS_BUSCA: 3,

  // Cor dos eventos de vencimento no Calendar (11 = vermelho, 9 = azul, 2 = verde)
  COR_VENCIMENTO: 11,
  COR_PAGO: 2,

  // Lembrete em minutos antes do vencimento (1440 = 1 dia, 2880 = 2 dias)
  LEMBRETE_DIAS_ANTES: 2880,
  LEMBRETE_NO_DIA: 480, // 8 horas = 8am

  // Prefixo dos eventos no Calendar para identificar os criados por este script
  PREFIXO_EVENTO: '💰 Vencimento: ',
};

// ── CONTAS FIXAS ──────────────────────────────────────────────────────────────
const CONTAS_FIXAS = [
  { nome: 'Claude (Anthropic)',  valor: 550.00,  dia: 1,  cat: 'Assinaturas' },
  { nome: 'Apple',               valor: 19.90,   dia: 1,  cat: 'Assinaturas' },
  { nome: 'Google One',          valor: 9.90,    dia: 1,  cat: 'Assinaturas' },
  { nome: 'Meli+',               valor: 74.90,   dia: 1,  cat: 'Lazer'       },
  { nome: 'Linq Internet',       valor: 129.90,  dia: 10, cat: 'Casa'        },
  { nome: 'Einstein PGGS',       valor: 1533.17, dia: 10, cat: 'Educação'    },
];

// ── PADRÕES DE BUSCA NO GMAIL ─────────────────────────────────────────────────
// Cada entrada: { remetente ou assunto para buscar, categoria, nome amigável }
const PADROES_GMAIL = [
  // Compras e moda
  { query: 'from:noreply@shein.com OR from:email.shein.com',           cat: 'Compras',  nome: 'Shein'          },
  { query: 'from:noreply@shopee.com.br OR from:shopee',                cat: 'Compras',  nome: 'Shopee'         },
  { query: 'from:mercadopago OR (assunto:pagamento mercadolivre)',      cat: 'Compras',  nome: 'Mercado Livre'  },
  { query: 'from:amazon.com.br OR from:marketplace@amazon',            cat: 'Compras',  nome: 'Amazon'         },

  // Delivery e alimentação
  { query: 'from:ifood OR from:noreply@ifood.com.br',                  cat: 'Lazer',    nome: 'iFood'          },
  { query: 'from:uber OR from:uber-eats',                               cat: 'Transporte', nome: 'Uber'         },
  { query: 'from:rappi OR from:noreply@rappi.com',                      cat: 'Lazer',    nome: 'Rappi'         },

  // Streaming e lazer
  { query: 'from:tiktok OR from:noreply@tiktok.com',                   cat: 'Lazer',    nome: 'TikTok'         },
  { query: 'from:netflix OR from:info@mailer.netflix.com',              cat: 'Lazer',    nome: 'Netflix'        },
  { query: 'from:spotify OR from:no-reply@spotify.com',                 cat: 'Lazer',    nome: 'Spotify'        },
  { query: 'from:youtube OR from:youtube-noreply',                      cat: 'Lazer',    nome: 'YouTube Premium'},

  // Saúde e bem-estar
  { query: 'from:gympass OR from:wellhub',                              cat: 'Saúde',    nome: 'Wellhub/Gympass'},
  { query: '(farmácia OR drogasil OR ultrafarma) compra confirmada',    cat: 'Saúde',    nome: 'Farmácia'       },

  // Transporte
  { query: 'from:99app OR from:99taxi',                                  cat: 'Transporte', nome: '99'           },

  // Contas de casa
  { query: 'from:saneago OR fatura saneago',                            cat: 'Casa',     nome: 'Saneago'        },
  { query: 'from:equatorial OR from:celg OR fatura energia',            cat: 'Casa',     nome: 'Energia'        },
  { query: 'from:comgas OR fatura gas',                                  cat: 'Casa',     nome: 'Gás'            },

  // Boletos e faturas genéricas
  { query: 'subject:(fatura OR boleto OR cobrança OR vencimento) -from:noreply@github.com', cat: 'Outros', nome: 'Boleto/Fatura' },

  // Cartão de crédito
  { query: 'subject:(fatura do cartão OR fatura cartão OR seu cartão)',  cat: 'Cartão',   nome: 'Fatura Cartão'  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// FUNÇÃO PRINCIPAL — executada automaticamente pelo trigger diário
// ═══════════════════════════════════════════════════════════════════════════════
function executarDiario() {
  Logger.log('=== Palladium Hub — Execução diária: ' + new Date().toLocaleString('pt-BR') + ' ===');

  try {
    const planilha = obterOuCriarPlanilha();
    buscarGastosGmail(planilha);
    sincronizarCalendar(planilha);
    atualizarResumoMensal(planilha);
    Logger.log('✓ Execução concluída com sucesso');
  } catch (e) {
    Logger.log('✗ Erro na execução: ' + e.toString());
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PLANILHA
// ═══════════════════════════════════════════════════════════════════════════════
function obterOuCriarPlanilha() {
  const arquivos = DriveApp.getFilesByName(CONFIG.PLANILHA_NOME);
  if (arquivos.hasNext()) {
    const arquivo = arquivos.next();
    return SpreadsheetApp.openById(arquivo.getId());
  }

  // Cria nova planilha
  const ss = SpreadsheetApp.create(CONFIG.PLANILHA_NOME);
  criarAbaGastos(ss);
  criarAbaFixos(ss);
  criarAbaResumo(ss);
  Logger.log('✓ Planilha criada: ' + ss.getUrl());
  return ss;
}

function criarAbaGastos(ss) {
  let aba = ss.getSheetByName('Gastos');
  if (!aba) aba = ss.insertSheet('Gastos');
  aba.clearContents();
  const cabecalho = ['Data', 'Descrição', 'Valor (R$)', 'Categoria', 'Fonte', 'E-mail ID', 'Mês'];
  aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold').setBackground('#534AB7').setFontColor('white');
  aba.setFrozenRows(1);
}

function criarAbaFixos(ss) {
  let aba = ss.getSheetByName('Fixos');
  if (!aba) aba = ss.insertSheet('Fixos');
  aba.clearContents();
  const cabecalho = ['Nome', 'Valor (R$)', 'Dia Vencimento', 'Categoria', 'Pago', 'Mês Referência'];
  aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold').setBackground('#0F6E56').setFontColor('white');
  aba.setFrozenRows(1);

  // Popula com as contas fixas
  const mesAtual = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM');
  const dados = CONTAS_FIXAS.map(c => [c.nome, c.valor, c.dia, c.cat, 'NÃO', mesAtual]);
  if (dados.length > 0) {
    aba.getRange(2, 1, dados.length, 6).setValues(dados);
  }
}

function criarAbaResumo(ss) {
  let aba = ss.getSheetByName('Resumo');
  if (!aba) aba = ss.insertSheet('Resumo');
  aba.clearContents();
  const cabecalho = ['Mês', 'Total Fixos', 'Total Variáveis', 'Total Gastos', 'Pró-labore', 'Saldo', 'Atualizado em'];
  aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold').setBackground('#854F0B').setFontColor('white');
  aba.setFrozenRows(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUSCA DE GASTOS NO GMAIL
// ═══════════════════════════════════════════════════════════════════════════════
function buscarGastosGmail(ss) {
  const aba = ss.getSheetByName('Gastos') || criarAbaGastos(ss);
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - CONFIG.DIAS_BUSCA);

  // Pega IDs já processados para não duplicar
  const dados = aba.getDataRange().getValues();
  const idsProcessados = new Set(dados.slice(1).map(r => r[5]).filter(id => id));

  let totalNovos = 0;
  const novosRegistros = [];

  PADROES_GMAIL.forEach(padrao => {
    try {
      const queryCompleta = padrao.query + ' newer_than:' + CONFIG.DIAS_BUSCA + 'd';
      const threads = GmailApp.search(queryCompleta, 0, 20);

      threads.forEach(thread => {
        const msgs = thread.getMessages();
        msgs.forEach(msg => {
          if (msg.getDate() < dataLimite) return;
          if (idsProcessados.has(msg.getId())) return;

          const valor = extrairValor(msg.getBody() + ' ' + msg.getSubject());
          const data = Utilities.formatDate(msg.getDate(), 'America/Sao_Paulo', 'dd/MM/yyyy');
          const mes  = Utilities.formatDate(msg.getDate(), 'America/Sao_Paulo', 'yyyy-MM');
          const desc = padrao.nome + ' — ' + msg.getSubject().substring(0, 60);

          novosRegistros.push([data, desc, valor || '', padrao.cat, padrao.nome, msg.getId(), mes]);
          idsProcessados.add(msg.getId());
          totalNovos++;
        });
      });
    } catch (e) {
      Logger.log('Erro ao buscar ' + padrao.nome + ': ' + e.message);
    }
  });

  if (novosRegistros.length > 0) {
    const ultimaLinha = aba.getLastRow() + 1;
    aba.getRange(ultimaLinha, 1, novosRegistros.length, 7).setValues(novosRegistros);
    Logger.log('✓ Gmail: ' + totalNovos + ' novos registros encontrados');
  } else {
    Logger.log('✓ Gmail: nenhum novo gasto nos últimos ' + CONFIG.DIAS_BUSCA + ' dias');
  }
}

// Extrai valor monetário do corpo/assunto do e-mail
function extrairValor(texto) {
  // Padrões: R$ 1.234,56 ou R$1234.56 ou 1.234,56 ou BRL 1234
  const padroes = [
    /R\$\s*([\d.,]+)/i,
    /BRL\s*([\d.,]+)/i,
    /valor[:\s]+R?\$?\s*([\d.,]+)/i,
    /total[:\s]+R?\$?\s*([\d.,]+)/i,
    /cobrança[:\s]+R?\$?\s*([\d.,]+)/i,
  ];

  for (const padrao of padroes) {
    const match = texto.match(padrao);
    if (match) {
      const valorStr = match[1].replace(/\./g, '').replace(',', '.');
      const valor = parseFloat(valorStr);
      if (!isNaN(valor) && valor > 0 && valor < 50000) {
        return valor;
      }
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE CALENDAR — SINCRONIZAR VENCIMENTOS
// ═══════════════════════════════════════════════════════════════════════════════
function sincronizarCalendar(ss) {
  const calendar = CalendarApp.getDefaultCalendar();
  const agora = new Date();
  const mes = agora.getMonth();
  const ano = agora.getFullYear();

  let criados = 0, atualizados = 0;

  CONTAS_FIXAS.forEach(conta => {
    // Cria evento para este mês e próximo mês
    [-1, 0, 1, 2].forEach(delta => {
      const dataMes = new Date(ano, mes + delta, conta.dia);
      if (dataMes < new Date(ano, mes - 1, 1)) return; // Não criar no passado distante

      const titulo = CONFIG.PREFIXO_EVENTO + conta.nome + ' — R$ ' + conta.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2});

      // Verifica se já existe
      const inicio = new Date(dataMes);
      inicio.setHours(9, 0, 0, 0);
      const fim = new Date(dataMes);
      fim.setHours(9, 30, 0, 0);

      const eventosExistentes = calendar.getEvents(
        new Date(dataMes.getFullYear(), dataMes.getMonth(), dataMes.getDate(), 0, 0),
        new Date(dataMes.getFullYear(), dataMes.getMonth(), dataMes.getDate(), 23, 59)
      );

      const jaExiste = eventosExistentes.some(e => e.getTitle().startsWith(CONFIG.PREFIXO_EVENTO + conta.nome));

      if (!jaExiste) {
        const evento = calendar.createEvent(titulo, inicio, fim, {
          description: `Categoria: ${conta.cat}\nValor: R$ ${conta.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}\nGerado automaticamente pelo Palladium Hub`,
          color: CalendarApp.EventColor.RED,
        });

        // Adiciona lembretes
        evento.addPopupReminder(CONFIG.LEMBRETE_DIAS_ANTES); // 2 dias antes
        evento.addPopupReminder(CONFIG.LEMBRETE_NO_DIA);      // no dia às 8h
        evento.addEmailReminder(CONFIG.LEMBRETE_DIAS_ANTES);  // e-mail 2 dias antes

        criados++;
      }
    });
  });

  Logger.log(`✓ Calendar: ${criados} eventos criados, ${atualizados} atualizados`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESUMO MENSAL
// ═══════════════════════════════════════════════════════════════════════════════
function atualizarResumoMensal(ss) {
  const abaGastos = ss.getSheetByName('Gastos');
  const abaResumo = ss.getSheetByName('Resumo');
  if (!abaGastos || !abaResumo) return;

  const mesAtual = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM');
  const dadosGastos = abaGastos.getDataRange().getValues();

  // Soma variáveis do mês atual (excluindo cabeçalho)
  let totalVariaveis = 0;
  dadosGastos.slice(1).forEach(row => {
    if (row[6] === mesAtual && row[2]) {
      totalVariaveis += Number(row[2]) || 0;
    }
  });

  const totalFixos = CONTAS_FIXAS.reduce((s, c) => s + c.valor, 0);
  const totalGastos = totalFixos + totalVariaveis;
  const proLabore = 7000; // Valor configurado
  const saldo = proLabore - totalGastos;
  const agora = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');

  // Verifica se já tem linha do mês
  const dadosResumo = abaResumo.getDataRange().getValues();
  const linhaExistente = dadosResumo.findIndex(r => r[0] === mesAtual);

  const novaLinha = [mesAtual, totalFixos, totalVariaveis, totalGastos, proLabore, saldo, agora];

  if (linhaExistente > 0) {
    abaResumo.getRange(linhaExistente + 1, 1, 1, 7).setValues([novaLinha]);
  } else {
    abaResumo.appendRow(novaLinha);
  }

  // Formata valores monetários
  const ultima = abaResumo.getLastRow();
  abaResumo.getRange(ultima, 2, 1, 5).setNumberFormat('R$ #,##0.00');

  Logger.log(`✓ Resumo ${mesAtual}: fixos R$${totalFixos.toFixed(2)}, variáveis R$${totalVariaveis.toFixed(2)}, saldo R$${saldo.toFixed(2)}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO DO TRIGGER DIÁRIO
// Execute esta função UMA VEZ para ativar a automação
// ═══════════════════════════════════════════════════════════════════════════════
function configurarTrigger() {
  // Remove triggers antigos deste script
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'executarDiario') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Cria novo trigger: todo dia às 8h (horário de Brasília)
  ScriptApp.newTrigger('executarDiario')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .inTimezone('America/Sao_Paulo')
    .create();

  Logger.log('✓ Trigger configurado: executarDiario todos os dias às 8h (Brasília)');
  Logger.log('✓ Execute executarDiario() agora para testar');
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════════════════════

// Marcar uma conta fixa como paga no Sheets
function marcarComoPago(nomeConta) {
  const ss = obterOuCriarPlanilha();
  const aba = ss.getSheetByName('Fixos');
  if (!aba) return;

  const dados = aba.getDataRange().getValues();
  const mesAtual = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM');

  dados.forEach((row, i) => {
    if (i === 0) return;
    if (row[0] === nomeConta && row[5] === mesAtual) {
      aba.getRange(i + 1, 5).setValue('SIM');
      // Atualiza evento no Calendar para cor verde
      atualizarCorEventoCalendar(nomeConta, CalendarApp.EventColor.GREEN);
    }
  });
}

function atualizarCorEventoCalendar(nomeConta, cor) {
  const calendar = CalendarApp.getDefaultCalendar();
  const hoje = new Date();
  const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const eventos = calendar.getEvents(hoje, fimMes);
  eventos.forEach(e => {
    if (e.getTitle().startsWith(CONFIG.PREFIXO_EVENTO + nomeConta)) {
      e.setColor(cor);
    }
  });
}

// Gera relatório do mês atual no log
function relatorioMes() {
  const ss = obterOuCriarPlanilha();
  const abaGastos = ss.getSheetByName('Gastos');
  if (!abaGastos) { Logger.log('Planilha não encontrada. Execute configurarTrigger() primeiro.'); return; }

  const mesAtual = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'yyyy-MM');
  const dados = abaGastos.getDataRange().getValues();
  const doMes = dados.slice(1).filter(r => r[6] === mesAtual);

  const porCategoria = {};
  doMes.forEach(r => {
    if (!porCategoria[r[3]]) porCategoria[r[3]] = 0;
    porCategoria[r[3]] += Number(r[2]) || 0;
  });

  Logger.log('\n=== RELATÓRIO ' + mesAtual + ' ===');
  Object.entries(porCategoria).sort((a,b) => b[1]-a[1]).forEach(([cat, val]) => {
    Logger.log(cat + ': R$ ' + val.toFixed(2));
  });
  const total = Object.values(porCategoria).reduce((s,v) => s+v, 0);
  Logger.log('TOTAL VARIÁVEIS: R$ ' + total.toFixed(2));
  Logger.log('FIXOS: R$ ' + CONTAS_FIXAS.reduce((s,c) => s+c.valor, 0).toFixed(2));
  Logger.log('GRAND TOTAL: R$ ' + (total + CONTAS_FIXAS.reduce((s,c) => s+c.valor, 0)).toFixed(2));
}
