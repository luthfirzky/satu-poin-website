# Satu Poin — Landing Page

Situs statis (HTML + CSS + JS biasa, tanpa build). Siap di-deploy ke Vercel.

## Struktur folder

```
satu-poin-website/
├── index.html            ← halaman utama (isi teks ada di sini)
├── vercel.json           ← pengaturan Vercel (URL bersih, header keamanan)
├── robots.txt            ← izin untuk Google
├── favicon-32.png        ← ikon di tab browser
├── apple-touch-icon.png  ← ikon saat disimpan ke layar HP
├── og-image.jpg          ← gambar pratinjau saat link dibagikan di WhatsApp/IG
└── assets/
    ├── css/style.css     ← semua tampilan & animasi
    ├── js/main.js        ← nomor WhatsApp, menu HP, animasi saat scroll
    └── img/              ← logo & swirl
```

## Sebelum deploy: wajib diubah

1. **Nomor WhatsApp** — buka `assets/js/main.js`, ganti `62XXXXXXXXXX`.
   Contoh: 0812-3456-7890 → `6281234567890`.
2. **Teks dalam [kurung siku]** di `index.html` — portfolio, testimoni,
   2 jawaban FAQ, kontak footer. Cari tanda `[` untuk menemukannya.
3. **Alamat situs** di `index.html` (bagian `<head>`) — ganti
   `https://satupoin.vercel.app` dengan alamat Anda setelah deploy pertama.

## Cek di komputer sendiri

Klik dua kali `index.html` tidak cukup, karena path gambar diawali `/`.
Jalankan server kecil dari dalam folder ini:

```
npx serve .
```

lalu buka http://localhost:3000. (Butuh Node.js.)
Alternatif tanpa Node: `python3 -m http.server 3000`.

## Deploy

### Cara A — GitHub + Vercel (disarankan)
1. Buat repository baru di GitHub, upload semua isi folder ini.
2. Di vercel.com: **Add New → Project → Import** repository tersebut.
3. Framework Preset: **Other**. Build Command & Output Directory: kosongkan.
4. Klik **Deploy**.
Setiap kali file di GitHub diubah, Vercel otomatis deploy ulang.

### Cara B — Vercel CLI
```
npm i -g vercel
vercel          # deploy preview (pertama kali akan diminta login)
vercel --prod   # deploy ke alamat utama
```

## Domain sendiri
Vercel → Project → **Settings → Domains → Add**. Masukkan domain,
lalu salin record DNS yang ditampilkan Vercel (A record untuk
`domain.com`, CNAME untuk `www`) ke panel DNS tempat Anda membeli domain.
SSL/HTTPS aktif otomatis.
