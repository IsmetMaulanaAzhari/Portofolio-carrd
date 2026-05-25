# Portofolio Carrd

Website portofolio berbasis React dan Vite untuk menampilkan profil, tautan sosial, serta galeri media.

## Fitur

- Tampilan profil utama.
- Tautan ke GitHub, LinkedIn, Instagram, dan email.
- Galeri campuran gambar dan animasi.
- Lightbox untuk melihat media lebih besar.
- Siap dideploy ke GitHub Pages.

## Teknologi

- React
- Vite
- Framer Motion
- React Icons

## Prasyarat

Pastikan sudah terpasang:

- Node.js versi 18 atau lebih baru.
- npm.

## Instalasi

Jalankan perintah berikut di folder proyek:

```bash
npm ci
```

Jika ingin instal normal tanpa file lock, bisa gunakan:

```bash
npm install
```

## Menjalankan Lokal

Untuk menjalankan aplikasi di mode development:

```bash
npm run dev
```

Setelah itu buka alamat yang ditampilkan Vite, biasanya http://localhost:5173.

## Build Production

Untuk membuat versi production:

```bash
npm run build
```

Hasil build akan tersimpan di folder `dist`.

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

## Lint

Untuk memeriksa kualitas kode:

```bash
npm run lint
```

## Deploy ke GitHub Pages

Proyek ini sudah disiapkan untuk deploy melalui GitHub Actions.

Langkahnya:

1. Buka repository di GitHub.
2. Masuk ke Settings > Pages.
3. Ubah source ke GitHub Actions.
4. Push perubahan ke branch `main` atau jalankan workflow deploy secara manual.
5. Tunggu workflow selesai, lalu buka alamat GitHub Pages repository ini.

Workflow deploy ada di `.github/workflows/deploy.yml` dan akan menjalankan `npm ci`, `npm run build`, lalu mengunggah isi folder `dist`.

## Catatan Penting

- Jika nama repository berubah, nilai `base` di `vite.config.js` juga harus disesuaikan.
- File gambar dan aset untuk galeri berada di `src/assets`.
- Jangan membuka file `src/main.jsx` langsung di GitHub Pages, karena yang harus dilayani adalah hasil build dari `dist`.

## Struktur Folder

```text
src/
	App.jsx
	App.css
	Gallery.css
	main.jsx
	assets/
.github/workflows/
	deploy.yml
```

## Informasi Tambahan

Template ini awalnya menggunakan React + Vite standar, lalu disesuaikan menjadi portofolio bergaya kartu dengan galeri media dan animasi.
