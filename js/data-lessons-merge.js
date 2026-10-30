/* Folds every lesson bundle registered on globalThis.__DEEP (see the
   data-lessons-deep-*.js and data-lessons-more-*.js files) into DOMAINS,
   PRO_TIPS, QUICK_SUMMARIES, QUESTIONS, GLOSSARY and ACRONYMS.
   Must load AFTER all bundle files and BEFORE app.js.

   A lesson whose id already exists is NOT added silently: it is reported on
   the console so ID collisions between contributors are never invisible. */

(function () {
  "use strict";

  const sortKey = (domain, lesson) => {
    const m = /^(\d+)\.(\d+)$/.exec(lesson.tag || "");
    if (!m || parseInt(m[1], 10) !== domain.number) return 9999;
    return parseInt(m[2], 10);
  };

  const existing = new Set();
  DOMAINS.forEach((d) => [d.flagship, ...d.topics].forEach((l) => existing.add(l.id)));

  (globalThis.__DEEP || []).forEach((bundle) => {
    DOMAINS.forEach((d) => {
      (bundle.lessons[d.id] || []).forEach((l) => {
        if (existing.has(l.id)) {
          console.warn("[lessons] duplicate lesson id skipped: " + l.id + " (" + l.title + ")");
          return;
        }
        existing.add(l.id);
        d.topics.push(l);
      });
    });
    Object.assign(PRO_TIPS, bundle.tips || {});
    Object.assign(QUICK_SUMMARIES, bundle.summaries || {});
    (bundle.questions || []).forEach((q) => { if (!QUESTIONS.some((x) => x.id === q.id)) QUESTIONS.push(q); });
    (bundle.glossary || []).forEach((g) => { if (!GLOSSARY.some((x) => x.term.toLowerCase() === g.term.toLowerCase())) GLOSSARY.push(g); });
    (bundle.acronyms || []).forEach((a) => { if (!ACRONYMS.some((x) => x.acro === a.acro)) ACRONYMS.push(a); });
  });
  globalThis.__DEEP = [];

  DOMAINS.forEach((d) => {
    d.topics = d.topics
      .map((t, i) => ({ t, i, k: sortKey(d, t) }))
      .sort((a, b) => a.k - b.k || a.i - b.i)
      .map((x) => x.t);
  });
  ACRONYMS.sort((a, b) => a.acro.localeCompare(b.acro, undefined, { sensitivity: "base" }));
})();
