# Website BEM KEMA FK Unhas — Kabinet Metamorfosis 2026

Prototipe website statis responsif untuk BEM Keluarga Mahasiswa Fakultas Kedokteran Universitas Hasanuddin.

## Halaman

- `index.html` — beranda, profil, nilai gerak, program, agenda, dan ringkasan transparansi.
- `struktur.html` — struktur presidium, 10 kementerian, pencarian bidang, serta struktur pendukung generik.
- `transparansi.html` — dashboard kinerja, realisasi anggaran, aspirasi, tren, dan dokumen publik.
- `aspirasi.html` — alur pengaduan dan formulir aspirasi prototipe.

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
