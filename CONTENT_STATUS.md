# Content Status — Audit Against the Rubric

This file is an honest self-audit of `SECURITY_PLUS_COURSERA_PROJECT.md` (the
original build brief). It states what was built, what was scoped down, and
what was skipped, so nothing is overclaimed.

## Stack decision (deviation from the brief, by request)

The brief's default stack was React + TypeScript + Vite + Tailwind. The user
explicitly asked for **plain, separated HTML / CSS / JS** instead — no
framework, no build step, no emojis, with Taglish explanations and an
A+/Network+ fundamentals refresher added up front. That request supersedes
the brief's stack instruction. Structure:

- `index.html` — single-page shell, hash-routed (`#/dashboard`, `#/domain/d1`, etc.)
- `css/style.css` — design system, light/dark mode, responsive layout
- `js/data-*.js` — all content, separate from rendering logic
- `js/app.js` — routing, rendering, quiz engine, plan generator, state/localStorage

Open `index.html` directly, or serve the folder with any static file server
(a `.claude/launch.json` config running `python -m http.server` is included
for local preview).

## What's fully built and working

- **Navigation, theming, persistence**: sidebar nav with live progress,
  light/dark/system theme, reduced-motion toggle, Taglish on/off toggle, all
  state in `localStorage` (versioned, with safe fallback if corrupted).
- **A+/Network+ Fundamentals Refresher (Module 0)**: 12 full refresher topics
  (boot process, OS fundamentals, command line, file permissions, patching,
  virtualization, OSI/TCP-IP, IP/subnetting, ports/protocols, DNS/DHCP,
  routing/switching/VLANs, firewalls/NAT/VPN/wireless), each with a plain
  explanation, real-life analogy, key points, key terms, and a Taglish
  explanation.
- **Five SY0-701 domains, 51 full lessons total** (5 flagship + 46 topic
  lessons). Every single lesson, not just the flagship ones, uses the
  complete 13-part Standard Lesson Formula: goal, why it matters, simple
  explanation, key terms, real-life analogy, technical example, visual
  summary table (where useful), common confusion comparisons, SOC
  connection, knowledge-check pointer, key takeaways, a Pro Tip, and Taglish
  help. Beyond the original 25 subsection lessons, 21 new lessons were added
  across five follow-up passes for real exam-topic gaps: Physical Security
  Controls, PKI & Certificates in Practice, Cryptographic Attacks & Key
  Management, Principles of Social Engineering, Indicators of Compromise
  (a working catalog), Secure Communication Protocols Cheat Sheet,
  Embedded/Specialized/IoT System Security, Environmental Controls & Physical
  Resilience, Wireless Security Deep Dive, Application Security, Digital
  Forensics in Practice, Business Continuity Planning, Mobile Device
  Vulnerabilities, High Availability & Load Balancing Deep Dive, Threat
  Intelligence Sources, Threat Hunting, Zero Trust Architecture in Depth,
  Attack Frameworks and Threat Modeling, Change Management: Technical
  Implications, Supply Chain Security, and Privacy-Enhancing Technologies.
- **Pro Tips on every lesson**: all 63 lesson-like items (51 domain lessons
  + 12 fundamentals topics) have a distinct exam-taking Pro Tip — a
  memorization aid, common trap, or phrasing pattern the exam uses — stored
  separately in `data-protips.js` and looked up by lesson id, so the large
  content files didn't need touching to add this.
- **Exam Cram Sheet page** (`#/cram`), now printable: 8 mnemonics, 14
  must-memorize facts (exam duration/scoring, CIA/AAA, IR phases, ALE
  formula, RTO/RPO, risk treatments, governance hierarchy, common ports, OSI
  quick layers, MFA factors), and every one of the 63 Pro Tips grouped by
  domain for a single final-review pass. A "Print / Save as PDF" button
  triggers `window.print()` against a dedicated print stylesheet that hides
  the sidebar/topbar/buttons and keeps cards from splitting across pages.
- **Missed Questions and Flagged Questions are now real, revisitable
  practice scopes** (previously `state.flaggedQuestions` could only be
  toggled mid-quiz with no way to come back to it later — the same class of
  dead-state gap as bookmarks/notes below). `state.missedQuestions` tracks
  which question IDs were most recently answered wrong, updated after every
  graded attempt (removed again the moment it's answered correctly, so it
  reflects current standing, not history). Both appear in the Practice
  Center's scope dropdown with a live count next to the label, and the quiz
  builder now shows a friendly empty-state message and disables Start
  instead of crashing when a scope has zero questions — a real edge case
  that existed for any hypothetical empty scope, closed proactively.
- **Dashboard "Focus Areas" card**: surfaces every domain scoring below 75%
  or never attempted, plus missed/flagged question counts, each with a
  one-click "Practice" button that jumps straight into the right scope.
  Domain Mastery cards also got their own inline "Practice" button.
- **162 original practice questions — target of "at least 150" met exactly**:
  150 questions across D1–D5, weight-proportional down to the exact
  percentage (18/33/27/42/30 = 12/22/18/28/20%), plus a separate 12-question
  Fundamentals Check. Every question has an explanation for the correct
  answer and a distinct reason for every wrong choice. Choice display order
  is now shuffled per attempt (see the bug note below).
- **137 glossary terms** (target was "at least 120" — met and exceeded),
  each with a plain-language definition, technical definition, and example,
  searchable and filterable by domain.
- **18 Compare & Contrast cards** covering all 17 comparisons named in the
  brief (AAA; encryption/hashing/encoding/obfuscation; symmetric/asymmetric;
  signature vs encryption; IDS/IPS; EDR/XDR/SIEM/SOAR; scan/pentest/audit;
  risk appetite/tolerance/threshold; policy/standard/procedure/guideline;
  RTO/RPO; SLE/ARO/ALE; hot/warm/cold sites; backup types; false pos/neg;
  threat/vuln/risk/exploit; preventive/detective/corrective; SAML/OAuth/OIDC;
  containment/eradication/recovery), each with a table and a Taglish hook.
- **10 hands-on labs — every lab suggested in the brief is now built**: auth
  log triage, firewall log reading, phishing email analysis, CVSS + business
  context prioritization, incident timeline/containment ordering, risk
  register treatment, comparing file hashes to a threat-intel feed, hardening
  a fictional workstation, building a least-privilege access matrix, and
  completing chain-of-custody documentation — all using fictional data, with
  hints, scenario tasks, immediate feedback, and a saved reflection question.
- **Practice Center / quiz engine**: scope by domain or fundamentals or full
  mock pool, adjustable question count, practice mode (immediate feedback)
  or exam mode (feedback at the end), optional countdown timer, question
  flagging, domain-by-domain score breakdown, full answer review, and quiz
  history log.
- **100-Day Study Plan generator**: day-by-day schedule (10-day foundations
  block, 80 domain-study days allocated proportionally to exam weight with
  built-in practice-quiz days, 10-day final review/mock-exam block),
  adjustable start date and weekend-skipping, with per-day check-off synced
  to the Dashboard.
- **Dashboard**: overall completion, per-domain mastery bars (best quiz
  score per domain), current plan day, attempt count, and a readiness
  indicator that explains its status in words (per the brief's mastery
  rules: 80% domain mastery, 85%+ on two mock exams with no domain below
  75%, all lessons marked complete), not just a color.
- **Progress export/import**: download progress as JSON, re-import with
  validation and a confirmation prompt; Reset Progress requires explicit
  confirmation.
- **Accessibility/responsiveness**: semantic headings, visible focus states,
  keyboard-operable controls, no horizontal scroll at mobile widths (tested
  at 375px), reduced-motion support.
- **Disclaimer**: the required CompTIA trademark/independent-study
  disclaimer is in the footer of every page.
- **Exam Overview page** (brief section 4, previously missing entirely):
  the official exam snapshot table (cert name, exam code, launch date,
  question count/types, duration, passing score, languages, recommended
  experience, retirement dates) in `js/data-examfacts.js`, kept as one
  config object per the brief's instruction, with a "Last reviewed" date,
  a link to the official CompTIA page, a Taglish explanation, and a
  domain-weighting breakdown reusing live `DOMAINS` data.
- **Visual design pass**: Manrope (display/headings) + Inter (body) via
  Google Fonts, a hand-authored inline-SVG icon set (no emoji, no icon
  library dependency) used throughout the sidebar/dashboard/buttons, a
  fixed per-domain color identity (D1–D5) used consistently as sidebar
  dots, domain-card left borders, and badges, an SVG progress ring on the
  Dashboard, a gradient hero card, hover-lift/motion on cards and buttons,
  and a route-change fade-in. A genuine study-streak feature was added
  (`state.streak`, `recordActivity()`) — counts consecutive days with
  real activity (lesson completed, quiz finished, or plan day checked),
  shown as a flame counter on the Dashboard hero.

## Known gaps (scoped down deliberately, not oversights)

- **Question types are single-select and multi-select only.** The brief
  also lists matching, ordering/sequence, categorization, fill-in-the-blank,
  and drag-and-drop PBQ styles. Those would need real interaction engines
  (drag targets, ordering lists) that weren't built in this pass — treat
  this as the single biggest remaining engineering gap versus the brief.
- **Lesson mastery is self-reported**, not gated by a per-lesson knowledge
  check. "Mark Complete" is an honest simplification of the brief's "reach
  the end and submit the knowledge check" — the Practice Center is the real
  knowledge-check mechanism, filtered by domain rather than by individual
  lesson.
- **4-week/8-week/12-week study plans are not implemented** — only the
  100-day plan the user actually asked for. The generator logic
  (`buildStudyPlan` in `app.js`) could be parameterized for other lengths
  later.
- **No automated test suite.** The brief asked for tests on domain-weight
  totals, plan allocation, quiz scoring, and import validation. This build
  was manually verified end-to-end in a browser (navigation, lesson
  rendering, single- and multi-select quiz grading, domain breakdown, dark
  mode, mobile layout at 375px, plan generation) but has no `npm test`
  equivalent, since there's no package manager/build tooling by design.
- **Objective tag numbers (e.g. "1.1", "2.3") are internal topic tags**,
  matched to the brief's own subsection numbering, not verified against a
  live, current CompTIA objectives PDF — consistent with the brief's own
  instruction not to invent official numbers without verification.
- **No standalone marketing Landing Page or Progress/Analytics page.** The
  brief describes these as separate pages; this build folds their content
  into the Dashboard (hero + stats + domain mastery) instead of adding two
  more routes. An objective-mastery heatmap and a distinct "frequently
  missed concepts" view are not built — domain-level breakdown exists, but
  not per-objective-tag analytics.
- **No distinct "diagnostic assessment."** The brief calls for a specific
  20-question diagnostic at the start of Module 0. The 12-question
  Fundamentals Check in the Practice Center serves a similar onboarding
  role but isn't framed or gated as that specific diagnostic experience.

## Verification performed this session

Manually exercised in a browser via a local static server: dashboard load,
fundamentals page, a full flagship domain lesson, quiz builder → active
quiz (single-select correct/incorrect paths, multi-select grading) → results
→ review screen, dashboard reflecting the new attempt, glossary search/filter
(137 terms confirmed), Compare & Contrast page, Labs list and one full lab
(evidence table + scenario tasks + reflection save), 100-Day Plan generation
and date math, Settings (theme switch to dark confirmed via DOM inspection,
Taglish/reduced-motion switches), and a 375px mobile layout check
(hamburger menu confirmed functional). No console errors were observed on
any route.

## Follow-up pass: expanding all 25 topic cards to full lessons

After initial delivery, all 25 non-flagship topic cards (originally short
summary + key terms only) were rewritten as full lessons using the same
12-part Standard Lesson Formula as the flagship lessons — each now has its
own goal, why-it-matters, simple explanation, analogy, technical example,
comparison table (where it adds value), 1–2 common-confusion pairs, SOC
connection, takeaways, and Taglish explanation. `app.js`'s rendering was
refactored (`lessonBodyHtml()`) so both flagship and topic lessons share one
renderer instead of two different card formats. Verified with a Node script
confirming all 30 lesson objects (5 flagship + 25 topics) have every
required field non-empty, `node --check` on both changed files, and a live
browser check that a topic accordion (D4 "Asset Management") opens and
renders all expected section labels with no console errors. The two
flagship lessons that were originally missing a Taglish section (D2 social
engineering, D3 defense in depth) were also filled in during this pass.

## Follow-up pass: question bank to 150, labs to 10, and a real bug fix

Added 70 new questions to `data-questions.js` (10→18 D1, 18→33 D2, 14→27 D3,
22→42 D4, 16→30 D5) and 4 new labs to `data-labs.js` (hash comparison,
workstation hardening, least-privilege matrix, chain of custody) — closing
both gaps flagged above. A Node script confirmed 162 total questions with no
duplicate IDs, correct `choices`/`correct`/`distractorExplanations`
structure on every question, and exactly 150 domain questions distributed
in the same proportion as the official domain weights.

**Bug found and fixed during this pass:** live-testing the expanded question
bank (deliberately clicking "the first rendered option" on every question)
scored 100%, which should be statistically near-impossible. Investigation
showed every single-select question in the entire bank (159/159, not just
the newly added ones) and every lab task (31/31) had its correct answer
authored as choice `"a"`, and the quiz/lab renderers displayed `choices` in
their fixed array order with no shuffling — meaning the correct answer was
always the first option on screen. This violated the brief's explicit
"randomize answer order without changing question meaning" requirement and
would have let a learner "solve" the practice bank by pattern-matching
position instead of knowledge. Fixed in `app.js`: `startQuiz()` now shuffles
each question's `choices` array per attempt (`Object.assign({}, q, {
choices: shuffle(q.choices) })`), and `labTaskCard()` now shuffles and
caches each lab task's choice order once per session
(`labChoiceOrderCache`). Both fixes rely on choices being referenced by
`id`, not array position, so `correct` and `distractorExplanations` needed
no changes. Verified live: a scripted run that always clicked the
first-displayed option across all 150 mock-pool questions scored 28/150
(19%) — consistent with randomized 4-option guessing — and a lab task's
first-displayed choice no longer matched the originally-authored `"a"` text.

## Follow-up pass: Exam Overview page + full visual design pass

Added the brief's missing Exam Overview page (`data-examfacts.js` +
`renderExamOverview()`, routed at `#/exam`, linked from the sidebar and
Dashboard) with the official exam snapshot table, last-reviewed date, an
official-site link, a Taglish explanation, and a live domain-weighting
breakdown. Separately, did a full visual redesign aimed at the "award
winning UI" ask: added Manrope/Inter via Google Fonts, a hand-authored
inline-SVG icon set (`ICON_PATHS`/`icon()` in `app.js` — no emoji, no
external icon library), a fixed per-domain color identity used consistently
across the sidebar, domain cards, and badges, an SVG progress-ring helper
(`progressRing()`), a gradient hero card on the Dashboard, hover-lift and
press motion on cards/buttons, a route-change fade-in, and a redesigned
sidebar brand mark/favicon. Also added a genuine (not cosmetic) study
streak: `state.streak` + `recordActivity()` count consecutive days with
real activity (a lesson marked complete, a quiz finished, or a plan day
checked off), surfaced as a flame counter on the Dashboard hero.

Verified live in a browser (desktop, dark mode, and 375px mobile): hero
card and progress ring render and animate correctly in both themes, sidebar
icons and domain-color dots render, the Exam Overview page's table/links/
domain-weighting section render correctly (and a real bug was caught and
fixed here too — the "Last reviewed" date showed one day early due to
UTC-vs-local date parsing, fixed by parsing with an explicit local
midnight), the streak counter appears after completing a lesson, and a
full 12-question quiz run still scores and grades correctly through the
redesigned UI. `node --check` passed on every JS file after all changes.

## Follow-up pass: 6 new lessons, Pro Tips, Exam Cram Sheet, content audit

Added 6 new full lessons closing genuine SY0-701 coverage gaps that were
only mentioned in passing inside other lessons: Physical Security Controls
and PKI & Certificates in Practice (Domain 1), Principles of Social
Engineering — the psychology behind why it works, distinct from the
technique names already covered (Domain 2), Secure Communication Protocols
Cheat Sheet and Embedded/Specialized/IoT System Security (Domain 3), and
Wireless Security Deep Dive (Domain 4). Domain lesson count: 30 → 36.

Added a Pro Tip to all 48 lesson-like items (`data-protips.js`, looked up
by lesson id in `proTipBlock()` so `data-domains.js`/`data-fundamentals.js`
didn't need per-object edits) and a new Exam Cram Sheet page aggregating
mnemonics, must-memorize facts, and every Pro Tip grouped by domain.

**Content accuracy spot-check performed this pass** (the user specifically
asked whether the platform "truly teaches Security+ fundamentals"): verified
the technical claims in the new content against known-correct SY0-701
material — WPA3's SAE handshake and forward secrecy properties, the
root/intermediate CA trust-chain rationale, wildcard vs. SAN certificate
behavior, the CompTIA SY0-701 rename of "mantrap" to "access control
vestibule" (both terms included since older materials still use "mantrap"),
the standard insecure-to-secure protocol pairings (Telnet→SSH, FTP→SFTP/
FTPS, HTTP→HTTPS, SNMP→SNMPv3, LDAP→LDAPS), the DORA DHCP mnemonic, and the
ALE = SLE × ARO formula. No inaccuracies were found in this pass, but this
was a targeted spot-check of the highest-risk new claims, not an
exhaustive line-by-line review of all 48 lessons — flag anything that
looks wrong and it'll be corrected directly.

**Verified live**: `node --check` on every JS file; a Node script confirmed
zero missing and zero orphaned Pro Tips across all 48 lesson ids; opened
the new Wireless Security lesson and Physical Security lesson in-browser
and confirmed all 12 lesson-formula sections (including the new "12. Pro
Tip") render with real content; opened the Cram Sheet and confirmed all 48
Pro Tip boxes render grouped correctly by domain; confirmed the Dashboard's
lesson-completion denominator updated automatically from 42 to 48 lessons
with no code change needed (it's computed from the data, not hardcoded);
and reran a 30-question randomized mock quiz end-to-end with no console
errors, scoring 27% — consistent with random 4-option guessing.

## Second follow-up pass: 6 more lessons closing remaining gaps

Added 6 more full lessons, one per domain area still thin on dedicated
coverage: Cryptographic Attacks & Key Management (Domain 1 — collisions,
the birthday attack, downgrade attacks, key management discipline),
Indicators of Compromise: A Working Catalog (Domain 2 — account/resource/
network/file/published indicator categories, since the exam frequently
describes a symptom rather than naming a cause), Environmental Controls
and Physical Resilience (Domain 3 — UPS vs. generator, hot/cold aisle
containment, clean-agent fire suppression), Application Security (Domain
4 — input validation, SAST vs. DAST, fuzzing, code signing) and Digital
Forensics in Practice (Domain 4 — legal hold, forensic imaging, write
blockers, e-discovery), and Business Continuity Planning (Domain 5 — BCP
vs. DRP vs. COOP, succession planning). Domain lesson count: 36 → 42. Each
new lesson got its own Pro Tip in `data-protips.js` (48 → 54 total).

**Verified live**: a Node script confirmed 42 domain lessons with zero
structural problems (all 13 required fields present and non-empty on every
lesson) and zero missing/orphaned Pro Tips across all 54 lesson ids;
opened the new Digital Forensics lesson in-browser and confirmed all 12
formula sections render, including its Pro Tip; confirmed the Cram Sheet
now renders exactly 54 Pro Tip boxes and the Dashboard's lesson-completion
denominator auto-updated from 48 to 54 with no code change; and reran a
20-question D4-scoped quiz with the "always click the first option"
regression check (scored 35% — still consistent with randomized shuffling,
not the old positional bug). No console errors on any route tested.

## Full bug audit + third follow-up pass: 4 more lessons

Before adding anything, ran a full audit pass explicitly to catch bugs:
cross-file ID-uniqueness checks (lessons, questions, labs, lab tasks) —
none found; structural validation of every question (`correct` id exists
in `choices`, every wrong choice has a `distractorExplanations` entry,
valid `domainId`) — none found; validation that every icon name used in a
`navLink()` or `icon()` call in `app.js` has a matching entry in
`ICON_PATHS` — none missing (two icon defs, `shield` and `chevronRight`,
are simply unused — harmless dead code, not a bug); confirmed the
`--violet`/`--violet-soft` and `--font-display` CSS custom properties used
by the Pro Tip styling and Cram Sheet actually exist in `style.css`,
including dark-mode overrides — they do. Live-tested all 16 routes in one
pass (dashboard, exam, fundamentals, all 5 domains, practice, labs, one lab
detail, glossary, compare, cram, plan, settings) — every route rendered
real content with zero console errors. Also verified the Settings JSON
export produces a valid blob, the study streak counter updates after
completing a lesson, and the site has no horizontal scroll at 375px on
either the Cram Sheet or a table-heavy domain page. No bugs were found.

With the audit clean, added 4 more lessons for gaps a real test-taker
would regret missing: Mobile Device Vulnerabilities (Domain 2 —
jailbreaking/rooting, sideloading, bluejacking vs. bluesnarfing), High
Availability & Load Balancing Deep Dive (Domain 3 — active/active vs.
active/passive, health checks, round robin), and Threat Intelligence
Sources plus Threat Hunting (Domain 4 — OSINT/ISAC/dark-web-monitoring
sourcing, and proactive hunting as the deliberate counterpart to the
flagship lesson's reactive incident response). Domain lesson count: 42 →
46; Pro Tips: 54 → 58. Re-ran the full validation script (zero structural
problems, zero missing/orphaned Pro Tips) and live-tested all 4 new lessons
in-browser — each renders 11 sections plus its Pro Tip, the Cram Sheet
shows all 58 Pro Tip boxes, and a 20-question mock quiz still scores
correctly with no console errors.

## Fourth follow-up pass: fixed a real gap (bookmarks/notes were dead state), added global search, 2 more lessons

Auditing state management before adding anything turned up a genuine bug
of omission: `state.bookmarks` and `state.notes` existed in the schema
(carried over from the original brief's requirements) and were saved/loaded
correctly, but **no UI anywhere ever read or wrote them** — two promised
features were completely dead code. Fixed by wiring both into every lesson
card (flagship, topic, and fundamentals): a star-shaped bookmark toggle
next to Mark Complete, and a collapsible "My Notes" textarea that
auto-saves on input. The Dashboard now has a "Bookmarked Lessons" section
listing every bookmarked lesson with a one-click jump back to it.

Also replaced the Dashboard's old hardcoded "Continue Studying" links
(always pointing at the Fundamentals page, regardless of actual progress)
with a real `nextIncompleteLesson()` lookup that walks Fundamentals then
every domain in order and surfaces the true next lesson, with a "Continue"
button that jumps straight to it — scrolling to and briefly highlighting
the exact lesson card (`jump-highlight` CSS pulse) via a shared
`pendingScrollTargetId` mechanism.

**Added global site search** (Ctrl/Cmd+K, or the Search button in the
topbar): a modal indexes all 60 lesson titles/goals, all 137 glossary
terms, and all 18 comparison titles, with live filtering, arrow-key
navigation, and Enter-to-select. Selecting a lesson jumps and highlights it
exactly like the Continue button; selecting a glossary term navigates to
the Glossary page with that term pre-filled in its search box; selecting a
comparison scrolls to and highlights that specific card on the Compare &
Contrast page.

Added 2 more lessons while the audit was fresh: Zero Trust Architecture in
Depth (Domain 3 — policy engine/administrator/enforcement point, adaptive
identity, threat scope reduction, going beyond the basic zero trust
mention in the Fundamental Security Concepts lesson) and Attack Frameworks
and Threat Modeling (Domain 4 — MITRE ATT&CK, the Cyber Kill Chain, the
Diamond Model, tying directly into the earlier Threat Hunting lesson).
Domain lesson count: 46 → 48; Pro Tips: 58 → 60.

**Verified live**: full validation script showed zero structural problems
and zero missing/orphaned Pro Tips across all 60 lessons; tested the
search modal end-to-end (typed "zero trust", got 3 correctly-typed results
across lessons and glossary, clicked one, confirmed it navigated, opened
the right accordion, and applied the highlight pulse); confirmed
bookmarking a lesson and writing a note both persist to `localStorage`
under the correct keys and the Dashboard's bookmark list reflects it
immediately; confirmed the Continue button correctly identified the first
incomplete lesson and jumped to it; confirmed both new lessons render all
12 formula sections including their Pro Tip; reran a 15-question mock quiz
with no console errors; and confirmed no horizontal scroll at 375px with
the new topbar search button in place.

## Fifth follow-up pass: missed/flagged review, Focus Areas, printable Cram Sheet, 3 more lessons

Continued the pattern of auditing state before adding features. Found that
`state.flaggedQuestions` had the identical problem bookmarks/notes had
before the fourth pass: fully wired for toggling and for display within an
active quiz's results review, but with no way to ever revisit "just my
flagged questions" once that quiz session ended. Fixed by adding `missed`
and `flagged` as first-class Practice Center scopes (see above), which
also required hardening `refreshCounts()` against a zero-question scope —
previously `[5,10,15,20,30].filter(n => n < 0)` plus `.push(total)` would
silently produce a "0 questions" option that crashed `renderActiveQuiz()`
on `activeQuiz.questions[0].prompt` being undefined. That crash path is now
impossible for any scope, not just the two new ones.

Added the Dashboard's Focus Areas card and per-domain "Practice" buttons
(both described above), and made the Exam Cram Sheet printable via a
dedicated `@media print` stylesheet plus a "Print / Save as PDF" button.

Added 3 more lessons: Change Management: Technical Implications (Domain 1
— allow/deny lists, restricted activities, restart requirements, and
dependency mapping as the concrete technical checklist behind the
process-level Change Management lesson), Supply Chain Security (Domain 2 —
software/hardware supply chain risk and the SBOM as a concrete mitigation,
distinct from the third-party vendor-relationship risk covered in Domain
5), and Privacy-Enhancing Technologies (Domain 5 — anonymization vs.
pseudonymization vs. differential privacy, the specific techniques behind
the privacy principles already covered). Domain lesson count: 48 → 51;
Pro Tips: 60 → 63.

**A content bug was also caught and fixed this pass**: the initial draft of
the Privacy-Enhancing Technologies lesson's Taglish paragraph contained a
stray CJK character (代) from an input-method slip, not intentional
content. Caught and corrected. In response, the validation script was
extended to scan every lesson's text fields for CJK Unicode characters —
none remain anywhere in the content.

**Verified live**: full validation script (extended with the CJK check)
showed zero structural problems and zero missing/orphaned Pro Tips across
all 63 lessons; confirmed the Practice Center's scope dropdown shows live
counts per scope including "(0)" for missed/flagged when empty; ran a
10-question D1 quiz deliberately answering wrong, confirmed exactly 7
missed questions appeared in the "Missed Questions" scope immediately
after; confirmed the Dashboard's Focus Areas card correctly listed the
now-weak D1 domain plus the 4 untried domains plus the missed-questions
row, and that its "Practice" button and a domain card's "Practice" button
both correctly pre-selected the right scope on arrival at the Practice
Center; confirmed the Cram Sheet's print button exists and 63 Pro Tip boxes
render; and spot-checked the two newest lessons (Privacy-Enhancing
Technologies, Supply Chain Security) in-browser, confirming all 11 sections
plus Pro Tip render with no CJK artifacts and no console errors across the
entire test session.

## Sixth follow-up pass: a real, visible bug fix + 3 more lessons

The user reported seeing bugs. Rather than guess, this pass did a fresh,
systematic re-audit of everything not yet stress-tested: all 10 labs in one
sweep, Exam Simulation mode (feedback withheld until the end) plus the
countdown timer, the Missed Questions *removal* path (not just addition —
confirmed a question drops out of the pool the moment it's answered
correctly again), Settings (theme, Taglish toggle actually hiding Taglish
content, reduced motion), and the mobile layout with the newly-added
topbar search button.

**Found a real, visible bug**: the search modal was rendering open on
*every single page load*, before ever being touched — confirmed via
screenshot and via `getComputedStyle`, which showed `display: flex` on
`#search-modal-backdrop` despite its `hidden` attribute being `true`. Root
cause: `.search-modal-backdrop { display: flex; ... }` in `style.css` is a
normal-origin author rule, and normal-origin author styles always beat the
browser's built-in `[hidden] { display: none }` user-agent rule in the CSS
cascade — regardless of specificity or source order. This is a well-known
CSS gotcha (the reason normalize.css/resets typically special-case it) that
had gone unnoticed because every prior verification pass checked the
`hidden` *property/attribute* (which was always correctly `true`/`false`)
rather than the *rendered* `display` value, so the tests kept "passing"
while the modal sat visibly open the whole time. Fixed with a single global
rule — `[hidden] { display: none !important; }` — added once near the top
of `style.css`. Grepped the entire codebase for every other use of
`hidden`; the search modal was the only element using it, so this one fix
closes the bug completely, and the `!important` rule now protects any
future `hidden` element from the same class of mistake.

While looking at the mobile layout to verify the search-button fix, also
caught and fixed a real (if less severe) layout bug: `.topbar-title` had no
`min-width: 0`, `white-space: nowrap`, or `overflow` handling, so on a
375px-wide screen the topbar text wrapped across three lines, bloating the
topbar's height. Fixed with proper text-overflow ellipsis handling, plus
hiding the title entirely under 480px where there isn't room for it anyway.

Added 3 more lessons: Modern Authentication: Passwordless and Passkeys
(Domain 4 — FIDO2/WebAuthn, why public-key-based passkeys resist phishing
in a way OTP-based MFA doesn't), Incident Response Communication and
Reporting (Domain 4 — stakeholder notification, escalation paths, and
post-incident report structure, extending the flagship IR lesson's
technical phases into the human/organizational side), and Penetration
Testing: Black Box, White Box, and Gray Box (Domain 5 — tester knowledge
levels, plus passive vs. active reconnaissance and OSINT, extending the
existing red/blue/purple team coverage). Domain lesson count: 51 → 54;
Pro Tips: 63 → 66.

**Verified live**: reproduced the search-modal bug with a screenshot and a
`getComputedStyle` check both before and after the fix (`display: flex`
with `hidden=true` → `display: none` with `hidden=true`), then confirmed
all three close paths (close button, Escape key, backdrop click) still
correctly hide it after the fix; swept all 10 labs in one script confirming
every lab's rendered choice count matches its data; ran a full Exam
Simulation quiz confirming no feedback leaks before the final question and
the timer displays correctly; ran a practice quiz that intentionally missed
2 questions, confirmed both appeared in the Missed Questions scope, then
answered both correctly in a follow-up quiz and confirmed both were removed
from `state.missedQuestions` immediately; verified Taglish-off actually
removes Taglish content from a rendered lesson page, not just the stored
flag; and confirmed the mobile topbar fix with a fresh 375px screenshot.
`node --check` passed on every JS file and the CSS brace count balances
(219 open, 219 close). No console errors were observed at any point in this
pass.

## Seventh follow-up pass: 3 more lessons + a clean audit (no new bugs found)

Started with a full pre-flight audit (syntax check on every JS file, lesson
ID/Pro Tip cross-reference, question/lab/glossary duplicate checks) to
confirm the prior pass's bug fixes held before adding anything — all clean,
zero regressions.

Added 3 more lessons closing genuinely untested vocabulary gaps: Authentication
Protocols: Kerberos, LDAP, RADIUS, and TACACS+ (Domain 4 — KDC/TGT ticket
flow, and the RADIUS-vs-TACACS+ distinction the exam tests directly: network
access AAA vs. administrative device AAA, password-only vs. full-packet
encryption), Firewall Generations and Specialized Security Devices (Domain 3
— packet-filtering → stateful → NGFW progression, plus WAF and UTM as
distinct specialized variants, not synonyms for a general firewall), and
Data Loss Prevention: How Detection Actually Works (Domain 3 — network vs.
endpoint vs. cloud DLP, and pattern matching vs. data fingerprinting as
detection methods, since the earlier Data Protection lesson only introduced
DLP as a concept without these operational details). Domain lesson count:
54 → 57; Pro Tips: 66 → 69.

**Verified live**: re-ran the full duplicate-ID/missing-field/orphan-Pro-Tip
validation script (clean), confirmed the search-modal `[hidden]` fix from
the prior pass still holds (`display: none` on load, unaffected by the new
content), opened all 3 new lessons in-browser and confirmed each renders
its full section set (11–12 sections, difference explained by which lessons
include an optional visual-summary table) with zero CJK-character
artifacts, confirmed the Cram Sheet renders exactly 69 Pro Tip boxes
matching the data file, confirmed the Dashboard's lesson-completion count
auto-updated 66→69 with no code change, and ran a 27-question randomized D3
quiz end-to-end with no console errors. `node --check` passed on every JS
file.

## Eighth follow-up pass: Quick Summaries, an Acronyms reference page, a swipeable focused lesson reader, and 4 more lessons

The user asked for three things together: more lessons, "simplify, add
acronyms and things I need to know," and a swipe-left/right way to move
between lessons. Scope was confirmed with the user up front rather than
guessed: simpler wording via a new one-line Quick Summary on every lesson
(not a rewrite of the existing prose, which was judged too large and
error-prone to safely redo in one pass — flagged explicitly rather than
silently skipped), a dedicated Acronyms page separate from the Glossary,
a new full-page single-lesson reader with swipe/arrow-key/button
navigation (not swipe inside the existing accordions), and 3-4 new
gap-driven lessons.

**Quick Summaries** (`js/data-quicksummaries.js`, new file): a one-to-two
sentence "In One Breath" plain-English summary for all 73 lessons (12
fundamentals + 61 domain lessons after this pass), looked up by lesson id
via `QUICK_SUMMARIES[lesson.id]` — following the same lookup-table
pattern as `data-protips.js`, so the large `data-domains.js`/
`data-fundamentals.js` files didn't need per-object edits. Rendered as a
green highlighted box at the top of every lesson card, before the
numbered section breakdown, in `lessonBodyHtml()` and `fundamentalCard()`.

**Acronyms page** (`js/data-acronyms.js`, new file; `#/acronyms` route):
216 Security+-relevant acronyms, each with its exact expansion and a
one-line plain-English meaning, alphabetically grouped with a live search
box — the same UI pattern as the Glossary, reused rather than
reinvented. Ambiguous acronyms with two real meanings (MAC, SMB) are
disambiguated directly in the entry rather than picking one and being
wrong half the time.

**Focused lesson reader** (`#/lesson/<id>` route, `renderLessonFocus()`
in `app.js`): a distraction-free, one-lesson-at-a-time view reusing the
existing `lessonBodyHtml()` renderer for domain lessons, with a parallel
body for fundamentals topics (which use a different data shape).
Navigation works three ways: Previous/Next buttons, left/right arrow
keys (global listener, scoped to the `lesson` route and skipped while a
text input/textarea has focus so it doesn't hijack typing), and a real
touch swipe gesture (`touchstart`/`touchend`, 60px horizontal threshold,
requires horizontal motion to dominate vertical so it doesn't fight
page scrolling). Lesson order is fundamentals-then-domains-in-sequence,
reusing the existing `allLessonIds()` helper so it stays in sync with
the live lesson count automatically. An "open in focused reader" icon
button was added to every lesson card (flagship, topic, and
fundamentals) and wired up; the global search modal's lesson results now
open this reader directly instead of scrolling to an accordion.
Accordion-based browsing on the Domain and Fundamentals pages was left
completely unchanged — the reader is an additional way in, not a
replacement.

Added 4 more lessons closing real remaining gaps: Insider Threats and
Shadow IT (Domain 2 — malicious/negligent/compromised insider categories,
distinct from unapproved-tool shadow IT), Data Classification, Roles,
and Sanitization (Domain 3 — data owner/controller/processor/custodian
roles and the clear/purge/destroy sanitization hierarchy), Cloud
Security and the Shared Responsibility Model (Domain 3 — the IaaS/PaaS/
SaaS responsibility split, which the existing Architecture Models lesson
only touched on generally), and Account and Identity Lifecycle
Management (Domain 4 — account types, provisioning/recertification/
deprovisioning, and privilege creep, extending the existing IAM lesson's
conceptual coverage into practical account-management detail). Domain
lesson count: 57 → 61; Pro Tips: 69 → 73.

**Verified live**: a purpose-built Node validation script (checked into
the session, not the repo) confirmed all 73 lesson ids are unique, every
domain lesson and fundamentals topic has all required fields non-empty,
every lesson has exactly one Pro Tip and exactly one Quick Summary (no
orphans, no gaps), all 216 acronym entries are unique and complete, and
a CJK-character scan (the specific bug class caught in an earlier pass)
found nothing across all lesson text, quick summaries, and acronym
entries. `node --check` passed on every JS file. Live in-browser: opened
all 4 new lessons in both the accordion view and the new focused reader
with zero console errors; confirmed the Acronyms page renders and its
search filters correctly in dark mode; confirmed the focused reader's
Lesson 1 of 73 and Lesson 73 of 73 boundaries correctly disable
Previous/Next respectively; confirmed Previous/Next button clicks and
both ArrowLeft/ArrowRight keys navigate correctly; dispatched synthetic
`touchstart`/`touchend` events confirming both swipe directions navigate
correctly; confirmed the global search modal opens a lesson result
directly into the focused reader; confirmed the Dashboard's lesson-
completion denominator auto-updated 69→73 and the Cram Sheet's Pro Tip
count auto-updated 69→73, both with no code change, since they're
computed from the data; and confirmed the focused reader's layout at
375px mobile width with no horizontal scroll and side-by-side Previous/
Next buttons.

## Still open

Matching/ordering/drag-drop question types, a per-lesson knowledge-check
gate (vs. the current domain-scoped Practice Center), 4-/8-/12-week plan
variants, and an automated test suite remain not built — see the "Known
gaps" section above for the full list and reasoning. The question bank
(162) and glossary (137) still don't cover the newest lessons
specifically — that remains the most natural next content addition. The
diagnostic-assessment gap noted in earlier passes is now partially
addressed by the Fundamentals Check quiz scope, though a distinct
20-question diagnostic (as the brief originally specified) still isn't
built as its own thing. The Quick Summary added this pass is new,
plain-English text rather than a rewrite of each lesson's existing
"Simple Explanation" prose — a full simplification rewrite of all 61
domain lessons' existing text was judged too large to do reliably in one
pass and was deliberately scoped down; it remains a candidate for a
future dedicated pass if the Quick Summary line alone isn't enough.

## Ninth follow-up pass: 6 more lessons closing real remaining gaps

The user asked to keep adding lessons generally ("teach me everything I
need to learn") rather than naming specific topics, so this pass started
by auditing the existing 61 domain lessons against the SY0-701 objective
list to find genuine gaps, specifically checking each candidate topic
against existing lesson content first to avoid adding anything redundant
with what's already taught (a few strong candidates were dropped for
exactly this reason — a "Risk Management Deep Dive" idea was scrapped
once grep confirmed the flagship Risk Management lesson already covers
the risk register and qualitative-vs-quantitative distinction in full).

Added 6 new lessons, each an explicit deeper extension of an existing
lesson rather than a duplicate of it: Application and Memory-Based
Attacks in Depth (Domain 2 — buffer overflow stack/heap mechanics, race
conditions named specifically as TOCTOU, and memory/DLL injection as a
detection-evasion technique, extending the one-sentence-each treatment
in the Vulnerabilities lesson), On-Path and Layer 2 Network Attacks
(Domain 2 — ARP poisoning, MAC flooding/CAM table exhaustion, DNS
spoofing, and DHCP starvation chained with a rogue DHCP server, extending
Malicious Activity's general network-attack coverage), Segmentation in
Practice: Screened Subnets, Air Gaps, and Microsegmentation (Domain 3 —
naming and distinguishing the specific isolation techniques only
mentioned in passing by the Defense in Depth flagship and Enterprise
Infrastructure Extras), Backup Strategies and Capacity Planning (Domain
3 — full/incremental/differential backup types, the 3-2-1 rule, and
immutable/offline backups as the actual ransomware defense, a genuinely
absent topic since "backup" was previously only ever mentioned in
passing, never as its own lesson), Monitoring and Assessment Tool
Categories (Domain 4 — SCAP, benchmarks, and agent-based vs. agentless
scanning, extending Alerting and Monitoring's SIEM/SOAR/NetFlow coverage
with the configuration-compliance and vulnerability-scanning tooling
side), and Risk Assessment Types, Exposure Factor, and Risk Appetite
(Domain 5 — how SLE is actually derived from Asset Value x Exposure
Factor, risk assessment frequency types, and the appetite/tolerance/
threshold/exemption/exception vocabulary the flagship doesn't cover,
filling the previously-unused d5-t2 id). Domain lesson count: 61 → 67
(d2: 10→12, d3: 12→14, d4: 17→18, d5: 8→9); Pro Tips: 73 → 79; Quick
Summaries: 73 → 79.

**Verified live**: the Node validation script was extended with
structural checks on `confusion`/`keyTerms`/`table` shape (catching
malformed entries, not just missing fields) and a broadened non-Latin-
script scan covering Cyrillic, Hebrew, Arabic, and Hangul ranges in
addition to the existing CJK check — worth doing since a stray Cyrillic
character was caught and fixed in this pass's own Taglish draft text
before it ever reached the file, the same class of input-method slip
caught by the CJK scanner in an earlier pass. The extended script
confirmed all 79 lessons have zero missing/malformed fields, zero
duplicate ids, zero missing/orphaned Pro Tips or Quick Summaries across
all 79 lesson ids, and zero non-Latin-script artifacts anywhere in lesson
content, Quick Summaries, Pro Tips, or the acronym list. `node --check`
passed on every changed JS file. Live in-browser: swept all 95 routes
(16 static pages + all 79 lessons via the focused reader) confirming
real rendered content and zero console errors on every one; confirmed
all 6 new lessons render their Quick Summary, Pro Tip, and comparison
table correctly both in the focused reader and in their domain page's
accordion view; and confirmed the Dashboard's lesson-completion
denominator and the Cram Sheet's Pro Tip count both auto-updated from 73
to 79 with no code change, since both are computed from the data.
