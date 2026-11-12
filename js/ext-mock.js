/* Mock exam simulator (#/mock). Mirrors the real exam's shape: domain-weighted
   questions (12/22/18/28/20), performance-based tasks first, a countdown, a
   question navigator with "mark for review", a review screen before
   submitting, and a results report by domain and objective.

   Scoring note: CompTIA does not publish how it scales scores, so the 100-900
   figure here is only an ESTIMATE (linear from the raw percentage, with each
   performance-based task worth three multiple-choice questions). Use it to
   track trend, not as a promise. */

(function () {
  "use strict";

  const A = window.SECAPP;
  const esc = A.escapeHtml;
  const WEIGHTS = { d1: 12, d2: 22, d3: 18, d4: 28, d5: 20 };
  const PBQ_WEIGHT = 3;
  const PASS_RAW = 0.81; // ~750 on a linear 100-900 estimate

  const MODES = [
    { id: "full", label: "Full exam", questions: 90, pbq: 5, minutes: 90, blurb: "90 items, 90 minutes: 5 performance-based tasks first, then multiple choice." },
    { id: "half", label: "Half exam", questions: 45, pbq: 3, minutes: 45, blurb: "45 items, 45 minutes. A good weekly checkpoint." },
    { id: "quick", label: "Quick check", questions: 20, pbq: 2, minutes: 25, blurb: "20 items, 25 minutes. For a short session." }
  ];

  let mock = null;

  /* ---------- building the exam ---------- */

  function allocate(total) {
    const ds = Object.keys(WEIGHTS);
    const counts = {};
    let used = 0;
    ds.forEach((d) => { counts[d] = Math.floor((total * WEIGHTS[d]) / 100); used += counts[d]; });
    const order = ds.slice().sort((a, b) => WEIGHTS[b] - WEIGHTS[a]);
    for (let i = 0; used < total; i = (i + 1) % order.length) { counts[order[i]]++; used++; }
    return counts;
  }

  function buildExam(mode) {
    const mcqTotal = mode.questions - mode.pbq;
    const counts = allocate(mcqTotal);
    const chosen = [];
    const usedIds = {};
    Object.keys(counts).forEach((d) => {
      const pool = A.shuffle(QUESTIONS.filter((q) => q.domainId === d));
      pool.slice(0, counts[d]).forEach((q) => { chosen.push(q); usedIds[q.id] = true; });
    });
    if (chosen.length < mcqTotal) {
      const rest = A.shuffle(QUESTIONS.filter((q) => q.domainId !== "fund" && !usedIds[q.id]));
      rest.slice(0, mcqTotal - chosen.length).forEach((q) => chosen.push(q));
    }
    const mcq = A.shuffle(chosen).map((q) => ({ kind: "q", id: q.id, q: Object.assign({}, q, { choices: A.shuffle(q.choices) }) }));
    const tasks = A.shuffle((window.PBQ ? PBQ.tasks() : []).slice());
    const picked = [];
    const seenTypes = {};
    tasks.forEach((t) => { if (picked.length < mode.pbq && !seenTypes[t.type]) { picked.push(t); seenTypes[t.type] = true; } });
    tasks.forEach((t) => { if (picked.length < mode.pbq && picked.indexOf(t) === -1) picked.push(t); });
    const pbqs = picked.map((t) => ({ kind: "pbq", id: t.id, task: t }));
    const items = pbqs.concat(mcq);
    const now = Date.now();
    return {
      phase: "run", mode: mode, items: items, index: 0, answers: {}, flags: {},
      startedAt: now, deadline: now + mode.minutes * 60000, timerHandle: null, result: null
    };
  }

  /* ---------- grading ---------- */

  function gradeMcq(q, picked) {
    const correct = Array.isArray(q.correct) ? q.correct.slice().sort() : [q.correct];
    return JSON.stringify(correct) === JSON.stringify((picked || []).slice().sort());
  }

  function itemDomain(it) {
    if (it.kind === "q") return it.q.domainId;
    return "d" + (it.task.objective || "1").charAt(0);
  }

  function itemObjective(it) {
    if (it.kind === "q") return A.objectiveOfLesson(it.q.tag);
    return it.task.objective || null;
  }

  function computeResult(m) {
    let earned = 0;
    let possible = 0;
    const perDomain = {};
    const perObj = {};
    const rows = m.items.map((it) => {
      let score;
      let weight;
      if (it.kind === "q") {
        const ans = m.answers[it.id];
        score = gradeMcq(it.q, ans ? ans.picked : []) ? 1 : 0;
        weight = 1;
      } else {
        const res = PBQ.grade(it.task, m.answers[it.id]);
        score = res.score;
        weight = PBQ_WEIGHT;
        it.res = res;
      }
      earned += score * weight;
      possible += weight;
      const d = itemDomain(it);
      perDomain[d] = perDomain[d] || { earned: 0, possible: 0 };
      perDomain[d].earned += score * weight;
      perDomain[d].possible += weight;
      const o = itemObjective(it);
      if (o) { perObj[o] = perObj[o] || { earned: 0, possible: 0, n: 0 }; perObj[o].earned += score * weight; perObj[o].possible += weight; perObj[o].n++; }
      return { it: it, score: score, weight: weight };
    });
    const raw = possible ? earned / possible : 0;
    return { rows: rows, raw: raw, est: Math.round(100 + 800 * raw), perDomain: perDomain, perObj: perObj, earned: earned, possible: possible };
  }

  function finishExam(auto) {
    if (!mock || mock.phase === "results") return;
    if (mock.timerHandle) clearInterval(mock.timerHandle);
    mock.timerHandle = null;
    const r = computeResult(mock);
    mock.result = r;
    mock.phase = "results";
    mock.autoSubmitted = !!auto;
    const S = A.state;
    // Update missed-question memory and per-question stats (multiple-choice only).
    r.rows.forEach((row) => {
      if (row.it.kind !== "q") return;
      const st = S.qStats[row.it.id] || { r: 0, w: 0 };
      if (row.score === 1) { st.r++; delete S.missedQuestions[row.it.id]; } else { st.w++; S.missedQuestions[row.it.id] = true; }
      S.qStats[row.it.id] = st;
    });
    const seconds = Math.round((Math.min(Date.now(), mock.deadline) - mock.startedAt) / 1000);
    const breakdown = {};
    Object.keys(r.perDomain).forEach((d) => { breakdown[d] = { correct: Math.round(r.perDomain[d].earned * 10) / 10, total: r.perDomain[d].possible }; });
    S.mockHistory.push({ date: Date.now(), mode: mock.mode.id, items: mock.items.length, raw: r.raw, est: r.est, seconds: seconds, perDomain: breakdown });
    S.quizHistory.push({ date: Date.now(), scopeKey: "mock", mode: "exam", correct: Math.round(r.raw * mock.items.length), total: mock.items.length, timeSeconds: seconds, domainBreakdown: breakdown });
    A.recordActivity();
    A.saveState();
    A.render();
  }

  /* ---------- timer ---------- */

  function startTimer() {
    if (!mock || mock.timerHandle) return;
    const ref = mock;
    ref.timerHandle = setInterval(() => {
      if (mock !== ref || ref.phase === "results") { clearInterval(ref.timerHandle); return; }
      const left = Math.max(0, Math.round((ref.deadline - Date.now()) / 1000));
      const d = document.getElementById("mk-timer");
      if (d) { d.textContent = A.formatTime(left); d.classList.toggle("low", left <= 600); }
      if (left <= 0) finishExam(true);
    }, 1000);
  }

  function secondsLeft() { return Math.max(0, Math.round((mock.deadline - Date.now()) / 1000)); }

  /* ---------- screens ---------- */

  function renderMock() {
    const wrap = A.el("<div></div>");
    if (!mock) return renderSetup(wrap);
    if (mock.phase === "results") return renderResults(wrap);
    if (mock.phase === "review") return renderReview(wrap);
    return renderRun(wrap);
  }

  function renderSetup(wrap) {
    const hist = A.state.mockHistory.slice(-6).reverse();
    wrap.innerHTML =
      '<div class="eyebrow">Mock Exam</div><h1>Take a timed mock exam</h1>' +
      '<p class="lede">The same shape as the real test: questions weighted by domain (12 / 22 / 18 / 28 / 20), performance-based tasks first, a countdown, and a review screen before you submit. No feedback until the end. Treat it seriously: find a quiet hour, close other tabs, and do not look anything up.</p>' +
      '<div class="path-grid">' + MODES.map((m) => (
        '<div class="path-card"><div class="path-card-head"><h3>' + esc(m.label) + "</h3></div><p>" + esc(m.blurb) + "</p>" +
        '<div class="path-meta"><span class="tag">' + m.questions + ' items</span><span class="tag">' + m.minutes + ' min</span><span class="tag">' + m.pbq + ' PBQ</span></div>' +
        '<div class="btn-row"><button class="btn btn-primary" data-mock-start="' + m.id + '">Start ' + esc(m.label.toLowerCase()) + "</button></div></div>"
      )).join("") + "</div>" +
      '<div class="card" style="margin-top:6px;"><h3 style="margin-top:0;">About the score</h3><p style="margin-bottom:0;">CompTIA does not publish how it scales scores (100 to 900, 750 to pass). This tool estimates a score from your raw percentage, counting each performance-based task as three questions. Use it to track your trend. Aim to score 85% or better, consistently, before you book the exam.</p></div>' +
      '<div class="card"><h3 style="margin-top:0;">Your recent mock exams</h3>' +
      (hist.length ? '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Mode</th><th>Raw %</th><th>Estimated score</th><th>Time</th></tr></thead><tbody>' +
        hist.map((h) => "<tr><td>" + esc(new Date(h.date).toLocaleDateString()) + "</td><td>" + esc(h.mode) + "</td><td>" + Math.round(h.raw * 100) + "%</td><td>" + h.est + "</td><td>" + A.formatTime(h.seconds) + "</td></tr>").join("") + "</tbody></table></div>"
        : '<p class="lede" style="margin:0;">No mock exams yet.</p>') + "</div>";
    wrap.querySelectorAll("[data-mock-start]").forEach((b) => b.addEventListener("click", () => {
      mock = buildExam(MODES.find((m) => m.id === b.getAttribute("data-mock-start")));
      startTimer();
      A.render();
    }));
    return wrap;
  }

  function navigatorHtml() {
    return '<div class="mk-nav" role="navigation" aria-label="Question navigator">' + mock.items.map((it, i) => {
      const ans = mock.answers[it.id];
      const answered = it.kind === "q" ? !!(ans && ans.picked && ans.picked.length) : PBQ.isAnswered(it.task, ans);
      return '<button class="mk-dot' + (answered ? " answered" : "") + (mock.flags[it.id] ? " flagged" : "") + (i === mock.index ? " current" : "") + (it.kind === "pbq" ? " pbq" : "") + '" data-mk-go="' + i + '" aria-label="Item ' + (i + 1) + (it.kind === "pbq" ? " (performance-based)" : "") + (answered ? ", answered" : ", unanswered") + (mock.flags[it.id] ? ", marked for review" : "") + '">' + (i + 1) + "</button>";
    }).join("") + "</div>";
  }

  function topBarHtml() {
    const left = secondsLeft();
    const answered = mock.items.filter((it) => { const a = mock.answers[it.id]; return it.kind === "q" ? !!(a && a.picked && a.picked.length) : PBQ.isAnswered(it.task, a); }).length;
    return '<div class="mk-top"><div><b>' + esc(mock.mode.label) + '</b> &middot; ' + answered + " / " + mock.items.length + ' answered</div><div class="mk-time"><span id="mk-timer" class="mk-timer' + (left <= 600 ? " low" : "") + '">' + A.formatTime(left) + '</span><button class="btn btn-sm" id="mk-review">Review and submit</button></div></div>';
  }

  function bindNav(wrap) {
    wrap.querySelectorAll("[data-mk-go]").forEach((b) => b.addEventListener("click", () => { mock.index = parseInt(b.getAttribute("data-mk-go"), 10); mock.phase = "run"; A.render(); }));
    const rv = wrap.querySelector("#mk-review");
    if (rv) rv.addEventListener("click", () => { mock.phase = "review"; A.render(); });
  }

  function renderRun(wrap) {
    const it = mock.items[mock.index];
    const total = mock.items.length;
    const flagged = !!mock.flags[it.id];
    wrap.innerHTML =
      topBarHtml() + navigatorHtml() +
      '<div class="card mk-card"><div class="mk-qhead"><span class="tag' + (it.kind === "pbq" ? " tag-violet" : "") + '">' + (it.kind === "pbq" ? "Performance-based" : "Question") + " " + (mock.index + 1) + " of " + total + "</span>" +
      '<button class="btn btn-sm' + (flagged ? " btn-primary" : "") + '" id="mk-flag" aria-pressed="' + flagged + '">' + (flagged ? "Marked for review" : "Mark for review") + " <kbd>F</kbd></button></div>" +
      '<div id="mk-body"></div>' +
      '<div class="btn-row" style="justify-content:space-between;margin-top:18px;"><button class="btn" id="mk-prev"' + (mock.index === 0 ? " disabled" : "") + '>Previous</button>' +
      '<button class="btn btn-primary" id="mk-next">' + (mock.index === total - 1 ? "Review and submit" : "Next") + "</button></div></div>" +
      '<div class="lesson-focus-hint"><kbd>&larr;</kbd> <kbd>&rarr;</kbd> move &middot; <kbd>1</kbd>-<kbd>4</kbd> choose &middot; <kbd>F</kbd> mark for review</div>';

    const body = wrap.querySelector("#mk-body");
    if (it.kind === "q") {
      const q = it.q;
      const picked = (mock.answers[it.id] && mock.answers[it.id].picked) || [];
      body.innerHTML = '<h3 style="margin-top:0;">' + esc(q.prompt) + "</h3>" + (q.type === "multi" ? '<p class="pbq-instr">Select all that apply.</p>' : "") +
        q.choices.map((c, i) => '<label class="quiz-choice' + (picked.indexOf(c.id) !== -1 ? " selected" : "") + '"><input type="' + (q.type === "multi" ? "checkbox" : "radio") + '"' + (picked.indexOf(c.id) !== -1 ? " checked" : "") + '><span><b class="mk-letter">' + String.fromCharCode(65 + i) + ".</b> " + esc(c.text) + "</span></label>").join("");
      body.querySelectorAll(".quiz-choice").forEach((row, i) => row.addEventListener("click", (ev) => { ev.preventDefault(); choose(it, q.choices[i].id); }));
    } else {
      body.innerHTML = '<h3 style="margin-top:0;">' + esc(it.task.title) + "</h3>" + String(it.task.scenario).split("\n").map((p) => "<p>" + esc(p) + "</p>").join("") + '<div id="mk-pbq"></div>';
      if (!mock.answers[it.id]) mock.answers[it.id] = PBQ.initAnswer(it.task);
      PBQ.mount(it.task, body.querySelector("#mk-pbq"), mock.answers[it.id], { onChange: () => refreshNavigator(wrap) });
    }
    bindNav(wrap);
    wrap.querySelector("#mk-flag").addEventListener("click", toggleFlag);
    wrap.querySelector("#mk-prev").addEventListener("click", () => step(-1));
    wrap.querySelector("#mk-next").addEventListener("click", () => step(1));
    return wrap;
  }

  function refreshNavigator(wrap) {
    const nav = wrap.querySelector(".mk-nav");
    if (!nav) return;
    const fresh = A.el(navigatorHtml());
    nav.replaceWith(fresh);
    fresh.querySelectorAll("[data-mk-go]").forEach((b) => b.addEventListener("click", () => { mock.index = parseInt(b.getAttribute("data-mk-go"), 10); A.render(); }));
  }

  function choose(it, id) {
    const q = it.q;
    const ans = mock.answers[it.id] || { picked: [] };
    if (q.type === "multi") {
      const i = ans.picked.indexOf(id);
      if (i === -1) ans.picked.push(id); else ans.picked.splice(i, 1);
    } else {
      ans.picked = [id];
    }
    mock.answers[it.id] = ans;
    A.render({ keepScroll: true });
  }

  function toggleFlag() {
    const it = mock.items[mock.index];
    if (mock.flags[it.id]) delete mock.flags[it.id]; else mock.flags[it.id] = true;
    A.render({ keepScroll: true });
  }

  function step(delta) {
    const n = mock.index + delta;
    if (n < 0) return;
    if (n >= mock.items.length) { mock.phase = "review"; A.render(); return; }
    mock.index = n;
    A.render();
  }

  function renderReview(wrap) {
    const items = mock.items;
    const stat = items.map((it, i) => {
      const a = mock.answers[it.id];
      const answered = it.kind === "q" ? !!(a && a.picked && a.picked.length) : PBQ.isAnswered(it.task, a);
      return { it: it, i: i, answered: answered, flagged: !!mock.flags[it.id] };
    });
    const un = stat.filter((s) => !s.answered).length;
    const fl = stat.filter((s) => s.flagged).length;
    wrap.innerHTML =
      topBarHtml() +
      "<h1>Review your answers</h1>" +
      '<p class="lede">' + (un ? '<b style="color:var(--red);">' + un + " unanswered.</b> " : "All items answered. ") + (fl ? fl + " marked for review. " : "") + "Select any item to go back to it. When you submit, the exam is over and you cannot change answers.</p>" +
      navigatorHtml() +
      '<div class="lesson-list" style="margin-top:14px;">' +
      stat.filter((s) => !s.answered || s.flagged).map((s) => '<div class="lesson-list-item" data-mk-go="' + s.i + '" tabindex="0" role="link"><span class="ll-num">' + String(s.i + 1).padStart(2, "0") + '</span><div class="ll-main"><div class="ll-title">' + esc(s.it.kind === "q" ? s.it.q.prompt.slice(0, 110) + (s.it.q.prompt.length > 110 ? "..." : "") : s.it.task.title) + '</div></div><div class="ll-meta">' +
        (!s.answered ? '<span class="tag tag-amber">Unanswered</span>' : "") + (s.flagged ? '<span class="tag tag-violet">Marked</span>' : "") + "</div></div>").join("") +
      (un || fl ? "" : '<div class="lesson-list-item"><div class="ll-main"><div class="ll-title">Nothing needs attention.</div></div></div>') + "</div>" +
      '<div class="btn-row"><button class="btn" id="mk-back">Back to the exam</button><button class="btn btn-primary" id="mk-submit">Submit exam</button></div>';
    bindNav(wrap);
    wrap.querySelectorAll(".lesson-list-item[data-mk-go]").forEach((n) => n.addEventListener("keydown", (e) => { if (e.key === "Enter") n.click(); }));
    wrap.querySelector("#mk-back").addEventListener("click", () => { mock.phase = "run"; A.render(); });
    wrap.querySelector("#mk-submit").addEventListener("click", () => {
      if (un && !window.confirm(un + " item" + (un === 1 ? " is" : "s are") + " unanswered. Submit anyway?")) return;
      finishExam(false);
    });
    return wrap;
  }

  function renderResults(wrap) {
    const r = mock.result;
    const pct = Math.round(r.raw * 100);
    const verdict = r.raw >= PASS_RAW + 0.04 ? ["Likely pass", "good"] : r.raw >= PASS_RAW - 0.04 ? ["Borderline", "mid"] : ["Below the pass line", "low"];
    const domRows = Object.keys(WEIGHTS).map((d) => {
      const p = r.perDomain[d];
      const dp = p && p.possible ? Math.round((p.earned / p.possible) * 100) : null;
      return '<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;font-size:14px;"><span><span class="domain-badge" style="--domain-color:' + A.DOMAIN_COLORS[d] + ';">' + d.toUpperCase() + "</span> " + esc(A.domainById(d).title) + ' <span class="tag">' + WEIGHTS[d] + "% of exam</span></span><b>" + (dp === null ? "no items" : dp + "%") + "</b></div>" + (dp === null ? "" : A.progressBar(dp)) + "</div>";
    }).join("");
    const objs = Object.keys(r.perObj).map((o) => ({ o: o, p: r.perObj[o], pct: r.perObj[o].earned / r.perObj[o].possible })).filter((x) => x.p.n >= 2).sort((a, b) => a.pct - b.pct).slice(0, 6);
    const missed = r.rows.filter((row) => row.score < 1);
    wrap.innerHTML =
      '<div class="eyebrow">Mock Exam Results' + (mock.autoSubmitted ? " &middot; time expired" : "") + "</div>" +
      '<div class="resume"><div><h1 style="margin:0 0 6px;">Estimated score: ' + r.est + "</h1><p>" + pct + "% raw &middot; " + A.formatTime(Math.round((Math.min(Date.now(), mock.deadline) - mock.startedAt) / 1000)) + ' used &middot; <span class="pbq-score ' + verdict[1] + '" style="display:inline-block;font-size:14px;padding:2px 10px;">' + verdict[0] + "</span></p>" +
      '<p style="margin:0;font-size:13.5px;">The pass mark is 750. This estimate assumes a linear scale, which CompTIA does not publish, so use it for trend, not prediction. Aim for 85% raw, repeatedly.</p></div></div>' +
      '<div class="card"><h3 style="margin-top:0;">By domain</h3>' + domRows + "</div>" +
      '<div class="card"><h3 style="margin-top:0;">Weakest objectives in this exam</h3>' +
      (objs.length ? objs.map((x) => {
        const o = A.objectiveById(x.o);
        return '<div class="cram-item" style="display:flex;justify-content:space-between;align-items:center;gap:10px;"><div><b>' + esc(x.o) + "</b> " + esc(o ? o.title : "") + '<div style="font-size:12.5px;color:var(--text-muted);">' + Math.round(x.pct * 100) + "% on " + x.p.n + ' items</div></div><div class="btn-row" style="margin:0;"><button class="btn btn-sm" data-open-obj="' + x.o + '">Study</button><button class="btn btn-sm" data-practice-scope="obj:' + x.o + '">Practice</button></div></div>';
      }).join("") : '<p style="margin:0;">Not enough items per objective to rank.</p>') + "</div>" +
      '<div class="btn-row"><button class="btn btn-primary" id="mk-again">Take another mock exam</button><button class="btn" id="mk-showmissed">' + (missed.length ? "Review " + missed.length + " missed item" + (missed.length === 1 ? "" : "s") : "Review answers") + '</button><button class="btn" data-goto-paths>Study paths</button></div>' +
      '<div id="mk-missed"></div>';

    wrap.querySelectorAll("[data-practice-scope]").forEach((b) => b.addEventListener("click", () => { A.setQuizScope(b.getAttribute("data-practice-scope")); A.navigate("practice"); }));
    wrap.querySelectorAll("[data-open-obj]").forEach((b) => b.addEventListener("click", () => {
      const recs = A.lessonRecords().filter((x) => x.obj === b.getAttribute("data-open-obj"));
      if (recs[0]) A.navigate("lesson", (recs.find((x) => !A.state.completedLessons[x.id]) || recs[0]).id);
    }));
    wrap.querySelector("[data-goto-paths]").addEventListener("click", () => A.navigate("paths"));
    wrap.querySelector("#mk-again").addEventListener("click", () => { mock = null; A.render(); });
    wrap.querySelector("#mk-showmissed").addEventListener("click", () => {
      const box = wrap.querySelector("#mk-missed");
      if (box.innerHTML) { box.innerHTML = ""; return; }
      const rows = missed.length ? missed : r.rows;
      box.innerHTML = rows.map((row, n) => {
        const it = row.it;
        if (it.kind === "pbq") {
          return '<div class="card"><b>Performance-based: ' + esc(it.task.title) + "</b> (" + Math.round(row.score * 100) + "%)" + PBQ.feedbackHtml(it.task, it.res) + "</div>";
        }
        const q = it.q;
        const picked = (mock.answers[it.id] && mock.answers[it.id].picked) || [];
        return '<div class="card"><b>' + esc(q.prompt) + "</b><div style=\"margin-top:8px;\">" + q.choices.map((c) => {
          const good = Array.isArray(q.correct) ? q.correct.indexOf(c.id) !== -1 : q.correct === c.id;
          const was = picked.indexOf(c.id) !== -1;
          return '<div class="quiz-choice ' + (good ? "correct" : was ? "incorrect" : "") + '">' + esc(c.text) + (was ? " (your answer)" : "") + "</div>";
        }).join("") + '</div><div class="quiz-explanation ' + (row.score === 1 ? "correct" : "incorrect") + '">' + esc(q.explanation) + "</div></div>";
      }).join("");
    });
    return wrap;
  }

  /* ---------- keyboard ---------- */

  A.keyHandlers.push(function (e) {
    if (A.parseHash().route !== "mock" || !mock || mock.phase !== "run") return false;
    const it = mock.items[mock.index];
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); return true; }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); return true; }
    if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFlag(); return true; }
    if (it.kind === "q" && /^[1-4]$/.test(e.key)) {
      const c = it.q.choices[parseInt(e.key, 10) - 1];
      if (c) { e.preventDefault(); choose(it, c.id); return true; }
    }
    return false;
  });

  /* A running exam keeps its clock when you leave the page; coming back resumes it. */

  A.routes.mock = renderMock;
  window.MOCK = { build: buildExam, grade: gradeMcq, allocate: allocate };
})();
