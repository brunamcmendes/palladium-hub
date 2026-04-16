@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Inter:wght@300;400;500;600&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');

:root {
  --pal:#534AB7;--pal-light:#EEEDFE;--pal-mid:#AFA9EC;--pal-dark:#3C3489;--pal-deep:#26215C;
  --pes:#0F6E56;--pes-light:#E1F5EE;--pes-mid:#5DCAA5;--pes-dark:#085041;
  --inv:#854F0B;--inv-light:#FAEEDA;--inv-mid:#EF9F27;--inv-dark:#633806;
  --emp:#993556;--emp-light:#FBEAF0;--emp-mid:#ED93B1;--emp-dark:#72243E;
  --urg:#A32D2D;--urg-light:#FCEBEB;--urg-mid:#F09595;
  --docs-color:#185FA5;--docs-light:#E6F1FB;--docs-mid:#85B7EB;
  --bg:#F7F6F3;--surface:#FFFFFF;--surface2:#F1EFE8;
  --border:rgba(0,0,0,0.08);--border-mid:rgba(0,0,0,0.14);
  --text:#1A1A18;--text-2:#5F5E5A;--text-3:#9B9A95;
  --font-display:'Syne',sans-serif;--font-body:'DM Sans',sans-serif;
  --card-pad:14px;--card-gap:8px;--content-gap:1.5rem;
  --radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:24px;
  --sidebar-w:220px;--topbar-h:58px;
}

[data-theme="dark"] {
  --bg:#111110;--surface:#1C1C1A;--surface2:#242422;
  --border:rgba(255,255,255,0.08);--border-mid:rgba(255,255,255,0.14);
  --text:#E8E6DF;--text-2:#A8A69F;--text-3:#6B6963;
  --pal-light:#1E1B3A;--pal-mid:#3C3489;--pal-dark:#AFA9EC;
  --pes-light:#0A2A21;--pes-mid:#0F6E56;--pes-dark:#5DCAA5;
  --inv-light:#2A1E06;--inv-mid:#854F0B;--inv-dark:#EF9F27;
  --emp-light:#2A1020;--emp-mid:#993556;--emp-dark:#ED93B1;
  --urg-light:#2A0F0F;--urg-mid:#A32D2D;
  --docs-light:#0A1E35;--docs-mid:#185FA5;
  color-scheme:dark;
}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:14px;-webkit-font-smoothing:antialiased}
body{font-family:var(--font-body);background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column;transition:background .2s,color .2s}

.topbar{height:var(--topbar-h);background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 1.5rem;gap:1rem;position:sticky;top:0;z-index:100}
.topbar-logo{font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;text-decoration:none;flex-shrink:0}
.logo-mark{width:28px;height:28px;background:var(--pal);border-radius:8px;display:flex;align-items:center;justify-content:center;transition:background .3s}
.logo-mark svg{width:16px;height:16px}
.topbar-center{flex:1;display:flex;align-items:center;gap:6px}
.topbar-date{font-size:12px;color:var(--text-3);background:var(--surface2);padding:4px 12px;border-radius:20px}
.topbar-right{display:flex;align-items:center;gap:8px;flex-shrink:0}
.btn-icon{width:34px;height:34px;border:1px solid var(--border-mid);background:transparent;border-radius:var(--radius-sm);cursor:pointer;color:var(--text-2);font-size:16px;display:flex;align-items:center;justify-content:center;transition:all .12s}
.btn-icon:hover{background:var(--surface2);color:var(--text)}
.btn-claude{font-family:var(--font-body);font-size:12px;font-weight:500;padding:6px 14px;border-radius:20px;border:1px solid var(--pal-mid);background:var(--pal-light);color:var(--pal-dark);cursor:pointer;transition:all .15s}
.btn-claude:hover{background:var(--pal-mid)}

.app-layout{display:flex;flex:1;min-height:calc(100vh - var(--topbar-h))}

.sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);padding:1.25rem 0;flex-shrink:0;display:flex;flex-direction:column;gap:2px}
.nav-section-label{font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-3);padding:8px 1.25rem 4px;margin-top:6px}
.nav-item{display:flex;align-items:center;gap:10px;padding:8px 1.25rem;font-size:13px;font-weight:400;color:var(--text-2);cursor:pointer;border:none;background:transparent;width:100%;text-align:left;transition:all .12s;position:relative;font-family:var(--font-body)}
.nav-item:hover{background:var(--surface2);color:var(--text)}
.nav-item.active{color:var(--text);font-weight:500;background:var(--surface2)}
.nav-item.active::before{content:'';position:absolute;left:0;top:4px;bottom:4px;width:3px;border-radius:0 2px 2px 0}
.nav-item.active.nav-home::before{background:var(--text)}
.nav-item.active.nav-pal::before{background:var(--pal)}
.nav-item.active.nav-emp::before{background:var(--emp)}
.nav-item.active.nav-pes::before{background:var(--pes)}
.nav-item.active.nav-inv::before{background:var(--inv)}
.nav-item.active.nav-docs::before{background:var(--docs-color)}
.nav-item.active.nav-config::before{background:var(--text-3)}
.nav-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:background .3s}

.main{flex:1;padding:1.75rem;min-width:0;overflow-x:hidden}
.panel{display:none}.panel.active{display:block}

.page-hd{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--content-gap);gap:1rem}
.page-hd-actions{display:flex;gap:8px;align-items:center}
.page-title{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--text);line-height:1.2}
.page-sub{font-size:13px;color:var(--text-3);margin-top:2px}

.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--card-gap);margin-bottom:var(--content-gap)}
.three-col-metrics{grid-template-columns:repeat(3,minmax(0,1fr))}
.metric{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:var(--card-pad);position:relative;overflow:hidden;transition:background .2s}
.metric::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--radius-md) var(--radius-md) 0 0}
.metric.m-urg::after{background:var(--urg)}.metric.m-pal::after{background:var(--pal)}.metric.m-emp::after{background:var(--emp)}.metric.m-pes::after{background:var(--pes)}.metric.m-inv::after{background:var(--inv)}.metric.m-docs::after{background:var(--docs-color)}
.metric-lbl{font-size:11px;color:var(--text-3);margin-bottom:6px}
.metric-val{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--text);line-height:1}
.metric-sub{font-size:11px;color:var(--text-3);margin-top:4px}

.sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.st{font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--text-3)}

.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:var(--card-pad);margin-bottom:var(--card-gap);transition:border-color .15s,background .2s}
.card:hover{border-color:var(--border-mid)}
.card-row{display:flex;align-items:flex-start;gap:10px}
.card-body{flex:1;min-width:0}
.card-title{font-size:13px;font-weight:500;color:var(--text);line-height:1.4;outline:none;cursor:text}
.card-title:focus{background:var(--surface2);border-radius:4px;padding:1px 5px;margin:-1px -5px}
.card-obs{font-size:12px;color:var(--text-2);margin-top:3px;line-height:1.5;outline:none;cursor:text}
.card-obs:focus{background:var(--surface2);border-radius:4px;padding:1px 5px}
.card-meta{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;align-items:center}

.badge{font-size:11px;padding:2px 9px;border-radius:20px;font-weight:500;white-space:nowrap;font-family:var(--font-body)}
.b-pal{background:var(--pal-light);color:var(--pal-dark)}.b-pes{background:var(--pes-light);color:var(--pes-dark)}.b-inv{background:var(--inv-light);color:var(--inv-dark)}.b-emp{background:var(--emp-light);color:var(--emp-dark)}.b-docs{background:var(--docs-light);color:var(--docs-color)}
.b-red{background:#FCEBEB;color:#A32D2D}.b-amber{background:#FAEEDA;color:#633806}.b-green{background:#EAF3DE;color:#27500A}.b-gray{background:var(--surface2);color:var(--text-2)}.b-blue{background:#E6F1FB;color:#0C447C}

.prio-bar{width:3px;border-radius:2px;align-self:stretch;flex-shrink:0;min-height:38px}
.p-alta{background:#E24B4A}.p-media{background:#EF9F27}.p-baixa{background:#639922}

.pin-star{font-size:13px;cursor:pointer;color:var(--text-3);border:none;background:transparent;padding:0 2px;line-height:1}
.pin-star.pinned{color:#EF9F27}
.del-x{font-size:11px;color:var(--text-3);cursor:pointer;border:none;background:transparent;padding:2px 5px;border-radius:4px;line-height:1}
.del-x:hover{color:var(--urg);background:var(--urg-light)}

.add-mini{font-size:12px;padding:4px 12px;cursor:pointer;border-radius:20px;border:1px solid var(--border-mid);background:transparent;color:var(--text-2);font-family:var(--font-body);transition:all .12s}
.add-mini:hover{background:var(--surface2);color:var(--text)}

.form-box{background:var(--surface2);border-radius:var(--radius-md);padding:14px;margin-bottom:1rem;display:none;border:1px solid var(--border)}
.form-box.open{display:block}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.fw{margin-bottom:8px}
.fg input,.fg select,.fw input,.fw select,.fw textarea{width:100%;font-size:12px;padding:7px 10px;border:1px solid var(--border-mid);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);font-family:var(--font-body);transition:border-color .12s}
.fg input:focus,.fg select:focus,.fw input:focus,.fw select:focus,.fw textarea:focus{outline:none;border-color:var(--pal-mid)}
.fa{display:flex;gap:8px}
.btn-save{font-size:12px;padding:7px 16px;cursor:pointer;border-radius:var(--radius-sm);border:none;background:var(--text);color:var(--surface);font-family:var(--font-body);font-weight:500;transition:opacity .12s}
.btn-save:hover{opacity:.8}
.btn-cancel{font-size:12px;padding:7px 16px;cursor:pointer;border-radius:var(--radius-sm);border:1px solid var(--border-mid);background:transparent;color:var(--text-2);font-family:var(--font-body)}
.btn-cancel:hover{background:var(--surface)}

.kanban{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:1rem}
.kb-col{background:var(--surface2);border-radius:var(--radius-md);padding:12px;min-height:120px}
.kb-col-hd{font-size:11px;font-weight:600;color:var(--text-2);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;letter-spacing:.04em}
.kb-count{font-size:11px;background:var(--surface);color:var(--text-3);padding:1px 7px;border-radius:20px}
.kb-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px 11px;margin-bottom:6px;transition:border-color .12s}
.kb-card:hover{border-color:var(--pal-mid)}
.kb-title{font-size:12px;font-weight:500;color:var(--text);line-height:1.4;margin-bottom:6px;outline:none}
.kb-title:focus{background:var(--surface2);border-radius:3px;padding:1px 3px}
.kb-meta{display:flex;gap:5px;flex-wrap:wrap;align-items:center}
.kb-move{font-size:10px;color:var(--text-3);cursor:pointer;border:none;background:transparent;padding:1px 5px;border-radius:3px;font-family:var(--font-body)}
.kb-move:hover{background:var(--pal-light);color:var(--pal-dark)}

.setor-tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:1rem}
.setor-btn{font-size:12px;padding:5px 14px;cursor:pointer;border-radius:20px;border:1px solid var(--border-mid);background:transparent;color:var(--text-2);font-family:var(--font-body);transition:all .12s}
.setor-btn.active{background:var(--pal);color:#fff;border-color:var(--pal)}
.setor-btn:hover:not(.active){background:var(--pal-light);color:var(--pal-dark)}

.fin-2col{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.fin-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px 16px}
.fin-hd{font-size:11px;font-weight:600;color:var(--text-3);margin-bottom:12px;letter-spacing:.06em;text-transform:uppercase}
.fin-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px;gap:8px}
.fin-row:last-child{border-bottom:none}
.fin-left{flex:1;min-width:0}
.fin-name{font-weight:500;color:var(--text);outline:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fin-name:focus{background:var(--surface2);border-radius:3px;padding:1px 4px}
.fin-dt{font-size:11px;color:var(--text-3);margin-top:1px}
.fin-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
.fin-val{font-weight:500;font-size:13px}
.neg{color:#E24B4A}.pos{color:#639922}

.emp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:1rem}
.emp-card{background:var(--surface);border:1px solid var(--emp-mid);border-radius:var(--radius-lg);padding:16px;cursor:pointer;transition:all .15s}
.emp-card:hover{border-width:1.5px}
.emp-card.selected{border:2px solid var(--emp);background:var(--emp-light)}
.emp-name{font-family:var(--font-display);font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px}
.emp-meta{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.emp-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;border-top:1px solid var(--border);padding-top:10px}
.emp-stat{text-align:center}
.emp-stat-n{font-family:var(--font-display);font-size:18px;font-weight:700;color:var(--emp-dark)}
.emp-stat-l{font-size:10px;color:var(--text-3)}
.emp-detail{background:var(--surface2);border:1px solid var(--emp-mid);border-radius:var(--radius-lg);padding:16px;margin-bottom:1rem}
.emp-detail-hd{font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--emp-dark);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between}
.fase-bar{display:flex;gap:4px;margin-bottom:14px}
.fase-step{flex:1;padding:5px 4px;text-align:center;font-size:11px;font-weight:500;border-radius:20px;border:1px solid var(--border-mid);color:var(--text-3);background:transparent;cursor:pointer;font-family:var(--font-body);transition:all .12s}
.fase-step:hover{background:var(--surface);color:var(--text-2)}
.fase-step.active{background:var(--emp);color:#fff;border-color:var(--emp)}

.inv-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:1.25rem}
.inv-stat{border-radius:var(--radius-md);padding:14px 16px;border:1px solid var(--inv-mid);background:var(--inv-light)}
.inv-stat-n{font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--inv-dark)}
.inv-stat-l{font-size:11px;color:var(--text-3);margin-top:2px}

.doc-lib{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:1rem}
.doc-item{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px 14px;display:flex;align-items:flex-start;gap:10px}
.doc-item:hover{border-color:var(--border-mid)}
.doc-icon{width:34px;height:34px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.doc-icon.pdf{background:#FCEBEB;color:#A32D2D}.doc-icon.docx,.doc-icon.doc{background:#E6F1FB;color:#0C447C}.doc-icon.xlsx,.doc-icon.xls{background:#EAF3DE;color:#27500A}.doc-icon.link{background:var(--pal-light);color:var(--pal-dark)}.doc-icon.other{background:var(--surface2);color:var(--text-2)}
.doc-body{flex:1;min-width:0}
.doc-name{font-size:12px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.doc-meta{font-size:11px;color:var(--text-3);margin-top:2px}
.doc-open{font-size:11px;color:var(--docs-color);cursor:pointer;text-decoration:none;display:inline-block;margin-top:3px}

.drop-zone{border:1.5px dashed var(--border-mid);border-radius:var(--radius-md);padding:1.5rem;text-align:center;margin-bottom:1rem;cursor:pointer;transition:all .15s}
.drop-zone:hover,.drop-zone.dragover{border-color:var(--pal);background:var(--pal-light)}
.drop-zone-txt{font-size:13px;color:var(--text-2)}
.drop-zone-sub{font-size:11px;color:var(--text-3);margin-top:4px}
.file-input{display:none}

.agenda-row{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
.agenda-row:last-child{border-bottom:none}
.agenda-day{font-size:11px;font-weight:600;color:var(--text-2);min-width:32px;text-align:center;background:var(--surface2);border-radius:6px;padding:3px 5px}
.agenda-txt{flex:1;color:var(--text);outline:none;cursor:text}
.agenda-txt:focus{background:var(--surface2);border-radius:4px;padding:1px 4px}

.scratch{width:100%;min-height:100px;font-size:13px;padding:12px 14px;border:1px solid var(--border-mid);border-radius:var(--radius-md);background:var(--surface2);color:var(--text);resize:vertical;font-family:var(--font-body);line-height:1.6;transition:border-color .12s}
.scratch:focus{outline:none;border-color:var(--pal-mid)}

.proc-row{display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--border);font-size:12px}
.proc-row:last-child{border-bottom:none}

.sep{margin:1.5rem 0 1.25rem;border:none;border-top:1px solid var(--border)}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
.empty-msg{font-size:12px;color:var(--text-3);padding:.875rem 0;text-align:center}

/* ── CONFIGURAÇÕES ── */
.config-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.config-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem}
.config-section-title{font-size:13px;font-weight:500;color:var(--text);margin-bottom:1rem;padding-bottom:.75rem;border-bottom:1px solid var(--border)}
.config-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border);gap:12px}
.config-row:last-child{border-bottom:none}
.config-label{font-size:12px;color:var(--text-2)}
.color-picker-wrap{display:flex;align-items:center;gap:8px}
.color-preview{width:24px;height:24px;border-radius:6px;border:1px solid var(--border-mid);flex-shrink:0}
input[type="color"]{width:32px;height:28px;border:1px solid var(--border-mid);border-radius:var(--radius-sm);cursor:pointer;padding:2px;background:var(--surface)}
.font-select,.space-select{font-size:12px;padding:5px 8px;border:1px solid var(--border-mid);border-radius:var(--radius-sm);background:var(--surface);color:var(--text);font-family:var(--font-body);cursor:pointer}
.toggle{position:relative;width:36px;height:20px;background:var(--border-mid);border-radius:20px;cursor:pointer;transition:background .2s;border:none;flex-shrink:0}
.toggle.on{background:var(--pal)}
.toggle::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;background:white;border-radius:50%;transition:transform .2s}
.toggle.on::after{transform:translateX(16px)}
.config-preview{background:var(--surface2);border-radius:var(--radius-md);padding:1rem;margin-top:.75rem;text-align:center}
.btn-config-save{width:100%;margin-top:1rem;font-size:13px;padding:10px;cursor:pointer;border-radius:var(--radius-md);border:none;background:var(--pal);color:white;font-family:var(--font-body);font-weight:500;transition:opacity .12s}
.btn-config-save:hover{opacity:.85}
.btn-config-reset{width:100%;margin-top:8px;font-size:12px;padding:8px;cursor:pointer;border-radius:var(--radius-md);border:1px solid var(--border-mid);background:transparent;color:var(--text-3);font-family:var(--font-body)}
.btn-config-reset:hover{background:var(--surface2);color:var(--text-2)}
.font-preview{font-size:15px;color:var(--text);margin-bottom:4px}
.font-preview-sub{font-size:12px;color:var(--text-3)}

.btn-export{font-size:12px;padding:6px 14px;cursor:pointer;border-radius:20px;border:1px solid var(--border-mid);background:var(--surface);color:var(--text-2);font-family:var(--font-body);transition:all .12s;display:flex;align-items:center;gap:5px}
.btn-export:hover{background:var(--surface2);color:var(--text)}

@media print{
  .topbar,.sidebar,.page-hd-actions,.add-mini,.btn-export,.pin-star,.del-x,.kb-move,.form-box,.btn-save,.btn-cancel,.btn-icon{display:none!important}
  .app-layout{display:block}.main{padding:0}.panel{display:block!important}
  body{background:white}.card,.metric,.kb-col,.fin-card{break-inside:avoid}
}

::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border-mid);border-radius:10px}

@media(max-width:768px){
  :root{--sidebar-w:0px}
  .sidebar{display:none;position:fixed;left:0;top:var(--topbar-h);bottom:0;width:240px;z-index:200;box-shadow:4px 0 20px rgba(0,0,0,.15)}
  .sidebar.open{display:flex}
  .main{padding:1rem}
  .metrics{grid-template-columns:repeat(2,1fr)}
  .kanban{grid-template-columns:1fr}
  .two-col{grid-template-columns:1fr}
  .fin-2col{grid-template-columns:1fr}
  .emp-grid{grid-template-columns:1fr}
  .doc-lib{grid-template-columns:1fr}
  .config-grid{grid-template-columns:1fr}
  .menu-toggle{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border:none;background:transparent;cursor:pointer;color:var(--text);font-size:18px}
}
@media(min-width:769px){.menu-toggle{display:none}}
