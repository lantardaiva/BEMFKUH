# Admin Demo — BEM KEMA FK Unhas

## Login

Buka `admin/login.html`.

- Email: `admin@bemkema.demo`
- Password: `Metamorfosis2026!`

Tombol **Isi otomatis** pada halaman login akan memasukkan kedua kredensial tersebut.

## Yang dapat dikelola

- Indikator dashboard transparansi.
- Dokumen publik beserta status Publik/Draft.
- Upload file demo hingga 10 MB.
- Jumlah anggota setiap kementerian tanpa batas slot tetap.
- Tambah, edit, pindah kementerian, dan hapus anggota.
- Upload foto anggota demo hingga 3 MB.
- Tambah, edit, dan hapus lembaga khusus.

## Cara kerja demo

Data teks tersimpan pada LocalStorage dan file pada IndexedDB browser. `transparansi.html` dan `struktur.html` membaca data tersebut melalui `assets/js/admin-public.js`. Karena itu perubahan dapat langsung dipreview pada browser yang sama tanpa server/database.

## Penting

Login ini sengaja merupakan **demo front-end**. Password terlihat di source code dan tidak boleh digunakan sebagai keamanan produksi. Sebelum website dipublikasikan sebagai sistem admin sungguhan, pindahkan autentikasi, database, dan file storage ke backend seperti Supabase.
