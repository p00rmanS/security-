# Security+ Learning Path

An independent-study web app for CompTIA Security+ (SY0-701), built as plain
separated HTML/CSS/JS — no framework, no build step, no emojis. Includes an
A+/Network+ fundamentals refresher, Taglish explanations throughout, a
100-day study plan generator, a global search (Ctrl/Cmd+K) across every
lesson/glossary term/acronym/comparison, per-lesson bookmarks and notes, a
one-line Quick Summary on every lesson, a dedicated Acronyms reference page,
and a swipeable, one-lesson-at-a-time focused reader.

Security+ is a trademark of CompTIA. This tool is not affiliated with or
endorsed by CompTIA. All lessons, questions, and lab scenarios are original.

## Running it

No install, no build. Either:

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server, e.g.:

```bash
python -m http.server 8934
```

then visit `http://localhost:8934`. A `.claude/launch.json` config is
included so it can be previewed via the Claude Code browser tool with
`preview_start` (config name: `secplus-static`).

## Architecture

```
index.html            Single-page shell; hash-routed (#/dashboard, #/domain/d1, ...)
css/style.css          Design system: typography, icons, motion, light/dark theme
js/data-examfacts.js     Official exam snapshot (SY0-701 facts, domain weights)
js/data-protips.js       One exam Pro Tip per lesson id (79 total)
js/data-quicksummaries.js One-line "In One Breath" summary per lesson id (79 total)
js/data-cramsheet.js     Mnemonics + must-memorize facts for the Cram Sheet page
js/data-fundamentals.js  A+/Network+ refresher content (12 topics)
js/data-domains.js       5 SY0-701 domains: 67 full lessons (5 flagship + 62 topics)
js/data-comparisons.js   "Compare & Contrast" cards (18 tables)
js/data-questions.js     162 original practice questions (150 domain + 12 fundamentals)
js/data-glossary.js      137 glossary terms
js/data-acronyms.js      216 Security+ acronyms, expansion + plain-English meaning
js/data-labs.js          10 hands-on labs (fictional data only)
js/app.js                Routing, rendering, icons, quiz engine, plan generator, state
```

Lessons can also be read one at a time in a distraction-free view at
`#/lesson/<id>`, reachable via the "open in focused reader" icon on any
lesson card or a lesson result in global search (Ctrl/Cmd+K). That view
supports Previous/Next buttons, left/right arrow keys, and a touch swipe
gesture to move to the next or previous lesson in the full fundamentals
→ domains sequence.

Content is fully separate from rendering logic — editing lessons, questions,
glossary terms, or labs means editing the relevant `data-*.js` file only;
`app.js` renders whatever is in those arrays.

## Editing content

Every data file is a plain JS array of objects assigned to a `const`. To add
a question, copy an existing object in `data-questions.js` and give it a
unique `id`. To add a glossary term, append to `GLOSSARY` in
`data-glossary.js`. To add a lesson topic to a domain, append to that
domain's `topics` array in `data-domains.js`. No build step is needed —
just save and reload.

## Progress storage

All learner progress (completed lessons, quiz history, plan check-offs,
notes, settings) is stored in the browser's `localStorage` under the key
`secplus_progress_v1`, versioned for safe migration. Use Settings → Export
Progress to back it up as a JSON file, and Import to restore it (or move it
to another browser/device).

## Known gaps

See [CONTENT_STATUS.md](CONTENT_STATUS.md) for an honest audit of what's
built versus the original project brief (question bank size, lab count,
question types, and test coverage).
