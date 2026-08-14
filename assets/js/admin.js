(() => {
  "use strict";
  const SESSION_KEY = "bem_admin_session";
  const METRICS_KEY = "bem_transparency_metrics";
  const DOCS_KEY = "bem_transparency_documents";
  const STRUCTURE_KEY = "bem_structure_data";
  const DB_NAME = "BEMKemaFKDemoDB";
  const DB_VERSION = 1;
  const STORE = "files";
  const METRICS_SEED = {"programTotal": 34, "programCompleted": 21, "programRunning": 9, "programScheduled": 4, "programDelayed": 0, "budgetPercent": 67, "budgetRealized": 286100000, "budgetTotal": 428500000, "aspirationPercent": 84, "aspirationTotal": 128, "aspirationVerified": 116, "aspirationInProcess": 38, "aspirationCompleted": 78, "responseDays": 2.3, "period": "Semester I 2026", "updatedAt": "2026-08-15T00:00:00+08:00"};
  const DOCS_SEED = [{"id": "doc-1", "category": "keuangan", "title": "Laporan Realisasi Anggaran Semester I", "period": "Semester I 2026", "description": "Ringkasan pendapatan, belanja, saldo, dan catatan realisasi per bidang.", "published": true, "type": "PDF", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}, {"id": "doc-2", "category": "kinerja", "title": "Laporan Kinerja Kabinet Triwulan II", "period": "Triwulan II 2026", "description": "Capaian indikator, progres program, kendala, dan rencana tindak lanjut.", "published": true, "type": "PDF", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}, {"id": "doc-3", "category": "regulasi", "title": "SOP Pengelolaan Aspirasi Mahasiswa", "period": "2026", "description": "Alur penerimaan, klasifikasi, perlindungan identitas, eskalasi, dan penutupan laporan.", "published": true, "type": "SOP", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}, {"id": "doc-4", "category": "regulasi", "title": "Pedoman Administrasi dan Kesekretariatan", "period": "2026", "description": "Standar surat, pengarsipan, inventaris, notulensi, dan pengelolaan dokumen.", "published": true, "type": "DOC", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}, {"id": "doc-5", "category": "keuangan", "title": "Ringkasan Arus Kas Triwulan II", "period": "Triwulan II 2026", "description": "Rekap transaksi masuk dan keluar beserta klasifikasi sumber serta penggunaan dana.", "published": true, "type": "XLS", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}, {"id": "doc-6", "category": "kinerja", "title": "Matriks Program Kerja Kabinet Metamorfosis", "period": "Tahunan 2026", "description": "Daftar program, indikator, jadwal, penanggung jawab, status, dan evaluasi singkat.", "published": true, "type": "XLS", "fileKey": null, "fileName": "", "externalUrl": "", "createdAt": "2026-08-15T00:00:00+08:00"}];
  const STRUCTURE_SEED = {"ministries": {"01-keagamaan": {"name": "Keagamaan", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/01-keagamaan/anggota-01.jpg", "id": "01-keagamaan-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/01-keagamaan/anggota-02.jpg", "id": "01-keagamaan-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/01-keagamaan/anggota-03.jpg", "id": "01-keagamaan-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/01-keagamaan/anggota-04.jpg", "id": "01-keagamaan-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/01-keagamaan/anggota-05.jpg", "id": "01-keagamaan-member-5", "photoKey": null}]}, "02-psdm": {"name": "Pengembangan Sumber Daya Manusia", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/02-psdm/anggota-01.jpg", "id": "02-psdm-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/02-psdm/anggota-02.jpg", "id": "02-psdm-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/02-psdm/anggota-03.jpg", "id": "02-psdm-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/02-psdm/anggota-04.jpg", "id": "02-psdm-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/02-psdm/anggota-05.jpg", "id": "02-psdm-member-5", "photoKey": null}]}, "03-kajian-strategis-advokasi": {"name": "Kajian Strategis dan Advokasi", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/03-kajian-strategis-advokasi/anggota-01.jpg", "id": "03-kajian-strategis-advokasi-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/03-kajian-strategis-advokasi/anggota-02.jpg", "id": "03-kajian-strategis-advokasi-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/03-kajian-strategis-advokasi/anggota-03.jpg", "id": "03-kajian-strategis-advokasi-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/03-kajian-strategis-advokasi/anggota-04.jpg", "id": "03-kajian-strategis-advokasi-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/03-kajian-strategis-advokasi/anggota-05.jpg", "id": "03-kajian-strategis-advokasi-member-5", "photoKey": null}]}, "04-komunikasi-informasi": {"name": "Komunikasi dan Informasi", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/04-komunikasi-informasi/anggota-01.jpg", "id": "04-komunikasi-informasi-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/04-komunikasi-informasi/anggota-02.jpg", "id": "04-komunikasi-informasi-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/04-komunikasi-informasi/anggota-03.jpg", "id": "04-komunikasi-informasi-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/04-komunikasi-informasi/anggota-04.jpg", "id": "04-komunikasi-informasi-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/04-komunikasi-informasi/anggota-05.jpg", "id": "04-komunikasi-informasi-member-5", "photoKey": null}]}, "05-hubungan-luar": {"name": "Hubungan Luar", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/05-hubungan-luar/anggota-01.jpg", "id": "05-hubungan-luar-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/05-hubungan-luar/anggota-02.jpg", "id": "05-hubungan-luar-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/05-hubungan-luar/anggota-03.jpg", "id": "05-hubungan-luar-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/05-hubungan-luar/anggota-04.jpg", "id": "05-hubungan-luar-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/05-hubungan-luar/anggota-05.jpg", "id": "05-hubungan-luar-member-5", "photoKey": null}]}, "06-administrasi-kesekretariatan": {"name": "Administrasi dan Kesekretariatan", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/06-administrasi-kesekretariatan/anggota-01.jpg", "id": "06-administrasi-kesekretariatan-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/06-administrasi-kesekretariatan/anggota-02.jpg", "id": "06-administrasi-kesekretariatan-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/06-administrasi-kesekretariatan/anggota-03.jpg", "id": "06-administrasi-kesekretariatan-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/06-administrasi-kesekretariatan/anggota-04.jpg", "id": "06-administrasi-kesekretariatan-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/06-administrasi-kesekretariatan/anggota-05.jpg", "id": "06-administrasi-kesekretariatan-member-5", "photoKey": null}]}, "07-keuangan": {"name": "Keuangan", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/07-keuangan/anggota-01.jpg", "id": "07-keuangan-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/07-keuangan/anggota-02.jpg", "id": "07-keuangan-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/07-keuangan/anggota-03.jpg", "id": "07-keuangan-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/07-keuangan/anggota-04.jpg", "id": "07-keuangan-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/07-keuangan/anggota-05.jpg", "id": "07-keuangan-member-5", "photoKey": null}]}, "08-pendidikan-profesi": {"name": "Pendidikan dan Profesi", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/08-pendidikan-profesi/anggota-01.jpg", "id": "08-pendidikan-profesi-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/08-pendidikan-profesi/anggota-02.jpg", "id": "08-pendidikan-profesi-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/08-pendidikan-profesi/anggota-03.jpg", "id": "08-pendidikan-profesi-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/08-pendidikan-profesi/anggota-04.jpg", "id": "08-pendidikan-profesi-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/08-pendidikan-profesi/anggota-05.jpg", "id": "08-pendidikan-profesi-member-5", "photoKey": null}]}, "09-pengabdian-masyarakat": {"name": "Pengabdian Masyarakat", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/09-pengabdian-masyarakat/anggota-01.jpg", "id": "09-pengabdian-masyarakat-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/09-pengabdian-masyarakat/anggota-02.jpg", "id": "09-pengabdian-masyarakat-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/09-pengabdian-masyarakat/anggota-03.jpg", "id": "09-pengabdian-masyarakat-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/09-pengabdian-masyarakat/anggota-04.jpg", "id": "09-pengabdian-masyarakat-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/09-pengabdian-masyarakat/anggota-05.jpg", "id": "09-pengabdian-masyarakat-member-5", "photoKey": null}]}, "10-minat-bakat": {"name": "Pengabdian Minat dan Bakat", "members": [{"name": "Nama Anggota 01", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/10-minat-bakat/anggota-01.jpg", "id": "10-minat-bakat-member-1", "photoKey": null}, {"name": "Nama Anggota 02", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/10-minat-bakat/anggota-02.jpg", "id": "10-minat-bakat-member-2", "photoKey": null}, {"name": "Nama Anggota 03", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/10-minat-bakat/anggota-03.jpg", "id": "10-minat-bakat-member-3", "photoKey": null}, {"name": "Nama Anggota 04", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/10-minat-bakat/anggota-04.jpg", "id": "10-minat-bakat-member-4", "photoKey": null}, {"name": "Nama Anggota 05", "role": "Anggota", "photo": "assets/img/pengurus/kementerian/10-minat-bakat/anggota-05.jpg", "id": "10-minat-bakat-member-5", "photoKey": null}]}}, "specialInstitutions": [{"code": "LK01", "name": "Staf Ahli Presidium", "description": "Memberikan masukan substantif pada isu strategis dan membantu proyek lintas kementerian.", "id": "special-1"}, {"code": "LK02", "name": "Badan Pengawasan Internal", "description": "Memantau kepatuhan prosedur, mutu dokumentasi, dan konsistensi pelaporan kinerja.", "id": "special-2"}, {"code": "LK03", "name": "Koordinator Program Strategis", "description": "Mengelola program prioritas yang melibatkan beberapa kementerian dan mitra eksternal.", "id": "special-3"}, {"code": "LK04", "name": "Tim Ad Hoc", "description": "Dibentuk untuk kebutuhan tertentu dengan mandat, target, dan periode kerja yang terbatas.", "id": "special-4"}]};

  const session = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  if (!session) { window.location.replace("login.html"); return; }

  const deepClone = (x) => JSON.parse(JSON.stringify(x));
  const loadJSON = (key, fallback) => { try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : deepClone(fallback); } catch { return deepClone(fallback); } };
  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const uid = (prefix="id") => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const initials = (name) => String(name||"A").split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
  const rupiah = (n) => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);

  let metrics = loadJSON(METRICS_KEY, METRICS_SEED);
  let documents = loadJSON(DOCS_KEY, DOCS_SEED);
  let structure = loadJSON(STRUCTURE_KEY, STRUCTURE_SEED);
  if (!localStorage.getItem(METRICS_KEY)) saveJSON(METRICS_KEY,metrics);
  if (!localStorage.getItem(DOCS_KEY)) saveJSON(DOCS_KEY,documents);
  if (!localStorage.getItem(STRUCTURE_KEY)) saveJSON(STRUCTURE_KEY,structure);

  function openDB() {
    return new Promise((resolve,reject)=>{
      const req=indexedDB.open(DB_NAME,DB_VERSION);
      req.onupgradeneeded=()=>{ const db=req.result; if(!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE); };
      req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
    });
  }
  async function putFile(key,file) { const db=await openDB(); return new Promise((res,rej)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).put(file,key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}); }
  async function getFile(key) { if(!key) return null; const db=await openDB(); return new Promise((res,rej)=>{const tx=db.transaction(STORE,"readonly");const r=tx.objectStore(STORE).get(key);r.onsuccess=()=>res(r.result||null);r.onerror=()=>rej(r.error);}); }
  async function deleteFile(key) { if(!key) return; const db=await openDB(); return new Promise((res,rej)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).delete(key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}); }
  async function clearFiles() { const db=await openDB(); return new Promise((res,rej)=>{const tx=db.transaction(STORE,"readwrite");tx.objectStore(STORE).clear();tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);}); }

  const toastEl=document.getElementById("admin-toast"); let toastTimer;
  function toast(message) { clearTimeout(toastTimer); toastEl.textContent=message; toastEl.classList.add("is-visible"); toastTimer=setTimeout(()=>toastEl.classList.remove("is-visible"),2200); }
  function confirmAction(message) { return window.confirm(message); }

  const titles={dashboard:["Overview","Dashboard"],transparency:["Public Data","Transparansi"],structure:["Organization","Struktur Organisasi"],settings:["Demo Control","Pengaturan Demo"]};
  function switchView(view) {
    document.querySelectorAll(".admin-view").forEach(x=>x.classList.toggle("is-active",x.dataset.view===view));
    document.querySelectorAll("[data-admin-view]").forEach(x=>x.classList.toggle("is-active",x.dataset.adminView===view));
    const t=titles[view]||titles.dashboard; document.getElementById("admin-page-kicker").textContent=t[0];document.getElementById("admin-page-title").textContent=t[1];
    document.getElementById("admin-sidebar").classList.remove("is-open");
    if(view==="dashboard") renderDashboard(); if(view==="transparency") renderTransparency(); if(view==="structure") renderStructure();
  }
  document.querySelectorAll("[data-admin-view]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.adminView)));
  document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>{switchView(b.dataset.jump); setTimeout(()=>{ if(b.dataset.action==="new-doc") openDocumentModal(); if(b.dataset.action==="new-member") openMemberModal(); if(b.dataset.action==="new-special") openSpecialModal(); },80);}));
  document.getElementById("admin-mobile-menu").addEventListener("click",()=>document.getElementById("admin-sidebar").classList.toggle("is-open"));
  document.getElementById("admin-logout").addEventListener("click",()=>{localStorage.removeItem(SESSION_KEY);sessionStorage.removeItem(SESSION_KEY);window.location.replace("login.html");});
  document.getElementById("preview-public").addEventListener("click",()=>window.open("../transparansi.html","_blank"));
  document.querySelector(".admin-notice-close")?.addEventListener("click",e=>e.currentTarget.parentElement.remove());

  function renderDashboard() {
    const published=documents.filter(d=>d.published).length, drafts=documents.length-published;
    const memberCount=Object.values(structure.ministries||{}).reduce((n,m)=>n+(Array.isArray(m.members)?m.members.length:0),0);
    document.getElementById("dash-programs").textContent=metrics.programTotal||0;
    document.getElementById("dash-program-detail").textContent=`${metrics.programCompleted||0} selesai`;
    document.getElementById("dash-documents").textContent=published;
    document.getElementById("dash-doc-detail").textContent=`${drafts} draft`;
    document.getElementById("dash-members").textContent=memberCount;
    document.getElementById("dash-special").textContent=(structure.specialInstitutions||[]).length;
  }

  const metricsForm=document.getElementById("metrics-form");
  function fillMetrics() { Array.from(metricsForm.elements).forEach(el=>{if(el.name && metrics[el.name]!==undefined) el.value=metrics[el.name];}); }
  document.getElementById("save-metrics").addEventListener("click",()=>{
    const fd=new FormData(metricsForm); const next={...metrics};
    for(const [k,v] of fd.entries()) next[k]=k==="period"?String(v):Number(v);
    next.updatedAt=new Date().toISOString(); metrics=next; saveJSON(METRICS_KEY,metrics); renderDashboard(); toast("Indikator transparansi disimpan.");
  });

  const docSearch=document.getElementById("admin-doc-search"), docFilter=document.getElementById("admin-doc-filter");
  function renderDocuments() {
    const q=(docSearch.value||"").toLowerCase(), f=docFilter.value;
    const rows=documents.filter(d=>(!q||`${d.title} ${d.description} ${d.period}`.toLowerCase().includes(q)) && (f==="all"||(f==="published"?d.published:!d.published)));
    document.getElementById("documents-empty").hidden=rows.length>0;
    document.getElementById("documents-table").innerHTML=rows.map(d=>`<tr>
      <td><strong>${esc(d.title)}</strong><small>${esc(d.description||"")}</small></td>
      <td>${esc((d.category||"lainnya").replace(/^./,c=>c.toUpperCase()))}</td><td>${esc(d.period||"-")}</td>
      <td><span class="admin-table-badge ${d.published?'admin-table-badge--published':'admin-table-badge--draft'}">${d.published?'Publik':'Draft'}</span></td>
      <td><span class="admin-file-state">${d.fileName?esc(d.fileName):(d.externalUrl?'URL eksternal':'Belum ada file')}</span></td>
      <td><div class="admin-row-actions"><button data-doc-preview="${d.id}">Lihat</button><button data-doc-edit="${d.id}">Edit</button><button class="is-danger" data-doc-delete="${d.id}">Hapus</button></div></td></tr>`).join("");
    document.querySelectorAll("[data-doc-edit]").forEach(b=>b.onclick=()=>openDocumentModal(b.dataset.docEdit));
    document.querySelectorAll("[data-doc-delete]").forEach(b=>b.onclick=()=>deleteDocument(b.dataset.docDelete));
    document.querySelectorAll("[data-doc-preview]").forEach(b=>b.onclick=()=>previewDocument(b.dataset.docPreview));
  }
  docSearch.addEventListener("input",renderDocuments);docFilter.addEventListener("change",renderDocuments);
  function renderTransparency() {fillMetrics();renderDocuments();}

  const docModal=document.getElementById("document-modal"),docForm=document.getElementById("document-form");
  function openDocumentModal(id=null) {
    docForm.reset(); const d=id?documents.find(x=>x.id===id):null;
    document.getElementById("document-modal-title").textContent=d?"Edit Dokumen":"Tambah Dokumen";
    const fileInfo=document.getElementById("document-current-file"); fileInfo.hidden=true;
    docForm.elements.id.value=d?.id||"";
    if(d) {["title","category","period","type","description","externalUrl"].forEach(k=>{if(docForm.elements[k])docForm.elements[k].value=d[k]||"";});docForm.elements.published.value=String(Boolean(d.published)); if(d.fileName){fileInfo.hidden=false;fileInfo.textContent=`File tersimpan: ${d.fileName}`;}}
    else docForm.elements.published.value="true";
    docModal.showModal();
  }
  document.getElementById("new-document").addEventListener("click",()=>openDocumentModal());
  docForm.addEventListener("submit",async e=>{
    e.preventDefault(); const fd=new FormData(docForm); const existingId=fd.get("id"); let d=existingId?documents.find(x=>x.id===existingId):null;
    if(!d) d={id:uid("doc"),createdAt:new Date().toISOString(),fileKey:null,fileName:""};
    d={...d,title:String(fd.get("title")||"").trim(),category:fd.get("category"),period:String(fd.get("period")||"").trim(),type:fd.get("type"),published:fd.get("published")==="true",description:String(fd.get("description")||"").trim(),externalUrl:String(fd.get("externalUrl")||"").trim(),updatedAt:new Date().toISOString()};
    if(!d.title) return;
    const file=docForm.elements.file.files[0];
    if(file) { if(file.size>10*1024*1024){toast("File demo maksimal 10 MB.");return;} const key=d.fileKey||`document:${d.id}`; await putFile(key,file);d.fileKey=key;d.fileName=file.name;d.type=(file.name.split('.').pop()||d.type).toUpperCase().slice(0,4); }
    const idx=documents.findIndex(x=>x.id===d.id); if(idx>=0)documents[idx]=d;else documents.unshift(d);
    saveJSON(DOCS_KEY,documents);docModal.close();renderDocuments();renderDashboard();toast("Dokumen disimpan.");
  });
  async function deleteDocument(id) {const d=documents.find(x=>x.id===id);if(!d||!confirmAction(`Hapus dokumen “${d.title}”?`))return;if(d.fileKey)await deleteFile(d.fileKey);documents=documents.filter(x=>x.id!==id);saveJSON(DOCS_KEY,documents);renderDocuments();renderDashboard();toast("Dokumen dihapus.");}
  async function previewDocument(id) {const d=documents.find(x=>x.id===id);if(!d)return;if(d.fileKey){const file=await getFile(d.fileKey);if(file){const url=URL.createObjectURL(file);window.open(url,"_blank");setTimeout(()=>URL.revokeObjectURL(url),60000);return;}}if(d.externalUrl){window.open(d.externalUrl,"_blank","noopener");return;}toast("Dokumen ini belum memiliki file atau URL.");}

  // STRUCTURE
  const ministrySelect=document.getElementById("ministry-select"), memberList=document.getElementById("member-list");
  const memberForm=document.getElementById("member-form"), memberModal=document.getElementById("member-modal");
  function populateMinistrySelects() {
    const options=Object.entries(structure.ministries||{}).map(([k,m])=>`<option value="${esc(k)}">${esc(m.name)}</option>`).join("");
    const selected=ministrySelect.value;ministrySelect.innerHTML=options;if(selected && structure.ministries[selected])ministrySelect.value=selected;
    memberForm.elements.ministrySelect.innerHTML=options;
  }
  async function hydrateMemberImages() {
    const tasks=[...document.querySelectorAll("[data-member-photo-key]")].map(async el=>{const key=el.dataset.memberPhotoKey;if(!key)return;const file=await getFile(key);if(file){const url=URL.createObjectURL(file);el.innerHTML=`<img src="${url}" alt="">`;}});await Promise.all(tasks);
  }
  function renderMemberList() {
    const key=ministrySelect.value||Object.keys(structure.ministries||{})[0]; if(!key)return;const ministry=structure.ministries[key],members=Array.isArray(ministry.members)?ministry.members:[];
    document.getElementById("selected-ministry-code").textContent=key.slice(0,2);document.getElementById("selected-ministry-name").textContent=ministry.name;document.getElementById("selected-ministry-count").textContent=`${members.length} anggota`;
    memberList.innerHTML=members.length?members.map(m=>`<div class="admin-member-item"><div class="admin-member-avatar" ${m.photoKey?`data-member-photo-key="${esc(m.photoKey)}"`:""}>${esc(initials(m.name))}</div><div><strong>${esc(m.name)}</strong><small>${esc(m.role||"Anggota")}</small></div><div class="admin-item-actions"><button title="Edit" data-member-edit="${esc(m.id)}">✎</button><button title="Hapus" data-member-delete="${esc(m.id)}">×</button></div></div>`).join(""):'<div class="admin-empty">Belum ada anggota. Klik “Tambah Anggota”.</div>';
    document.querySelectorAll("[data-member-edit]").forEach(b=>b.onclick=()=>openMemberModal(b.dataset.memberEdit,key));document.querySelectorAll("[data-member-delete]").forEach(b=>b.onclick=()=>deleteMember(b.dataset.memberDelete,key));hydrateMemberImages();
  }
  function renderSpecial() {
    const list=structure.specialInstitutions||[];document.getElementById("special-list").innerHTML=list.length?list.map(s=>`<div class="admin-special-item"><div class="admin-special-code">${esc(s.code||"LK")}</div><div><strong>${esc(s.name)}</strong><small>${esc(s.description||"")}</small></div><div class="admin-item-actions"><button data-special-edit="${esc(s.id)}">✎</button><button data-special-delete="${esc(s.id)}">×</button></div></div>`).join(""):'<div class="admin-empty">Tidak ada lembaga khusus.</div>';
    document.querySelectorAll("[data-special-edit]").forEach(b=>b.onclick=()=>openSpecialModal(b.dataset.specialEdit));document.querySelectorAll("[data-special-delete]").forEach(b=>b.onclick=()=>deleteSpecial(b.dataset.specialDelete));
  }
  function renderStructure(){populateMinistrySelects();renderMemberList();renderSpecial();renderDashboard();}
  ministrySelect.addEventListener("change",renderMemberList);
  function findMember(id,keyHint){const entries=Object.entries(structure.ministries||{});for(const [k,m] of entries){const mem=(m.members||[]).find(x=>x.id===id);if(mem)return {key:k,member:mem};}return null;}
  function openMemberModal(id=null,keyHint=null){
    memberForm.reset();populateMinistrySelects();const found=id?findMember(id,keyHint):null;const key=found?.key||keyHint||ministrySelect.value||Object.keys(structure.ministries)[0];memberForm.elements.ministrySelect.value=key;memberForm.elements.ministryKey.value=key;memberForm.elements.id.value=found?.member.id||"";memberForm.elements.name.value=found?.member.name||"";memberForm.elements.role.value=found?.member.role||"Anggota";memberForm.elements.photo.value=found?.member.photo||"";document.getElementById("member-modal-title").textContent=found?"Edit Anggota":"Tambah Anggota";memberModal.showModal();}
  document.getElementById("new-member").addEventListener("click",()=>openMemberModal());
  memberForm.addEventListener("submit",async e=>{
    e.preventDefault();const fd=new FormData(memberForm);const id=String(fd.get("id")||"");const targetKey=String(fd.get("ministrySelect")||"");let found=id?findMember(id):null;let member=found?.member||{id:uid("member"),photoKey:null};
    member={...member,name:String(fd.get("name")||"").trim(),role:String(fd.get("role")||"Anggota").trim(),photo:String(fd.get("photo")||"").trim()};if(!member.name)return;
    const file=memberForm.elements.photoFile.files[0];if(file){if(file.size>3*1024*1024){toast("Foto demo maksimal 3 MB.");return;}const key=member.photoKey||`member-photo:${member.id}`;await putFile(key,file);member.photoKey=key;member.photo="";}
    if(found){structure.ministries[found.key].members=structure.ministries[found.key].members.filter(x=>x.id!==id);}
    structure.ministries[targetKey].members=structure.ministries[targetKey].members||[];structure.ministries[targetKey].members.push(member);saveJSON(STRUCTURE_KEY,structure);ministrySelect.value=targetKey;memberModal.close();renderStructure();toast("Anggota disimpan.");
  });
  async function deleteMember(id,key){const found=findMember(id,key);if(!found||!confirmAction(`Hapus ${found.member.name} dari struktur?`))return;if(found.member.photoKey)await deleteFile(found.member.photoKey);structure.ministries[found.key].members=structure.ministries[found.key].members.filter(x=>x.id!==id);saveJSON(STRUCTURE_KEY,structure);renderStructure();toast("Anggota dihapus.");}

  const specialModal=document.getElementById("special-modal"),specialForm=document.getElementById("special-form");
  function openSpecialModal(id=null){specialForm.reset();const s=id?(structure.specialInstitutions||[]).find(x=>x.id===id):null;specialForm.elements.id.value=s?.id||"";specialForm.elements.code.value=s?.code||`LK${String((structure.specialInstitutions||[]).length+1).padStart(2,"0")}`;specialForm.elements.name.value=s?.name||"";specialForm.elements.description.value=s?.description||"";document.getElementById("special-modal-title").textContent=s?"Edit Lembaga Khusus":"Tambah Lembaga Khusus";specialModal.showModal();}
  document.getElementById("new-special").addEventListener("click",()=>openSpecialModal());
  specialForm.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(specialForm);const id=String(fd.get("id")||"");let s=id?(structure.specialInstitutions||[]).find(x=>x.id===id):null;s={...(s||{id:uid("special")}),code:String(fd.get("code")||"").trim(),name:String(fd.get("name")||"").trim(),description:String(fd.get("description")||"").trim()};if(!s.name)return;const idx=(structure.specialInstitutions||[]).findIndex(x=>x.id===s.id);if(idx>=0)structure.specialInstitutions[idx]=s;else structure.specialInstitutions.push(s);saveJSON(STRUCTURE_KEY,structure);specialModal.close();renderStructure();toast("Lembaga khusus disimpan.");});
  function deleteSpecial(id){const s=(structure.specialInstitutions||[]).find(x=>x.id===id);if(!s||!confirmAction(`Hapus lembaga “${s.name}”?`))return;structure.specialInstitutions=structure.specialInstitutions.filter(x=>x.id!==id);saveJSON(STRUCTURE_KEY,structure);renderStructure();toast("Lembaga khusus dihapus.");}

  document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.closeModal).close()));
  [docModal,memberModal,specialModal].forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.close();}));

  document.getElementById("reset-demo").addEventListener("click",async()=>{if(!confirmAction("Reset seluruh data demo ke kondisi awal? Semua file demo yang diunggah juga akan dihapus."))return;localStorage.removeItem(METRICS_KEY);localStorage.removeItem(DOCS_KEY);localStorage.removeItem(STRUCTURE_KEY);await clearFiles();metrics=deepClone(METRICS_SEED);documents=deepClone(DOCS_SEED);structure=deepClone(STRUCTURE_SEED);saveJSON(METRICS_KEY,metrics);saveJSON(DOCS_KEY,documents);saveJSON(STRUCTURE_KEY,structure);renderDashboard();toast("Data demo dikembalikan ke kondisi awal.");});

  renderDashboard();
})();