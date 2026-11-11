# Jiāyóu 加油 — Chinese practice for Moritz & Andrei

A small offline-capable web app for practising Chinese, organised by textbook lesson.

- `index.html` – the app (views, exercises, progress, backup)
- `data.js` – all lesson content: words, grammar notes, practice sentences, fill-in items
- `sw.js`, `manifest.webmanifest`, `icon*.png|svg` – install-to-home-screen and offline support

## Adding a lesson
Add one object to `BOOKS[0].lessons` in `data.js` (same shape as the existing ones). To add another book, add a second entry to `BOOKS`.

## Progress
Progress is stored in the browser under the key `jiayou-progress` (plus a second copy in IndexedDB). Do not rename the key or move the site to another address, otherwise existing progress is no longer found. When the data shape changes, raise `SCHEMA` in `index.html` and add a step to `migrate()`.

## Content
Lesson order, vocabulary and grammar topics follow *New Concept Chinese 1* (lessons 21–40). Explanations and practice sentences are written for this app. The textbook's own texts and recordings are not part of this repository; users can load their own copy of the audio files on their phone under Settings.

## Releasing an update
1. Change the app, then add a new first entry to `RELEASES` in `index.html` (version, date and time, notes) and put the same version and a short note in `version.json`.
2. Do not edit `sw.js`. Installed phones keep running their cached copy; they see "Update available", are offered a backup, and only switch when the user taps Update.

## Feedback
Notes written in the app (✎ on a question, or Settings → Feedback) are stored on the phone and sent as text through the phone's share sheet.
