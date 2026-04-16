// ── FINANCEIRO MODULE ─────────────────────────────────────────────────────────
// Arquivo separado para o módulo financeiro completo
// Importado pelo index.html após app.js

const KF = {
  lancamentos: 'phub_fin_lanc',
  orcamento:   'phub_fin_orc',
  empresa:     'phub_fin_emp',
  mesAtivo:    'phub_fin_mes',
};

// ── CONTAS FIXAS PRÉ-CADASTRADAS ─────────────────────────────────────────────
const FIXOS_DEFAULT = [
  { id:'f1', nome:'Claude (Anthropic)', valor:550.00,    dia:1,  cat:'Assinaturas', tipo:'despesa', auto:true,  pago:false },
  { id:'f2', nome:'Apple',              valor:19.90,     dia:1,  cat:'Assinaturas', tipo:'despesa', auto:true,  pago:false },
  { id:'f3', nome:'Google One',         valor:9.90,      dia:1,  cat:'Assinaturas', tipo:'despesa', auto:true,  pago:false },
  { id:'f4', nome:'Meli+',              valor:74.90,     dia:1,  cat:'Lazer',       tipo:'despesa', auto:true,  pago:false },
  { id:'f5', nome:'Linq Internet',      valor:129.90,    dia:10, cat:'Casa',        tipo:'despesa', auto:true,  pago:false },
  { id:'f6', nome:'Einstein PGGS',      valor:1533.17,   dia:10, cat:'Educação',    tipo:'despesa', auto:false, pago:false },
];

const VARIAVEIS_DEFAULT = [
  { id:'v1', nome:'Saúde e bem-estar',  valor:400,  cat:'Saúde',      tipo:'despesa', variavel:true, pago:false },
  { id:'v2', nome:'Roupas e compras',   valor:300,  cat:'Compras',    tipo:'despesa', variavel:true, pago:false },
  { id:'v3', nome:'Casa (Saneago, gás)',valor:250,  cat:'Casa',       tipo:'despesa', variavel:true, pago:false },
  { id:'v4', nome:'Lazer e delivery',   valor:400,  cat:'Lazer',      tipo:'despesa', variavel:true, pago:false },
  { id:'v5', nome:'Investimentos',      valor:650,  cat:'Investimento',tipo:'despesa',variavel:true, pago:false },
  { id:'v6', nome:'Outros variáveis',   valor:500,  cat:'Outros',     tipo:'despesa', variavel:true, pago:false },
];

const EMPRESA_DEFAULT = [
  { id:'e1', nome:'Condomínio',      valor:0, cat:'Empresa→Bruna', obs:'Pago pela empresa — deduzir da distribuição' },
  { id:'e2', nome:'IPVA',            valor:0, cat:'Empresa→Bruna', obs:'Pago pela empresa — deduzir da distribuição' },
  { id:'e3', nome:'IPTU',            valor:0, cat:'Empresa→Bruna', obs:'Pago pela empresa — deduzir da distribuição' },
  { id:'e4', nome:'Energia elétrica',valor:0, cat:'Empresa→Bruna', obs:'Pago pela empresa — deduzir da distribuição' },
  { id:'e5', nome:'Seguro do carro', valor:0, cat:'Empresa→Bruna', obs:'Pago pela empresa — deduzir da distribuição' },
];

function initFinanceiro() {
  if (!localStorage.getItem(KF.lancamentos)) {
    const mes = getMesAtivo();
    const lancs = [...FIXOS_DEFAULT, ...VARIAVEIS_DEFAULT].map(f => ({
      ...f,
      id: f.id + '_' + mes,
      mes,
      fixoRef: f.id,
    }));
    svF(KF.lancamentos, lancs);
  }
  if (!localStorage.getItem(KF.orcamento)) {
    svF(KF.orcamento, {
      proLabore: 7000,
      metaReserva: 1000,
      alertas: true,
    });
  }
  if (!localStorage.getItem(KF.empresa)) {
    svF(KF.empresa, EMPRESA_DEFAULT);
  }
}

function ldF(k) { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } }
function svF(k, d) { try { localStorage.setItem(k, JSON.stringify(d)); } catch {} }

function getMesAtivo() {
  const saved = localStorage.getItem(KF.mesAtivo);
  if (saved) return saved;
  const now = new Date();
  const mes = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  localStorage.setItem(KF.mesAtivo, mes);
  return mes;
}

function setMesAtivo(mes) {
  localStorage.setItem(KF.mesAtivo, mes);
  // Gera lançamentos do mês se não existirem
  const todos = ldF(KF.lancamentos);
  const doMes = todos.filter(l => l.mes === mes);
  if (doMes.length === 0) {
    const novos = [...FIXOS_DEFAULT, ...VARIAVEIS_DEFAULT].map(f => ({
      ...f,
      id: f.id + '_' + mes,
      mes,
      fixoRef: f.id,
      pago: false,
    }));
    svF(KF.lancamentos, [...todos, ...novos]);
  }
  renderFinanceiroCompleto();
}

function fmtMes(mesStr) {
  const [y, m] = mesStr.split('-');
  const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${meses[parseInt(m)-1]} ${y}`;
}

function getMesesDisponiveis() {
  const todos = ldF(KF.lancamentos);
  const meses = [...new Set(todos.map(l => l.mes))].sort();
  return meses;
}

function getProximosMeses(n=3) {
  const now = new Date();
  const result = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    result.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`);
  }
  return result;
}

// ── RENDER FINANCEIRO COMPLETO ────────────────────────────────────────────────
function renderFinanceiroCompleto() {
  const container = document.getElementById('fin-completo');
  if (!container) return;

  const mes = getMesAtivo();
  const todos = ldF(KF.lancamentos);
  const doMes = todos.filter(l => l.mes === mes);
  const orc = ldF(KF.orcamento) || { proLabore: 7000 };
  const empresa = ldF(KF.empresa);

  const totalDesp = doMes.filter(l=>l.tipo==='despesa').reduce((s,l)=>s+Number(l.valor||0),0);
  const totalRec  = Number(orc.proLabore || 7000);
  const saldo     = totalRec - totalDesp;
  const pagas     = doMes.filter(l=>l.pago&&l.tipo==='despesa').reduce((s,l)=>s+Number(l.valor||0),0);
  const pendentes = totalDesp - pagas;
  const totalEmp  = empresa.reduce((s,e)=>s+Number(e.valor||0),0);

  // Agrupamento por categoria
  const porCat = {};
  doMes.filter(l=>l.tipo==='despesa').forEach(l=>{
    if (!porCat[l.cat]) porCat[l.cat] = 0;
    porCat[l.cat] += Number(l.valor||0);
  });

  const catColors = {
    'Assinaturas':'#534AB7','Educação':'#0F6E56','Casa':'#854F0B',
    'Saúde':'#E24B4A','Lazer':'#993556','Compras':'#185FA5',
    'Investimento':'#639922','Outros':'#888780',
  };

  const mesesNav = getMesesDisponiveis();
  const proxMeses = getProximosMeses(3);

  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;flex-wrap:wrap">
      <div style="display:flex;gap:4px;background:var(--surface2);padding:4px;border-radius:10px">
        ${mesesNav.map(m=>`
          <button onclick="setMesAtivo('${m}')" style="font-size:12px;padding:5px 12px;cursor:pointer;border-radius:8px;border:none;background:${m===mes?'var(--surface)':'transparent'};color:${m===mes?'var(--text)':'var(--text-3)'};font-weight:${m===mes?'500':'400'};font-family:var(--font-body);transition:all .12s">${fmtMes(m)}</button>`).join('')}
        <button onclick="adicionarMes()" style="font-size:12px;padding:5px 10px;cursor:pointer;border-radius:8px;border:none;background:transparent;color:var(--text-3);font-family:var(--font-body)">+ Mês</button>
      </div>
      <button onclick="abrirGmailSync()" style="font-size:12px;padding:6px 14px;cursor:pointer;border-radius:20px;border:1px solid var(--pes-mid);background:var(--pes-light);color:var(--pes-dark);font-family:var(--font-body);font-weight:500">Gmail — buscar cobranças ↗</button>
      <button onclick="abrirCalendarSync()" style="font-size:12px;padding:6px 14px;cursor:pointer;border-radius:20px;border:1px solid var(--pal-mid);background:var(--pal-light);color:var(--pal-dark);font-family:var(--font-body);font-weight:500">Sincronizar Calendar ↗</button>
    </div>

    <!-- MÉTRICAS DO MÊS -->
    <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--card-gap);margin-bottom:1.25rem">
      <div class="metric m-pes">
        <div class="metric-lbl">Pró-labore previsto</div>
        <div class="metric-val" style="font-size:18px">R$ ${totalRec.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div class="metric-sub">receita do mês</div>
      </div>
      <div class="metric m-urg">
        <div class="metric-lbl">Total despesas</div>
        <div class="metric-val" style="font-size:18px">R$ ${totalDesp.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div class="metric-sub">${doMes.filter(l=>l.tipo==='despesa').length} lançamentos</div>
      </div>
      <div class="metric ${saldo>=0?'m-pal':'m-urg'}">
        <div class="metric-lbl">Saldo do mês</div>
        <div class="metric-val" style="font-size:18px;color:${saldo>=0?'var(--pes)':'var(--urg)'}">R$ ${saldo.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div class="metric-sub">${saldo>=0?'positivo':'atenção'}</div>
      </div>
      <div class="metric m-amber" style="background:var(--inv-light);border-color:var(--inv-mid)">
        <div class="metric-lbl">Pendente pagar</div>
        <div class="metric-val" style="font-size:18px;color:var(--inv-dark)">R$ ${pendentes.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
        <div class="metric-sub">${doMes.filter(l=>!l.pago&&l.tipo==='despesa').length} contas em aberto</div>
      </div>
    </div>

    <!-- GRÁFICO POR CATEGORIA + CONTAS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem">

      <!-- Categorias -->
      <div class="fin-card">
        <div class="fin-hd">Gastos por categoria — ${fmtMes(mes)}</div>
        ${Object.entries(porCat).sort((a,b)=>b[1]-a[1]).map(([cat,val])=>{
          const pct = totalDesp > 0 ? Math.round((val/totalDesp)*100) : 0;
          const cor = catColors[cat] || '#888780';
          return `<div style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
              <span style="color:var(--text-2)">${cat}</span>
              <span style="font-weight:500;color:var(--text)">R$ ${val.toLocaleString('pt-BR',{minimumFractionDigits:2})} <span style="color:var(--text-3);font-weight:400">(${pct}%)</span></span>
            </div>
            <div style="height:6px;background:var(--surface2);border-radius:10px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:${cor};border-radius:10px;transition:width .3s"></div>
            </div>
          </div>`;
        }).join('')}
        <div style="border-top:1px solid var(--border);padding-top:10px;margin-top:6px;display:flex;justify-content:space-between;font-size:12px">
          <span style="font-weight:500;color:var(--text)">Total</span>
          <span style="font-weight:500;color:var(--urg)">R$ ${totalDesp.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
      </div>

      <!-- Projeção 3 meses -->
      <div class="fin-card">
        <div class="fin-hd">Projeção próximos 3 meses</div>
        ${proxMeses.map((m,i)=>{
          const proj = totalRec - totalDesp;
          const acum = proj * (i+1);
          return `<div style="padding:10px 0;border-bottom:1px solid var(--border)">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div style="font-size:12px;font-weight:500;color:var(--text)">${fmtMes(m)}</div>
                <div style="font-size:11px;color:var(--text-3)">Fixos: R$ ${totalDesp.toLocaleString('pt-BR',{minimumFractionDigits:2})}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:13px;font-weight:500;color:${proj>=0?'var(--pes)':'var(--urg)'}">R$ ${proj.toLocaleString('pt-BR',{minimumFractionDigits:2})}</div>
                <div style="font-size:10px;color:var(--text-3)">acum. R$ ${acum.toLocaleString('pt-BR',{minimumFractionDigits:0})}</div>
              </div>
            </div>
          </div>`;
        }).join('')}
        <div style="padding-top:10px;font-size:11px;color:var(--text-3)">
          Baseado no pró-labore de R$ ${totalRec.toLocaleString('pt-BR')} e despesas fixas de R$ ${totalDesp.toLocaleString('pt-BR',{minimumFractionDigits:2})}
        </div>
      </div>
    </div>

    <!-- LANÇAMENTOS -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem">

      <!-- Fixos -->
      <div class="fin-card">
        <div class="fin-hd" style="display:flex;justify-content:space-between;align-items:center">
          <span>Contas fixas</span>
          <span style="font-size:11px;font-weight:400;color:var(--text-3)">R$ ${doMes.filter(l=>!l.variavel&&l.tipo==='despesa').reduce((s,l)=>s+Number(l.valor||0),0).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
        ${doMes.filter(l=>!l.variavel&&l.tipo==='despesa').map(l=>`
          <div class="fin-row">
            <div class="fin-left">
              <div class="fin-name">${l.nome}</div>
              <div class="fin-dt">${l.dia?`Dia ${l.dia}`:'Sem data'} · ${l.cat}</div>
            </div>
            <div class="fin-right">
              <span class="fin-val neg">R$ ${Number(l.valor).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
              <button onclick="togglePagoFin('${l.id}')" style="font-size:10px;padding:2px 7px;border-radius:20px;border:none;cursor:pointer;font-family:var(--font-body);background:${l.pago?'var(--pes-light)':'var(--surface2)'};color:${l.pago?'var(--pes-dark)':'var(--text-3)'}">${l.pago?'✓ pago':'pagar'}</button>
            </div>
          </div>`).join('')}
      </div>

      <!-- Variáveis -->
      <div class="fin-card">
        <div class="fin-hd" style="display:flex;justify-content:space-between;align-items:center">
          <span>Variáveis do mês</span>
          <button onclick="toggleForm('form-fin-var')" style="font-size:11px;padding:2px 8px;border-radius:20px;border:1px solid var(--border-mid);background:transparent;color:var(--text-3);cursor:pointer;font-family:var(--font-body)">+ lançar</button>
        </div>
        <div class="form-box" id="form-fin-var" style="margin-bottom:8px">
          <div class="fg">
            <input id="fv-nome" placeholder="Descrição">
            <select id="fv-cat">
              <option value="Saúde">Saúde</option>
              <option value="Compras">Compras</option>
              <option value="Casa">Casa</option>
              <option value="Lazer">Lazer</option>
              <option value="Investimento">Investimento</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div class="fg">
            <input id="fv-valor" type="number" placeholder="Valor R$">
            <input id="fv-data" type="date">
          </div>
          <div class="fa">
            <button class="btn-save" onclick="salvarVarFin()">Salvar</button>
            <button class="btn-cancel" onclick="toggleForm('form-fin-var')">Cancelar</button>
          </div>
        </div>
        ${doMes.filter(l=>l.variavel&&l.tipo==='despesa').map(l=>`
          <div class="fin-row">
            <div class="fin-left">
              <div class="fin-name">${l.nome}</div>
              <div class="fin-dt">${l.data?l.data:''} · ${l.cat}</div>
            </div>
            <div class="fin-right">
              <span class="fin-val neg">R$ ${Number(l.valor).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
              <button class="del-x" onclick="delLancFin('${l.id}')">✕</button>
            </div>
          </div>`).join('')}
        <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:4px;display:flex;justify-content:space-between;font-size:12px">
          <span style="color:var(--text-3)">Total variáveis</span>
          <span style="font-weight:500;color:var(--urg)">R$ ${doMes.filter(l=>l.variavel&&l.tipo==='despesa').reduce((s,l)=>s+Number(l.valor||0),0).toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
        </div>
      </div>
    </div>

    <!-- EMPRESA PAGA POR VOCÊ -->
    <div class="fin-card" style="margin-bottom:1.25rem">
      <div class="fin-hd" style="display:flex;justify-content:space-between;align-items:center">
        <span>Empresa paga por você — deduzir da distribuição</span>
        <span style="font-size:11px;font-weight:400;color:var(--inv-dark)">Total: R$ ${totalEmp.toLocaleString('pt-BR',{minimumFractionDigits:2})}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
        ${empresa.map(e=>`
          <div style="text-align:center;background:var(--inv-light);border-radius:var(--radius-md);padding:10px 8px;border:1px solid var(--inv-mid)">
            <div style="font-size:11px;color:var(--inv-dark);font-weight:500;margin-bottom:4px">${e.nome}</div>
            <div style="font-size:14px;font-weight:700;color:var(--inv-dark);font-family:var(--font-display)">${e.valor?'R$ '+Number(e.valor).toLocaleString('pt-BR',{minimumFractionDigits:2}):'—'}</div>
            <button onclick="editarEmpresa('${e.id}')" style="font-size:10px;color:var(--text-3);background:transparent;border:none;cursor:pointer;margin-top:4px">editar</button>
          </div>`).join('')}
      </div>
      <div style="margin-top:10px;font-size:11px;color:var(--text-3);font-style:italic">
        Passe os valores quando tiver — serão deduzidos automaticamente da sua distribuição de lucros.
      </div>
    </div>

    <!-- PRÓL-LABORE RECOMENDADO -->
    <div style="background:var(--pal-light);border:1px solid var(--pal-mid);border-radius:var(--radius-lg);padding:1rem;margin-bottom:1.25rem">
      <div style="font-size:12px;font-weight:600;color:var(--pal-dark);margin-bottom:8px;letter-spacing:.05em;text-transform:uppercase">Análise de pró-labore</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
        <div>
          <div style="font-size:11px;color:var(--pal-dark);margin-bottom:2px">Mínimo necessário</div>
          <div style="font-size:20px;font-weight:700;color:var(--pal);font-family:var(--font-display)">R$ ${totalDesp.toLocaleString('pt-BR',{minimumFractionDigits:0})}</div>
          <div style="font-size:10px;color:var(--pal-dark)">cobre exatamente os gastos</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--pal-dark);margin-bottom:2px">Recomendado (30% folga)</div>
          <div style="font-size:20px;font-weight:700;color:var(--pal);font-family:var(--font-display)">R$ ${Math.ceil(totalDesp*1.3/100)*100}.00</div>
          <div style="font-size:10px;color:var(--pal-dark)">margem para imprevistos</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--pal-dark);margin-bottom:2px">Atual configurado</div>
          <div style="font-size:20px;font-weight:700;color:var(--pal);font-family:var(--font-display)">R$ ${Number(orc.proLabore).toLocaleString('pt-BR',{minimumFractionDigits:0})}</div>
          <button onclick="editarProLabore()" style="font-size:10px;color:var(--pal-dark);background:transparent;border:none;cursor:pointer;padding:0;margin-top:2px">editar →</button>
        </div>
      </div>
    </div>
  `;
}

// ── AÇÕES FINANCEIRO ──────────────────────────────────────────────────────────
function togglePagoFin(id) {
  const todos = ldF(KF.lancamentos);
  const i = todos.findIndex(l => l.id === id);
  if (i > -1) { todos[i].pago = !todos[i].pago; svF(KF.lancamentos, todos); renderFinanceiroCompleto(); }
}

function delLancFin(id) {
  svF(KF.lancamentos, ldF(KF.lancamentos).filter(l => l.id !== id));
  renderFinanceiroCompleto();
}

function salvarVarFin() {
  const nome = document.getElementById('fv-nome').value.trim();
  if (!nome) return;
  const mes = getMesAtivo();
  const todos = ldF(KF.lancamentos);
  todos.push({
    id: 'var_' + Date.now(),
    nome,
    valor: document.getElementById('fv-valor').value,
    cat: document.getElementById('fv-cat').value,
    data: document.getElementById('fv-data').value,
    tipo: 'despesa',
    variavel: true,
    pago: false,
    mes,
  });
  svF(KF.lancamentos, todos);
  document.getElementById('fv-nome').value = '';
  document.getElementById('fv-valor').value = '';
  document.getElementById('fv-data').value = '';
  toggleForm('form-fin-var');
  renderFinanceiroCompleto();
}

function adicionarMes() {
  const todos = ldF(KF.lancamentos);
  const meses = [...new Set(todos.map(l => l.mes))].sort();
  const ultimo = meses[meses.length - 1] || getMesAtivo();
  const [y, m] = ultimo.split('-').map(Number);
  const proximo = m === 12
    ? `${y+1}-01`
    : `${y}-${String(m+1).padStart(2,'0')}`;
  setMesAtivo(proximo);
}

function editarEmpresa(id) {
  const empresa = ldF(KF.empresa);
  const item = empresa.find(e => e.id === id);
  if (!item) return;
  const val = prompt(`Valor de ${item.nome} (R$):`, item.valor || '');
  if (val === null) return;
  const i = empresa.findIndex(e => e.id === id);
  empresa[i].valor = parseFloat(val.replace(',','.')) || 0;
  svF(KF.empresa, empresa);
  renderFinanceiroCompleto();
}

function editarProLabore() {
  const orc = ldF(KF.orcamento) || {};
  const val = prompt('Pró-labore mensal (R$):', orc.proLabore || 7000);
  if (val === null) return;
  orc.proLabore = parseFloat(val.replace(',','.')) || 7000;
  svF(KF.orcamento, orc);
  renderFinanceiroCompleto();
}

// ── INTEGRAÇÕES ───────────────────────────────────────────────────────────────
function abrirGmailSync() {
  const msg = encodeURIComponent(
    'Por favor, acesse meu Gmail e busque os e-mails de cobrança, boleto e fatura que chegaram este mês. ' +
    'Liste os valores, vencimentos e remetentes para eu lançar no meu controle financeiro do Palladium Hub.'
  );
  window.open(`https://claude.ai/new?q=${msg}`, '_blank');
}

function abrirCalendarSync() {
  const mes = getMesAtivo();
  const todos = ldF(KF.lancamentos);
  const doMes = todos.filter(l => l.mes === mes && !l.pago && l.tipo === 'despesa');
  const lista = doMes.map(l => `- ${l.nome}: R$ ${Number(l.valor).toLocaleString('pt-BR',{minimumFractionDigits:2})}${l.dia ? `, dia ${l.dia}` : ''}`).join('\n');
  const msg = encodeURIComponent(
    `Por favor, crie eventos no meu Google Calendar para os vencimentos do mês ${mes}:\n${lista}\n` +
    `Cada evento deve ter lembrete 2 dias antes e no dia do vencimento.`
  );
  window.open(`https://claude.ai/new?q=${msg}`, '_blank');
}
