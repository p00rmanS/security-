# Security+ Learning Path

An independent-study web app for CompTIA Security+ (SY0-701), built as plain
separated HTML/CSS/JS — no framework, no build step, no emojis. Includes an
A+/Network+ fundamentals refresher, Taglish explanations throughout, a
100-day study plan generator, a global search (Ctrl/Cmd+K) across every
lesson/glossary term/acronym/comparison, per-lesson bookmarks and notes, a
one-line Quick Summary on every lesson, a dedicated Acronyms reference page,
and a course-player layout: one lesson at a time, a collapsible
Udemy/Coursera-style "Course content" panel, and keyboard shortcuts.

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
js/data-protips.js       One exam Pro Tip per lesson id
js/data-stories.js      "Story from the Field" narratives (true incidents + labeled scenarios) per lesson id
js/data-quicksummaries.js One-line "In One Breath" summary per lesson id
js/data-cramsheet.js     Mnemonics + must-memorize facts for the Cram Sheet page
js/data-fundamentals.js  A+/Network+ refresher content (12 topics)
js/data-domains.js       5 SY0-701 domains: 5 flagship lessons + topic lessons (see data-lessons-extra.js line below for totals)
js/data-lessons-extra.js 9 more lessons + their tips, summaries, questions, glossary and acronyms,
                         merged into the globals above
js/data-lessons-deep-a.js, -b.js  11 in-depth lessons ("Going deeper" + "Exam patterns" sections)
js/data-stories.js       "Story from the Field" scenarios
Totals with every file loaded: 135 lessons, 272 questions, 177 glossary terms, 253 acronyms
js/data-comparisons.js   "Compare & Contrast" cards (18 tables)
js/data-questions.js     226 domain + 12 refresher practice questions (250 total with data-lessons-extra.js)
js/data-glossary.js      137 glossary terms (150 with extras)
js/data-acronyms.js      216 Security+ acronyms (223 with extras)
js/data-labs.js          10 hands-on labs (fictional data only)
js/app.js                Routing, rendering, icons, quiz engine, plan generator, state
```

## The course player

Every lesson opens at `#/lesson/<id>` in a reading column with a "Course
content" panel beside it (the syllabus: five domains plus the refresher, each
section collapsible, with per-lesson completion checkboxes). Hide or show the
panel with the topbar button or `O`; the full syllabus is also at `#/course`.

Each lesson reads: goal and why it matters, the explanation, key terms,
analogy, technical example, exam traps, SOC connection, then **What to
remember** (a numbered exam-focus box), **Pro tip**, and **Taglish**. The
`Show` chips above the lesson turn Taglish, analogy, example, exam traps and
SOC sections on and off. A lesson may define a `remember` array; older lessons
fall back to their `takeaways`.

Keyboard shortcuts (press `?` in the app for the list; paused while typing):

| Key | Action |
| --- | --- |
| Left / Right | Previous / next lesson |
| Shift + Right | Mark complete, then next |
| C | Mark complete / undo |
| B | Bookmark |
| O | Show / hide course content |
| M | Show / hide the menu |
| T | Show / hide Taglish |
| / or Ctrl/Cmd + K | Search |
| ? | Shortcut list |

Touch swipe left/right still moves between lessons on phones.

Content is fully separate from rendering logic — editing lessons, questions,
glossary terms, or labs means editing the relevant `data-*.js` file only;
`app.js` renders whatever is in those arrays.

## Editing content

Every data file is a plain JS array of objects assigned to a `const`. To add
a question, copy an existing object in `data-questions.js` and give it a
unique `id`. To add a glossary term, append to `GLOSSARY` in
`data-glossary.js`. To add a lesson topic to a domain, append to that
domain's `topics` array in `data-domains.js` (or in `data-lessons-extra.js`, which
is sorted by exam objective on load), and add its Pro Tip and Quick Summary by id. No build step is needed —
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
