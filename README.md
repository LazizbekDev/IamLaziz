# iamlaziz.me

Laziz Tojiboyev uchun SvelteKit portfolio sayti — GSAP + ScrollTrigger animatsiyalar, Lenis smooth scroll, custom cursor.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda: `http://localhost:5173`

## Build va deploy

```bash
npm run build
```

`svelte.config.js` da `@sveltejs/adapter-vercel` ulangan — loyihani Vercel'ga ulasangiz avtomatik build va deploy bo'ladi. Agar boshqa hostingda ishlatmoqchi bo'lsangiz, `@sveltejs/adapter-auto` yoki mos adapterni o'rnating.

## Fayl tuzilmasi

```
src/
├── routes/
│   ├── +layout.svelte      ← cursor, lenis, page transition
│   ├── +layout.ts          ← prerender
│   ├── +page.svelte        ← home (hero + about + projects + stats + contact)
│   └── sitemap.xml/
│       └── +server.ts
├── lib/
│   ├── components/
│   │   ├── Hero.svelte
│   │   ├── About.svelte
│   │   ├── Projects.svelte
│   │   ├── Stats.svelte
│   │   ├── Contact.svelte
│   │   ├── Cursor.svelte
│   │   └── Nav.svelte
│   ├── gsap.ts             ← GSAP + ScrollTrigger setup
│   └── lenis.ts            ← Lenis setup
├── app.html                ← SEO meta, JSON-LD, fontlar
└── app.css                 ← CSS variables, reset

static/
├── author.jpg              ← sizning rasmingiz (About bo'limida)
└── robots.txt
```

## O'zgartirish kerak bo'lgan joylar

- `static/author.jpg` — hozircha yuborgan rasmingiz turibdi, xohlasangiz almashtiring
- `static/cv-laziz-tojiboyev.pdf` — "Download CV" tugmasi shu faylga ishora qiladi, PDF qo'shing
- `static/og-image.png` — ijtimoiy tarmoqlarda ulashganda ko'rinadigan rasm (1200x630 tavsiya etiladi)
- `src/lib/components/Projects.svelte` — loyihalar ro'yxati va linklar
- `src/app.html` — JSON-LD dagi email/ijtimoiy tarmoq linklari

## Domain ulash

Vercel'da loyihani deploy qilgach, Vercel dashboard'da domain sifatida `iamlaziz.me` ni qo'shing va DNS yozuvlarini Vercel ko'rsatgan qiymatlarga o'zgartiring. SSL avtomatik yoqiladi.
