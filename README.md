# Nandakumar & Adithya — Wedding Invitation

A responsive traditional Kerala-inspired Hindu wedding invitation built with Next.js, TypeScript, Tailwind CSS, and Lucide icons.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize the dummy wedding details

Edit `lib/wedding.ts`. Update the names, parents, date, time, venue, address, city and year. Keep `dateISO` in `YYYY-MM-DD` format and `time24` in `HH:mm` 24-hour format so the countdown works.

Venue is the bride's residence. Add `address`, `city` and a Google Maps link in `mapsUrl` when available; the address line and "Get Directions" button only appear once filled.

## Deploy

Push the project to GitHub and import it into Vercel, or run:

```bash
npm run build
npm run start
```

## Notes

- The "Get Directions" button appears only when `mapsUrl` is set in `lib/wedding.ts`.
- WhatsApp sharing uses the current deployed URL and the configured wedding details.
- Background song: put your licensed audio file at `public/audio/wedding-song.mp3`. It starts when guests tap "Open Invitation" or the Music button, and loops.
- The gallery uses CSS illustrations as placeholders. Replace them with actual photos if desired.


## Couple photo gallery

Your seven uploaded photos are stored in `public/images/` and displayed in the gallery. Replace the image files there to update the gallery later. Images are opened individually when clicked.
"# wedding" 
