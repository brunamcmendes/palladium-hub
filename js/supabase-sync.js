const SUPABASE_URL = 'https://tdgzeusvnyrevuyhwmrx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_NJr6x9SsV7h5Atn0W43D0g_KofKO9fp';
let supabase = null;

function initSupabase() {
  if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase conectado');
    return true;
  }
  return false;
}

async function syncParaNuvem(chave, dados) {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('ph_dados').upsert({ id: chave, chave, valor: dados, atualizado_em: new Date().toISOString() }, { onConflict: 'id' });
    if (error) { console.error('Erro sync:', error.message); return false; }
    return true;
  } catch(e) { return false; }
}

async function syncDaNuvem(chave) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('ph_dados').select('valor').eq('id', chave).single();
    if (error || !data) return null;
    return data.valor;
  } catch(e) { return null; }
}

const CHAVES_SYNC = ['phub_pal','phub_fin','phub_pd','phub_proc','phub_bem','phub_emp','phub_agenda','phub_docs','phub_scratch','phub_scratchInv','phub_theme','phub_fin_lanc','phub_fin_orc','phub_fin_emp'];

async function sincronizarTudo() {
  if (!supabase) return;
  const status = document.getElementById('sync-status');
  if (status) status.textContent = 'Sincronizando...';
  let n = 0;
  for (const chave of CHAVES_SYNC) {
    const d = await syncDaNuvem(chave);
    if (d !== null) { try { localStorage.setItem(chave, JSON.stringify(d)); } catch {} n++; }
  }
  if (status) { status.textContent = n > 0 ? 'Sincronizado' : 'Online'; status.style.color = 'var(--pes-dark,#085041)'; setTimeout(() => { if(status) status.textContent = 'Online'; }, 3000); }
  if (typeof renderAll === 'function') renderAll();
}

async function salvarTudoNaNuvem() {
  if (!supabase) return;
  const status = document.getElementById('sync-status');
  if (status) status.textContent = 'Salvando...';
  for (const chave of CHAVES_SYNC) {
    try { const d = JSON.parse(localStorage.getItem(chave)||'null'); if(d!==null) await syncParaNuvem(chave,d); } catch {}
  }
  if (status) { status.textContent = 'Salvo'; setTimeout(()=>{ status.textContent='Online'; },2000); }
}

function iniciarMonitorConexao() {
  const status = document.getElementById('sync-status');
  if (!status) return;
  function atualizar() { status.textContent = navigator.onLine ? 'Online' : 'Offline'; status.style.color = navigator.onLine ? 'var(--pes-dark,#085041)' : 'var(--urg,#A32D2D)'; }
  window.addEventListener('online', () => { atualizar(); sincronizarTudo(); });
  window.addEventListener('offline', atualizar);
  atualizar();
}
