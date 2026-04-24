# BINTI Rising Initiative - Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
cd binti-rising-website
git init
git add .
git commit -m "Initial commit: BINTI Rising Initiative website"
git remote add origin https://github.com/YOUR_USERNAME/binti-rising.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New" → "Project"**
3. Import your `binti-rising` repository
4. Vercel auto-detects Next.js — click **"Deploy"**
5. Wait 2-3 minutes for build to complete

### 3. Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
| Key | Value |
|-----|-------|
| `INDEXNOW_KEY` | `binti-2026-rise-key` |
| `CONTACT_EMAIL` | `info@bintirising.org` |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (e.g., `https://bintirising.vercel.app`) |

### 4. Connect Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add `bintirising.org`
3. Update DNS records at your registrar:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

## Post-Deployment Checklist

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your domain (domain property)
3. Verify via DNS TXT record or HTML tag
4. Submit sitemap: `https://bintirising.org/sitemap.xml`

### Bing Webmaster Tools
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site
3. Verify via DNS or meta tag
4. Submit sitemap

### IndexNow Setup
The website automatically supports IndexNow. To manually trigger:
- Visit `https://your-domain.com/api/seo/ping` to ping search engines
- POST to `/api/indexnow` with `{"urls": ["/"]}` for instant indexing

### Update These Before Going Live
- [ ] Replace placeholder phone number in Footer + GetInvolved
- [ ] Replace M-Pesa Paybill number (currently 123456) with real one
- [ ] Replace bank details with real KCB account
- [ ] Add real social media URLs in JSON-LD and components
- [ ] Add real team member names in Leadership component
- [ ] Add Google Search Console verification code in layout.tsx
- [ ] Replace stock testimonials with real participant stories
- [ ] Add favicon (currently using binti-logo.jpg)

## Website Features

### SEO Built-In
- Open Graph tags (Facebook, LinkedIn sharing)
- Twitter Card meta tags
- JSON-LD structured data (Organization, WebSite, FAQPage)
- Geo meta tags for Nairobi, Kenya
- Dynamic sitemap at /sitemap.xml
- robots.txt with IndexNow support
- Canonical URLs
- Semantic HTML with ARIA labels

### Performance
- Server Components by default (minimal JS)
- CSS animations (no heavy libraries)
- Next.js Image optimization
- Lazy loading with Intersection Observer
- Smooth scroll behavior

### Interactive Features
- "Learn More" opens detailed program modals
- 3-tab Get Involved section (Donate / Volunteer / Partner)
- Functional contact forms with validation
- Smooth scroll navigation
- Scroll-to-top button
- Mobile responsive design

### Sections
1. Hero (with trust badges)
2. About Us (with donor appeal)
3. Programs (4 pillars with detailed modals)
4. Leadership (6 team members)
5. Impact (KPI progress bars + donation impact)
6. Stories (6 testimonials)
7. Get Involved (Donate/Volunteer/Partner tabs)
8. Footer (with donate button)

## Tech Stack
- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui components
- Lucide icons
