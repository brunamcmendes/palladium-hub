// ── STORAGE ──────────────────────────────────────────────────────────────────
const K = {
  pal: 'phub_pal', fin: 'phub_fin', pd: 'phub_pd',
  proc: 'phub_proc', bem: 'phub_bem', emp: 'phub_emp',
  agenda: 'phub_agenda', docs: 'phub_docs',
  scratch: 'phub_scratch', scratchInv: 'phub_scratchInv'
};

const ld  = k => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
const sv  = (k, d) => { try { localStorage.setItem(k, JSON.stringify(d)); } catch {} };
const ldS = k => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const svS = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

// ── DEFAULT DATA ──────────────────────────────────────────────────────────────
const DEF_PAL = [
  { id:1, titulo:'Processo 6125421-61 — Maria Diana (Adjudicação Compulsória Uruaçu)', setor:'Jurídico', prio:'alta', prazo:'2026-04-20', obs:'Buscar TJ-GO por nome da parte. Pendente localização.', status:'doing', pin:true, done:false },
  { id:2, titulo:'Distrato Edilson Matos — finalizar instrumento (20% retenção, 8x)', setor:'Jurídico', prio:'alta', prazo:'2026-04-22', obs:'Base: Súmula 543-STJ e Tema 938.', status:'doing', pin:true, done:false },
  { id:3, titulo:'Remover cláusulas f.3 e §8° da 9ª cláusula — minuta padrão', setor:'Jurídico', prio:'alta', prazo:'2026-04-22', obs:'Absolutamente nulas — Súmula 543/STJ e Tema 577.', status:'todo', pin:true, done:false },
  { id:4, titulo:'Confirmar exportação GEDAIM — bloqueador migração Lote Mobile', setor:'Operacional', prio:'alta', prazo:'2026-04-25', obs:'', status:'todo', pin:true, done:false },
  { id:5, titulo:'Regularizar escritura Orizona — Espólio Arthur Silva', setor:'Jurídico', prio:'alta', prazo:'2026-04-25', obs:'CND, parentesco, cessão, ITCD/ITBI.', status:'todo', pin:true, done:false },
  { id:6, titulo:'Avaliar proposta de serviços RJ+', setor:'Operacional', prio:'media', prazo:'2026-04-30', obs:'', status:'todo', pin:false, done:false },
  { id:7, titulo:'Distribuição lucros 2025 — resolver urgente (Lei 15.270/2025)', setor:'Financeiro', prio:'alta', prazo:'2026-04-30', obs:'IRRF 10% acima R$50k/mês. Sem ata de 2025.', status:'doing', pin:true, done:false },
  { id:8, titulo:'VCM Participações — constituição (50/50 Victor e Bruna)', setor:'Financeiro', prio:'media', prazo:'2026-05-10', obs:'CNAE 64.62-0/00, Lucro Presumido.', status:'todo', pin:false, done:false },
  { id:9, titulo:'ACP Residencial Andrade Reis — acompanhar fines (MP Goiás)', setor:'Jurídico', prio:'alta', prazo:'2026-04-20', obs:'Dr. Cledson responsável.', status:'doing', pin:true, done:false },
  { id:10, titulo:'Portal da Serra — migrar para RET (4% vs 6,73%)', setor:'Compliance', prio:'media', prazo:'2026-05-15', obs:'', status:'todo', pin:false, done:false },
];

const DEF_FIN = [
  { id:1, desc:'PGGS Einstein — parcela mensal', tipo:'despesa', val:2500, venc:'2026-04-20', cat:'PGGS', status:'pendente' },
  { id:2, desc:'Plano de saúde', tipo:'despesa', val:800, venc:'2026-04-25', cat:'Saúde', status:'pendente' },
  { id:3, desc:'Honorários recebidos — VBM', tipo:'receita', val:0, venc:'2026-04-30', cat:'Honorários', status:'pendente' },
];

const DEF_PD = [
  { id:1, titulo:'Completar eventos Calendar PGGS Einstein (dez/26–mar/27)', cat:'PGGS', prio:'baixa', prazo:'2026-05-01', obs:'', pin:false, done:false },
  { id:2, titulo:'Consulta médica — check-up anual', cat:'Saúde', prio:'media', prazo:'2026-05-15', obs:'', pin:false, done:false },
];

const DEF_PROC = [
  { id:1, num:'6125421-61', parte:'Maria Diana de Souza Nunes', adv:'Dr. Marcos', status:'P1', desc:'Adjudicação compulsória — Uruaçu/GO' },
  { id:2, num:'ACP Resid. Andrade Reis', parte:'MP Goiás', adv:'Dr. Cledson', status:'P1', desc:'Ação civil pública — fines diárias em curso' },
  { id:3, num:'(Desconsideração PJ)', parte:'Palladium Imóveis', adv:'Dr. Cledson', status:'P2', desc:'Pedido desconsideração PJ — penhora ativa' },
];

const DEF_BENS = [
  { id:1, nome:'Portal da Serra Empreendimentos', tipo:'SPE', cnpj:'(ver Redesim)', status:'Ativo', obs:'Não usa RET — migração pendente' },
  { id:2, nome:'VBM Empreendimentos Imobiliários', tipo:'Holding', cnpj:'(ver Redesim)', status:'Ativo', obs:'Migrar para Lucro Presumido' },
  { id:3, nome:'Palladium Imóveis', tipo:'SPE', cnpj:'(ver Redesim)', status:'Em regularização', obs:'Penhora ativa — excluída da reestruturação fase 1' },
];

const DEF_EMP = [
  { id:1, nome:'Residencial Andrade Reis', fase:'Entregue', local:'Aparecida de Goiânia/GO', tipo:'Loteamento', tarefas:[{ id:1, titulo:'Acompanhar ACP MP Goiás — fines diárias', status:'doing', prio:'alta' }], docs:[], financeiro:{ receita:0, inadimplencia:0, acordos:1 } },
  { id:2, nome:'Portal da Serra', fase:'Pós-obra', local:'Goiás/GO', tipo:'Loteamento', tarefas:[{ id:1, titulo:'Migrar para RET (4%)', status:'todo', prio:'media' }], docs:[], financeiro:{ receita:0, inadimplencia:0, acordos:0 } },
];

const DEF_AGENDA = [
  { id:1, dia:'Seg', txt:'Verificar processo Maria Diana no TJ-GO' },
  { id:2, dia:'Qua', txt:'PGGS Einstein — módulo EaD' },
  { id:3, dia:'Sex', txt:'Revisar minuta distrato Edilson' },
];

// ── INIT ──────────────────────────────────────────────────────────────────────
function initData() {
  if (!localStorage.getItem(K.pal))    sv(K.pal, DEF_PAL);
  if (!localStorage.getItem(K.fin))    sv(K.fin, DEF_FIN);
  if (!localStorage.getItem(K.pd))     sv(K.pd, DEF_PD);
  if (!localStorage.getItem(K.proc))   sv(K.proc, DEF_PROC);
  if (!localStorage.getItem(K.bem))    sv(K.bem, DEF_BENS);
  if (!localStorage.getItem(K.emp))    sv(K.emp, DEF_EMP);
  if (!localStorage.getItem(K.agenda)) sv(K.agenda, DEF_AGENDA);
  if (!localStorage.getItem(K.docs))   sv(K.docs, []);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const SETORES = ['Jurídico', 'Operacional', 'Financeiro', 'Patrimônio', 'RH', 'Compliance'];
let activeSetor = 'Jurídico';
let selectedEmp = null;

function fmtD(d) {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${day}/${m}`;
}

function dL(d) {
  if (!d) return 999;
  const n = new Date(); n.setHours(0, 0, 0, 0);
  return Math.round((new Date(d + 'T00:00:00') - n) / 86400000);
}

function dlB(d) {
  const dl = dL(d);
  if (dl < 0)  return `<span class="badge b-red">${Math.abs(dl)}d atrasado</span>`;
  if (dl === 0) return `<span class="badge b-red">Hoje</span>`;
  if (dl <= 3)  return `<span class="badge b-amber">${dl}d</span>`;
  if (dl <= 7)  return `<span class="badge b-amber">${dl}d</span>`;
  return `<span class="badge b-gray">${fmtD(d)}</span>`;
}

function pC(p) { return p === 'alta' ? 'p-alta' : p === 'media' ? 'p-media' : 'p-baixa'; }
function sbadge(s) { return s === 'P1' ? 'b-red' : s === 'P2' ? 'b-amber' : 'b-gray'; }

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function goTab(tab) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + tab).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  if (window.innerWidth <= 768) document.querySelector('.sidebar').classList.remove('open');
  renderAll();
}

function toggleForm(id) {
  document.getElementById(id).classList.toggle('open');
}

function toggleMobileMenu() {
  document.querySelector('.sidebar').classList.toggle('open');
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function renderHome() {
  const pal = ld(K.pal), fin = ld(K.fin), pd = ld(K.pd);
  const pinned = [...pal.filter(t => t.pin && !t.done), ...pd.filter(t => t.pin && !t.done)];
  const venc = fin.filter(f => f.status === 'pendente' && dL(f.venc) <= 7).sort((a, b) => dL(a.venc) - dL(b.venc));

  document.getElementById('home-metrics').innerHTML = `
    <div class="metric m-urg">
      <div class="metric-lbl">Fixados urgentes</div>
      <div class="metric-val">${pinned.length}</div>
      <div class="metric-sub">marcados com ★</div>
    </div>
    <div class="metric m-pal">
      <div class="metric-lbl">Tarefas Palladium</div>
      <div class="metric-val">${pal.filter(t => !t.done).length}</div>
      <div class="metric-sub">${pal.filter(t => !t.done && t.prio === 'alta').length} alta prioridade</div>
    </div>
    <div class="metric m-emp">
      <div class="metric-lbl">Empreendimentos</div>
      <div class="metric-val">${ld(K.emp).length}</div>
      <div class="metric-sub">ativos</div>
    </div>
    <div class="metric m-inv">
      <div class="metric-lbl">Vencimentos 7 dias</div>
      <div class="metric-val">${venc.length}</div>
      <div class="metric-sub">financeiro pessoal</div>
    </div>`;

  document.getElementById('home-urgentes').innerHTML = pinned.length
    ? pinned.map(t => `
      <div class="card">
        <div class="card-row">
          <div class="prio-bar ${pC(t.prio)}"></div>
          <div class="card-body">
            <div class="card-title" contenteditable="true" onblur="editT(this,${t.id},'pal')">${t.titulo}</div>
            ${t.obs ? `<div class="card-obs">${t.obs}</div>` : ''}
            <div class="card-meta">
              <span class="badge b-pal">${t.setor || t.cat}</span>
              ${dlB(t.prazo)}
              <button class="pin-star pinned" onclick="togglePin(${t.id},'pal')" title="Desafixar">★</button>
            </div>
          </div>
        </div>
      </div>`).join('')
    : `<div class="empty-msg">Nenhum item fixado — use ★ em Palladium ou Pessoal</div>`;

  document.getElementById('home-venc').innerHTML = venc.length
    ? venc.map(f => `
      <div class="card">
        <div class="card-row">
          <div class="card-body">
            <div class="card-title">${f.desc}</div>
            <div class="card-meta">
              <span class="badge b-pes">${f.cat}</span>
              ${dlB(f.venc)}
              ${f.val ? `<span class="badge b-gray">R$ ${Number(f.val).toLocaleString('pt-BR')}</span>` : ''}
            </div>
          </div>
        </div>
      </div>`).join('')
    : `<div class="empty-msg">Sem vencimentos nos próximos 7 dias</div>`;

  renderAgenda();
  const sc = document.getElementById('scratch-pad');
  if (sc) { sc.value = ldS(K.scratch); sc.oninput = () => svS(K.scratch, sc.value); }
}

function renderAgenda() {
  const ag = ld(K.agenda);
  const el = document.getElementById('agenda-list');
  if (!el) return;
  el.innerHTML = ag.length
    ? ag.map(a => `
      <div class="agenda-row">
        <span class="agenda-day">${a.dia}</span>
        <span class="agenda-txt" contenteditable="true" onblur="editAgenda(this,${a.id})">${a.txt}</span>
        <button class="del-x" onclick="delAgenda(${a.id})">✕</button>
      </div>`).join('')
    : `<div class="empty-msg">Agenda vazia</div>`;
}

function addAgenda() {
  const dias = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];
  const d = new Date().getDay();
  const all = ld(K.agenda);
  all.push({ id: Date.now(), dia: dias[d === 0 ? 6 : d - 1], txt: 'Nova entrada' });
  sv(K.agenda, all); renderAgenda();
}

function editAgenda(el, id) {
  const all = ld(K.agenda), i = all.findIndex(a => a.id === id);
  if (i > -1) { all[i].txt = el.innerText.trim(); sv(K.agenda, all); }
}

function delAgenda(id) { sv(K.agenda, ld(K.agenda).filter(a => a.id !== id)); renderAgenda(); }

// ── PALLADIUM ─────────────────────────────────────────────────────────────────
function renderPalladium() {
  const all = ld(K.pal);
  document.getElementById('setor-tabs').innerHTML = SETORES.map(s =>
    `<button class="setor-btn${s === activeSetor ? ' active' : ''}" onclick="setSetor('${s}')">${s}</button>`
  ).join('');

  const filtered = all.filter(t => t.setor === activeSetor);
  const cols = [{ id:'todo', lbl:'A fazer' }, { id:'doing', lbl:'Em andamento' }, { id:'done_col', lbl:'Concluído' }];

  document.getElementById('pal-kanban').innerHTML = `<div class="kanban">${cols.map(col => {
    const items = filtered.filter(t => col.id === 'done_col' ? t.done : t.status === col.id && !t.done);
    return `<div class="kb-col">
      <div class="kb-col-hd"><span>${col.lbl}</span><span class="kb-count">${items.length}</span></div>
      ${items.length ? items.map(t => `
        <div class="kb-card">
          <div style="display:flex;gap:6px;align-items:flex-start">
            <div class="prio-bar ${pC(t.prio)}" style="min-height:28px"></div>
            <div style="flex:1;min-width:0">
              <div class="kb-title" contenteditable="true" onblur="editT(this,${t.id},'pal')">${t.titulo}</div>
              <div class="kb-meta">
                ${t.prazo ? dlB(t.prazo) : ''}
                <button class="pin-star${t.pin ? ' pinned' : ''}" onclick="togglePin(${t.id},'pal')">${t.pin ? '★' : '☆'}</button>
                <button class="kb-move" onclick="moveKb(${t.id},'${col.id}')">${col.id === 'done_col' ? '↩' : '→'}</button>
                <button class="del-x" onclick="delPal(${t.id})">✕</button>
              </div>
            </div>
          </div>
        </div>`).join('') : `<div class="empty-msg" style="font-size:11px">Vazio</div>`}
    </div>`;
  }).join('')}</div>`;
}

function setSetor(s) { activeSetor = s; renderPalladium(); }

function moveKb(id, from) {
  const all = ld(K.pal), i = all.findIndex(t => t.id === id);
  if (i < 0) return;
  if (from === 'done_col') { all[i].done = false; all[i].status = 'todo'; }
  else if (from === 'todo') { all[i].status = 'doing'; }
  else { all[i].done = true; }
  sv(K.pal, all); renderPalladium(); renderHome();
}

function editT(el, id, type) {
  const k = type === 'pal' ? K.pal : K.pd;
  const all = ld(k), i = all.findIndex(t => t.id === id);
  if (i > -1) { all[i].titulo = el.innerText.trim(); sv(k, all); }
}

function togglePin(id, type) {
  const k = type === 'pal' ? K.pal : K.pd;
  const all = ld(k), i = all.findIndex(t => t.id === id);
  if (i > -1) { all[i].pin = !all[i].pin; sv(k, all); renderAll(); }
}

function delPal(id) { sv(K.pal, ld(K.pal).filter(t => t.id !== id)); renderPalladium(); renderHome(); }

function savePalTask() {
  const t = document.getElementById('pk-titulo').value.trim(); if (!t) return;
  const all = ld(K.pal);
  all.push({ id: Date.now(), titulo: t, setor: document.getElementById('pk-setor').value, prio: document.getElementById('pk-prio').value, prazo: document.getElementById('pk-prazo').value, obs: document.getElementById('pk-obs').value, status: 'todo', pin: false, done: false });
  sv(K.pal, all);
  document.getElementById('pk-titulo').value = '';
  document.getElementById('pk-obs').value = '';
  document.getElementById('pk-prazo').value = '';
  activeSetor = document.getElementById('pk-setor').value;
  toggleForm('form-pal'); renderPalladium(); renderHome();
}

// ── EMPREENDIMENTOS ───────────────────────────────────────────────────────────
function renderEmpreendimentos() {
  const emps = ld(K.emp);
  const fases2 = ['Planejamento','Lançamento','Obras','Entregue','Pós-obra'];
  const faseBadge = f => f === 'Entregue' || f === 'Pós-obra' ? 'b-green' : f === 'Obras' ? 'b-amber' : f === 'Lançamento' ? 'b-emp' : 'b-gray';

  document.getElementById('emp-grid').innerHTML = emps.length
    ? emps.map(e => `
      <div class="emp-card${selectedEmp === e.id ? ' selected' : ''}" onclick="selectEmp(${e.id})">
        <div class="emp-name">${e.nome}</div>
        <div class="emp-meta">
          <span class="badge b-emp">${e.tipo}</span>
          <span class="badge ${faseBadge(e.fase)}">${e.fase}</span>
          <span class="badge b-gray">${e.local}</span>
        </div>
        <div class="emp-stats">
          <div class="emp-stat"><div class="emp-stat-n">${(e.tarefas || []).filter(t => t.status !== 'done').length}</div><div class="emp-stat-l">tarefas</div></div>
          <div class="emp-stat"><div class="emp-stat-n">${(e.docs || []).length}</div><div class="emp-stat-l">docs</div></div>
          <div class="emp-stat"><div class="emp-stat-n">${e.financeiro?.acordos || 0}</div><div class="emp-stat-l">acordos</div></div>
        </div>
      </div>`).join('')
    : `<div class="empty-msg" style="grid-column:1/-1">Nenhum empreendimento cadastrado</div>`;

  if (selectedEmp) {
    const e = emps.find(x => x.id === selectedEmp);
    if (!e) { document.getElementById('emp-detail-area').innerHTML = ''; return; }
    const faseIdx = fases2.indexOf(e.fase);
    document.getElementById('emp-detail-area').innerHTML = `
      <div class="emp-detail">
        <div class="emp-detail-hd">
          <span>${e.nome}</span>
          <button class="del-x" onclick="delEmp(${e.id})">✕ remover</button>
        </div>
        <div class="fase-bar">${fases2.map((f, i) =>
          `<div class="fase-step${i === faseIdx ? ' active' : ''}" onclick="setFase(${e.id},'${f}')">${f}</div>`
        ).join('')}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <div class="sh" style="margin-bottom:.5rem">
              <span class="st" style="font-size:10px">Tarefas</span>
              <button class="add-mini" onclick="addEmpTask(${e.id})">+</button>
            </div>
            <div class="kanban" style="grid-template-columns:1fr 1fr 1fr">
              ${['todo','doing','done'].map(col => {
                const items = (e.tarefas || []).filter(t => col === 'done' ? t.status === 'done' : t.status === col);
                const colLbl = col === 'todo' ? 'A fazer' : col === 'doing' ? 'Andamento' : 'Concluído';
                return `<div class="kb-col" style="min-height:60px">
                  <div class="kb-col-hd"><span style="font-size:10px">${colLbl}</span><span class="kb-count">${items.length}</span></div>
                  ${items.map(t => `
                    <div class="kb-card" style="padding:.5rem">
                      <div class="kb-title" style="font-size:11px">${t.titulo}</div>
                      <div class="kb-meta">
                        <span class="badge b-emp" style="font-size:10px">${t.prio}</span>
                        <button class="kb-move" onclick="moveEmpTask(${e.id},${t.id},'${col}')">${col === 'done' ? '↩' : '→'}</button>
                        <button class="del-x" onclick="delEmpTask(${e.id},${t.id})">✕</button>
                      </div>
                    </div>`).join('')}
                </div>`;
              }).join('')}
            </div>
          </div>
          <div>
            <div class="sh" style="margin-bottom:.5rem"><span class="st" style="font-size:10px">Documentos</span></div>
            <div class="drop-zone" style="padding:.875rem;margin-bottom:.5rem" onclick="document.getElementById('file-emp-${e.id}').click()">
              <input type="file" id="file-emp-${e.id}" class="file-input" multiple onchange="handleFiles(this.files,'emp',${e.id})">
              <div class="drop-zone-txt" style="font-size:12px">Anexar documento</div>
            </div>
            ${(e.docs || []).length ? `<div>${e.docs.map(d => `
              <div class="doc-item" style="margin-bottom:6px">
                <div class="doc-icon ${d.ext}">${d.ext.toUpperCase().slice(0,3)}</div>
                <div class="doc-body">
                  <div class="doc-name">${d.name}</div>
                  <div class="doc-meta">${d.size || d.url || ''}</div>
                  ${d.url ? `<a href="${d.url}" class="doc-open" target="_blank">Abrir ↗</a>` : ''}
                </div>
                <button class="del-x" onclick="delEmpDoc(${e.id},${d.id})">✕</button>
              </div>`).join('')}</div>` : `<div class="empty-msg" style="font-size:11px">Sem documentos</div>`}
            <div class="sh" style="margin:.75rem 0 .5rem"><span class="st" style="font-size:10px">Financeiro</span></div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
              <div class="inv-stat" style="padding:.625rem"><div class="inv-stat-n" style="font-size:16px">R$ ${(e.financeiro?.receita || 0).toLocaleString('pt-BR')}</div><div class="inv-stat-l">Receita</div></div>
              <div class="inv-stat" style="padding:.625rem"><div class="inv-stat-n" style="font-size:16px">R$ ${(e.financeiro?.inadimplencia || 0).toLocaleString('pt-BR')}</div><div class="inv-stat-l">Inadimplência</div></div>
              <div class="inv-stat" style="padding:.625rem"><div class="inv-stat-n" style="font-size:16px">${e.financeiro?.acordos || 0}</div><div class="inv-stat-l">Acordos</div></div>
            </div>
          </div>
        </div>
      </div>`;
  } else {
    document.getElementById('emp-detail-area').innerHTML = '';
  }
}

function selectEmp(id) { selectedEmp = selectedEmp === id ? null : id; renderEmpreendimentos(); }
function delEmp(id) { sv(K.emp, ld(K.emp).filter(e => e.id !== id)); selectedEmp = null; renderEmpreendimentos(); renderHome(); }
function setFase(empId, fase) {
  const all = ld(K.emp), i = all.findIndex(e => e.id === empId);
  if (i > -1) { all[i].fase = fase; sv(K.emp, all); renderEmpreendimentos(); }
}

function addEmpTask(empId) {
  const titulo = prompt('Título da tarefa:'); if (!titulo) return;
  const all = ld(K.emp), i = all.findIndex(e => e.id === empId);
  if (i > -1) { if (!all[i].tarefas) all[i].tarefas = []; all[i].tarefas.push({ id: Date.now(), titulo, status: 'todo', prio: 'media' }); sv(K.emp, all); renderEmpreendimentos(); }
}

function moveEmpTask(empId, taskId, from) {
  const all = ld(K.emp), ei = all.findIndex(e => e.id === empId); if (ei < 0) return;
  const ti = all[ei].tarefas.findIndex(t => t.id === taskId); if (ti < 0) return;
  if (from === 'done') { all[ei].tarefas[ti].status = 'todo'; }
  else if (from === 'todo') { all[ei].tarefas[ti].status = 'doing'; }
  else { all[ei].tarefas[ti].status = 'done'; }
  sv(K.emp, all); renderEmpreendimentos();
}

function delEmpTask(empId, taskId) {
  const all = ld(K.emp), i = all.findIndex(e => e.id === empId);
  if (i > -1) { all[i].tarefas = all[i].tarefas.filter(t => t.id !== taskId); sv(K.emp, all); renderEmpreendimentos(); }
}

function delEmpDoc(empId, docId) {
  const all = ld(K.emp), i = all.findIndex(e => e.id === empId);
  if (i > -1) { all[i].docs = all[i].docs.filter(d => d.id !== docId); sv(K.emp, all); renderEmpreendimentos(); }
}

function saveEmp() {
  const n = document.getElementById('em-nome').value.trim(); if (!n) return;
  const all = ld(K.emp);
  all.push({ id: Date.now(), nome: n, fase: document.getElementById('em-fase').value, local: document.getElementById('em-local').value, tipo: document.getElementById('em-tipo').value, tarefas: [], docs: [], financeiro: { receita: 0, inadimplencia: 0, acordos: 0 } });
  sv(K.emp, all);
  document.getElementById('em-nome').value = ''; document.getElementById('em-local').value = '';
  toggleForm('form-emp'); renderEmpreendimentos(); renderHome();
}

// ── PESSOAL ───────────────────────────────────────────────────────────────────
function renderPessoal() {
  const fin = ld(K.fin), pd = ld(K.pd);
  const desp = fin.filter(f => f.tipo === 'despesa');
  const rec = fin.filter(f => f.tipo === 'receita');
  const totD = desp.filter(f => f.status === 'pendente').reduce((s, f) => s + Number(f.val || 0), 0);
  const totR = rec.filter(f => f.status === 'pendente').reduce((s, f) => s + Number(f.val || 0), 0);

  document.getElementById('fin-metrics').innerHTML = `
    <div class="metric m-urg"><div class="metric-lbl">Despesas pendentes</div><div class="metric-val" style="font-size:20px">R$ ${totD.toLocaleString('pt-BR')}</div></div>
    <div class="metric m-pes"><div class="metric-lbl">Receitas previstas</div><div class="metric-val" style="font-size:20px">R$ ${totR.toLocaleString('pt-BR')}</div></div>
    <div class="metric m-inv"><div class="metric-lbl">Saldo projetado</div><div class="metric-val" style="font-size:20px">R$ ${(totR - totD).toLocaleString('pt-BR')}</div></div>`;

  const finRow = f => `
    <div class="fin-row">
      <div class="fin-left">
        <div class="fin-name" contenteditable="true" onblur="editFin(this,${f.id})">${f.desc}</div>
        <div class="fin-dt">${fmtD(f.venc)} · ${f.cat}</div>
      </div>
      <div class="fin-right">
        ${f.val ? `<span class="fin-val ${f.tipo === 'despesa' ? 'neg' : 'pos'}">R$ ${Number(f.val).toLocaleString('pt-BR')}</span>` : ''}
        <span class="badge ${f.status === 'pago' ? 'b-green' : 'b-amber'}">${f.status === 'pago' ? 'pago' : 'pendente'}</span>
        <button class="del-x" onclick="delFin(${f.id})">✕</button>
      </div>
    </div>`;

  document.getElementById('fin-desp').innerHTML = desp.length ? desp.map(finRow).join('') : `<div class="empty-msg">Nenhuma despesa</div>`;
  document.getElementById('fin-rec').innerHTML = rec.length ? rec.map(finRow).join('') : `<div class="empty-msg">Nenhuma receita</div>`;

  document.getElementById('pes-dem-list').innerHTML = pd.length
    ? pd.map(t => `
      <div class="card">
        <div class="card-row">
          <div class="prio-bar ${pC(t.prio)}"></div>
          <div class="card-body">
            <div class="card-title" contenteditable="true" onblur="editT(this,${t.id},'pd')" style="${t.done ? 'text-decoration:line-through;opacity:.5' : ''}">${t.titulo}</div>
            ${t.obs ? `<div class="card-obs">${t.obs}</div>` : ''}
            <div class="card-meta">
              <span class="badge b-pes">${t.cat}</span>
              ${dlB(t.prazo)}
              <button class="pin-star${t.pin ? ' pinned' : ''}" onclick="togglePin(${t.id},'pd')">${t.pin ? '★' : '☆'}</button>
              <span onclick="toggleDonePd(${t.id})" style="font-size:11px;color:var(--text-3);cursor:pointer">${t.done ? '↩ reabrir' : '✓ concluir'}</span>
              <button class="del-x" onclick="delPd(${t.id})">✕</button>
            </div>
          </div>
        </div>
      </div>`).join('')
    : `<div class="empty-msg">Nenhuma demanda pessoal</div>`;
}

function editFin(el, id) {
  const all = ld(K.fin), i = all.findIndex(f => f.id === id);
  if (i > -1) { all[i].desc = el.innerText.trim(); sv(K.fin, all); }
}
function delFin(id) { sv(K.fin, ld(K.fin).filter(f => f.id !== id)); renderPessoal(); renderHome(); }
function saveFin() {
  const d = document.getElementById('fn-desc').value.trim(); if (!d) return;
  const all = ld(K.fin);
  all.push({ id: Date.now(), desc: d, tipo: document.getElementById('fn-tipo').value, val: document.getElementById('fn-val').value, venc: document.getElementById('fn-venc').value, cat: document.getElementById('fn-cat').value, status: document.getElementById('fn-status').value });
  sv(K.fin, all);
  document.getElementById('fn-desc').value = ''; document.getElementById('fn-val').value = ''; document.getElementById('fn-venc').value = '';
  toggleForm('form-fin'); renderPessoal(); renderHome();
}
function savePesDem() {
  const t = document.getElementById('pd-titulo').value.trim(); if (!t) return;
  const all = ld(K.pd);
  all.push({ id: Date.now(), titulo: t, cat: document.getElementById('pd-cat').value, prio: document.getElementById('pd-prio').value, prazo: document.getElementById('pd-prazo').value, obs: document.getElementById('pd-obs').value, pin: false, done: false });
  sv(K.pd, all);
  document.getElementById('pd-titulo').value = ''; document.getElementById('pd-obs').value = ''; document.getElementById('pd-prazo').value = '';
  toggleForm('form-pes-dem'); renderPessoal();
}
function toggleDonePd(id) {
  const all = ld(K.pd), i = all.findIndex(t => t.id === id);
  if (i > -1) { all[i].done = !all[i].done; sv(K.pd, all); renderPessoal(); }
}
function delPd(id) { sv(K.pd, ld(K.pd).filter(t => t.id !== id)); renderPessoal(); }

// ── INVENTÁRIO ────────────────────────────────────────────────────────────────
function renderInventario() {
  const procs = ld(K.proc), bens = ld(K.bem);
  document.getElementById('inv-stats').innerHTML = `
    <div class="inv-stat"><div class="inv-stat-n">${procs.length}</div><div class="inv-stat-l">Processos ativos</div></div>
    <div class="inv-stat"><div class="inv-stat-n">${procs.filter(p => p.status === 'P1').length}</div><div class="inv-stat-l">P1 — urgentes</div></div>
    <div class="inv-stat"><div class="inv-stat-n">${bens.length}</div><div class="inv-stat-l">Bens / SPEs / holdings</div></div>`;

  document.getElementById('proc-list').innerHTML = procs.length
    ? procs.map(p => `
      <div class="proc-row">
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500">${p.desc}</div>
          <div style="font-size:11px;color:var(--text-3)">${p.num} · ${p.parte} · ${p.adv}</div>
        </div>
        <span class="badge ${sbadge(p.status)}">${p.status}</span>
        <button class="del-x" onclick="delProc(${p.id})">✕</button>
      </div>`).join('')
    : `<div class="empty-msg">Nenhum processo</div>`;

  document.getElementById('bens-list').innerHTML = bens.length
    ? bens.map(b => `
      <div class="card">
        <div class="card-row">
          <div class="card-body">
            <div class="card-title">${b.nome}</div>
            ${b.obs ? `<div class="card-obs">${b.obs}</div>` : ''}
            <div class="card-meta">
              <span class="badge b-inv">${b.tipo}</span>
              <span class="badge ${b.status === 'Ativo' ? 'b-green' : b.status === 'Cancelado' ? 'b-red' : 'b-amber'}">${b.status}</span>
              ${b.cnpj ? `<span class="badge b-gray">${b.cnpj}</span>` : ''}
              <button class="del-x" onclick="delBem(${b.id})">✕</button>
            </div>
          </div>
        </div>
      </div>`).join('')
    : `<div class="empty-msg">Nenhum bem cadastrado</div>`;

  const si = document.getElementById('scratch-inv');
  if (si) { si.value = ldS(K.scratchInv); si.oninput = () => svS(K.scratchInv, si.value); }
}

function saveProc() {
  const n = document.getElementById('ip-num').value.trim(); if (!n) return;
  const all = ld(K.proc);
  all.push({ id: Date.now(), num: n, parte: document.getElementById('ip-parte').value, adv: document.getElementById('ip-adv').value, status: document.getElementById('ip-status').value, desc: document.getElementById('ip-desc').value });
  sv(K.proc, all);
  document.getElementById('ip-num').value = ''; document.getElementById('ip-parte').value = ''; document.getElementById('ip-desc').value = '';
  toggleForm('form-inv-proc'); renderInventario();
}
function delProc(id) { sv(K.proc, ld(K.proc).filter(p => p.id !== id)); renderInventario(); }
function saveBem() {
  const n = document.getElementById('ib-nome').value.trim(); if (!n) return;
  const all = ld(K.bem);
  all.push({ id: Date.now(), nome: n, tipo: document.getElementById('ib-tipo').value, cnpj: document.getElementById('ib-cnpj').value, status: document.getElementById('ib-status').value, obs: document.getElementById('ib-obs').value });
  sv(K.bem, all);
  document.getElementById('ib-nome').value = ''; document.getElementById('ib-cnpj').value = ''; document.getElementById('ib-obs').value = '';
  toggleForm('form-inv-bem'); renderInventario();
}
function delBem(id) { sv(K.bem, ld(K.bem).filter(b => b.id !== id)); renderInventario(); }

// ── DOCUMENTOS ────────────────────────────────────────────────────────────────
function getExt(name) {
  const p = name.split('.'), e = (p[p.length - 1] || '').toLowerCase();
  return ['pdf','docx','xlsx','doc','xls'].includes(e) ? e : 'other';
}

function handleFiles(files, target, empId) {
  Array.from(files).forEach(f => {
    const ext = getExt(f.name);
    const size = f.size < 1024 * 1024 ? `${Math.round(f.size / 1024)} KB` : `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
    const docObj = { id: Date.now() + Math.random(), name: f.name, ext, size, url: null };
    if (target === 'lib') {
      const all = ld(K.docs); all.push({ ...docObj, cat: 'Geral' }); sv(K.docs, all); renderDocs();
    } else if (target === 'emp' && empId) {
      const all = ld(K.emp), i = all.findIndex(e => e.id === empId);
      if (i > -1) { if (!all[i].docs) all[i].docs = []; all[i].docs.push(docObj); sv(K.emp, all); renderEmpreendimentos(); }
    }
  });
}

function handleDrop(ev) {
  ev.preventDefault();
  document.getElementById('drop-zone').classList.remove('dragover');
  handleFiles(ev.dataTransfer.files, 'lib');
}

function saveLink() {
  const url = document.getElementById('link-url').value.trim(), nome = document.getElementById('link-nome').value.trim();
  if (!url) return;
  const all = ld(K.docs);
  all.push({ id: Date.now(), name: nome || url, ext: 'link', size: null, url, cat: document.getElementById('link-cat').value });
  sv(K.docs, all);
  document.getElementById('link-url').value = ''; document.getElementById('link-nome').value = '';
  renderDocs();
}

function renderDocs() {
  const docs = ld(K.docs);
  const el = document.getElementById('doc-lib');
  if (!el) return;
  el.innerHTML = docs.length
    ? docs.map(d => `
      <div class="doc-item">
        <div class="doc-icon ${d.ext}">${d.ext === 'link' ? 'LNK' : d.ext.toUpperCase().slice(0,3)}</div>
        <div class="doc-body">
          <div class="doc-name">${d.name}</div>
          <div class="doc-meta">${d.cat}${d.size ? ' · ' + d.size : ''}</div>
          ${d.url ? `<a href="${d.url}" class="doc-open" target="_blank">Abrir link ↗</a>` : ''}
        </div>
        <button class="del-x" onclick="delDoc(${d.id})">✕</button>
      </div>`).join('')
    : `<div class="empty-msg" style="grid-column:1/-1">Nenhum documento na biblioteca</div>`;
}

function delDoc(id) { sv(K.docs, ld(K.docs).filter(d => d.id !== id)); renderDocs(); }

// ── RENDER ALL ────────────────────────────────────────────────────────────────
function renderAll() {
  renderHome();
  renderPalladium();
  renderEmpreendimentos();
  renderPessoal();
  renderInventario();
  renderDocs();
}

// ── TOPBAR DATE ───────────────────────────────────────────────────────────────
function setDate() {
  const now = new Date();
  const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const el = document.getElementById('topbar-date');
  if (el) el.textContent = `${dias[now.getDay()]}, ${now.getDate()} ${meses[now.getMonth()]} ${now.getFullYear()}`;
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setDate();
  renderAll();
  goTab('home');
});
