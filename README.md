# 🌸 BloomShort – URL Shortener

Live Demo: <https://url-shortner-en2l.vercel.app/>

BloomShort is a modern, visually appealing URL shortener built with Next.js (App Router) and Supabase. It transforms long URLs into tiny, shareable “blooms” with a smooth, playful frontend experience.

---

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, Framer Motion for animations
- Backend / Database: Supabase (PostgreSQL) with Row-Level Security
- Deployment: Vercel
- Key Features:
  - Generate short URLs with a random code
  - Fully server-side insertion and redirect using Supabase service key
  - Automatic redirect to original URL
  - Responsive, animated, flowery frontend design
  - Short URL opens in a new browser tab

---

## Project Structure

url-shortener/
├─ app/
│  ├─ page.js               # Homepage / form
│  ├─ api/
│  │  └─ shorten/route.js   # API route to generate short URLs
│  └─ [code]/page.js        # Redirect page for short URLs
├─ lib/
│  ├─ supabase.js           # Client-side Supabase (optional)
├─ styles/
│  └─ globals.css           # Tailwind / global styles
├─ package.json
└─ README.md

---

## How it works

1. User enters a long URL in the input form on the homepage.
2. The API (/api/shorten) generates a short random code and inserts it into Supabase.
3. The generated short URL is displayed. Clicking it opens the destination in a new browser tab.
4. The [code] page fetches the original URL server-side using Supabase service key and redirects the user.

---

## Getting Started

1. Clone the repository:

   git clone <your-repo-url>
   cd url-shortener

2. Install dependencies:

   npm install

3. Set up environment variables (.env.local):

   SUPABASE_URL=<https://your-project.supabase.co>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key (optional for client access)

4. Run locally:

   npm run dev

5. Open <http://localhost:3000> in your browser.

---

## Highlights

- Beautiful Frontend: Flowery animations, gradient backgrounds, playful language.
- Server-Side Security: Service key keeps database operations secure.
- Instant Deployment: Fully deployed on Vercel.
- Client-Friendly Demo: Potential clients and employers can test live at <https://url-shortner-en2l.vercel.app/>

---

## Future Improvements

- Add analytics: number of clicks per short URL.
- Allow custom short codes.
- Enhance mobile responsiveness.
- Add light/dark mode toggle.
