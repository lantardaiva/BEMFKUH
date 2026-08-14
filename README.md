# Website BEM KEMA FK Unhas — Kabinet Metamorfosis 2026

Prototipe website statis responsif untuk BEM Keluarga Mahasiswa Fakultas Kedokteran Universitas Hasanuddin.

## Halaman

- `index.html` — beranda, profil, nilai gerak, program, agenda, dan ringkasan transparansi.
- `struktur.html` — struktur presidium, 10 kementerian, pencarian bidang, serta struktur pendukung generik.
- `transparansi.html` — dashboard kinerja, realisasi anggaran, aspirasi, tren, dan dokumen publik.
- `aspirasi.html` — alur pengaduan dan formulir aspirasi prototipe.
- `mkpk.html` — simulator interaktif rekognisi Mata Kuliah Penguatan Kompetensi (MKPK) untuk kegiatan mahasiswa.

## Menjalankan secara lokal

Buka `index.html` secara langsung di browser, atau jalankan server lokal dari folder proyek:

```bash
python3 -m http.server 8080
```

Kemudian buka `http://localhost:8080`.

## Hal yang perlu diganti sebelum publikasi

1. Data angka pada dashboard transparansi masih berupa data demonstrasi.
2. Form aspirasi belum terhubung ke basis data, email, autentikasi, atau sistem pelacakan.
3. Agenda, publikasi, kontak, email, dan tautan media sosial masih berupa contoh.
4. Uraian struktur pendukung perlu diselaraskan dengan AD/ART, pedoman organisasi, dan keputusan resmi.
5. Nama serta foto pengurus dapat ditambahkan setelah struktur resmi ditetapkan.
6. Dokumen pada dashboard perlu dihubungkan ke berkas nyata atau penyimpanan cloud resmi.

## Rekomendasi implementasi produksi

- Gunakan backend dengan autentikasi berbasis peran untuk pengelolaan laporan dan dokumen.
- Enkripsi data laporan sensitif dan batasi akses berdasarkan prinsip *need-to-know*.
- Terapkan audit log, kebijakan retensi data, CAPTCHA, validasi lampiran, serta notifikasi status.
- Tambahkan CMS agar berita, agenda, struktur, dan dashboard dapat diperbarui tanpa mengedit kode.
- Lakukan uji aksesibilitas, keamanan, responsivitas, dan perlindungan data sebelum peluncuran.

## Palet dan tipografi

- Merah marun Unhas yang dilembutkan, dipadukan dengan krem, putih, dan navy.
- Judul menggunakan Montserrat.
- Isi menggunakan Poppins.
- Bila Google Fonts tidak dapat dimuat, website menggunakan font sistem sebagai fallback.

## Aset logo

Aset logo pada folder `assets/img` berasal dari berkas yang diberikan untuk kebutuhan prototipe. Hak penggunaan dan publikasinya mengikuti ketentuan masing-masing institusi dan organisasi.


## Penempatan file Simulator MKPK

Jangan menaruh `mkpk.html` di subfolder lain. Struktur yang benar adalah:

```text
bem-fk-unhas/
├── index.html
├── struktur.html
├── transparansi.html
├── aspirasi.html
├── mkpk.html                  # halaman simulator, sejajar dengan index.html
├── assets/
│   ├── css/
│   │   └── styles.css        # style lama + style simulator MKPK
│   ├── js/
│   │   ├── main.js
│   │   └── mkpk.js           # logika simulator interaktif
│   ├── docs/
│   │   └── rubrik-mkpk-edisi-3.pdf
│   └── img/
│       └── ...
└── README.md
```

Jika website lama sudah di-host, cara paling aman adalah mengunggah isi paket revisi dengan struktur folder yang sama. File `mkpk.html` harus berada di **root website**, `mkpk.js` harus berada di **`assets/js/`**, dan PDF rubrik berada di **`assets/docs/`**. Jangan memindahkan file JavaScript atau PDF tanpa mengubah path pada HTML.

## Catatan Simulator MKPK

- Simulator hanya memasukkan klaster kegiatan mahasiswa dari rubrik dan tidak memasukkan **Kegiatan Berbasis Fakultas** yang memerlukan kurasi/persetujuan universitas.
- Konversi dasar mengikuti ketentuan rubrik `1 SKS = 2.700 menit`.
- Untuk kegiatan dengan koefisien, form akan meminta parameter yang relevan seperti jabatan, cakupan organisasi, durasi, skala kegiatan, posisi dalam tim, kategori jurnal, atau tingkat partisipasi.
- Hasil adalah estimasi dan bukan keputusan akademik resmi. Validasi dokumen dan persetujuan pihak universitas/fakultas tetap diperlukan.
- Beberapa bagian rubrik memiliki contoh simulasi dan tabel rinci yang tidak selalu sepenuhnya konsisten satu sama lain. Simulator menggunakan tabel activity hours/koefisien rinci sebagai basis utama dan menampilkan disclaimer agar hasil tetap diperlakukan sebagai estimasi.


## Admin Demo

Buka `admin/login.html`. Kredensial demo:

- Email: `admin@bemkema.demo`
- Password: `Metamorfosis2026!`

Admin Demo dapat mengelola indikator transparansi, dokumen publik, anggota kementerian, dan lembaga khusus. Data tersimpan di LocalStorage/IndexedDB browser yang sama dan langsung dibaca oleh `transparansi.html` serta `struktur.html`. Sistem login ini **bukan autentikasi produksi**. Untuk deployment publik, ganti dengan backend/Supabase Auth + Database + Storage.
