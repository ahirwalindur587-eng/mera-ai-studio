# Mera AI Studio — starter app

A responsive Hindi-first web app UI that works on desktop and mobile browsers. It is a **front-end prototype**, not a connected video-generation service yet.

## Requirements
- Node.js 18+ (recommended)
- Internet for installing dependencies and loading the optional Google font

## Run locally
1. Install Node.js from the official website: https://nodejs.org/
2. Unzip this project.
3. Open a terminal in this folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build
```bash
npm run build
```
The deployable static site is created in `dist/`.

## Use on Android
To test locally, open the dev server URL from a phone on the same Wi-Fi using the computer's local network IP. For everyday use, deploy the `dist/` folder to a static host and open the site in Android Chrome. Use Chrome menu → **Add to Home screen**.

## Important: real AI generation is not connected
This prototype includes the interface for prompt entry, video styles, aspect ratio, duration, image upload, and a Hindi-voice toggle. The Generate button clearly indicates that a backend/model still needs to be connected.

For actual video generation, choose a provider or self-hosted model that supports the desired outputs. Check its current license, hardware needs, free-tier limits, and terms. Never put secret API keys in browser-side code; route provider calls through a backend. A free tier may have limits and cannot guarantee unlimited generation.

## Next development steps
- Add a backend endpoint for generation jobs.
- Connect a chosen text-to-video or image-to-video model.
- Add job status/progress, error handling, and secure storage.
- Connect a Hindi TTS service and mux audio into the generated video.
- Add a PWA manifest/service worker if installable offline shell behavior is desired.
