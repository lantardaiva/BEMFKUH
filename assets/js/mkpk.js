(() => {
  'use strict';

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = (n) => Number(n || 0).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const courses = {
    1: { name: 'Komunikasi dan Kerjasama', sks: 2 },
    2: { name: 'Manajemen Kegiatan', sks: 2 },
    3: { name: 'Strategi Negosiasi', sks: 2 },
    4: { name: 'Pembelajaran Aktif', sks: 2 },
    5: { name: 'Komunikasi Digital', sks: 2 },
    6: { name: 'Empati Sosial', sks: 2 },
    7: { name: 'Keberagaman Budaya', sks: 2 },
    8: { name: 'Pengembangan Masyarakat', sks: 2 },
    9: { name: 'Kewirausahaan Rintisan', sks: 2 },
    10: { name: 'Kewirausahaan Rintisan', sks: 4 },
    11: { name: 'Kepemimpinan Inovatif', sks: 2 },
    12: { name: 'Pengambilan Keputusan', sks: 2 },
    13: { name: 'Pemecahan Masalah', sks: 2 },
    14: { name: 'Etika Profesi', sks: 2 },
    15: { name: 'Berpikir Kritis dan Kreatif', sks: 2 },
    16: { name: 'Kreativitas Solutif', sks: 2 },
    17: { name: 'Inovasi dan Pemikiran Desain', sks: 2 },
    18: { name: 'Pengembangan Talenta', sks: 1 },
    19: { name: 'Pengembangan Talenta', sks: 2 },
    20: { name: 'Literasi dan Presentasi Ilmiah', sks: 2 }
  };

  const categories = [
    { id: 'competition', label: 'Kompetisi', icon: '✦', desc: 'PKM, lomba, PPK Ormawa, olahraga, seni' },
    { id: 'entrepreneurship', label: 'Kewirausahaan', icon: '↗', desc: 'PMW, P2MW, wirausaha mandiri' },
    { id: 'organization', label: 'Keorganisasian', icon: '◎', desc: 'Kepengurusan dan kepanitiaan' },
    { id: 'participation', label: 'Kepesertaan', icon: '◇', desc: 'Pelatihan, seminar, volunteer, exchange' },
    { id: 'community', label: 'Pengabdian', icon: '♡', desc: 'Pemberdayaan, bakti sosial, kemanusiaan' },
    { id: 'internship', label: 'Magang / Studi', icon: '▣', desc: 'Magang dan studi independen' },
    { id: 'publication', label: 'Publikasi Ilmiah', icon: '¶', desc: 'Artikel ilmiah terbit' },
    { id: 'talent', label: 'Minat & Bakat', icon: '✺', desc: 'Duta, karya, asisten, mentor, content creator' }
  ];

  const activities = [
    // COMPETITION
    { id:'onmipa', cat:'competition', name:'Olimpiade Nasional MIPA (ONMIPA)', type:'competition', base:3.09, advanced:0, extraMax:8, courses:[4,12,13,15,16,20], docs:['Bukti lolos ke tahap nasional','Sertifikat/SK capaian'] },
    { id:'nudc', cat:'competition', name:'NUDC / KDMI', type:'competition', base:3.29, extraMax:3, courses:[1,3,4,11,12,13,16,17], docs:['Bukti lolos tahap nasional','Sertifikat/SK'] },
    { id:'pilmapres', cat:'competition', name:'Pemilihan Mahasiswa Berprestasi (PILMAPRES)', type:'competition', base:4.76, extraMax:3, courses:[4,5,11,13,15,16,17,18,19,20], docs:['Bukti lolos tahap nasional','Sertifikat/SK'] },
    { id:'pkm', cat:'competition', name:'PKM – PIMNAS', type:'competition', base:6.32, advanced:3.78, extraMax:4, team:true, courses:[1,2,3,5,8,9,10,12,13,15,16,18,19,20], docs:['SK pendanaan','Logbook dan laporan','Bukti tahapan PIMNAS/prestasi'] },
    { id:'kri', cat:'competition', name:'Kontes Robot Indonesia (KRI)', type:'competition', base:4.20, advanced:1.31, extraMax:7, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos wilayah/nasional','Sertifikat prestasi'] },
    { id:'kmhe', cat:'competition', name:'Kontes Mobil Hemat Energi (KMHE)', type:'competition', base:4.53, advanced:1.47, extraMax:7, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos wilayah/nasional','Sertifikat prestasi'] },
    { id:'kki', cat:'competition', name:'Kontes Kapal Indonesia (KKI)', type:'competition', base:3.42, advanced:2.58, extraMax:7, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos wilayah/nasional','Sertifikat prestasi'] },
    { id:'kji', cat:'competition', name:'Kompetisi Jembatan Indonesia (KJI)', type:'competition', base:5.58, extraMax:3, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos tahap nasional','Sertifikat prestasi'] },
    { id:'kbgi', cat:'competition', name:'Kompetisi Bangunan Gedung Indonesia (KBGI)', type:'competition', base:5.58, extraMax:3, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos tahap nasional','Sertifikat prestasi'] },
    { id:'krti', cat:'competition', name:'Kontes Robot Terbang Indonesia (KRTI)', type:'competition', base:5.11, advanced:.89, extraMax:7, team:true, courses:[1,5,13,15,16,17,20], docs:['Bukti lolos wilayah/nasional','Sertifikat prestasi'] },
    { id:'lidm', cat:'competition', name:'Lomba Inovasi Digital Mahasiswa (LIDM)', type:'competition', base:3.40, extraMax:1, team:true, courses:[1,4,5,15,16,17], docs:['Bukti lolos tingkat nasional','Sertifikat/SK'] },
    { id:'satria-nsc', cat:'competition', name:'Satria Data – National Statistic Competition', type:'competition', base:4.00, extraMax:2, team:true, courses:[1,4,5,12,13,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'satria-sec', cat:'competition', name:'Satria Data – Statistic Essay Competition', type:'competition', base:2.61, extraMax:2, team:true, courses:[1,4,5,12,13,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'satria-sic', cat:'competition', name:'Satria Data – Statistics Infographics Competition', type:'competition', base:2.61, extraMax:2, team:true, courses:[1,4,5,12,13,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'satria-bdc', cat:'competition', name:'Satria Data – Big Data Challenge', type:'competition', base:3.83, extraMax:2, team:true, courses:[1,4,5,12,13,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'ppko-team', cat:'competition', name:'PPK Ormawa – Tim Pelaksana', type:'competition', base:6.93, advanced:3.69, extraMax:2, team:true, courses:[1,2,3,5,6,8,9,10,12,13,16,18,19,20], docs:['SK pendanaan','Logbook dan laporan','Bukti ABDIDAYA bila ada'] },
    { id:'ppko-rep', cat:'competition', name:'PPK Ormawa – Perwakilan Ormawa', type:'competition', base:1.60, advanced:.54, extraMax:5, courses:[1,2,3,5,6,8,9,10,12,13,16,18,19,20], docs:['SK penugasan/perwakilan','Bukti tahapan PPK Ormawa'] },
    { id:'ppko-internal', cat:'competition', name:'PPK Ormawa – Pendanaan Internal', type:'competition', base:6.40, courses:[1,2,3,5,6,8,9,10,12,13,16,18,19,20], docs:['SK pendanaan internal','Laporan kegiatan'] },
    { id:'mtq', cat:'competition', name:'Musabaqah Tilawatil Qur’an (MTQ)', type:'competition', base:1.00, extraMax:5.75, courses:[1,15,16,18,19,20], docs:['Sertifikat/SK prestasi'] },
    { id:'gemastik12', cat:'competition', name:'GEMASTIK Bidang I–II', type:'competition', base:3.15, extraMax:1.5, team:true, courses:[1,4,5,12,13,14,15,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'gemastik3', cat:'competition', name:'GEMASTIK Bidang III, IV, V, VI, VII, X, XI', type:'competition', base:3.15, extraMax:3, team:true, courses:[1,4,5,12,13,14,15,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'gemastik89', cat:'competition', name:'GEMASTIK Bidang VIII–IX', type:'competition', base:3.15, extraMax:5, team:true, courses:[1,4,5,12,13,14,15,16,17,20], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'kbmk', cat:'competition', name:'Kompetisi Mahasiswa Nasional Bidang Ilmu Bisnis, Manajemen, dan Keuangan (KBMK)', type:'competition', base:3.00, extraMax:1, team:true, courses:[1,9,10,16,17], docs:['Bukti lolos babak final','Sertifikat prestasi'] },
    { id:'kkmn', cat:'competition', name:'Kompetisi Kemaritiman Mahasiswa Nasional (KKMN)', type:'competition', base:2.02, extraMax:1.5, team:true, courses:[1,16], docs:['Bukti finalis','Sertifikat/SK'] },
    { id:'sport', cat:'competition', name:'PORPROV / POMNAS / PON / Lomba Olahraga Regional–Internasional', type:'range', min:1.93, max:19.30, courses:[1,3,4,7,11,12,13,14,18,19], docs:['Sertifikat/SK prestasi','Bukti tingkat kompetisi'] },
    { id:'peksiminas', cat:'competition', name:'PEKSIMINAS / PEKSIMIDA', type:'competition', base:1.64, extraMax:1, courses:[1,7,18,19], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'lpsm', cat:'competition', name:'Lomba Paduan Suara Mahasiswa (LPSM)', type:'competition', base:1.38, extraMax:1, team:true, courses:[1,18,19], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'pesparawi', cat:'competition', name:'PESPARAWI', type:'competition', base:.85, extraMax:1, team:true, courses:[1,18,19], docs:['Bukti lolos tingkat nasional','Sertifikat prestasi'] },
    { id:'jury', cat:'competition', name:'Juri / Wasit Bidang Penalaran, Seni, dan Olahraga', type:'fixed', base:1.00, courses:[12,14], docs:['Sertifikat atau SK pejabat berwenang','Dokumentasi saat bertugas'] },
    { id:'independent-academic', cat:'competition', name:'Lomba Mandiri Bidang Penalaran', type:'fixed', base:.58, courses:[4,13,20], docs:['Sertifikat prestasi','Bukti presentasi/karya'] },
    { id:'independent-art', cat:'competition', name:'Lomba Mandiri Bidang Seni dan Olahraga', type:'fixed', base:.56, courses:[4,18,19], docs:['Sertifikat prestasi','Bukti kegiatan'] },
    { id:'uftc', cat:'competition', name:'Unhas Freshmen Talent Competition (UFTC)', type:'competition', base:.80, extraMax:.5, courses:[18,19], docs:['Bukti finalis','Sertifikat prestasi'] },
    { id:'pensi', cat:'competition', name:'Pentas Seni (PENSI)', type:'competition', base:.80, extraMax:.5, courses:[18,19], docs:['Bukti finalis','Sertifikat prestasi'] },
    { id:'belmawa-participant', cat:'competition', name:'Kepesertaan Lomba BELMAWA / PUSPRESNAS', type:'range', min:.10, max:20, courses:[4,13,20], docs:['Bukti submit proposal/karya','Dokumen kompetisi terkait'] },

    // ENTREPRENEURSHIP
    { id:'pmw', cat:'entrepreneurship', name:'Program Mahasiswa Wirausaha (PMW)', type:'entrepreneur', base:3.18, extraMax:1, team:true, courses:[1,2,3,4,9,10], docs:['SK pendanaan','Laporan pelaksanaan','Dokumen usaha/NIB bila relevan'] },
    { id:'p2mw', cat:'entrepreneurship', name:'Program Pembinaan Mahasiswa Wirausaha (P2MW)', type:'entrepreneur', base:4.18, advanced:2, extraMax:1, team:true, courses:[1,2,3,4,5,9,10,12,13], docs:['SK pendanaan','Laporan kegiatan','Bukti KMI Award bila ada'] },
    { id:'independent-business', cat:'entrepreneurship', name:'Wirausaha Mandiri', type:'fixed', base:2.08, courses:[2,9,10], docs:['Usaha minimal 3 bulan','Margin keuntungan minimal 15%','Dokumen usaha minimal NIB'] },

    // ORGANIZATION
    { id:'org-management', cat:'organization', name:'Kepengurusan Organisasi', type:'organization', base:3.05, orgKind:'management', courses:[1,2,3,6,7,11,12,13,14,15,16], docs:['SK kepengurusan','AD/ART','Program kerja awal periode','LPJ akhir periode'] },
    { id:'committee', cat:'organization', name:'Kepanitiaan Kegiatan', type:'organization', base:.42, orgKind:'committee', courses:[1,2,3,6,7,11,12,13,14,15,16], docs:['SK pengangkatan','Laporan kegiatan','Logbook dan dokumentasi'] },

    // PARTICIPATION
    { id:'training', cat:'participation', name:'Pelatihan', type:'duration', baseParticipant:.20, baseSpeaker:.45, durationMode:'training', courses:[18,19,20], docs:['Bukti pendaftaran','Sertifikat kegiatan','Dokumentasi'] },
    { id:'certification', cat:'participation', name:'Sertifikasi Kompetensi', type:'fixed', base:1.05, courses:[18,19,20], docs:['Bukti pendaftaran','Sertifikat kompetensi','Dokumentasi ujian'] },
    { id:'programmed-training', cat:'participation', name:'Pelatihan Terprogram', type:'programmedTraining', base:.27, courses:[4,6,7,14,20], docs:['Bukti pendaftaran','Sertifikat kegiatan','Logbook','Laporan'] },
    { id:'workshop', cat:'participation', name:'Lokakarya', type:'duration', baseParticipant:.20, baseSpeaker:.44, durationMode:'training', courses:[18,19], docs:['Bukti pendaftaran/penugasan','Sertifikat','Dokumentasi'] },
    { id:'seminar', cat:'participation', name:'Seminar', type:'scaleRole', baseParticipant:.06, baseSpeaker:.40, courses:[4,20], docs:['Bukti pendaftaran/penugasan','Sertifikat','Dokumentasi'] },
    { id:'conference', cat:'participation', name:'Konferensi Ilmiah', type:'scaleRole', baseParticipant:.06, baseSpeaker:.40, courses:[4,20], docs:['Bukti pendaftaran/penugasan','Sertifikat','Bahan presentasi bila presenter'] },
    { id:'guest-lecture', cat:'participation', name:'Kuliah Umum', type:'scaleRole', baseParticipant:.07, baseSpeaker:.40, courses:[4,20], docs:['Bukti pendaftaran/penugasan','Sertifikat','Dokumentasi'] },
    { id:'microcredential', cat:'participation', name:'Kredensial Mikro', type:'micro', base:.23, courses:[4,5,18,19], docs:['Persetujuan Kaprodi/PA','Bukti learning path','Grade/assessment','Sertifikat yang dapat ditelusuri'] },
    { id:'exchange', cat:'participation', name:'Pertukaran Mahasiswa', type:'exchange', base:1.60, courses:[3,4,5,7,11,12,20], docs:['Bukti pendaftaran','Sertifikat/pembekalan','Logbook dan laporan','Sertifikat program'] },
    { id:'short-course', cat:'participation', name:'Short Course', type:'shortcourse', base:1.24, courses:[4,5,7,11,12,20], docs:['Bukti pendaftaran','Sertifikat','Logbook dan laporan'] },
    { id:'gumsb', cat:'participation', name:'Gerakan Unhas Mengkaji dan Shalat Berjamaah (GUMSB)', type:'fixed', base:.40, courses:[18,19,20], docs:['Logbook minimal 10 pertemuan','Dokumentasi'] },
    { id:'volunteer-programmed', cat:'participation', name:'Volunteer Event Terprogram', type:'volunteerScale', base:1.00, courses:[18,19], docs:['SK pimpinan','Sertifikat','Logbook','Dokumentasi'] },
    { id:'volunteer-incidental', cat:'participation', name:'Volunteer Event Insidental', type:'volunteerScale', base:.28, courses:[18,19], docs:['SK pimpinan','Sertifikat','Logbook','Dokumentasi'] },
    { id:'volunteer-skilled-programmed', cat:'participation', name:'Volunteer Berketerampilan Khusus (Terprogram)', type:'skilledVolunteer', base:2.01, courses:[1,3,6,11,14], docs:['SK/Surat Tugas','Logbook','Dokumentasi','Sertifikat'] },
    { id:'volunteer-skilled-incidental', cat:'participation', name:'Volunteer Berketerampilan Khusus (Insidental)', type:'skilledVolunteer', base:1.07, courses:[6,14], docs:['SK/Surat Tugas','Logbook','Dokumentasi','Sertifikat'] },

    // COMMUNITY
    { id:'community-program', cat:'community', name:'Pemberdayaan Masyarakat Terprogram', type:'communityProgram', base:1.02, team:true, courses:[1,2,6,7,8,13,14], docs:['Proposal','Logbook dan laporan','Dokumentasi','Publikasi media massa bila ada'] },
    { id:'social-service', cat:'community', name:'Bakti Sosial', type:'fixed', base:.24, courses:[2,6], docs:['Laporan','Sertifikat/SK','Surat keterangan','Dokumentasi'] },
    { id:'humanitarian', cat:'community', name:'Kegiatan Kemanusiaan', type:'humanitarian', base:1.33, courses:[6], docs:['Surat Tugas/SK','Logbook','Dokumentasi','Laporan','Sertifikat'] },

    // INTERNSHIP/STUDY
    { id:'internship', cat:'internship', name:'Magang / Praktik Kerja', type:'internship', options:[2,3,4,6,9], courseLabel:'Magang/Praktik Kerja', docs:['Logbook','Laporan','Dokumen mitra','Bukti evaluasi/presentasi'] },
    { id:'independent-study', cat:'internship', name:'Studi / Proyek Independen', type:'internship', options:[2,4,6], courseLabel:'Studi/Proyek Independen', docs:['Logbook','Laporan','Dokumen mitra','Bukti evaluasi/presentasi'] },

    // PUBLICATION
    { id:'scientific-publication', cat:'publication', name:'Artikel Ilmiah', type:'publication', base:4.09, courses:[2,4,13,15,17,20], docs:['Draft dan logbook artikel','Bukti submission/review','Bukti penerimaan dan link publikasi','Bukti indeksasi SINTA/Scimago','Surat keterangan PMU bila diperlukan'] },

    // TALENT
    { id:'appropriate-tech', cat:'talent', name:'Teknologi Tepat Guna', type:'creative', base:1.51, hki:1, team:true, courses:[6,8,16], docs:['Portofolio/desain karya','Karya','Logbook dan laporan','Bukti implementasi','Publikasi media bila ada'] },
    { id:'opinion', cat:'talent', name:'Menulis Opini', type:'opinion', courses:[15], docs:['Logbook','Naskah','Terbitan fisik/digital media mainstream'] },
    { id:'creative-work', cat:'talent', name:'Karya Cipta', type:'creative', base:1.51, hki:1, competition:1, team:true, courses:[14,17,18,19], docs:['Portofolio/desain karya','Karya','Logbook dan laporan','Publikasi/kompetisi','HKI bila ada'] },
    { id:'monumental-work', cat:'talent', name:'Karya Monumental', type:'creative', base:1.51, hki:1, competition:1, team:true, courses:[14,17,18,19], docs:['Portofolio/desain karya','Karya','Logbook dan laporan','Publikasi/kompetisi','HKI bila ada'] },
    { id:'ambassador', cat:'talent', name:'Menjadi Duta', type:'ambassador', courses:[1,2,5,6,7], docs:['Portofolio','SK/sertifikat','Logbook','Dokumentasi','Jejak publikasi'] },
    { id:'talent-academy', cat:'talent', name:'Talent Academy', type:'talentAcademy', courses:[4,5,7,11,14,15,18,19,20], docs:['Bukti pendaftaran','Logbook','Laporan/portofolio','Sertifikat'] },
    { id:'lab-assistant', cat:'talent', name:'Asisten Praktikum / Laboratorium / Peer-Tutor', type:'assistantLab', base:1.66, courses:[1,2,6,12,14], docs:['SK','Logbook','Dokumentasi','Laporan evaluasi'] },
    { id:'research-assistant', cat:'talent', name:'Asisten Penelitian', type:'assistantGrant', base:1.25, courses:[1,2,6,12,14], docs:['Proposal yang memuat nama mahasiswa','Logbook','Laporan'] },
    { id:'service-assistant', cat:'talent', name:'Asisten Pengabdian', type:'assistantGrant', base:1.07, courses:[1,2,6,12,14], docs:['Proposal yang memuat nama mahasiswa','Logbook','Laporan'] },
    { id:'competition-mentor', cat:'talent', name:'Mentor Kompetisi', type:'fixed', base:2.00, courses:[2,11,18,19], docs:['SK Pimpinan Universitas','Logbook'] },
    { id:'event-mentor', cat:'talent', name:'Mentor Event Terprogram', type:'fixed', base:.56, courses:[2,11,18,19], docs:['SK Pimpinan Universitas','Logbook'] },
    { id:'mkpk-mentor', cat:'talent', name:'Mentor MKPK', type:'fixed', base:1.02, courses:[5,14], docs:['SK','Dokumentasi ToT','Logbook','Laporan'] },
    { id:'mc', cat:'talent', name:'Master of Ceremony', type:'mc', base:.29, courses:[14], docs:['Draft script','Surat penetapan sebagai MC','Logbook dan dokumentasi'] },
    { id:'content-creator', cat:'talent', name:'Content Creator Edukasi', type:'fixed', base:1.51, courses:[2,5,15,17], docs:['Outline/proposal konten','Draft/script','File konten asli','Link publikasi','Statistik engagement','Laporan/portofolio'] }
  ];

  const categoryGrid = q('#mkpk-category-grid');
  if (!categoryGrid) return;

  const activityStep = q('#activity-step');
  const detailStep = q('#detail-step');
  const activityList = q('#mkpk-activity-list');
  const search = q('#mkpk-search');
  const form = q('#mkpk-detail-form');
  const selectedBox = q('#selected-activity');
  const calculateBtn = q('#mkpk-calculate');
  const resetBtn = q('#mkpk-reset');
  const resultEmpty = q('#mkpk-result-empty');
  const resultContent = q('#mkpk-result-content');
  const resultSks = q('#result-sks');
  const resultStatus = q('#result-status');
  const resultBreakdown = q('#result-breakdown');
  const resultCourses = q('#result-courses');
  const resultNotes = q('#result-notes');
  const addPlanBtn = q('#mkpk-add-plan');
  const planList = q('#mkpk-plan-list');
  const planTotal = q('#plan-total');
  const planMeter = q('#plan-meter');
  const planSummaryText = q('#plan-summary-text');
  const clearPlan = q('#clear-plan');

  const state = { category: null, activity: null, result: null, plan: [] };

  const field = (name, label, control, help='') => `<label class="mkpk-field"><span>${label}</span>${control}${help ? `<small>${help}</small>` : ''}</label>`;
  const select = (name, options) => `<select name="${name}">${options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select>`;
  const checkbox = (name, label, value='1') => `<label class="mkpk-check"><input type="checkbox" name="${name}" value="${value}"><span><i></i>${label}</span></label>`;

  const renderCategories = () => {
    categoryGrid.innerHTML = categories.map(c => `<button type="button" class="mkpk-category-card" data-category="${c.id}"><b>${c.icon}</b><span><strong>${c.label}</strong><small>${c.desc}</small></span></button>`).join('');
    qa('[data-category]', categoryGrid).forEach(btn => btn.addEventListener('click', () => chooseCategory(btn.dataset.category)));
  };

  const chooseCategory = (id) => {
    state.category = id;
    state.activity = null;
    state.result = null;
    qa('[data-category]', categoryGrid).forEach(b => b.classList.toggle('is-active', b.dataset.category === id));
    activityStep.classList.remove('mkpk-step--locked');
    detailStep.classList.add('mkpk-step--locked');
    search.value = '';
    renderActivities();
    clearResult();
    activityStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const renderActivities = () => {
    const query = (search.value || '').trim().toLowerCase();
    const items = activities.filter(a => a.cat === state.category && (!query || a.name.toLowerCase().includes(query)));
    activityList.innerHTML = items.length ? items.map(a => `<button type="button" role="option" class="mkpk-activity-option" data-activity="${a.id}"><span>${a.name}</span><b>→</b></button>`).join('') : `<div class="mkpk-no-result">Tidak ada kegiatan yang cocok.</div>`;
    qa('[data-activity]', activityList).forEach(btn => btn.addEventListener('click', () => chooseActivity(btn.dataset.activity)));
  };

  const chooseActivity = (id) => {
    state.activity = activities.find(a => a.id === id);
    state.result = null;
    qa('[data-activity]', activityList).forEach(b => b.classList.toggle('is-active', b.dataset.activity === id));
    detailStep.classList.remove('mkpk-step--locked');
    selectedBox.hidden = false;
    const cat = categories.find(c => c.id === state.activity.cat);
    selectedBox.innerHTML = `<span>${cat.icon}</span><div><small>${cat.label}</small><strong>${state.activity.name}</strong></div><button type="button" id="change-activity">Ganti</button>`;
    q('#change-activity').addEventListener('click', () => activityStep.scrollIntoView({behavior:'smooth', block:'center'}));
    renderForm(state.activity);
    calculateBtn.disabled = false;
    clearResult();
    detailStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const renderForm = (a) => {
    let html = '';
    if (a.type === 'competition' || a.type === 'entrepreneur') {
      if (a.team) html += field('teamRole','Posisi dalam tim',select('teamRole',[['leader','Ketua tim / individu'],['member','Anggota tim']]),'Pada banyak aktivitas tim, SKS anggota dihitung 80% dari SKS ketua.');
      if (a.advanced) html += checkbox('advanced','Mencapai tahapan lanjut yang tercantum dalam rubrik',a.advanced);
      if (a.extraMax) html += field('extra','Tambahan SKS dari capaian/prestasi',`<input type="number" name="extra" min="0" max="${a.extraMax}" step="0.01" value="0">`,`Masukkan hanya tambahan yang benar-benar diperoleh. Maksimal ${a.extraMax} SKS pada tabel syarat pengakuan.`);
    } else if (a.type === 'range') {
      html += field('actualSks','SKS berdasarkan capaian/activity hours',`<input type="number" name="actualSks" min="${a.min}" max="${a.max}" step="0.01" value="${a.min}">`,`Rentang yang tercantum: ${a.min}–${a.max} SKS.`);
    } else if (a.type === 'organization') {
      html += field('orgRole','Jabatan',select('orgRole',[['1.5','Ketua'],['1','Wakil Ketua / Sekretaris / Bendahara / Koordinator Bidang'],['0.5','Anggota']]));
      if (a.orgKind === 'management') {
        html += field('orgScope','Cakupan organisasi',select('orgScope',[['2','Internasional'],['1.5','Nasional / BEM tingkat universitas'],['1','Provinsi/Regional / BEM tingkat fakultas'],['0.75','Himpunan departemen / UKM universitas / kabupaten'],['0.5','Lokal / UKM fakultas'],['0.5','Organisasi pengawas Ormawa']]));
        html += field('periodFactor','Masa kepengurusan',select('periodFactor',[['1','Menyelesaikan 1 periode / pengganti > 1/2 periode'],['0.5','Pengganti < 1/2 periode']]));
        html += `<div class="mkpk-field mkpk-field--wide"><span>Tambahan untuk pimpinan Ormawa</span><div class="mkpk-check-grid">${checkbox('bonusPpkProposal','PPK Ormawa lolos seleksi presentasi proposal','0.5')}${checkbox('bonusPpkFunded','PPK Ormawa lolos pendanaan','0.5')}${checkbox('bonusAbdidaya','Tim lolos ABDIDAYA','1')}${checkbox('bonusAbdidayaAward','Tim pelaksana mendapat award ABDIDAYA','1')}${checkbox('bonusOrgAward','Ormawa mendapat award ABDIDAYA','1')}${checkbox('bonusHostNational','Tuan rumah kegiatan nasional luring (≥5 provinsi)','1')}${checkbox('bonusHostInternational','Tuan rumah kegiatan internasional luring (≥5 negara)','2')}</div><small>Tambahan berlaku pada pimpinan Ormawa yang memenuhi ketentuan rubrik. Maksimum tabel pengakuan kepengurusan adalah 7 SKS tambahan.</small></div>`;
      } else {
        html += field('orgScope','Cakupan kepanitiaan',select('orgScope',[['2','Internasional (luring)'],['1.5','Nasional (luring) / internasional (daring)'],['1','Provinsi/regional (luring) / nasional (daring)'],['0.75','Intra kampus']]));
      }
    } else if (a.type === 'duration') {
      html += field('role','Peran',select('role',[['participant','Peserta'],['speaker','Instruktur / fasilitator / narasumber']]));
      html += field('durationCoeff','Durasi kegiatan',select('durationCoeff',[['0.5','0–8 jam'],['1','9–16 jam'],['1.5','17–24 jam'],['2','>24 jam']]));
      html += field('organizerScore','Penyelenggara',select('organizerScore',[['100','Minimal setingkat BEM Universitas'],['95','Minimal setingkat BEM Fakultas']]));
    } else if (a.type === 'programmedTraining') {
      html += field('durationCoeff','Total jam pelatihan',select('durationCoeff',[['1','≤12 jam'],['2','13–25 jam'],['4','26–50 jam'],['6','51–90 jam'],['8','≥90 jam']]));
      html += field('organizerScore','Penyelenggara',select('organizerScore',[['100','Minimal setingkat BEM Universitas'],['90','Minimal setingkat BEM Fakultas']]));
    } else if (a.type === 'scaleRole') {
      html += field('role','Peran',select('role',[['participant','Peserta'],['speaker','Narasumber / presenter']]));
      html += field('scale','Skala kegiatan',select('scale',[['1','Wilayah / provinsi / dalam PT'],['2','Nasional (>5 provinsi)'],['3','Internasional / regional']]));
      html += field('organizerScore','Penyelenggara',select('organizerScore',[['100','Minimal setingkat BEM Universitas'],['90','Minimal setingkat BEM Fakultas']]));
    } else if (a.type === 'micro') {
      html += field('courseDuration','Durasi course',select('courseDuration',[['2','5–10 jam'],['3','11–15 jam'],['4','16–20 jam'],['5','>20 jam']]));
      html += field('language','Bahasa pengantar',select('language',[['1','Bahasa Indonesia'],['1.5','Bahasa asing']]));
    } else if (a.type === 'exchange') {
      html += field('scale','Skala program',select('scale',[['1','Nasional'],['2','Internasional']]));
      html += field('durationCoeff','Durasi program',select('durationCoeff',[['1','>1–2 bulan'],['1.5','3–4 bulan'],['2','5–6 bulan']]));
      html += checkbox('scholarship','Memperoleh pendanaan/beasiswa','0.5');
    } else if (a.type === 'shortcourse') {
      html += field('scale','Skala program',select('scale',[['1','Nasional'],['2','Internasional']]));
      html += field('durationCoeff','Durasi program',select('durationCoeff',[['1','<10 hari'],['1.5','10–20 hari'],['2','21–30 hari']]));
      html += checkbox('scholarship','Memperoleh pendanaan/beasiswa','0.5');
    } else if (a.type === 'volunteerScale') {
      html += field('scale','Skala kegiatan',select('scale',[['0.75','Fakultas / Prodi / Departemen'],['1','Universitas'],['1.25','Regional'],['1.5','Nasional'],['2','Internasional']]));
    } else if (a.type === 'skilledVolunteer') {
      html += checkbox('certified','Memiliki sertifikat keahlian yang relevan','1');
    } else if (a.type === 'communityProgram') {
      if (a.team) html += field('teamRole','Posisi dalam tim',select('teamRole',[['leader','Ketua tim / individu'],['member','Anggota tim']]));
      html += field('funding','Pendanaan',select('funding',[['0','Tidak memperoleh pendanaan'],['0.5','≤ Rp10 juta'],['1.5','Rp11–50 juta'],['2','> Rp50 juta']]));
      html += field('competitionBonus','Skala kompetisi (jika kegiatan dikompetisikan)',select('competitionBonus',[['0','Non-kompetisi'],['1','Internal Universitas Hasanuddin'],['2.5','Nasional'],['3','Internasional']]));
    } else if (a.type === 'humanitarian') {
      html += field('durationCoeff','Lama kegiatan',select('durationCoeff',[['0.5','1–3 hari'],['0.75','4–5 hari'],['1','6–7 hari'],['1.25','>7 hari']]));
    } else if (a.type === 'internship') {
      html += field('targetSks','Skema SKS',select('targetSks',a.options.map(n=>[String(n),`${n} SKS`])),'Pilih skema yang benar-benar dijalankan dan didukung logbook/laporan.');
      html += field('completion','Kelengkapan pelaksanaan',select('completion',[['100','Seluruh indikator/dokumen utama lengkap'],['95','Ada sebagian indikator minor yang belum lengkap'],['79','Ada kekurangan pada indikator utama pelaksanaan']]));
    } else if (a.type === 'publication') {
      html += field('author','Posisi penulis',select('author',[['1','Penulis utama'],['0.6','Penulis pendamping (2–3 penulis)'],['0.4','Penulis pendamping (4–8 penulis)']]));
      html += field('journal','Kategori publikasi',select('journal',[['2','Jurnal internasional bereputasi Q1–Q2'],['1.5','Jurnal internasional bereputasi Q3'],['1.25','Q4 / belum quartile / prosiding internasional bereputasi'],['1.25','Jurnal nasional berbasis riset SINTA 1–2'],['1','Jurnal internasional / riset SINTA 3–4'],['0.75','Pengabdian SINTA 1–2'],['0.4','Riset SINTA 5–6 / pengabdian SINTA 3–4'],['0.3','Pengabdian SINTA 5–6']]));
      html += checkbox('research','Tambahkan activity hours pelaksanaan riset','2');
      html += field('published','Status artikel',select('published',[['100','Sudah diterbitkan'],['0','Belum diterbitkan']]));
    } else if (a.type === 'creative') {
      if (a.team) html += field('teamRole','Posisi',select('teamRole',[['leader','Ketua / individu'],['member','Anggota tim']]));
      if (a.competition) html += checkbox('competition','Mengikuti kompetisi / terekam kanal media resmi','1');
      if (a.hki) html += checkbox('hki','Mendaftarkan / memperoleh HKI','1');
    } else if (a.type === 'opinion') {
      html += field('media','Cakupan media',select('media',[['0.13','Media lokal/regional'],['0.20','Media nasional']]));
    } else if (a.type === 'ambassador') {
      html += field('ambassadorLevel','Level duta',select('ambassadorLevel',[['1.13','Universitas'],['1.35','Provinsi'],['2.69','Nasional'],['3.80','Regional / Internasional']]));
    } else if (a.type === 'talentAcademy') {
      html += field('role','Peran',select('role',[['participant','Peserta'],['speaker','Instruktur / fasilitator / narasumber']]));
      html += field('participation','Tingkat partisipasi',select('participation',[['1','90–100%'],['0.75','80–<90%'],['0.5','70–<80%'],['0.25','60–<70%'],['0','<60%']]));
    } else if (a.type === 'assistantLab') {
      html += field('courseCoeff','Jumlah SKS praktikum',select('courseCoeff',[['0.5','1 SKS'],['0.75','2 SKS'],['1','3 SKS'],['1.25','>3 SKS']]));
      html += field('studentCoeff','Jumlah praktikan per asisten',select('studentCoeff',[['0.5','1–5 orang'],['0.75','6–10 orang'],['1','11–15 orang'],['1.25','>15 orang']]));
    } else if (a.type === 'assistantGrant') {
      html += field('grant','Sumber pendanaan',select('grant',[['0.25','Dana mandiri'],['1','Mendapatkan hibah']]));
    } else if (a.type === 'mc') {
      html += field('scale','Skala event luring',select('scale',[['0.5','Fakultas / Prodi / Departemen'],['1','Universitas'],['1.5','Nasional'],['2','Internasional']]));
    } else {
      html += `<div class="mkpk-simple-info"><strong>Activity hours baku pada rubrik</strong><p>Simulator akan menggunakan nilai activity hours/SKS yang tercantum untuk kegiatan ini.</p></div>`;
    }
    form.innerHTML = html;
  };

  const val = (name, fallback=0) => {
    const el = form.elements[name];
    if (!el) return fallback;
    if (el.type === 'checkbox') return el.checked ? Number(el.value || 1) : 0;
    return Number(el.value || fallback);
  };
  const checkedSum = (names) => names.reduce((s,n)=>s+val(n),0);

  const compute = (a) => {
    let sks = Number(a.base || 0), score = 100, lines = [], notes = [...(a.docs || [])];
    if (a.type === 'competition' || a.type === 'entrepreneur') {
      const advanced = val('advanced');
      const extra = Math.min(Math.max(val('extra'),0), Number(a.extraMax||0));
      sks = a.base + advanced + extra;
      lines.push(['SKS dasar', a.base]);
      if (advanced) lines.push(['Tahapan lanjut', advanced]);
      if (extra) lines.push(['Tambahan capaian', extra]);
      if (a.team && form.elements.teamRole?.value === 'member') { sks *= .8; lines.push(['Koefisien anggota tim', '× 80%']); }
      notes.push('Tambahan capaian harus didukung bukti tahapan/prestasi yang sesuai rubrik.');
    } else if (a.type === 'range') {
      sks = val('actualSks', a.min); lines.push(['SKS sesuai capaian', sks]); notes.push(`Gunakan nilai aktual yang dapat dibuktikan dalam rentang ${a.min}–${a.max} SKS.`);
    } else if (a.type === 'organization') {
      const role = val('orgRole',1), scope = val('orgScope',1), period = a.orgKind === 'management' ? val('periodFactor',1) : 1;
      sks = a.base * role * scope * period;
      lines.push(['Activity hours dasar', a.base],['Koefisien jabatan',`× ${role}`],['Koefisien cakupan',`× ${scope}`]);
      if (period !== 1) lines.push(['Faktor masa kepengurusan',`× ${period}`]);
      if (a.orgKind === 'management') {
        let bonus = checkedSum(['bonusPpkProposal','bonusPpkFunded','bonusAbdidaya','bonusAbdidayaAward','bonusOrgAward','bonusHostNational','bonusHostInternational']);
        const isLeader = role >= 1;
        if (!isLeader) bonus = 0;
        if (bonus) { sks += Math.min(bonus,7); lines.push(['Tambahan pimpinan Ormawa',`+ ${Math.min(bonus,7).toFixed(2)}`]); }
        notes.push('Tambahan pimpinan Ormawa tidak berlaku bagi anggota biasa dan wajib memenuhi ketentuan serta bukti pada rubrik.');
      }
    } else if (a.type === 'duration') {
      const role = form.elements.role.value, coeff=val('durationCoeff',1);
      const base = role === 'speaker' ? a.baseSpeaker : a.baseParticipant;
      sks = base * coeff; score = val('organizerScore',100);
      lines.push(['Activity hours dasar',base],['Koefisien durasi',`× ${coeff}`]);
    } else if (a.type === 'programmedTraining') {
      const coeff=val('durationCoeff',1); sks=a.base*coeff; score=val('organizerScore',100); lines.push(['Activity hours dasar',a.base],['Koefisien durasi',`× ${coeff}`]);
    } else if (a.type === 'scaleRole') {
      const role=form.elements.role.value, scale=val('scale',1); const base=role==='speaker'?a.baseSpeaker:a.baseParticipant; sks=base*scale; score=val('organizerScore',100); lines.push(['Activity hours dasar',base],['Koefisien skala',`× ${scale}`]);
    } else if (a.type === 'micro') {
      const d=val('courseDuration',2), lang=val('language',1); sks=a.base*d*lang; lines.push(['Activity hours dasar',a.base],['Koefisien durasi',`× ${d}`],['Koefisien bahasa',`× ${lang}`]);
    } else if (a.type === 'exchange') {
      const scale=val('scale',1), dur=val('durationCoeff',1), scholarship=val('scholarship'); sks=a.base*scale*dur+scholarship; lines.push(['Activity hours dasar',a.base],['Koefisien skala',`× ${scale}`],['Koefisien durasi',`× ${dur}`]); if(scholarship) lines.push(['Tambahan beasiswa',`+ ${scholarship}`]); notes.push('Rubrik juga mensyaratkan status resmi sebagai peserta pertukaran dan durasi program yang sesuai.');
    } else if (a.type === 'shortcourse') {
      const scale=val('scale',1), dur=val('durationCoeff',1), scholarship=val('scholarship'); sks=a.base*scale*dur+scholarship; lines.push(['Activity hours dasar',a.base],['Koefisien skala',`× ${scale}`],['Koefisien durasi',`× ${dur}`]); if(scholarship) lines.push(['Tambahan beasiswa',`+ ${scholarship}`]);
    } else if (a.type === 'volunteerScale') {
      const scale=val('scale',1); sks=a.base*scale; lines.push(['Activity hours dasar',a.base],['Koefisien skala',`× ${scale}`]);
    } else if (a.type === 'skilledVolunteer') {
      const cert=val('certified'); sks=a.base+cert; lines.push(['Activity hours dasar',a.base]); if(cert) lines.push(['Tambahan sertifikat keahlian',`+ ${cert}`]);
    } else if (a.type === 'communityProgram') {
      const funding=val('funding'), comp=val('competitionBonus'); sks=a.base+funding+comp; lines.push(['Activity hours dasar',a.base]); if(funding) lines.push(['Tambahan pendanaan',`+ ${funding}`]); if(comp) lines.push(['Tambahan skala kompetisi',`+ ${comp}`]); if(form.elements.teamRole?.value==='member'){sks*=.8;lines.push(['Koefisien anggota tim','× 80%']);}
    } else if (a.type === 'humanitarian') {
      const d=val('durationCoeff',1); sks=a.base*d; lines.push(['Activity hours dasar',a.base],['Koefisien lama kegiatan',`× ${d}`]);
    } else if (a.type === 'internship') {
      sks=val('targetSks',a.options[0]); score=val('completion',100); lines.push(['Skema kegiatan',sks]); notes.push('Nilai capaian mengikuti kelengkapan indikator dan dokumen pada tahapan kegiatan.');
    } else if (a.type === 'publication') {
      const author=val('author',1), journal=val('journal',1), research=val('research'); sks=(a.base+research)*author*journal; score=val('published',100); lines.push(['Activity hours artikel',a.base]); if(research) lines.push(['Tambahan pelaksanaan riset',`+ ${research}`]); lines.push(['Koefisien penulis',`× ${author}`],['Koefisien jurnal',`× ${journal}`]); if(score===0) notes.push('Rubrik menyatakan nilai 100 diberikan ketika artikel telah diterbitkan.');
    } else if (a.type === 'creative') {
      const comp=val('competition'), hki=val('hki'); sks=a.base+comp+hki; lines.push(['Activity hours dasar',a.base]); if(comp) lines.push(['Tambahan kompetisi/media resmi',`+ ${comp}`]); if(hki) lines.push(['Tambahan HKI',`+ ${hki}`]); if(form.elements.teamRole?.value==='member'){sks*=.8;lines.push(['Koefisien anggota tim','× 80%']);}
    } else if (a.type === 'opinion') {
      sks=val('media',.13); lines.push(['Activity hours sesuai media',sks]);
    } else if (a.type === 'ambassador') {
      sks=val('ambassadorLevel',1.13); lines.push(['Activity hours sesuai level duta',sks]);
    } else if (a.type === 'talentAcademy') {
      const base=form.elements.role.value==='speaker'?.49:7.49, part=val('participation',1); sks=base*part; lines.push(['Activity hours dasar',base],['Koefisien partisipasi',`× ${part}`]);
    } else if (a.type === 'assistantLab') {
      const c=val('courseCoeff',1), s=val('studentCoeff',1); sks=a.base*c*s; lines.push(['Activity hours dasar',a.base],['Koefisien SKS praktikum',`× ${c}`],['Koefisien jumlah praktikan',`× ${s}`]);
    } else if (a.type === 'assistantGrant') {
      const grant=val('grant',1); sks=a.base*grant; lines.push(['Activity hours dasar',a.base],['Koefisien pendanaan',`× ${grant}`]);
    } else if (a.type === 'mc') {
      const scale=val('scale',1); sks=a.base*scale; lines.push(['Activity hours dasar',a.base],['Koefisien skala event',`× ${scale}`]); notes.push('Hanya event yang diselenggarakan secara luring yang dapat diakui; maksimal 1 MKPK.');
    } else {
      lines.push(['Activity hours/SKS baku',sks]);
    }
    return { activity:a, sks:Math.max(0,sks), score, lines, notes };
  };

  const clearResult = () => { state.result=null; resultEmpty.hidden=false; resultContent.hidden=true; };

  const renderResult = (r) => {
    resultEmpty.hidden = true; resultContent.hidden = false; resultSks.textContent=fmt(r.sks);
    const enough2 = r.sks >= 2;
    resultStatus.className = `mkpk-result-status ${enough2 ? 'is-good' : 'is-warning'}`;
    resultStatus.innerHTML = enough2 ? `<b>Activity hours setara ≥2 SKS</b><span>Secara kuantitatif sudah mencapai ambang satu MKPK 2 SKS, tergantung mata kuliah tujuan dan verifikasi.</span>` : `<b>Belum mencapai 2 SKS</b><span>Anda dapat menggabungkan kegiatan lain yang relevan untuk memenuhi activity hours MKPK tujuan.</span>`;
    resultBreakdown.innerHTML = `<div class="mkpk-breakdown-head"><span>Rincian hitung</span><b>Nilai capaian: ${r.score || '—'}</b></div>${r.lines.map(([k,v])=>`<div><span>${k}</span><strong>${typeof v==='number'?fmt(v):v}</strong></div>`).join('')}`;

    if (r.activity.type === 'internship') {
      resultCourses.innerHTML = `<article class="mkpk-course-item is-ready"><div><small>MKPK khusus</small><strong>${r.activity.courseLabel}</strong></div><span>${fmt(r.sks)} SKS</span></article>`;
    } else {
      resultCourses.innerHTML = (r.activity.courses||[]).map(id=>{
        const c=courses[id]; if(!c)return''; const ready=r.sks>=c.sks;
        return `<article class="mkpk-course-item ${ready?'is-ready':''}"><div><small>${ready?'Cukup secara kuantitas':'Perlu tambahan activity hours'}</small><strong>${c.name}${id===10?' · skema 4 SKS':''}</strong></div><span>${c.sks} SKS</span></article>`;
      }).join('') || `<div class="mkpk-no-course">Pemetaan MKPK spesifik mengikuti verifikasi rubrik.</div>`;
    }
    resultNotes.innerHTML = `<ul>${r.notes.map(n=>`<li>${n}</li>`).join('')}</ul><p><strong>Catatan:</strong> daftar MKPK menunjukkan pilihan yang diizinkan untuk jenis kegiatan tersebut. Total SKS tidak otomatis dapat digunakan untuk seluruh mata kuliah secara bersamaan.</p>`;
    setTimeout(()=>q('#mkpk-result-panel').scrollIntoView({behavior:'smooth',block:'center'}),60);
  };

  const calculate = () => { if(!state.activity)return; state.result=compute(state.activity); renderResult(state.result); };

  const reset = () => {
    state.category=null; state.activity=null; state.result=null;
    qa('[data-category]', categoryGrid).forEach(b=>b.classList.remove('is-active'));
    activityStep.classList.add('mkpk-step--locked'); detailStep.classList.add('mkpk-step--locked');
    activityList.innerHTML=''; form.innerHTML=''; selectedBox.hidden=true; calculateBtn.disabled=true; search.value=''; clearResult();
    q('#simulator').scrollIntoView({behavior:'smooth',block:'start'});
  };

  const renderPlan = () => {
    if(!state.plan.length){planList.innerHTML='<div class="mkpk-plan-empty" id="mkpk-plan-empty">Belum ada kegiatan yang ditambahkan.</div>';planTotal.textContent='0.00';planMeter.style.width='0%';planSummaryText.textContent='Tambahkan kegiatan untuk mulai menyusun rencana rekognisi.';return;}
    planList.innerHTML=state.plan.map((item,i)=>`<article class="mkpk-plan-item"><div><small>${categories.find(c=>c.id===item.activity.cat)?.label||''}</small><strong>${item.activity.name}</strong><span>${fmt(item.sks)} SKS</span></div><button type="button" data-remove-plan="${i}" aria-label="Hapus ${item.activity.name}">×</button></article>`).join('');
    qa('[data-remove-plan]',planList).forEach(b=>b.addEventListener('click',()=>{state.plan.splice(Number(b.dataset.removePlan),1);renderPlan();}));
    const total=state.plan.reduce((s,x)=>s+x.sks,0); planTotal.textContent=fmt(total); planMeter.style.width=`${Math.min(total/10*100,100)}%`;
    const eligible = new Set(); state.plan.forEach(x=>(x.activity.courses||[]).forEach(id=>eligible.add(id)));
    planSummaryText.textContent=`${state.plan.length} kegiatan tersimpan. Total estimasi ${fmt(total)} SKS dengan ${eligible.size} pilihan MKPK yang muncul dari kombinasi kegiatan ini.`;
  };

  addPlanBtn.addEventListener('click',()=>{if(!state.result)return;state.plan.push({...state.result});renderPlan();addPlanBtn.textContent='✓ Ditambahkan';setTimeout(()=>addPlanBtn.textContent='+ Tambahkan ke Rencana Saya',1200);});
  clearPlan.addEventListener('click',()=>{state.plan=[];renderPlan();});
  calculateBtn.addEventListener('click',calculate); resetBtn.addEventListener('click',reset); search.addEventListener('input',renderActivities);
  form.addEventListener('change',()=>{ if(state.activity) { state.result=compute(state.activity); renderResult(state.result); } });

  renderCategories(); renderPlan();
})();
