# Update Program Internal MKPK

## File yang berubah

- `index.html`
- `mkpk.html`
- `admin/index.html`
- `assets/css/styles.css`
- `assets/css/admin.css`
- `assets/js/mkpk.js`
- `assets/js/admin.js`
- `ADMIN-DEMO.md`

## Cara mencoba

1. Jalankan project melalui satu origin yang sama, misalnya **VS Code Live Server**.
2. Buka `index.html`.
3. Klik **Login Admin**.
4. Masuk ke menu **Program Kerja MKPK**.
5. Klik **+ Tambah Program**.
6. Isi nama program, kementerian, tahun, deskripsi, dan status.
7. Tambahkan satu atau beberapa **Pemetaan Peran**.
8. Untuk setiap peran, pilih aktivitas pada Rubrik MKPK.
9. Simpan dengan status **Publik**.
10. Buka `mkpk.html`.
11. Pilih **Program Internal KEMA**.
12. Program yang baru dibuat akan muncul otomatis.
13. Pilih program dan peran. Simulator akan membuka kalkulator aktivitas rubrik yang dipetakan dan langsung menghitung estimasi awal.
14. Hasil dapat dimasukkan ke **Rencana Rekognisi**.

## Prinsip pemetaan

Administrator tidak memasukkan jumlah SKS secara bebas.

Program internal hanya menjadi shortcut:

`Program kerja → Peran mahasiswa → Aktivitas pada Rubrik MKPK → Engine perhitungan MKPK`

Dengan demikian, rumus tetap berasal dari simulator Rubrik MKPK, sedangkan Admin Panel hanya menentukan aktivitas mana yang sesuai untuk tiap peran.

## Demo

Secara default terdapat satu program bernama **Demo Program Internal** untuk memperlihatkan alur. Program tersebut dapat diedit atau dihapus dari Admin Panel.

## Penyimpanan demo

Versi ini masih menggunakan `localStorage`, sehingga perubahan hanya terlihat pada browser dan origin yang sama. Untuk production, pindahkan data program ke database/backend.
