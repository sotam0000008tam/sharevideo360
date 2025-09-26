# Video Gallery (Next.js + Tailwind)

A minimal, AdSense-ready video gallery that embeds YouTube and Rumble videos with unique descriptions.

## Quickstart

```bash
npm install
npm run dev
```

Edit video data in `data/videos.js`. Each item:
```js
{ id, platform: "YouTube" | "Rumble", title, description, tags: [], thumbnail, slug }
```

## AdSense

1. Replace the publisher ID in `pages/_app.js` and `public/ads.txt` **after** approval.
2. Place ad units on pages where appropriate (example ad `<ins class="adsbygoogle">` blocks can be added later).

## Deploy

- Create a GitHub repo and push this folder.
- Import the repo in Vercel → deploy.
- Add your custom domain in Vercel settings.

## Notes

- Uses static generation for video pages.
- SEO: sets `title`, `description`, and `og:image` per video.
- Tag pages are generated from the union of all `tags`.
