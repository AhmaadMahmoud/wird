# Wird (وِرد)

A lightweight web app that installs on your phone like a native app (PWA) and helps you keep up with Fajr prayer and your daily adhkar. The interface is in Arabic.

**Live app:** https://ahmaadmahmoud.github.io/wird/

- **Prayer times** for your city or current location (tap the city name to change it). The calculation method is picked automatically from the city. There's a countdown to the next prayer, and the sky changes color with the time of day.
- **Adhkar:** morning, evening, and after-prayer remembrances, each with its own counter. Quran verses are shown in the full Uthmani script of the mushaf.
- **Tasbih:** a counter where a tap anywhere on the screen counts. Pick the dhikr; counting is open-ended, with a stronger vibration every 33.
- **Progress:** your streak of consecutive days praying Fajr, shown as rosary beads for the last 33 days, plus a grid for the last week.
- Works **offline** after the first visit.
- **No servers, no accounts:** all data stays on the user's device.

## Install on your phone

- **iPhone:** open the link in Safari or Chrome, tap Share, then **Add to Home Screen**.
- **Android:** open the link in Chrome, tap the ⋮ menu, then **Install app** (or **Add to Home screen**).

## Deploy to GitHub Pages

1. Create a new GitHub repository (for example `wird`) and push the contents of this folder as-is.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, select the `main` branch and the `/ (root)` folder, then click **Save**.
3. After about a minute the app is live at:
   `https://<your-username>.github.io/wird/`

All paths in the project are relative, so it works under any repository name without changes.

## Run locally

The service worker needs a local server; opening the file directly won't work:

```bash
cd wird
python3 -m http.server 8080
# then open http://localhost:8080
```

## Shipping updates

Updates reach users automatically the next time they open the app: code files are fetched from the server first, and the cached copy is only used when offline.

When you add a new file to the app, add it to the `SHELL` list in `sw.js` and bump the version:

```js
const VERSION = 'wird-v11';
```

## Project structure

```
index.html            Main page
css/style.css         Styles
css/fonts.css         Font definitions
fonts/                Font files
js/app.js             App logic
js/adhkar.js          Adhkar texts
js/quran.js           Quran verses in Uthmani script (generated, do not edit)
js/adhan.min.js       Prayer-time calculation library
manifest.webmanifest  Install metadata
sw.js                 Service worker for offline use
icons/                App icons
```

## Sources

- Prayer times: [adhan-js](https://github.com/batoulapps/adhan-js) (MIT license, see `js/adhan.LICENSE`).
- Quran verses: Uthmani text, Hafs narration, from The Noble Quran Encyclopedia (quranenc.com). It's generated automatically into `js/quran.js` with no manual edits, and displayed in the Amiri Quran font.
- Adhkar texts: *Hisn al-Muslim* (Fortress of the Muslim).
- Fonts: Amiri, Amiri Quran, and Readex Pro, bundled in the `fonts` folder (SIL Open Font License).

Found a mistake in a dhikr's text or in the prayer times? Open an issue or send a pull request.
