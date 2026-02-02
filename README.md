# 🌸 BloomShort – URL Shortener

Live Demo: <https://bloomshort.simplifymylife.app>

BloomShort is a modern, visually appealing URL shortener built with Next.js (App Router) and Supabase. It transforms long URLs into tiny, shareable “blooms” with a smooth, playful frontend experience. Users can also add UTM parameters for marketing tracking, copy short URLs to clipboard, open them in a new tab, and generate QR codes for sharing.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Framer Motion for animations
- **Backend / Database:** Supabase (PostgreSQL) with Row-Level Security
- **Deployment:** Vercel
- **Key Features:**
  - Generate short URLs with a random code
  - UTM parameter builder for tracking marketing campaigns
  - Copy-to-clipboard and open-in-new-tab buttons for short URLs
  - QR code generation for easy sharing
  - Fully server-side insertion and redirect using Supabase service key
  - Responsive, animated, flowery frontend design
  - Error messages appear gracefully and disappear automatically

---

## How it works

1. User enters a long URL and optional UTM parameters in the input form on the homepage.
2. The API (`/api/shorten`) generates a short random code and inserts it into Supabase.
3. The generated short URL is displayed:
   - Clicking it opens the original URL in a new browser tab.
   - Users can copy the URL to clipboard with a button.
   - A QR code for the URL is generated for easy scanning.
4. The `[code]` page fetches the original URL server-side using the Supabase service key and redirects the user.

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (.env.local):

   ```env
   SUPABASE_URL=<https://your-project.supabase.co>
   SUPABASE_ANON_KEY=<your-anon-key>
   GOOGLE_SAFE_BROWSING_KEY=<your-google-key>
   ```

4. Run locally:

   ```bash
   npm run dev
   ```

5. Open <http://localhost:3000> in your browser.

---

## Highlights

- **Flowery Frontend:** Gradient backgrounds, playful language, animated buttons, and smooth motion.
- **UTM Tracking:** Build marketing-friendly links directly in the shortener.
- **QR Codes:** Instant QR code generation for every short URL.
- **Clipboard & Open Buttons:** Easy sharing and navigation.
- **Server-Side Security:** Supabase service key keeps database operations secure.
- **Client-Friendly Demo:** Potential clients and employers can test live at <https://bloomshort.simplifymylife.app>

---

## Future Improvements

- Add analytics: track number of clicks per short URL.
- Allow custom short codes.
- Enhance mobile responsiveness.
- Optional light/dark mode toggle.
- Advanced URL safety checks and validation.

---

## Notes

- All inputs now share a unified, readable design.
- Error messages automatically disappear after a few seconds.
- The project is ready for Vercel deployment with environment variables securely set.
