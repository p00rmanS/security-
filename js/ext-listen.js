/* Listen mode: reads a lesson aloud with the browser's built-in speech
   synthesis (no audio files, works offline once voices are installed on the
   device). Reads the title, one-line summary, goal, explanation, analogy, the
   "What to remember" points, and the pro tip. Taglish is not read aloud
   because most devices have no suitable voice. Shortcut: L on a lesson. */

(function () {
  "use strict";

  const A = window.SECAPP;
  const esc = A.escapeHtml;
  const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  if (!supported) return;

  let session = null;

  function sentences(text) {
    const parts = String(text).replace(/\s+/g, " ").split(/(?<=[.!?])\s+/);
    const out = [];
    let cur = "";
    parts.forEach((p) => {
      if ((cur + " " + p).trim().length > 220 && cur) { out.push(cur.trim()); cur = p; } else { cur = (cur + " " + p).trim(); }
    });
    if (cur) out.push(cur.trim());
    return out;
  }

  function chunksFor(lesson) {
    const parts = [];
    parts.push(lesson.title + ".");
    if (typeof QUICK_SUMMARIES !== "undefined" && QUICK_SUMMARIES[lesson.id]) parts.push("In one breath. " + QUICK_SUMMARIES[lesson.id]);
    if (lesson.goal) parts.push("Goal. " + lesson.goal);
    if (lesson.why) parts.push("Why it matters. " + lesson.why);
    if (lesson.simple) parts.push("The explanation. " + lesson.simple);
    if (lesson.analogy) parts.push("Think of it like this. " + lesson.analogy);
    const rem = A.lessonRemember(lesson);
    if (rem.length) parts.push("What to remember. " + rem.map((t, i) => "Number " + (i + 1) + ". " + t).join(" "));
    if (typeof PRO_TIPS !== "undefined" && PRO_TIPS[lesson.id]) parts.push("Pro tip. " + PRO_TIPS[lesson.id]);
    return parts.reduce((all, p) => all.concat(sentences(p)), []);
  }

  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => /^en[-_]/i.test(v.lang) && v.localService) || voices.find((v) => /^en[-_]/i.test(v.lang)) || null;
  }

  function bar() { return document.getElementById("listen-bar"); }

  function updateBar() {
    const b = bar();
    if (!b || !session) return;
    b.querySelector("[data-l-pos]").textContent = Math.min(session.i + 1, session.chunks.length) + " / " + session.chunks.length;
    b.querySelector("[data-l-pause]").textContent = session.paused ? "Resume" : "Pause";
  }

  function showBar() {
    if (bar()) return;
    const el = document.createElement("div");
    el.id = "listen-bar";
    el.className = "listen-bar";
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", "Listening controls");
    el.innerHTML =
      '<span class="listen-title">Listening: <b>' + esc(session.title) + '</b> <span data-l-pos></span></span>' +
      '<button class="btn btn-sm" data-l-prev aria-label="Previous sentence">Back</button>' +
      '<button class="btn btn-sm" data-l-pause>Pause</button>' +
      '<button class="btn btn-sm" data-l-next aria-label="Next sentence">Skip</button>' +
      '<label class="listen-rate">Speed <select data-l-rate class="select-input">' + [0.8, 0.9, 1, 1.15, 1.3, 1.5].map((r) => '<option value="' + r + '"' + (r === A.state.listenRate ? " selected" : "") + ">" + r + "x</option>").join("") + "</select></label>" +
      '<button class="btn btn-sm" data-l-stop>Stop</button>';
    document.body.appendChild(el);
    el.querySelector("[data-l-pause]").addEventListener("click", () => togglePause());
    el.querySelector("[data-l-stop]").addEventListener("click", () => stop());
    el.querySelector("[data-l-prev]").addEventListener("click", () => jump(-1));
    el.querySelector("[data-l-next]").addEventListener("click", () => jump(1));
    el.querySelector("[data-l-rate]").addEventListener("change", (e) => { A.state.listenRate = parseFloat(e.target.value); A.saveState(); if (!session.paused) speak(); });
  }

  function speak() {
    if (!session) return;
    window.speechSynthesis.cancel();
    const token = ++session.token;
    if (session.i >= session.chunks.length) { stop(); return; }
    const u = new SpeechSynthesisUtterance(session.chunks[session.i]);
    u.rate = A.state.listenRate || 1;
    u.lang = "en-US";
    const v = pickVoice();
    if (v) u.voice = v;
    u.onend = () => {
      if (!session || token !== session.token || session.paused) return;
      session.i++;
      updateBar();
      speak();
    };
    u.onerror = () => { /* cancelled or interrupted; the token check handles restarts */ };
    window.speechSynthesis.speak(u);
    updateBar();
  }

  function jump(delta) {
    if (!session) return;
    session.i = Math.max(0, Math.min(session.chunks.length - 1, session.i + delta));
    session.paused = false;
    speak();
  }

  function togglePause() {
    if (!session) return;
    if (session.paused) { session.paused = false; speak(); } else { session.paused = true; session.token++; window.speechSynthesis.cancel(); }
    updateBar();
  }

  function stop() {
    if (session) session.token++;
    window.speechSynthesis.cancel();
    session = null;
    const b = bar();
    if (b) b.remove();
    const btn = document.getElementById("listen-btn");
    if (btn) { btn.textContent = "Listen"; btn.setAttribute("aria-pressed", "false"); }
  }

  function start(lesson) {
    stop();
    session = { lessonId: lesson.id, title: lesson.title, chunks: chunksFor(lesson), i: 0, paused: false, token: 0 };
    showBar();
    speak();
    const btn = document.getElementById("listen-btn");
    if (btn) { btn.textContent = "Stop listening"; btn.setAttribute("aria-pressed", "true"); }
  }

  function currentLesson() {
    const h = A.parseHash();
    if (h.route !== "lesson" || !h.param) return null;
    const f = A.findLessonFull(h.param);
    return f ? f.lesson : null;
  }

  A.hooks.lessonActions.push({
    html: function (lesson) {
      const active = session && session.lessonId === lesson.id;
      return '<button class="btn" id="listen-btn" aria-pressed="' + !!active + '" title="Read this lesson aloud (L)">' + (active ? "Stop listening" : "Listen") + "</button>";
    },
    wire: function (container, lesson) {
      const btn = container.querySelector("#listen-btn");
      if (btn) btn.addEventListener("click", () => { if (session && session.lessonId === lesson.id) stop(); else start(lesson); });
    }
  });

  A.keyHandlers.push(function (e) {
    if (e.key !== "l" && e.key !== "L") return false;
    const lesson = currentLesson();
    if (!lesson) return false;
    e.preventDefault();
    if (session && session.lessonId === lesson.id) stop(); else start(lesson);
    return true;
  });

  A.leaveHandlers.push(function (route, param) {
    if (session && !(route === "lesson" && param === session.lessonId)) stop();
  });

  window.addEventListener("beforeunload", () => window.speechSynthesis.cancel());
  window.speechSynthesis.getVoices();
})();
