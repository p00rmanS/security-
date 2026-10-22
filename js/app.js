/* Security+ Learning Path — application logic (vanilla JS, no build step).
   Data comes from data-fundamentals.js, data-domains.js, data-comparisons.js,
   data-questions.js, data-glossary.js, data-labs.js, loaded before this file. */

(function () {
  "use strict";

  /* ============================= STATE ============================= */

  const STORAGE_KEY = "secplus_progress_v1";
  const STATE_VERSION = 1;

  function defaultState() {
    return {
      version: STATE_VERSION,
      theme: "system",
      taglishEnabled: true,
      reducedMotion: false,
      outlineOpen: true,
      navCollapsed: false,
      outlineSections: {},
      hiddenSections: {},
      completedLessons: {},
      bookmarks: {},
      notes: {},
      quizHistory: [],
      flaggedQuestions: {},
      missedQuestions: {},
      labProgress: {},
      plan: { startDate: todayIso(), skipWeekends: false, checkedDays: {} },
      streak: { count: 0, lastActiveDate: null }
    };
  }

  function todayIso() {
    return new Date().toISOString().slice(0, 10);
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== STATE_VERSION) {
        const fresh = defaultState();
        return Object.assign(fresh, parsed || {}, { version: STATE_VERSION, plan: (parsed && parsed.plan) || fresh.plan });
      }
      const fresh = defaultState();
      return {
        version: STATE_VERSION,
        theme: parsed.theme || fresh.theme,
        taglishEnabled: parsed.taglishEnabled !== undefined ? parsed.taglishEnabled : true,
        reducedMotion: !!parsed.reducedMotion,
        outlineOpen: parsed.outlineOpen !== false,
        navCollapsed: !!parsed.navCollapsed,
        outlineSections: parsed.outlineSections || {},
        hiddenSections: parsed.hiddenSections || {},
        completedLessons: parsed.completedLessons || {},
        bookmarks: parsed.bookmarks || {},
        notes: parsed.notes || {},
        quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        flaggedQuestions: parsed.flaggedQuestions || {},
        missedQuestions: parsed.missedQuestions || {},
        labProgress: parsed.labProgress || {},
        plan: parsed.plan || fresh.plan,
        streak: parsed.streak || fresh.streak
      };
    } catch (e) {
      return defaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage unavailable; progress just won't persist */ }
  }

  function recordActivity() {
    const today = todayIso();
    const s = state.streak;
    if (s.lastActiveDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    s.count = s.lastActiveDate === yesterday ? s.count + 1 : 1;
    s.lastActiveDate = today;
  }

  function currentStreakCount() {
    const s = state.streak;
    if (!s.lastActiveDate) return 0;
    const today = todayIso();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.lastActiveDate !== today && s.lastActiveDate !== yesterday) return 0;
    return s.count;
  }

  /* ============================= UTIL ============================= */

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nl2br(str) {
    return escapeHtml(str).replace(/\n/g, "<br>");
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function chunkArray(arr, n) {
    if (n <= 0) return [];
    if (arr.length === 0) return Array.from({ length: n }, () => []);
    if (arr.length >= n) {
      const result = [];
      const base = Math.floor(arr.length / n);
      const rem = arr.length % n;
      let idx = 0;
      for (let i = 0; i < n; i++) {
        const size = base + (i < rem ? 1 : 0);
        result.push(arr.slice(idx, idx + size));
        idx += size;
      }
      return result;
    }
    const result = arr.map((x) => [x]);
    while (result.length < n) result.push([]);
    return result;
  }

  function domainById(id) {
    return DOMAINS.find((d) => d.id === id);
  }

  function allLessonIds() {
    const ids = FUNDAMENTALS.map((f) => f.id);
    DOMAINS.forEach((d) => {
      ids.push(d.flagship.id);
      d.topics.forEach((t) => ids.push(t.id));
    });
    return ids;
  }

  const TOTAL_LESSONS = allLessonIds().length;

  function completedCount() {
    return allLessonIds().filter((id) => state.completedLessons[id]).length;
  }

  function toggleLessonComplete(id) {
    if (state.completedLessons[id]) delete state.completedLessons[id];
    else { state.completedLessons[id] = true; recordActivity(); }
    saveState();
  }

  function questionsForDomain(domainId) {
    return QUESTIONS.filter((q) => q.domainId === domainId);
  }

  function domainBestScore(domainId) {
    const attempts = state.quizHistory.filter((h) => h.scopeKey === domainId);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map((a) => Math.round((a.correct / a.total) * 100)));
  }

  /* ============================= ICONS & DOMAIN COLORS ============================= */

  const ICON_PATHS = {
    dashboard: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
    book: '<path d="M2 3.5h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z"/><path d="M22 3.5h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z"/>',
    shield: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    flask: '<path d="M9 2h6M10 2v6.8L4.6 17.8A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-3.2L14 8.8V2"/><path d="M7.5 14.5h9"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M20.5 20.5 16 16"/>',
    columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1.5 14h5M9.5 8h5M17.5 16h5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M8.2 13.6 7 21.5l5-3 5 3-1.2-7.9"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.3 12.5 11 15l5-6"/>',
    flame: '<path d="M8.5 14.2c0 1.9 1.6 3.4 3.5 3.4s3.5-1.5 3.5-3.4c0-1.6-1.2-2.2-.9-4.2.3-1 .4-2-.5-3.8 1.9 1 3.9 3.8 3.9 6.6a5 5 0 0 1-5 5.2 5 5 0 0 1-5-5.2c0-1.8.9-3.2 2.3-4.5-.4 1.4.4 2.3.2 5.9Z"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    chevronLeft: '<path d="M15 6l-6 6 6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    graduation: '<path d="M22 9.5 12 4.5 2 9.5l10 5 10-5Z"/><path d="M6 11.8v5.3c0 1.3 2.7 2.4 6 2.4s6-1.1 6-2.4v-5.3"/>',
    star: '<path d="M12 2.5l3 6.5 7 .8-5.2 4.7 1.4 7-6.2-3.6-6.2 3.6 1.4-7L2 9.8l7-.8Z"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    note: '<path d="M4 3h13l3 3v15H4Z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>',
    hash: '<path d="M9 3 7 21M17 3l-2 18M4 8h17M3 16h17"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>'
  };

  function icon(name, size, extraClass) {
    const s = size || 18;
    return (
      '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" width="' + s + '" height="' + s +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON_PATHS[name] || "") + "</svg>"
    );
  }

  const DOMAIN_COLORS = { d1: "var(--d1)", d2: "var(--d2)", d3: "var(--d3)", d4: "var(--d4)", d5: "var(--d5)" };

  function progressRing(pct, opts) {
    const o = opts || {};
    const size = o.size || 92;
    const stroke = o.stroke || 9;
    const color = o.color || "var(--accent)";
    const trackColor = o.trackColor || "rgba(255,255,255,0.18)";
    const label = o.label !== undefined ? o.label : Math.round(pct) + "%";
    const sub = o.sub || "";
    const r = 50 - stroke / 2;
    const c = 2 * Math.PI * r;
    const offset = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return (
      '<div class="ring-wrap" style="width:' + size + "px;height:" + size + 'px;">' +
      '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '">' +
      '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + trackColor + '" stroke-width="' + stroke + '"/>' +
      '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke +
      '" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 50 50)"/>' +
      "</svg>" +
      '<div class="ring-label" style="color:' + (o.labelColor || "inherit") + ';"><span class="ring-pct">' + label + "</span>" +
      (sub ? '<span class="ring-sub">' + sub + "</span>" : "") +
      "</div></div>"
    );
  }

  /* ============================= ROUTER ============================= */

  const routes = {
    dashboard: renderDashboard,
    course: renderCoursePage,
    exam: renderExamOverview,
    fundamentals: renderFundamentals,
    domain: renderDomainPage,
    practice: renderPractice,
    labs: renderLabsPage,
    lab: renderLabDetail,
    lesson: renderLessonFocus,
    glossary: renderGlossary,
    acronyms: renderAcronyms,
    compare: renderCompare,
    cram: renderCramSheet,
    plan: renderPlanPage,
    settings: renderSettings
  };

  function parseHash() {
    const raw = (location.hash || "#/dashboard").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { route: parts[0] || "dashboard", param: parts[1] || null };
  }

  function navigate(route, param) {
    location.hash = "#/" + route + (param ? "/" + param : "");
  }

  /* The course-content panel is shown beside lessons only. It starts closed on
     narrow screens, where it opens as an overlay instead of taking up space. */
  let outlineVisible = state.outlineOpen !== false && window.innerWidth > 1180;

  function isMobileNav() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  function applyLayout() {
    const { route } = parseHash();
    const isLesson = route === "lesson";
    const b = document.body;
    b.classList.toggle("has-outline", isLesson);
    b.classList.toggle("outline-open", isLesson && outlineVisible);
    b.classList.toggle("nav-collapsed", !isMobileNav() && !!state.navCollapsed);
    const ot = document.getElementById("outline-toggle");
    if (ot) ot.setAttribute("aria-pressed", String(isLesson && outlineVisible));
    const mt = document.getElementById("menu-toggle");
    if (mt) mt.setAttribute("aria-expanded", String(isMobileNav() ? document.getElementById("sidebar").classList.contains("open") : !state.navCollapsed));
  }

  function toggleOutline() {
    outlineVisible = !outlineVisible;
    if (window.innerWidth > 1180) { state.outlineOpen = outlineVisible; saveState(); }
    applyLayout();
    if (outlineVisible) scrollOutlineToCurrent();
  }

  function toggleNav() {
    if (isMobileNav()) {
      const sb = document.getElementById("sidebar");
      const open = !sb.classList.contains("open");
      sb.classList.toggle("open", open);
      document.getElementById("sidebar-backdrop").classList.toggle("open", open);
    } else {
      state.navCollapsed = !state.navCollapsed;
      saveState();
    }
    applyLayout();
  }

  function render(opts) {
    const keepScroll = !!(opts && opts.keepScroll);
    const y = window.scrollY;
    const { route, param } = parseHash();
    const fn = routes[route] || renderDashboard;
    const content = document.getElementById("content");

    renderSidebar(route, param);
    applyLayout();
    if (route === "lesson") renderOutline(param);

    content.classList.toggle("is-player", route === "lesson");
    content.innerHTML = "";
    content.classList.remove("content-enter");
    content.appendChild(fn(param));
    if (!keepScroll) {
      void content.offsetWidth;
      content.classList.add("content-enter");
    }

    const found = route === "lesson" && param ? findLessonFull(param) : null;
    document.title = (found ? found.lesson.title + " — " : "") + "Security+ Learning Path";

    window.scrollTo(0, keepScroll ? y : 0);
    if (!keepScroll) closeSidebarMobile();
  }

  window.addEventListener("hashchange", () => render());

  /* ============================= SIDEBAR / NAV ============================= */

  function renderSidebar(activeRoute, activeParam) {
    const nav = document.getElementById("sidebar-nav");
    const pct = Math.round((completedCount() / TOTAL_LESSONS) * 100);

    let html = "";
    html += navGroupOpen("Course");
    html += navLink("dashboard", null, "Dashboard", activeRoute === "dashboard");
    html += navLink("course", null, "Course content", activeRoute === "course" || activeRoute === "lesson");
    html += navLink("exam", null, "Exam overview", activeRoute === "exam");
    html += "</div>";

    html += navGroupOpen("Modules");
    const fundIds = FUNDAMENTALS.map((f) => f.id);
    const fundDone = fundIds.filter((id) => state.completedLessons[id]).length;
    html += navLink("fundamentals", null, "0. A+/Network+ Refresher", activeRoute === "fundamentals", Math.round((fundDone / fundIds.length) * 100) + "%", "var(--text-muted)");
    DOMAINS.forEach((d) => {
      const lessonIds = [d.flagship.id, ...d.topics.map((t) => t.id)];
      const done = lessonIds.filter((id) => state.completedLessons[id]).length;
      const dpct = Math.round((done / lessonIds.length) * 100);
      html += navLink("domain", d.id, d.number + ". " + d.title, activeRoute === "domain" && activeParam === d.id, dpct + "%", DOMAIN_COLORS[d.id]);
    });
    html += "</div>";

    html += navGroupOpen("Practice & reference");
    html += navLink("practice", null, "Practice Center", activeRoute === "practice");
    html += navLink("labs", null, "Labs / SOC Simulator", activeRoute === "labs" || activeRoute === "lab");
    html += navLink("glossary", null, "Glossary", activeRoute === "glossary");
    html += navLink("acronyms", null, "Acronyms", activeRoute === "acronyms");
    html += navLink("compare", null, "Compare & Contrast", activeRoute === "compare");
    html += navLink("cram", null, "Exam Cram Sheet", activeRoute === "cram");
    html += navLink("plan", null, "100-Day Plan", activeRoute === "plan");
    html += "</div>";

    html += navGroupOpen("");
    html += navLink("settings", null, "Settings", activeRoute === "settings");
    html += "</div>";

    nav.innerHTML = html;
    document.getElementById("sidebar-progress-fill").style.width = pct + "%";
    document.getElementById("sidebar-progress-label").textContent = pct + "% of lessons complete";

    nav.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate(btn.getAttribute("data-nav"), btn.getAttribute("data-param") || null);
      });
    });
  }

  function navGroupOpen(label) {
    return '<div class="nav-group">' + (label ? '<div class="nav-group-label">' + escapeHtml(label) + "</div>" : "");
  }

  function navLink(route, param, label, active, pctLabel, dotColor) {
    return (
      '<button class="nav-link' + (active ? " active" : "") + '" data-nav="' + route + '"' +
      (param ? ' data-param="' + param + '"' : "") + (active ? ' aria-current="page"' : "") +
      '><span class="nav-link-main">' +
      (dotColor ? '<span class="nav-dot" style="--domain-color:' + dotColor + ';"></span>' : "") +
      "<span>" + escapeHtml(label) + "</span></span>" +
      (pctLabel ? '<span class="pct">' + pctLabel + "</span>" : "") +
      "</button>"
    );
  }

  function closeSidebarMobile() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-backdrop").classList.remove("open");
  }

  /* ============================= SHARED UI PIECES ============================= */

  function progressBar(pct) {
    return (
      '<div class="progress-row"><div class="progress-track"><div class="progress-fill" style="width:' +
      Math.max(0, Math.min(100, pct)) + '%"></div></div><div class="progress-pct">' + Math.round(pct) + "%</div></div>"
    );
  }

  function completeToggleButton(lessonId) {
    const done = !!state.completedLessons[lessonId];
    return (
      '<button class="btn ' + (done ? "btn-primary" : "") + '" data-complete-toggle="' + lessonId + '" title="Toggle complete (C)">' +
      (done ? icon("check", 15) + " Completed" : "Mark complete") + "</button>"
    );
  }

  function wireCompleteButtons(container) {
    container.querySelectorAll("[data-complete-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleLessonComplete(btn.getAttribute("data-complete-toggle"));
        render({ keepScroll: true });
      });
    });
  }

  function toggleBookmark(lessonId) {
    if (state.bookmarks[lessonId]) delete state.bookmarks[lessonId];
    else state.bookmarks[lessonId] = true;
    saveState();
  }

  function bookmarkButton(lessonId) {
    const on = !!state.bookmarks[lessonId];
    return (
      '<button class="btn btn-icon-only' + (on ? " bookmarked" : "") + '" data-bookmark-toggle="' + lessonId +
      '" aria-label="' + (on ? "Remove bookmark" : "Bookmark this lesson") + '" title="' + (on ? "Bookmarked (B)" : "Bookmark this lesson (B)") + '">' +
      icon("star", 16) + "</button>"
    );
  }

  function wireBookmarkButtons(container) {
    container.querySelectorAll("[data-bookmark-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleBookmark(btn.getAttribute("data-bookmark-toggle"));
        render({ keepScroll: true });
      });
    });
  }

  function wireNotesInputs(container) {
    container.querySelectorAll("[data-notes-for]").forEach((ta) => {
      ta.addEventListener("input", (e) => {
        const id = ta.getAttribute("data-notes-for");
        if (e.target.value.trim()) state.notes[id] = e.target.value;
        else delete state.notes[id];
        saveState();
      });
    });
  }

  function handlePendingScroll() {
    if (!pendingScrollTargetId) return;
    const el2 = document.getElementById(pendingScrollTargetId);
    pendingScrollTargetId = null;
    if (!el2) return;
    if (el2.classList.contains("topic-card")) el2.classList.add("open");
    setTimeout(() => { el2.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30);
    el2.classList.add("jump-highlight");
    setTimeout(() => el2.classList.remove("jump-highlight"), 1600);
  }

  function taglishBlock(text) {
    if (!state.taglishEnabled || !text) return "";
    return (
      '<details class="disclosure"><summary>Taglish Help</summary><div class="taglish-box" style="margin-top:8px;">' +
      escapeHtml(text) + "</div></details>"
    );
  }

  function keyTermsList(terms) {
    if (!terms || terms.length === 0) return "";
    return (
      '<ul class="key-terms-list">' +
      terms.map((t) => "<li><b>" + escapeHtml(t.term) + ":</b> " + escapeHtml(t.def) + "</li>").join("") +
      "</ul>"
    );
  }

  function tableBlock(table) {
    if (!table) return "";
    return (
      '<div class="table-wrap"><table><thead><tr>' +
      table.headers.map((h) => "<th>" + escapeHtml(h) + "</th>").join("") +
      "</tr></thead><tbody>" +
      table.rows.map((r) => "<tr>" + r.map((c) => "<td>" + escapeHtml(c) + "</td>").join("") + "</tr>").join("") +
      "</tbody></table></div>"
    );
  }

  /* ============================= DASHBOARD ============================= */

  let pendingScrollTargetId = null;
  let pendingGlossaryQuery = null;

  function nextIncompleteLesson() {
    for (const f of FUNDAMENTALS) {
      if (!state.completedLessons[f.id]) return { route: "fundamentals", param: null, lessonId: f.id, title: f.title };
    }
    for (const d of DOMAINS) {
      const lessons = [d.flagship, ...d.topics];
      for (const l of lessons) {
        if (!state.completedLessons[l.id]) return { route: "domain", param: d.id, lessonId: l.id, title: l.title };
      }
    }
    return null;
  }

  function findLessonMeta(lessonId) {
    const fund = FUNDAMENTALS.find((f) => f.id === lessonId);
    if (fund) return { title: fund.title, route: "fundamentals", param: null, domainLabel: "Fundamentals" };
    for (const d of DOMAINS) {
      const lessons = [d.flagship, ...d.topics];
      const l = lessons.find((x) => x.id === lessonId);
      if (l) return { title: l.title, route: "domain", param: d.id, domainLabel: "D" + d.number };
    }
    return null;
  }

  function findLessonFull(lessonId) {
    const fund = FUNDAMENTALS.find((f) => f.id === lessonId);
    if (fund) return { kind: "fund", lesson: fund, domain: null };
    for (const d of DOMAINS) {
      const lessons = [d.flagship, ...d.topics];
      const l = lessons.find((x) => x.id === lessonId);
      if (l) return { kind: "domain", lesson: l, domain: d, isFlagship: l === d.flagship };
    }
    return null;
  }

  /* ============================= COURSE MODEL & OUTLINE PANEL ============================= */

  function courseModules() {
    const mods = [{
      id: "fund", route: "fundamentals", param: null, label: "Module 0", title: "A+ / Network+ Refresher",
      color: "var(--text-muted)", weight: null,
      lessons: FUNDAMENTALS.map((f) => ({ id: f.id, title: f.title, minutes: f.minutes || null, tag: f.category, flagship: false }))
    }];
    DOMAINS.forEach((d) => {
      mods.push({
        id: d.id, route: "domain", param: d.id, label: "Domain " + d.number, title: d.title,
        color: DOMAIN_COLORS[d.id], weight: d.weight,
        lessons: [d.flagship, ...d.topics].map((l) => ({
          id: l.id, title: l.title, minutes: l.minutes || null, tag: l === d.flagship ? "Flagship" : l.tag, flagship: l === d.flagship
        }))
      });
    });
    return mods;
  }

  function moduleOfLesson(lessonId) {
    return courseModules().find((m) => m.lessons.some((l) => l.id === lessonId)) || null;
  }

  function outlineLessonHtml(l, i, currentId) {
    const done = !!state.completedLessons[l.id];
    const cur = l.id === currentId;
    const sub = [
      l.flagship ? "Flagship" : l.tag && /^\d/.test(l.tag) ? "Obj " + l.tag : "",
      l.minutes ? l.minutes + " min" : ""
    ].filter(Boolean).join(" · ");
    return (
      '<li class="ol-lesson' + (done ? " done" : "") + (cur ? " current" : "") + '" data-ol-lesson="' + l.id + '" tabindex="0" role="link"' + (cur ? ' aria-current="page"' : "") + ">" +
      '<button class="ol-check" data-ol-check="' + l.id + '" aria-pressed="' + done + '" aria-label="' + (done ? "Mark incomplete: " : "Mark complete: ") + escapeHtml(l.title) + '">' + icon("check", 13) + "</button>" +
      '<span class="ol-text">' + (i + 1) + ". " + escapeHtml(l.title) + (sub ? '<span class="ol-sub">' + escapeHtml(sub) + "</span>" : "") + "</span></li>"
    );
  }

  function outlineModulesHtml(currentId) {
    return courseModules().map((m) => {
      const done = m.lessons.filter((l) => state.completedLessons[l.id]).length;
      const hasCurrent = m.lessons.some((l) => l.id === currentId);
      const open = m.id in state.outlineSections ? state.outlineSections[m.id] : hasCurrent;
      return (
        '<div class="ol-module' + (open ? " open" : "") + '" data-module="' + m.id + '" style="--domain-color:' + m.color + ';">' +
        '<button class="ol-module-head" data-ol-module-toggle="' + m.id + '" aria-expanded="' + open + '">' + icon("chevronRight", 14, "chev") +
        '<span class="ol-module-name"><b>' + escapeHtml(m.label + ": " + m.title) + "</b><span>" + done + " / " + m.lessons.length + " lessons" +
        (m.weight ? " · " + m.weight + "% of exam" : "") + '</span></span><span class="ol-module-tick"></span></button>' +
        '<ul class="ol-lessons">' + m.lessons.map((l, i) => outlineLessonHtml(l, i, currentId)).join("") + "</ul></div>"
      );
    }).join("");
  }

  function wireOutline(container, currentId) {
    container.querySelectorAll("[data-ol-module-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mod = btn.parentElement;
        const open = !mod.classList.contains("open");
        mod.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
        state.outlineSections[btn.getAttribute("data-ol-module-toggle")] = open;
        saveState();
      });
    });
    container.querySelectorAll("[data-ol-check]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLessonComplete(btn.getAttribute("data-ol-check"));
        render({ keepScroll: true });
      });
    });
    container.querySelectorAll("[data-ol-lesson]").forEach((row) => {
      const go = () => {
        if (window.innerWidth <= 1180) outlineVisible = false;
        navigate("lesson", row.getAttribute("data-ol-lesson"));
      };
      row.addEventListener("click", go);
      row.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target === row) go(); });
    });
    container.querySelectorAll("[data-ol-all]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("data-ol-all") === "expand";
        courseModules().forEach((m) => { state.outlineSections[m.id] = open; });
        saveState();
        render({ keepScroll: true });
      });
    });
  }

  let lastOutlineLesson = null;

  function renderOutline(currentId) {
    const root = document.getElementById("outline");
    const oldBody = root.querySelector(".outline-body");
    const prevScroll = oldBody ? oldBody.scrollTop : 0;
    const lessonChanged = currentId !== lastOutlineLesson;
    if (lessonChanged) {
      const m = moduleOfLesson(currentId);
      if (m) state.outlineSections[m.id] = true;
      lastOutlineLesson = currentId;
    }
    const pct = Math.round((completedCount() / TOTAL_LESSONS) * 100);
    root.innerHTML =
      '<div class="outline-head"><div class="outline-head-row"><h2 class="outline-title" style="margin:0;">Course content</h2>' +
      '<div class="outline-tools"><button class="link-btn" data-ol-all="expand">Expand all</button><button class="link-btn" data-ol-all="collapse">Collapse all</button>' +
      '<button class="link-btn" id="outline-close" aria-label="Close course content">Close</button></div></div>' +
      '<div class="outline-meta"><span>' + completedCount() + " / " + TOTAL_LESSONS + " lessons</span><span>" + pct + "%</span></div>" +
      '<div class="progress-track" style="margin-top:6px;"><div class="progress-fill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="outline-body">' + outlineModulesHtml(currentId) + "</div>";
    wireOutline(root, currentId);
    root.querySelector("#outline-close").addEventListener("click", toggleOutline);
    const body = root.querySelector(".outline-body");
    if (lessonChanged) scrollOutlineToCurrent();
    else body.scrollTop = prevScroll;
  }

  function scrollOutlineToCurrent() {
    const body = document.querySelector("#outline .outline-body");
    const cur = document.querySelector("#outline .ol-lesson.current");
    if (!body || !cur || !body.clientHeight) return;
    body.scrollTop = Math.max(0, cur.offsetTop - body.offsetTop - body.clientHeight / 3);
  }

  /* ============================= LESSON PLAYER ============================= */

  const SECTION_TOGGLES = [
    { key: "analogy", label: "Analogy" },
    { key: "technical", label: "Example" },
    { key: "confusion", label: "Exam traps" },
    { key: "soc", label: "SOC link" }
  ];

  function sectionVisible(key) {
    return !state.hiddenSections[key];
  }

  function quickSummaryBlock(lessonId) {
    const s = QUICK_SUMMARIES[lessonId];
    if (!s) return "";
    return '<div class="quick-summary-box"><div class="quick-summary-label">In one breath</div><p>' + escapeHtml(s) + "</p></div>";
  }

  function lessonRemember(lesson) {
    if (lesson.remember && lesson.remember.length) return lesson.remember;
    if (lesson.takeaways && lesson.takeaways.length) return lesson.takeaways;
    return lesson.keyPoints || [];
  }

  function lessonSection(n, label, inner, id) {
    return (
      '<section class="l-section"' + (id ? ' id="' + id + '"' : "") + '><div class="l-label"><span class="l-num">' + (typeof n === "number" ? String(n).padStart(2, "0") : n) + "</span>" +
      escapeHtml(label) + "</div>" + inner + "</section>"
    );
  }

  function lessonBodyBlocks(kind, lesson) {
    let n = 0;
    let html = "";
    const add = (label, inner, id) => { n += 1; html += lessonSection(n, label, inner, id); };

    add("What this lesson covers",
      "<p><b>Goal.</b> " + escapeHtml(lesson.goal) + "</p>" +
      (lesson.why ? "<p><b>Why it matters.</b> " + escapeHtml(lesson.why) + "</p>" : ""));
    add("The explanation", "<p>" + escapeHtml(lesson.simple) + "</p>");
    if (lesson.keyTerms && lesson.keyTerms.length) add("Key terms", keyTermsList(lesson.keyTerms));
    if (lesson.analogy && sectionVisible("analogy")) add("Analogy", '<div class="analogy-box">' + escapeHtml(lesson.analogy) + "</div>");
    if (lesson.technical && sectionVisible("technical")) add("Technical example", "<p>" + escapeHtml(lesson.technical) + "</p>");
    if (lesson.table) add("At a glance", tableBlock(lesson.table));
    if (lesson.confusion && lesson.confusion.length && sectionVisible("confusion")) {
      add("Exam traps: easily confused",
        lesson.confusion.map((c) => '<div class="confusion-item"><b>' + escapeHtml(c.a) + "</b> vs <b>" + escapeHtml(c.b) + "</b><br>" + escapeHtml(c.diff) + "</div>").join(""));
    }
    if (lesson.soc && sectionVisible("soc")) add("On the job: SOC analyst", "<p>" + escapeHtml(lesson.soc) + "</p>");

    const items = lessonRemember(lesson);
    if (items.length) {
      html +=
        '<section class="remember" id="remember-box"><div class="remember-head"><span>What to remember</span><span>Exam focus</span></div><ol>' +
        items.map((t) => "<li>" + escapeHtml(t) + "</li>").join("") + "</ol></section>";
    }
    const tip = PRO_TIPS[lesson.id];
    if (tip) html += lessonSection("★", "Pro tip", '<div class="pro-tip-box">' + escapeHtml(tip) + "</div>", "protip-box");
    if (state.taglishEnabled && lesson.taglish) {
      html += '<section class="taglish-section" id="taglish-box"><div class="l-label"><span class="l-num">TL</span>Taglish: explain it in plain words</div><div class="taglish-box">' + escapeHtml(lesson.taglish) + "</div></section>";
    }
    return html;
  }

  function renderLessonFocus(lessonId) {
    const found = findLessonFull(lessonId);
    const wrap = el("<div></div>");
    if (!found) {
      wrap.innerHTML = '<div class="empty-state">Lesson not found. <button class="btn" data-back-route="dashboard">Back to dashboard</button></div>';
      wrap.querySelector("[data-back-route]").addEventListener("click", () => navigate("dashboard"));
      return wrap;
    }
    const { kind, lesson, domain } = found;
    const ids = allLessonIds();
    const idx = ids.indexOf(lessonId);
    const prevId = idx > 0 ? ids[idx - 1] : null;
    const nextId = idx !== -1 && idx < ids.length - 1 ? ids[idx + 1] : null;
    const prevLesson = prevId ? findLessonFull(prevId).lesson : null;
    const nextLesson = nextId ? findLessonFull(nextId).lesson : null;
    const mod = moduleOfLesson(lessonId);
    const done = !!state.completedLessons[lessonId];
    const objective = kind === "domain" && lesson.tag && /^\d/.test(lesson.tag) ? lesson.tag : "";
    const practiceScope = kind === "fund" ? "fund" : domain.id;

    const hasTip = !!PRO_TIPS[lesson.id];
    const hasTaglish = state.taglishEnabled && !!lesson.taglish;
    const jumps =
      (lessonRemember(lesson).length ? '<button class="link-btn" data-jump="remember-box">What to remember</button>' : "") +
      (hasTip ? '<button class="link-btn" data-jump="protip-box">Pro tip</button>' : "") +
      (hasTaglish ? '<button class="link-btn" data-jump="taglish-box">Taglish</button>' : "") +
      '<button class="link-btn" data-jump="notes-box">My notes</button>';

    const toggles =
      '<div class="view-toggles"><span class="vt-label">Show</span>' +
      '<button class="vt-chip" data-vt="taglish" aria-pressed="' + state.taglishEnabled + '">Taglish</button>' +
      SECTION_TOGGLES.filter((t) => kind === "domain").map((t) => '<button class="vt-chip" data-vt="' + t.key + '" aria-pressed="' + sectionVisible(t.key) + '">' + t.label + "</button>").join("") +
      "</div>";

    const existingNote = state.notes[lesson.id] || "";

    wrap.innerHTML =
      '<article class="lesson-focus" id="lesson-focus-root">' +
      '<div class="lesson-crumbs"><button data-nav-to="course">Course</button><span class="sep">/</span>' +
      (mod ? '<button data-nav-to="' + mod.route + (mod.param ? "/" + mod.param : "") + '">' + escapeHtml(mod.label + ": " + mod.title) + "</button>" : "") +
      (objective ? '<span class="sep">/</span><span>Objective ' + escapeHtml(objective) + "</span>" : "") + "</div>" +

      '<div class="lesson-title-row"><h1>' + escapeHtml(lesson.title) + "</h1>" +
      '<div class="lesson-actions">' + bookmarkButton(lesson.id) + completeToggleButton(lesson.id) + "</div></div>" +
      '<div class="lesson-meta"><span class="tag">Lesson ' + (idx + 1) + " of " + ids.length + "</span>" +
      (lesson.minutes ? '<span class="tag">' + lesson.minutes + " min</span>" : "") +
      (kind === "domain" && found.isFlagship ? '<span class="tag tag-blue">Flagship</span>' : "") +
      (done ? '<span class="badge-complete">' + icon("check", 14) + " Completed</span>" : "") + "</div>" +
      quickSummaryBlock(lesson.id) +
      toggles +
      '<div class="jump-links"><span style="color:var(--text-muted);">Jump to</span>' + jumps + "</div>" +

      lessonBodyBlocks(kind, lesson) +

      '<div class="practice-cta"><div><b>Check yourself</b><p>Practice questions for this ' + (kind === "fund" ? "module" : "domain") + ' are in the Practice Center.</p></div>' +
      '<button class="btn" data-practice-domain="' + practiceScope + '">Start practice ' + icon("chevronRight", 14) + "</button></div>" +

      '<section class="l-section" id="notes-box"><div class="l-label"><span class="l-num">' + icon("note", 13) + "</span>My notes</div>" +
      '<textarea class="notes-textarea" data-notes-for="' + lesson.id + '" placeholder="Anything worth remembering? Notes save automatically in this browser.">' + escapeHtml(existingNote) + "</textarea></section>" +

      '<div class="lesson-focus-nav">' +
      '<button class="btn lesson-nav-btn prev" id="lesson-nav-prev"' + (prevId ? "" : " disabled") + "><small>" + icon("chevronLeft", 12) + " Previous <kbd>←</kbd></small>" +
      '<span class="t">' + (prevLesson ? escapeHtml(prevLesson.title) : "Start of course") + "</span></button>" +
      '<div class="lesson-nav-mid">' + completeToggleButton(lesson.id) + "</div>" +
      '<button class="btn lesson-nav-btn next" id="lesson-nav-next"' + (nextId ? "" : " disabled") + "><small>Next <kbd>→</kbd> " + icon("chevronRight", 12) + "</small>" +
      '<span class="t">' + (nextLesson ? escapeHtml(nextLesson.title) : "End of course") + "</span></button>" +
      "</div>" +
      '<div class="lesson-focus-hint"><kbd>←</kbd> <kbd>→</kbd> change lesson &middot; <kbd>Shift</kbd>+<kbd>→</kbd> complete and continue &middot; <kbd>C</kbd> complete &middot; <kbd>O</kbd> course content &middot; <kbd>?</kbd> all shortcuts</div>' +
      "</article>";

    wireCompleteButtons(wrap);
    wireBookmarkButtons(wrap);
    wireNotesInputs(wrap);
    wirePracticeDomainButtons(wrap);

    wrap.querySelectorAll("[data-nav-to]").forEach((b) => {
      b.addEventListener("click", () => {
        const t = b.getAttribute("data-nav-to").split("/");
        navigate(t[0], t[1] || null);
      });
    });
    wrap.querySelectorAll("[data-jump]").forEach((b) => {
      b.addEventListener("click", () => {
        const target = document.getElementById(b.getAttribute("data-jump"));
        if (target) target.scrollIntoView({ behavior: state.reducedMotion ? "auto" : "smooth", block: "start" });
      });
    });
    wrap.querySelectorAll("[data-vt]").forEach((b) => {
      b.addEventListener("click", () => {
        const k = b.getAttribute("data-vt");
        if (k === "taglish") state.taglishEnabled = !state.taglishEnabled;
        else if (state.hiddenSections[k]) delete state.hiddenSections[k];
        else state.hiddenSections[k] = true;
        saveState();
        render({ keepScroll: true });
      });
    });

    const goPrev = () => { if (prevId) navigate("lesson", prevId); };
    const goNext = () => { if (nextId) navigate("lesson", nextId); };
    if (prevId) wrap.querySelector("#lesson-nav-prev").addEventListener("click", goPrev);
    if (nextId) wrap.querySelector("#lesson-nav-next").addEventListener("click", goNext);

    wireLessonSwipe(wrap.querySelector("#lesson-focus-root"), goPrev, goNext);

    return wrap;
  }

  function wireLessonSwipe(target, goPrev, goNext) {
    if (!target) return;
    let startX = 0;
    let startY = 0;
    let tracking = false;
    target.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    }, { passive: true });
    target.addEventListener("touchend", (e) => {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) goNext(); else goPrev();
    }, { passive: true });
  }

  function continueButton(lessonId, label, variant) {
    if (!findLessonMeta(lessonId)) return "";
    return '<button class="btn ' + (variant || "") + '" data-continue-lesson="' + lessonId + '">' + (label || "Open") + "</button>";
  }

  function wireContinueButtons(container) {
    container.querySelectorAll("[data-continue-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => navigate("lesson", btn.getAttribute("data-continue-lesson")));
    });
  }

  function wirePracticeDomainButtons(container) {
    container.querySelectorAll("[data-practice-domain]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pendingQuizScope = btn.getAttribute("data-practice-domain");
        navigate("practice");
      });
    });
  }

  function wireScopeButtons(container) {
    container.querySelectorAll("[data-practice-scope]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pendingQuizScope = btn.getAttribute("data-practice-scope");
        navigate("practice");
      });
    });
  }

  function focusAreasCard() {
    const weakDomains = DOMAINS.filter((d) => {
      const best = domainBestScore(d.id);
      return best !== null && best < 75;
    });
    const untried = DOMAINS.filter((d) => domainBestScore(d.id) === null);
    const missedCount = Object.keys(state.missedQuestions).length;
    const flaggedCount = Object.keys(state.flaggedQuestions).length;

    if (weakDomains.length === 0 && untried.length === 0 && missedCount === 0 && flaggedCount === 0) return "";

    let rows = "";
    weakDomains.forEach((d) => {
      const best = domainBestScore(d.id);
      rows += focusRow("D" + d.number + " " + d.title, "Best score " + best + "% — below the 75% mastery bar", "target", d.id, "domain");
    });
    untried.forEach((d) => {
      rows += focusRow("D" + d.number + " " + d.title, "No quiz attempts yet", "target", d.id, "domain");
    });
    if (missedCount > 0) rows += focusRow("Missed Questions", missedCount + " question" + (missedCount === 1 ? "" : "s") + " you got wrong recently", "clock", "missed", "scope");
    if (flaggedCount > 0) rows += focusRow("Flagged Questions", flaggedCount + " question" + (flaggedCount === 1 ? "" : "s") + " you flagged for review", "star", "flagged", "scope");

    return (
      '<div class="card"><h3 style="margin-top:0;display:flex;align-items:center;gap:8px;">' + icon("target", 17) + " Focus Areas</h3>" +
      '<p class="lede" style="margin-bottom:10px;">Where a few more minutes of practice would help most right now.</p>' +
      rows +
      "</div>"
    );
  }

  function focusRow(title, detail, iconName, value, kind) {
    return (
      '<div class="cram-item" style="display:flex;align-items:center;justify-content:space-between;gap:10px;">' +
      '<div style="display:flex;align-items:center;gap:10px;min-width:0;">' + icon(iconName, 16) +
      '<div style="min-width:0;"><div style="font-weight:600;font-size:13.5px;">' + escapeHtml(title) + '</div><div style="font-size:12px;color:var(--text-muted);">' + escapeHtml(detail) + "</div></div></div>" +
      '<button class="btn btn-sm" data-practice-' + kind + '="' + value + '">Practice</button>' +
      "</div>"
    );
  }

  function bookmarkedLessonsSection() {
    const ids = Object.keys(state.bookmarks);
    if (ids.length === 0) return "";
    const items = ids.map((id) => Object.assign({ id }, findLessonMeta(id))).filter((it) => it.title);
    if (items.length === 0) return "";
    return (
      "<h2>Bookmarked Lessons</h2><div class=\"card\">" +
      items.map((it) => (
        '<div class="cram-item" style="display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
        '<div style="min-width:0;"><span class="tag tag-accent" style="margin-right:8px;">' + escapeHtml(it.domainLabel) + "</span>" + escapeHtml(it.title) + "</div>" +
        continueButton(it.id, icon("chevronRight", 14) + " Open", "btn-sm") +
        "</div>"
      )).join("") +
      "</div>"
    );
  }

  function readiness() {
    const domainScores = DOMAINS.map((d) => ({ id: d.id, best: domainBestScore(d.id) }));
    const allLessonsDone = completedCount() >= TOTAL_LESSONS;
    const mockAttempts = state.quizHistory.filter((h) => h.scopeKey === "mock").slice(-2);
    const recentMockAvgOk = mockAttempts.length >= 2 && mockAttempts.every((a) => Math.round((a.correct / a.total) * 100) >= 85);
    const noDomainBelow75 = domainScores.every((d) => d.best !== null && d.best >= 75);
    const ready = allLessonsDone && recentMockAvgOk && noDomainBelow75;

    let label = "Getting Started";
    let detail = "Complete lessons and take domain quizzes to build your readiness profile.";
    let tone = "amber";
    if (ready) {
      label = "Exam Ready";
      detail = "You've completed all lessons, scored 85%+ on your last two full mock exams, and no domain is below 75%. Recommendation study plans are guidance, not a guarantee — book your exam when you feel confident.";
      tone = "green";
    } else if (allLessonsDone && domainScores.some((d) => d.best !== null)) {
      label = "Building Readiness";
      detail = "You've made real progress. Keep taking domain quizzes until each domain is at 75%+ and run two full mock exams scoring 85%+ before you consider yourself exam-ready.";
      tone = "blue";
    }
    return { label, detail, tone, domainScores, allLessonsDone, mockAttempts };
  }

  function renderDashboard() {
    const wrap = el("<div></div>");
    const pct = Math.round((completedCount() / TOTAL_LESSONS) * 100);
    const r = readiness();
    const plan = state.plan;
    const planDays = buildStudyPlan();
    const firstUnchecked = planDays.find((d) => !plan.checkedDays[d.day]);
    const currentDay = firstUnchecked ? firstUnchecked.day : 100;
    const daysChecked = Object.keys(plan.checkedDays).length;
    const streak = currentStreakCount();
    const next = nextIncompleteLesson();
    const nextFull = next ? findLessonFull(next.lessonId) : null;
    const nextMod = next ? moduleOfLesson(next.lessonId) : null;
    const nextIdx = next ? allLessonIds().indexOf(next.lessonId) + 1 : 0;
    const started = completedCount() > 0;

    wrap.innerHTML =
      '<div class="resume"><div>' +
      '<div class="eyebrow">' + (next ? (started ? "Pick up where you left off" : "Start here") : "Course complete") + "</div>" +
      (next
        ? "<h1>" + escapeHtml(next.title) + "</h1>" +
          "<p>" + escapeHtml(nextMod ? nextMod.label + ": " + nextMod.title : "") + " &middot; Lesson " + nextIdx + " of " + TOTAL_LESSONS +
          (nextFull && nextFull.lesson.minutes ? " &middot; " + nextFull.lesson.minutes + " min" : "") + "</p>" +
          '<div class="btn-row" style="margin:0;"><button class="btn btn-primary" data-continue-lesson="' + next.lessonId + '">' + (started ? "Resume lesson" : "Start first lesson") + " " + icon("chevronRight", 15) + '</button>' +
          '<button class="btn" data-goto="course">Course content</button></div>'
        : "<h1>Every lesson is marked complete</h1><p>Head to the Practice Center and run a full mock exam. Aim for 85% or better, twice in a row.</p>" +
          '<div class="btn-row" style="margin:0;"><button class="btn btn-primary" data-goto="practice">Open Practice Center</button></div>') +
      "</div>" +
      '<div class="resume-side">' +
      (streak > 0 ? '<div class="streak"><b>' + streak + "</b><span>day streak</span></div>" : "") +
      progressRing(pct, { size: 104, stroke: 8, color: "var(--accent)", trackColor: "var(--border)", label: pct + "%", sub: "complete" }) +
      "</div></div>" +

      '<div class="card-grid">' +
        statCard(completedCount() + " / " + TOTAL_LESSONS, "Lessons completed") +
        statCard("Day " + currentDay + " / 100", daysChecked + " study days checked off") +
        statCard(state.quizHistory.length, "Practice attempts logged") +
        statCard(r.label, "Readiness status", r.tone) +
      "</div>" +

      "<h2>Modules</h2>" +
      '<div class="module-table">' +
      courseModules().map((m) => {
        const done = m.lessons.filter((l) => state.completedLessons[l.id]).length;
        const mpct = Math.round((done / m.lessons.length) * 100);
        const best = m.id === "fund" ? null : domainBestScore(m.id);
        const scope = m.id === "fund" ? "fund" : m.id;
        return (
          '<div class="module-row" style="--domain-color:' + m.color + ';">' +
          '<span class="domain-badge" style="--domain-color:' + m.color + ';">' + (m.id === "fund" ? "M0" : "D" + m.id.slice(1)) + "</span>" +
          '<div><b>' + escapeHtml(m.title) + '</b><span class="mr-sub">' + done + " / " + m.lessons.length + " lessons" +
          (m.weight ? " &middot; " + m.weight + "% of exam" : "") + (best !== null ? " &middot; best quiz " + best + "%" : "") + "</span></div>" +
          progressBar(mpct) +
          '<div class="module-actions"><button class="btn btn-sm" data-goto="' + m.route + (m.param ? "/" + m.param : "") + '">Open</button>' +
          '<button class="btn btn-sm" data-practice-domain="' + scope + '">Practice</button></div></div>'
        );
      }).join("") +
      "</div>" +

      '<div class="card" style="margin-top:22px;"><h3 style="margin-top:0;">Readiness</h3><p style="margin-bottom:0;">' + escapeHtml(r.detail) + "</p></div>" +

      focusAreasCard() +
      bookmarkedLessonsSection();

    wrap.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => {
      const target = b.getAttribute("data-goto").split("/");
      navigate(target[0], target[1] || null);
    }));
    wireContinueButtons(wrap);
    wirePracticeDomainButtons(wrap);
    wireScopeButtons(wrap);
    return wrap;
  }

  function statCard(value, label, tone) {
    const toneColor = tone === "green" ? "var(--green)" : tone === "amber" ? "var(--amber)" : tone === "blue" ? "var(--blue)" : "var(--text-primary)";
    return (
      '<div class="stat-card"><div class="stat-value" style="color:' + toneColor + ';">' +
      escapeHtml(String(value)) + '</div><div class="stat-label">' + escapeHtml(label) + "</div></div>"
    );
  }

  /* ============================= EXAM OVERVIEW ============================= */

  function renderExamOverview() {
    const wrap = el("<div></div>");
    const totalWeight = DOMAINS.reduce((sum, d) => sum + d.weight, 0);

    wrap.innerHTML =
      '<div class="eyebrow">Official Exam Snapshot</div>' +
      "<h1>Exam Overview</h1>" +
      '<p class="lede">The facts below describe the certification exam itself, not this study platform. Policies and dates can change &mdash; always verify current details on the official CompTIA Security+ page before scheduling.</p>' +

      '<div class="card">' +
      '<div class="table-wrap"><table><tbody>' +
      EXAM_FACTS.rows.map((r) => "<tr><th style=\"width:230px;\">" + escapeHtml(r.label) + "</th><td>" + escapeHtml(r.value) + "</td></tr>").join("") +
      "</tbody></table></div>" +
      '<div style="margin-top:12px;font-size:12.5px;color:var(--text-muted);display:flex;flex-wrap:wrap;gap:14px;align-items:center;">' +
      "<span>Last reviewed: " + escapeHtml(new Date(EXAM_FACTS.lastReviewed + "T00:00:00").toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })) + "</span>" +
      '<a href="' + escapeHtml(EXAM_FACTS.officialUrl) + '" target="_blank" rel="noopener noreferrer">Verify on the official CompTIA Security+ page &rarr;</a>' +
      "</div></div>" +

      taglishBlock(EXAM_FACTS.taglish) +

      "<h2>Domain Weighting</h2>" +
      '<p class="lede">Security+ SY0-701 weights its five domains unevenly &mdash; Security Operations alone is nearly a third of the exam. Study time should follow that weighting, which is exactly how the 100-Day Plan allocates days.</p>' +
      '<div class="card">' +
      DOMAINS.map((d) => (
        '<div style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:13.5px;">' +
        '<div style="display:flex;align-items:center;gap:9px;"><span class="domain-badge" style="--domain-color:' + DOMAIN_COLORS[d.id] + ';">D' + d.number + "</span><b>" + escapeHtml(d.title) + "</b></div>" +
        '<span class="tag tag-accent">' + d.weight + "%</span></div>" +
        progressBar(d.weight) +
        "</div>"
      )).join("") +
      '<div style="font-size:12px;color:var(--text-muted);">Weights total ' + totalWeight + "%.</div>" +
      "</div>" +

      '<div class="btn-row"><button class="btn btn-primary" data-goto="fundamentals">' + icon("book", 16) + " Start with the Fundamentals Refresher</button>" +
      '<button class="btn" data-goto="dashboard">' + icon("dashboard", 16) + " Back to Dashboard</button></div>";

    wrap.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => navigate(b.getAttribute("data-goto"))));
    return wrap;
  }

  /* ============================= MODULE PAGES ============================= */

  function renderFundamentals() {
    const mod = courseModules()[0];
    return renderModulePage(mod, {
      eyebrow: "Module 0 · Prerequisite refresher",
      title: "A+ / Network+ Fundamentals Refresher",
      blurb: "Security+ assumes you already know this material. Work through it before the five exam domains if it has been a while since your A+ or Network+ studies.",
      practiceScope: "fund",
      practiceLabel: "Fundamentals check",
      groupByTag: true
    });
  }

  function renderDomainPage(domainId) {
    const d = domainById(domainId) || DOMAINS[0];
    const mod = courseModules().find((m) => m.id === d.id);
    return renderModulePage(mod, {
      eyebrow: "Domain " + d.number + " · " + d.weight + "% of the exam",
      title: d.title,
      blurb: d.blurb,
      practiceScope: d.id,
      practiceLabel: "D" + d.number + " questions",
      best: domainBestScore(d.id)
    });
  }

  function lessonListItem(l, i) {
    const done = !!state.completedLessons[l.id];
    const summary = QUICK_SUMMARIES[l.id] || "";
    return (
      '<div class="lesson-list-item" data-open-lesson="' + l.id + '" tabindex="0" role="link">' +
      '<span class="ll-num">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<div class="ll-main"><div class="ll-title">' + escapeHtml(l.title) + "</div>" +
      (summary ? '<div class="ll-sum">' + escapeHtml(summary.length > 150 ? summary.slice(0, 147).replace(/\s+\S*$/, "") + "…" : summary) + "</div>" : "") + "</div>" +
      '<div class="ll-meta">' +
      (state.bookmarks[l.id] ? icon("star", 14) : "") +
      (l.flagship ? '<span class="tag tag-blue">Flagship</span>' : l.tag && /^\d/.test(l.tag) ? '<span class="tag">Obj ' + escapeHtml(l.tag) + "</span>" : "") +
      (l.minutes ? '<span class="tag">' + l.minutes + " min</span>" : "") +
      (done ? '<span class="badge-complete">' + icon("check", 14) + " Done</span>" : "") +
      "</div></div>"
    );
  }

  function renderModulePage(mod, o) {
    const wrap = el("<div></div>");
    const done = mod.lessons.filter((l) => state.completedLessons[l.id]).length;
    const nextLesson = mod.lessons.find((l) => !state.completedLessons[l.id]);
    const startLesson = nextLesson || mod.lessons[0];

    wrap.innerHTML =
      '<div class="breadcrumb"><a href="#/course">Course</a> / ' + escapeHtml(mod.label) + "</div>" +
      '<div class="eyebrow">' + escapeHtml(o.eyebrow) + "</div>" +
      "<h1>" + escapeHtml(o.title) + "</h1>" +
      '<p class="lede">' + escapeHtml(o.blurb) + "</p>" +
      '<div class="btn-row" style="align-items:center;">' +
      '<button class="btn btn-primary" data-open-lesson="' + startLesson.id + '">' +
      (done === 0 ? "Start module" : nextLesson ? "Continue module" : "Review module") + " " + icon("chevronRight", 15) + "</button>" +
      '<button class="btn" data-practice-domain="' + o.practiceScope + '">Practice: ' + escapeHtml(o.practiceLabel) + "</button>" +
      '<span class="tag">' + done + " / " + mod.lessons.length + " lessons done</span>" +
      (o.best === undefined ? "" : '<span class="tag">' + (o.best === null ? "No quiz attempts yet" : "Best score " + o.best + "%") + "</span>") +
      "</div>" +
      progressBar((done / mod.lessons.length) * 100);

    if (o.groupByTag) {
      let category = null;
      let group = null;
      mod.lessons.forEach((l, i) => {
        if (l.tag !== category) {
          category = l.tag;
          wrap.appendChild(el("<h2>" + escapeHtml(category) + " topics</h2>"));
          group = el('<div class="lesson-list"></div>');
          wrap.appendChild(group);
        }
        group.insertAdjacentHTML("beforeend", lessonListItem(l, i));
      });
    } else {
      const list = el('<div class="lesson-list" style="margin-top:22px;"></div>');
      list.innerHTML = mod.lessons.map(lessonListItem).join("");
      wrap.appendChild(list);
    }

    wireOpenLesson(wrap);
    wirePracticeDomainButtons(wrap);
    return wrap;
  }

  function wireOpenLesson(container) {
    container.querySelectorAll("[data-open-lesson]").forEach((node) => {
      const go = () => navigate("lesson", node.getAttribute("data-open-lesson"));
      node.addEventListener("click", go);
      node.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    });
  }

  /* ============================= COURSE CONTENT PAGE ============================= */

  function renderCoursePage() {
    const wrap = el("<div></div>");
    const pct = Math.round((completedCount() / TOTAL_LESSONS) * 100);
    wrap.innerHTML =
      '<div class="eyebrow">Syllabus</div><h1>Course content</h1>' +
      '<p class="lede">' + TOTAL_LESSONS + " lessons across the refresher and the five SY0-701 domains. Open or close any section; the same outline stays beside every lesson (press <kbd>O</kbd> to hide it).</p>" +
      '<div class="btn-row" style="align-items:center;"><button class="btn btn-sm" data-ol-all="expand">Expand all</button><button class="btn btn-sm" data-ol-all="collapse">Collapse all</button><span class="tag">' + completedCount() + " / " + TOTAL_LESSONS + " complete (" + pct + "%)</span></div>" +
      '<div class="outline-page" style="margin-top:14px;">' + outlineModulesHtml(null) + "</div>";
    wireOutline(wrap, null);
    return wrap;
  }

  /* ============================= PRACTICE / QUIZ ENGINE ============================= */

  let pendingQuizScope = null;
  let activeQuiz = null;

  const SCOPE_LABELS = {
    mock: "All Domains (Full Mock Exam Pool)",
    fund: "Fundamentals Check (A+/Network+)",
    d1: "D1 &middot; General Security Concepts",
    d2: "D2 &middot; Threats, Vulnerabilities, and Mitigations",
    d3: "D3 &middot; Security Architecture",
    d4: "D4 &middot; Security Operations",
    d5: "D5 &middot; Security Program Management",
    missed: "Missed Questions (Need Review)",
    flagged: "Flagged Questions"
  };

  function questionsForScope(scope) {
    if (scope === "mock") return QUESTIONS.filter((q) => q.domainId !== "fund");
    if (scope === "fund") return QUESTIONS.filter((q) => q.domainId === "fund");
    if (scope === "missed") return QUESTIONS.filter((q) => state.missedQuestions[q.id]);
    if (scope === "flagged") return QUESTIONS.filter((q) => state.flaggedQuestions[q.id]);
    return QUESTIONS.filter((q) => q.domainId === scope);
  }

  function renderPractice() {
    if (activeQuiz && activeQuiz.phase === "active") return renderActiveQuiz();
    if (activeQuiz && activeQuiz.phase === "results") return renderQuizResults();
    return renderQuizBuilder();
  }

  function renderQuizBuilder() {
    const wrap = el("<div></div>");
    const defaultScope = pendingQuizScope || "mock";
    pendingQuizScope = null;

    wrap.innerHTML =
      '<div class="eyebrow">Practice Center</div>' +
      "<h1>Build a Practice Quiz</h1>" +
      '<p class="lede">Choose a scope, a question count, and a mode. Every question includes an explanation for the correct answer and why each other choice is wrong.</p>' +
      '<div class="card">' +
      '<label style="display:block;font-weight:600;margin-bottom:6px;">Scope</label>' +
      '<select class="select-input" id="qz-scope" style="width:100%;margin-bottom:14px;">' +
      Object.keys(SCOPE_LABELS).map((k) => {
        const n = questionsForScope(k).length;
        return '<option value="' + k + '"' + (k === defaultScope ? " selected" : "") + ">" + SCOPE_LABELS[k] + " (" + n + ")</option>";
      }).join("") +
      "</select>" +
      '<label style="display:block;font-weight:600;margin-bottom:6px;">Number of Questions</label>' +
      '<select class="select-input" id="qz-count" style="width:100%;margin-bottom:14px;"></select>' +
      '<div id="qz-empty-msg" class="lede" style="display:none;margin:-6px 0 14px;"></div>' +
      '<label style="display:block;font-weight:600;margin-bottom:6px;">Mode</label>' +
      '<select class="select-input" id="qz-mode" style="width:100%;margin-bottom:14px;">' +
      '<option value="practice">Practice &mdash; feedback after each question</option>' +
      '<option value="exam">Exam Simulation &mdash; feedback only at the end</option>' +
      "</select>" +
      '<label style="display:block;font-weight:600;margin-bottom:6px;">Timer (optional)</label>' +
      '<select class="select-input" id="qz-timer" style="width:100%;margin-bottom:14px;">' +
      '<option value="0">No timer</option><option value="10">10 minutes</option><option value="20">20 minutes</option><option value="45">45 minutes</option><option value="90">90 minutes (full exam pacing)</option>' +
      "</select>" +
      '<button class="btn btn-primary" id="qz-start">Start Quiz</button>' +
      "</div>" +
      '<div class="card"><h3 style="margin-top:0;">Recent Attempts</h3>' + recentAttemptsList() + "</div>";

    const scopeSelect = wrap.querySelector("#qz-scope");
    const countSelect = wrap.querySelector("#qz-count");
    const startBtn = wrap.querySelector("#qz-start");
    const emptyMsg = wrap.querySelector("#qz-empty-msg");

    function refreshCounts() {
      const total = questionsForScope(scopeSelect.value).length;
      if (total === 0) {
        countSelect.innerHTML = "";
        countSelect.style.display = "none";
        startBtn.disabled = true;
        emptyMsg.style.display = "block";
        emptyMsg.textContent = scopeSelect.value === "flagged"
          ? "You haven't flagged any questions yet. Flag a question during a quiz to review it here later."
          : "No missed questions right now — nice work. Questions you get wrong will show up here for focused review.";
        return;
      }
      countSelect.style.display = "";
      startBtn.disabled = false;
      emptyMsg.style.display = "none";
      const opts = [5, 10, 15, 20, 30].filter((n) => n < total);
      opts.push(total);
      countSelect.innerHTML = opts.map((n) => '<option value="' + n + '">' + n + " questions</option>").join("");
    }
    scopeSelect.addEventListener("change", refreshCounts);
    refreshCounts();

    startBtn.addEventListener("click", () => {
      const scope = scopeSelect.value;
      const count = parseInt(countSelect.value, 10);
      const mode = wrap.querySelector("#qz-mode").value;
      const timerMin = parseInt(wrap.querySelector("#qz-timer").value, 10);
      startQuiz(scope, count, mode, timerMin);
    });

    return wrap;
  }

  function recentAttemptsList() {
    if (state.quizHistory.length === 0) return '<p class="lede" style="margin:0;">No attempts yet. Your quiz history will appear here.</p>';
    const recent = state.quizHistory.slice(-6).reverse();
    return (
      '<div class="table-wrap"><table><thead><tr><th>Date</th><th>Scope</th><th>Score</th><th>Mode</th></tr></thead><tbody>' +
      recent.map((a) => {
        const pct = Math.round((a.correct / a.total) * 100);
        return "<tr><td>" + escapeHtml(new Date(a.date).toLocaleDateString()) + "</td><td>" + (SCOPE_LABELS[a.scopeKey] || a.scopeKey) + "</td><td>" + a.correct + "/" + a.total + " (" + pct + "%)</td><td>" + escapeHtml(a.mode) + "</td></tr>";
      }).join("") +
      "</tbody></table></div>"
    );
  }

  function startQuiz(scope, count, mode, timerMin) {
    const pool = shuffle(questionsForScope(scope));
    const questions = pool.slice(0, count).map((q) => Object.assign({}, q, { choices: shuffle(q.choices) }));
    activeQuiz = {
      phase: "active",
      scope: scope,
      mode: mode,
      questions: questions,
      index: 0,
      answers: {},
      startedAt: Date.now(),
      timerMin: timerMin,
      secondsLeft: timerMin > 0 ? timerMin * 60 : null,
      timerHandle: null
    };
    render();
  }

  function renderActiveQuiz() {
    const wrap = el("<div></div>");
    const q = activeQuiz.questions[activeQuiz.index];
    const total = activeQuiz.questions.length;
    const flagged = !!state.flaggedQuestions[q.id];
    const selected = activeQuiz.answers[q.id] ? activeQuiz.answers[q.id].picked : [];
    const revealed = activeQuiz.mode === "practice" && !!activeQuiz.answers[q.id] && activeQuiz.answers[q.id].checked;

    wrap.innerHTML =
      '<div class="quiz-progress">Question ' + (activeQuiz.index + 1) + " of " + total + " &middot; " + (SCOPE_LABELS[activeQuiz.scope] || activeQuiz.scope) +
      (activeQuiz.secondsLeft !== null ? ' &middot; <span id="qz-timer-display">' + formatTime(activeQuiz.secondsLeft) + "</span>" : "") + "</div>" +
      '<div class="progress-track" style="margin-bottom:16px;"><div class="progress-fill" style="width:' + Math.round(((activeQuiz.index) / total) * 100) + '%"></div></div>' +
      '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">' +
      "<h3 style=\"margin-top:0;\">" + escapeHtml(q.prompt) + "</h3>" +
      '<button class="btn btn-sm" id="qz-flag">' + (flagged ? "Flagged" : "Flag") + "</button></div>" +
      (q.type === "multi" ? '<p style="font-size:12.5px;color:var(--text-muted);">Select all that apply.</p>' : "") +
      '<div id="qz-choices"></div>' +
      '<div id="qz-explanation"></div>' +
      '<div class="btn-row">' +
      (activeQuiz.mode === "practice" ? '<button class="btn btn-primary" id="qz-check">Check Answer</button>' : "") +
      '<button class="btn" id="qz-next">' + (activeQuiz.index === total - 1 ? "Finish Quiz" : "Next Question") + "</button>" +
      "</div></div>";

    const choicesWrap = wrap.querySelector("#qz-choices");
    q.choices.forEach((c) => {
      const isPicked = selected.indexOf(c.id) !== -1;
      const isCorrectChoice = Array.isArray(q.correct) ? q.correct.indexOf(c.id) !== -1 : q.correct === c.id;
      let cls = "quiz-choice" + (isPicked ? " selected" : "");
      if (revealed) {
        if (isCorrectChoice) cls += " correct";
        else if (isPicked && !isCorrectChoice) cls += " incorrect";
      }
      const row = el(
        '<label class="' + cls + '"><input type="' + (q.type === "multi" ? "checkbox" : "radio") + '" ' + (isPicked ? "checked" : "") + "></input><span>" + escapeHtml(c.text) + "</span></label>"
      );
      if (!revealed || activeQuiz.mode === "exam") {
        row.addEventListener("click", (ev) => {
          ev.preventDefault();
          if (revealed) return;
          selectChoice(q, c.id);
          render();
        });
      }
      choicesWrap.appendChild(row);
    });

    if (revealed) {
      const wasCorrect = activeQuiz.answers[q.id].isCorrect;
      const expBox = wrap.querySelector("#qz-explanation");
      expBox.innerHTML =
        '<div class="quiz-explanation ' + (wasCorrect ? "correct" : "incorrect") + '"><b>' + (wasCorrect ? "Correct. " : "Not quite. ") + "</b>" + escapeHtml(q.explanation) +
        (!wasCorrect ? "<br><br>" + wrongChoiceExplanations(q, selected) : "") +
        "</div>";
    }

    const checkBtn = wrap.querySelector("#qz-check");
    if (checkBtn) {
      checkBtn.disabled = selected.length === 0;
      checkBtn.addEventListener("click", () => {
        gradeCurrentAnswer(q);
        render();
      });
    }

    wrap.querySelector("#qz-flag").addEventListener("click", () => {
      if (state.flaggedQuestions[q.id]) delete state.flaggedQuestions[q.id];
      else state.flaggedQuestions[q.id] = true;
      saveState();
      render();
    });

    wrap.querySelector("#qz-next").addEventListener("click", () => {
      if (!activeQuiz.answers[q.id]) gradeCurrentAnswer(q);
      if (activeQuiz.index < total - 1) {
        activeQuiz.index++;
        render();
      } else {
        finishQuiz();
      }
    });

    if (activeQuiz.secondsLeft !== null && !activeQuiz.timerHandle) {
      activeQuiz.timerHandle = setInterval(() => {
        activeQuiz.secondsLeft--;
        const disp = document.getElementById("qz-timer-display");
        if (disp) disp.textContent = formatTime(activeQuiz.secondsLeft);
        if (activeQuiz.secondsLeft <= 0) {
          clearInterval(activeQuiz.timerHandle);
          finishQuiz();
        }
      }, 1000);
    }

    return wrap;
  }

  function wrongChoiceExplanations(q, selected) {
    const wrongIds = selected.filter((id) => (Array.isArray(q.correct) ? q.correct.indexOf(id) === -1 : id !== q.correct));
    return wrongIds.map((id) => {
      const choice = q.choices.find((c) => c.id === id);
      const reason = q.distractorExplanations && q.distractorExplanations[id];
      return "<b>" + escapeHtml(choice ? choice.text : id) + ":</b> " + escapeHtml(reason || "This is not correct.");
    }).join("<br>");
  }

  function selectChoice(q, choiceId) {
    if (!activeQuiz.answers[q.id]) activeQuiz.answers[q.id] = { picked: [], checked: false, isCorrect: false };
    const ans = activeQuiz.answers[q.id];
    if (ans.checked && activeQuiz.mode === "practice") return;
    if (q.type === "multi") {
      const idx = ans.picked.indexOf(choiceId);
      if (idx === -1) ans.picked.push(choiceId);
      else ans.picked.splice(idx, 1);
    } else {
      ans.picked = [choiceId];
    }
  }

  function gradeCurrentAnswer(q) {
    if (!activeQuiz.answers[q.id]) activeQuiz.answers[q.id] = { picked: [], checked: false, isCorrect: false };
    const ans = activeQuiz.answers[q.id];
    const correctSet = Array.isArray(q.correct) ? q.correct.slice().sort() : [q.correct];
    const pickedSet = ans.picked.slice().sort();
    ans.isCorrect = JSON.stringify(correctSet) === JSON.stringify(pickedSet);
    ans.checked = true;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function finishQuiz() {
    if (activeQuiz.timerHandle) clearInterval(activeQuiz.timerHandle);
    activeQuiz.questions.forEach((q) => {
      if (!activeQuiz.answers[q.id]) activeQuiz.answers[q.id] = { picked: [], checked: false, isCorrect: false };
      if (!activeQuiz.answers[q.id].checked) gradeCurrentAnswer(q);
    });
    const correct = activeQuiz.questions.filter((q) => activeQuiz.answers[q.id].isCorrect).length;
    const domainBreakdown = {};
    activeQuiz.questions.forEach((q) => {
      if (!domainBreakdown[q.domainId]) domainBreakdown[q.domainId] = { correct: 0, total: 0 };
      domainBreakdown[q.domainId].total++;
      if (activeQuiz.answers[q.id].isCorrect) domainBreakdown[q.domainId].correct++;
      if (activeQuiz.answers[q.id].isCorrect) delete state.missedQuestions[q.id];
      else state.missedQuestions[q.id] = true;
    });
    const record = {
      date: Date.now(),
      scopeKey: activeQuiz.scope,
      mode: activeQuiz.mode,
      correct: correct,
      total: activeQuiz.questions.length,
      timeSeconds: Math.round((Date.now() - activeQuiz.startedAt) / 1000),
      domainBreakdown: domainBreakdown
    };
    state.quizHistory.push(record);
    recordActivity();
    saveState();
    activeQuiz.phase = "results";
    render();
  }

  function renderQuizResults() {
    const wrap = el("<div></div>");
    const q = activeQuiz;
    const correct = q.questions.filter((qq) => q.answers[qq.id].isCorrect).length;
    const total = q.questions.length;
    const pct = Math.round((correct / total) * 100);

    const domainBreakdown = {};
    q.questions.forEach((qq) => {
      if (!domainBreakdown[qq.domainId]) domainBreakdown[qq.domainId] = { correct: 0, total: 0 };
      domainBreakdown[qq.domainId].total++;
      if (q.answers[qq.id].isCorrect) domainBreakdown[qq.domainId].correct++;
    });

    wrap.innerHTML =
      '<div class="eyebrow">Quiz Results</div>' +
      "<h1>" + pct + "% (" + correct + " / " + total + ")</h1>" +
      '<p class="lede">' + (SCOPE_LABELS[q.scope] || q.scope) + " &middot; " + escapeHtml(q.mode) + " mode &middot; " + formatTime(Math.round((Date.now() - q.startedAt) / 1000)) + " elapsed</p>" +
      '<div class="card"><h3 style="margin-top:0;">Domain Breakdown</h3>' +
      Object.keys(domainBreakdown).map((dk) => {
        const b = domainBreakdown[dk];
        const dpct = Math.round((b.correct / b.total) * 100);
        return '<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;font-size:13px;"><span>' + (SCOPE_LABELS[dk] || dk) + "</span><span>" + b.correct + "/" + b.total + "</span></div>" + progressBar(dpct) + "</div>";
      }).join("") +
      "</div>" +
      '<div class="btn-row"><button class="btn btn-primary" id="qz-retry">Start Another Quiz</button><button class="btn" id="qz-review-toggle">Review Questions</button></div>' +
      '<div id="qz-review"></div>';

    wrap.querySelector("#qz-retry").addEventListener("click", () => { activeQuiz = null; render(); });
    wrap.querySelector("#qz-review-toggle").addEventListener("click", () => {
      const box = wrap.querySelector("#qz-review");
      box.innerHTML = box.innerHTML ? "" : q.questions.map((qq, i) => reviewItem(qq, i, q.answers[qq.id])).join("");
    });

    return wrap;
  }

  function reviewItem(q, i, ans) {
    const flagged = !!state.flaggedQuestions[q.id];
    return (
      '<div class="card"><div style="display:flex;justify-content:space-between;"><b>Q' + (i + 1) + ". " + escapeHtml(q.prompt) + "</b>" +
      (flagged ? '<span class="tag tag-amber">Flagged</span>' : "") + "</div>" +
      '<div style="margin-top:8px;">' +
      q.choices.map((c) => {
        const isCorrectChoice = Array.isArray(q.correct) ? q.correct.indexOf(c.id) !== -1 : q.correct === c.id;
        const wasPicked = ans.picked.indexOf(c.id) !== -1;
        let cls = "quiz-choice";
        if (isCorrectChoice) cls += " correct";
        else if (wasPicked) cls += " incorrect";
        return '<div class="' + cls + '">' + escapeHtml(c.text) + (wasPicked ? " (your answer)" : "") + "</div>";
      }).join("") +
      '</div><div class="quiz-explanation ' + (ans.isCorrect ? "correct" : "incorrect") + '">' + escapeHtml(q.explanation) + "</div></div>"
    );
  }

  /* ============================= LABS ============================= */

  function renderLabsPage() {
    const wrap = el("<div></div>");
    wrap.innerHTML =
      '<div class="eyebrow">Hands-On</div>' +
      "<h1>Labs / SOC Simulator</h1>" +
      '<p class="lede">Safe, simulated evidence only &mdash; fictional IPs, fictional domains, fictional people. No lab ever asks you to attack, scan, or access a real system.</p>';

    const grid = el('<div class="card-grid"></div>');
    LABS.forEach((lab) => {
      const progress = state.labProgress[lab.id];
      const doneCount = progress ? Object.keys(progress.tasksCorrect || {}).length : 0;
      const card = el(
        '<button class="domain-card"><div class="domain-card-head"><span class="domain-title">' + escapeHtml(lab.title) + '</span><span class="tag">' + lab.minutes + " min</span></div>" +
        '<p style="margin:8px 0 0;font-size:13px;">' + escapeHtml(lab.objective) + "</p>" +
        '<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">' + doneCount + " / " + lab.tasks.length + " tasks correct</div></button>"
      );
      card.addEventListener("click", () => navigate("lab", lab.id));
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  function renderLabDetail(labId) {
    const lab = LABS.find((l) => l.id === labId) || LABS[0];
    const wrap = el("<div></div>");
    if (!state.labProgress[lab.id]) state.labProgress[lab.id] = { tasksCorrect: {}, reflection: "" };
    const progress = state.labProgress[lab.id];

    wrap.innerHTML =
      '<div class="breadcrumb"><a href="#/labs">&larr; Labs</a></div>' +
      "<h1>" + escapeHtml(lab.title) + "</h1>" +
      '<div class="btn-row"><span class="tag">' + lab.minutes + " min</span><span class=\"tag tag-accent\">" + (SCOPE_LABELS[lab.domainId] || lab.domainId) + "</span></div>" +
      '<div class="card"><div class="lesson-section-label">Objective</div><p>' + escapeHtml(lab.objective) + "</p>" +
      '<div class="lesson-section-label">Scenario</div><p>' + escapeHtml(lab.scenario) + "</p></div>" +
      '<div class="card"><div class="lesson-section-label">Evidence</div>' + evidenceBlock(lab.evidence) + "</div>" +
      '<div class="card"><div class="lesson-section-label">Hints</div>' +
      lab.hints.map((h) => '<details class="disclosure" style="margin-bottom:6px;"><summary>Hint</summary><div style="margin-top:6px;">' + escapeHtml(h) + "</div></details>").join("") +
      "</div>";

    const tasksWrap = el('<div></div>');
    tasksWrap.appendChild(el("<h2>Scenario Tasks</h2>"));
    lab.tasks.forEach((t) => tasksWrap.appendChild(labTaskCard(lab, t)));
    wrap.appendChild(tasksWrap);

    const reflectionCard = el(
      '<div class="card"><div class="lesson-section-label">Reflection</div><p>' + escapeHtml(lab.reflectionPrompt) + '</p>' +
      '<textarea class="notes-textarea" id="lab-reflection" placeholder="Write your answer here (saved automatically)...">' + escapeHtml(progress.reflection || "") + "</textarea></div>"
    );
    wrap.appendChild(reflectionCard);
    reflectionCard.querySelector("#lab-reflection").addEventListener("input", (e) => {
      progress.reflection = e.target.value;
      saveState();
    });

    return wrap;
  }

  function evidenceBlock(ev) {
    if (ev.type === "text") return '<pre style="white-space:pre-wrap;background:var(--surface-alt);border:1px solid var(--border);border-radius:6px;padding:12px;font-size:12.5px;">' + escapeHtml(ev.content) + "</pre>";
    return tableBlock({ headers: ev.headers, rows: ev.rows });
  }

  const labChoiceOrderCache = {};

  function labTaskCard(lab, task) {
    const progress = state.labProgress[lab.id];
    const answered = progress.tasksCorrect[task.id] !== undefined;
    const cacheKey = lab.id + ":" + task.id;
    if (!labChoiceOrderCache[cacheKey]) labChoiceOrderCache[cacheKey] = shuffle(task.choices);
    const orderedChoices = labChoiceOrderCache[cacheKey];
    const card = el('<div class="card"></div>');
    card.innerHTML = "<p><b>" + escapeHtml(task.prompt) + "</b></p><div class=\"lab-choices\"></div><div class=\"lab-explanation\"></div>";
    const choicesWrap = card.querySelector(".lab-choices");
    orderedChoices.forEach((c) => {
      const isCorrectChoice = c.id === task.correct;
      let cls = "quiz-choice";
      if (answered) {
        if (isCorrectChoice) cls += " correct";
      }
      const row = el('<label class="' + cls + '"><input type="radio" name="' + task.id + '"></input><span>' + escapeHtml(c.text) + "</span></label>");
      if (!answered) {
        row.addEventListener("click", () => {
          progress.tasksCorrect[task.id] = c.id === task.correct;
          saveState();
          render();
        });
      }
      choicesWrap.appendChild(row);
    });
    if (answered) {
      const wasCorrect = progress.tasksCorrect[task.id];
      card.querySelector(".lab-explanation").innerHTML =
        '<div class="quiz-explanation ' + (wasCorrect ? "correct" : "incorrect") + '">' + (wasCorrect ? "Correct. " : "Not quite. ") + escapeHtml(task.explanation) + "</div>";
    }
    return card;
  }

  /* ============================= GLOSSARY ============================= */

  const GLOSSARY_FILTERS = { fund: "A+/Net+", d1: "D1", d2: "D2", d3: "D3", d4: "D4", d5: "D5" };

  function renderGlossary() {
    const wrap = el("<div></div>");
    const prefillQuery = pendingGlossaryQuery || "";
    pendingGlossaryQuery = null;
    wrap.innerHTML =
      '<div class="eyebrow">Reference</div>' +
      "<h1>Glossary</h1>" +
      '<p class="lede">' + GLOSSARY.length + ' searchable terms with plain-language and technical definitions.</p>' +
      '<input class="search-input" id="gl-search" placeholder="Search terms, e.g. \'hashing\' or \'RTO\'..." value="' + escapeHtml(prefillQuery) + '">' +
      '<div class="filter-row" id="gl-filters">' +
      '<button class="filter-chip active" data-filter="all">All</button>' +
      Object.keys(GLOSSARY_FILTERS).map((k) => '<button class="filter-chip" data-filter="' + k + '">' + GLOSSARY_FILTERS[k] + "</button>").join("") +
      "</div>" +
      '<div id="gl-list"></div>';

    let activeFilter = "all";
    const listEl = wrap.querySelector("#gl-list");
    const searchEl = wrap.querySelector("#gl-search");

    function renderList() {
      const q = searchEl.value.trim().toLowerCase();
      const items = GLOSSARY.filter((g) => {
        if (activeFilter !== "all" && g.domain !== activeFilter) return false;
        if (!q) return true;
        return g.term.toLowerCase().indexOf(q) !== -1 || g.plain.toLowerCase().indexOf(q) !== -1 || g.technical.toLowerCase().indexOf(q) !== -1;
      });
      listEl.innerHTML = items.length === 0
        ? '<div class="empty-state">No terms match your search.</div>'
        : items.map((g) =>
            '<div class="glossary-item"><div class="glossary-term">' + escapeHtml(g.term) + '</div>' +
            '<div>' + escapeHtml(g.plain) + "</div>" +
            '<div style="font-size:12.5px;color:var(--text-secondary);margin-top:2px;"><b>Technical:</b> ' + escapeHtml(g.technical) + "</div>" +
            '<div class="glossary-example">Example: ' + escapeHtml(g.example) + "</div></div>"
          ).join("");
    }

    searchEl.addEventListener("input", renderList);
    wrap.querySelectorAll("[data-filter]").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeFilter = chip.getAttribute("data-filter");
        wrap.querySelectorAll("[data-filter]").forEach((c) => c.classList.toggle("active", c === chip));
        renderList();
      });
    });

    renderList();
    return wrap;
  }

  /* ============================= ACRONYMS ============================= */

  const ACRONYMS_SORTED = ACRONYMS.slice().sort((a, b) => a.acro.localeCompare(b.acro));

  function renderAcronyms() {
    const wrap = el("<div></div>");
    wrap.innerHTML =
      '<div class="eyebrow">Reference</div>' +
      "<h1>Acronyms</h1>" +
      '<p class="lede">' + ACRONYMS_SORTED.length + ' Security+ acronyms, expanded and explained in one line. The exam leans hard on acronym recall &mdash; use this the same way you\'d use the Glossary, but for the alphabet soup.</p>' +
      '<input class="search-input" id="ac-search" placeholder="Search an acronym, expansion, or meaning, e.g. \'MFA\' or \'certificate\'...">' +
      '<div id="ac-list"></div>';

    const listEl = wrap.querySelector("#ac-list");
    const searchEl = wrap.querySelector("#ac-search");

    function renderList() {
      const q = searchEl.value.trim().toLowerCase();
      const items = ACRONYMS_SORTED.filter((a) => {
        if (!q) return true;
        return a.acro.toLowerCase().indexOf(q) !== -1 || a.expansion.toLowerCase().indexOf(q) !== -1 || a.meaning.toLowerCase().indexOf(q) !== -1;
      });
      if (items.length === 0) {
        listEl.innerHTML = '<div class="empty-state">No acronyms match your search.</div>';
        return;
      }
      let html = "";
      let letter = null;
      items.forEach((a) => {
        const first = a.acro.replace(/[^A-Za-z]/, "")[0] ? a.acro.replace(/[^A-Za-z]/, "")[0].toUpperCase() : a.acro[0].toUpperCase();
        if (first !== letter) {
          letter = first;
          html += '<div class="acronym-letter">' + letter + "</div>";
        }
        html +=
          '<div class="glossary-item"><div class="glossary-term">' + escapeHtml(a.acro) +
          '<span class="tag tag-accent" style="margin-left:8px;">' + escapeHtml(a.expansion) + "</span></div>" +
          "<div>" + escapeHtml(a.meaning) + "</div></div>";
      });
      listEl.innerHTML = html;
    }

    searchEl.addEventListener("input", renderList);
    renderList();
    return wrap;
  }

  /* ============================= COMPARE & CONTRAST ============================= */

  function renderCompare() {
    const wrap = el("<div></div>");
    wrap.innerHTML =
      '<div class="eyebrow">Reference</div>' +
      "<h1>Compare &amp; Contrast</h1>" +
      '<p class="lede">Security+ mixes up these terms constantly. Each card has a quick table plus a Taglish memory hook.</p>';

    COMPARISONS.forEach((c) => {
      const card = el(
        '<div class="card"><h3 style="margin-top:0;">' + escapeHtml(c.title) + "</h3>" +
        tableBlock({ headers: ["Term", "Definition", "Example"], rows: c.rows }) +
        taglishBlock(c.taglish) +
        "</div>"
      );
      card.id = "compare-" + c.id;
      wrap.appendChild(card);
    });
    setTimeout(handlePendingScroll, 0);
    return wrap;
  }

  /* ============================= EXAM CRAM SHEET ============================= */

  function renderCramSheet() {
    const wrap = el("<div></div>");
    wrap.innerHTML =
      '<div class="eyebrow">Final Review</div>' +
      "<h1>Exam Cram Sheet</h1>" +
      '<p class="lede">Everything worth re-reading the night before: memorization mnemonics, must-know facts, and every Pro Tip from every lesson, grouped by domain.</p>' +
      '<div class="btn-row"><button class="btn btn-primary" id="cram-print">' + icon("book", 16) + " Print / Save as PDF</button></div>" +

      '<h2 style="display:flex;align-items:center;gap:8px;">' + icon("flame", 20) + " Mnemonics</h2>" +
      '<div class="card">' +
      MNEMONICS.map((m) => (
        '<div class="cram-item">' +
        '<div style="font-family:var(--font-display);font-weight:800;color:var(--violet);font-size:14px;">&ldquo;' + escapeHtml(m.line) + "&rdquo;</div>" +
        '<div style="font-size:13px;color:var(--text-secondary);margin-top:3px;">' + escapeHtml(m.expands) + "</div></div>"
      )).join("") +
      "</div>" +

      '<h2 style="display:flex;align-items:center;gap:8px;">' + icon("checkCircle", 20) + " Must-Memorize Facts</h2>" +
      '<div class="card">' +
      '<div class="table-wrap"><table><tbody>' +
      MUST_MEMORIZE.map((f) => "<tr><th style=\"width:220px;\">" + escapeHtml(f.label) + "</th><td>" + escapeHtml(f.value) + "</td></tr>").join("") +
      "</tbody></table></div>" +
      "</div>" +

      '<h2 style="display:flex;align-items:center;gap:8px;">' + icon("award", 20) + " Every Pro Tip, by Domain</h2>" +
      '<p class="lede">The same Pro Tips shown on each lesson, collected here for a fast final pass.</p>';

    const fundGroup = el(
      '<div class="card"><h3 style="margin-top:0;">A+/Network+ Fundamentals</h3>' +
      FUNDAMENTALS.map((f) => proTipListItem(f.title, f.id)).join("") +
      "</div>"
    );
    wrap.appendChild(fundGroup);

    DOMAINS.forEach((d) => {
      const lessons = [d.flagship, ...d.topics];
      const group = el(
        '<div class="card" style="border-left:4px solid ' + DOMAIN_COLORS[d.id] + ';"><h3 style="margin-top:0;display:flex;align-items:center;gap:8px;"><span class="domain-badge" style="--domain-color:' + DOMAIN_COLORS[d.id] + ';">D' + d.number + "</span>" + escapeHtml(d.title) + "</h3>" +
        lessons.map((l) => proTipListItem(l.title, l.id)).join("") +
        "</div>"
      );
      wrap.appendChild(group);
    });

    wrap.querySelector("#cram-print").addEventListener("click", () => window.print());
    return wrap;
  }

  function proTipListItem(title, lessonId) {
    const tip = PRO_TIPS[lessonId];
    if (!tip) return "";
    return (
      '<div class="cram-item">' +
      '<div style="font-size:12.5px;font-weight:700;color:var(--text-muted);margin-bottom:3px;">' + escapeHtml(title) + "</div>" +
      '<div class="pro-tip-box" style="margin:0;">' + icon("award", 15, "pro-tip-icon") + "<span>" + escapeHtml(tip) + "</span></div></div>"
    );
  }

  /* ============================= 100-DAY PLAN ============================= */

  function buildStudyPlan() {
    const days = [];
    days.push({ day: 1, phase: "Orientation", title: "Welcome, exam format, and diagnostic mindset", detail: "Understand SY0-701 format and scoring, read how this platform works, and set your study mindset for the next 100 days." });

    const fundChunks = chunkArray(FUNDAMENTALS, 9);
    fundChunks.forEach((chunk, i) => {
      days.push({
        day: 2 + i,
        phase: "Foundations",
        title: chunk.length ? chunk.map((c) => c.title).join(" + ") : "Review fundamentals notes and key terms",
        lessonIds: chunk.map((c) => c.id)
      });
    });

    const domainDayCounts = { d1: 10, d2: 18, d3: 14, d4: 22, d5: 16 };
    let day = 11;
    DOMAINS.forEach((domain) => {
      const total = domainDayCounts[domain.id];
      const quizDays = Math.max(2, Math.round(total * 0.2));
      const lessonDays = total - quizDays;
      const items = [domain.flagship, ...domain.topics];
      const chunks = chunkArray(items, lessonDays);
      chunks.forEach((chunk) => {
        days.push({
          day: day++,
          phase: "D" + domain.number,
          title: chunk.length ? "D" + domain.number + ": " + chunk.map((c) => c.title).join(" + ") : "D" + domain.number + " review: reread notes, glossary, and comparison tables",
          lessonIds: chunk.map((c) => c.id),
          domainId: domain.id
        });
      });
      for (let i = 0; i < quizDays; i++) {
        days.push({ day: day++, phase: "D" + domain.number, title: "Practice quiz: " + domain.title, domainId: domain.id, isQuizDay: true });
      }
    });

    const finalDays = [
      { phase: "Review", title: "Acronym and ports review (use the Glossary, filter each domain)" },
      { phase: "Review", title: "\"Choose the BEST answer\" and performance-based question strategy" },
      { phase: "Review", title: "Weak-domain review: revisit your lowest-scoring domain from the Dashboard" },
      { phase: "Mini Exam", title: "Timed mini exam: 15 questions (Practice Center, Mock scope)", isQuizDay: true },
      { phase: "Review", title: "Review every missed question from yesterday's mini exam" },
      { phase: "Mini Exam", title: "Timed mini exam: 30 questions (Practice Center, Mock scope)", isQuizDay: true },
      { phase: "Review", title: "Second weak-domain deep dive" },
      { phase: "Mini Exam", title: "Timed mini exam: 45 questions (Practice Center, Mock scope)", isQuizDay: true },
      { phase: "Mock Exam", title: "Full mock exam: up to 90 questions, 90-minute timer", isQuizDay: true },
      { phase: "Readiness", title: "Review your Dashboard readiness report and plan next steps" }
    ];
    finalDays.forEach((d) => days.push({ day: day++, phase: d.phase, title: d.title, isQuizDay: !!d.isQuizDay }));

    return days;
  }

  function addStudyDays(startDate, offset, skipWeekends) {
    const d = new Date(startDate + "T00:00:00");
    if (!skipWeekends) {
      d.setDate(d.getDate() + offset);
      return d;
    }
    let remaining = offset;
    while (remaining > 0) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow !== 0 && dow !== 6) remaining--;
    }
    return d;
  }

  function renderPlanPage() {
    const wrap = el("<div></div>");
    const days = buildStudyPlan();
    const plan = state.plan;
    const checkedCount = Object.keys(plan.checkedDays).length;
    const firstUnchecked = days.find((d) => !plan.checkedDays[d.day]);
    const currentDay = firstUnchecked ? firstUnchecked.day : 100;

    wrap.innerHTML =
      '<div class="eyebrow">Study Plan</div>' +
      "<h1>100-Day Study Plan</h1>" +
      '<p class="lede">Days are allocated proportionally to official exam weighting (12% / 22% / 18% / 28% / 20%), with a foundations block up front and a 10-day final review/mock-exam block at the end.</p>' +
      '<div class="card">' +
      '<div class="two-col">' +
      '<div><label style="display:block;font-weight:600;margin-bottom:6px;">Start Date</label><input type="date" class="text-input" id="plan-start" value="' + plan.startDate + '" style="width:100%;"></div>' +
      '<div><label style="display:block;font-weight:600;margin-bottom:6px;">Skip Weekends</label>' +
      '<label class="switch"><input type="checkbox" id="plan-skip-weekends"' + (plan.skipWeekends ? " checked" : "") + '><span class="switch-track"></span></label></div>' +
      "</div></div>" +
      '<div class="card-grid">' +
      statCard("calendar", "Day " + currentDay + " / 100", "Current recommended day") +
      statCard("checkCircle", checkedCount, "Days checked off") +
      statCard("target", Math.round((checkedCount / 100) * 100) + "%", "Plan completion") +
      "</div>" +
      '<div class="card" style="padding:0;"><div id="plan-list"></div></div>';

    const listWrap = wrap.querySelector("#plan-list");
    function renderList() {
      listWrap.innerHTML = days.map((d) => {
        const date = addStudyDays(plan.startDate, d.day - 1, plan.skipWeekends);
        const dateStr = date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
        const checked = !!plan.checkedDays[d.day];
        return (
          '<div class="plan-day-row' + (checked ? " done" : "") + '">' +
          '<input type="checkbox" data-plan-day="' + d.day + '"' + (checked ? " checked" : "") + ">" +
          '<span class="plan-day-num">Day ' + d.day + "</span>" +
          '<span class="plan-day-phase">' + escapeHtml(d.phase) + "</span>" +
          '<span class="plan-day-topic">' + escapeHtml(d.title) + "</span>" +
          '<span class="plan-day-date">' + dateStr + "</span>" +
          "</div>"
        );
      }).join("");
      listWrap.querySelectorAll("[data-plan-day]").forEach((cb) => {
        cb.addEventListener("change", () => {
          const dayNum = cb.getAttribute("data-plan-day");
          if (cb.checked) { plan.checkedDays[dayNum] = true; recordActivity(); }
          else delete plan.checkedDays[dayNum];
          saveState();
          renderList();
        });
      });
    }
    renderList();

    wrap.querySelector("#plan-start").addEventListener("change", (e) => { plan.startDate = e.target.value; saveState(); render(); });
    wrap.querySelector("#plan-skip-weekends").addEventListener("change", (e) => { plan.skipWeekends = e.target.checked; saveState(); renderList(); });

    return wrap;
  }

  /* ============================= SETTINGS ============================= */

  function renderSettings() {
    const wrap = el("<div></div>");
    wrap.innerHTML =
      '<div class="eyebrow">Settings</div>' +
      "<h1>Settings</h1>" +
      '<div class="card">' +
      settingsRow("Theme", "Light, dark, or match your system.", themeSelectHtml()) +
      settingsRow("Taglish Help", "Show the collapsible Taglish explanation on lessons and comparisons.", switchHtml("st-taglish", state.taglishEnabled)) +
      settingsRow("Reduced Motion", "Turn off transitions and animations.", switchHtml("st-motion", state.reducedMotion)) +
      settingsRow("Keyboard shortcuts", "Arrow keys move between lessons; C completes, O toggles course content, T toggles Taglish.", '<button class="btn" id="st-keys">View shortcuts</button>') +
      "</div>" +
      '<div class="card">' +
      settingsRow("Reset Progress", "Clears all completed lessons, quiz history, notes, and plan check-offs. This cannot be undone.", '<button class="btn" id="st-reset" style="border-color:var(--red);color:var(--red);">Reset Progress</button>') +
      "</div>" +
      '<div class="card"><h3 style="margin-top:0;">Export / Import Progress</h3><p style="font-size:13px;">Export your progress to a local JSON file as a backup, or import a previously exported file.</p>' +
      '<div class="btn-row"><button class="btn" id="st-export">Export Progress (JSON)</button><label class="btn" style="cursor:pointer;">Import Progress<input type="file" id="st-import" accept="application/json" style="display:none;"></label></div>' +
      '<div id="st-import-msg" style="font-size:12.5px;color:var(--text-muted);"></div></div>';

    wrap.querySelector("#theme-select").addEventListener("change", (e) => { state.theme = e.target.value; applyTheme(); saveState(); });
    wrap.querySelector("#st-taglish").addEventListener("change", (e) => { state.taglishEnabled = e.target.checked; saveState(); });
    wrap.querySelector("#st-keys").addEventListener("click", openKeysModal);
    wrap.querySelector("#st-motion").addEventListener("change", (e) => { state.reducedMotion = e.target.checked; applyMotion(); saveState(); });

    wrap.querySelector("#st-reset").addEventListener("click", () => {
      if (confirm("This will permanently erase all your Security+ Learning Path progress on this device. Continue?")) {
        state = defaultState();
        saveState();
        applyTheme();
        applyMotion();
        activeQuiz = null;
        navigate("dashboard");
      }
    });

    wrap.querySelector("#st-export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "secplus-progress-" + todayIso() + ".json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    wrap.querySelector("#st-import").addEventListener("change", (e) => {
      const file = e.target.files[0];
      const msg = wrap.querySelector("#st-import-msg");
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (!parsed || typeof parsed !== "object" || !("completedLessons" in parsed)) {
            msg.textContent = "That file doesn't look like a valid Security+ Learning Path export.";
            msg.style.color = "var(--red)";
            return;
          }
          if (!confirm("Import this progress file? It will replace your current progress on this device.")) return;
          const fresh = defaultState();
          state = Object.assign(fresh, parsed, { version: STATE_VERSION });
          saveState();
          applyTheme();
          applyMotion();
          msg.textContent = "Import successful.";
          msg.style.color = "var(--green)";
          render();
        } catch (err) {
          msg.textContent = "Could not read that file as valid JSON.";
          msg.style.color = "var(--red)";
        }
      };
      reader.readAsText(file);
    });

    return wrap;
  }

  function settingsRow(label, desc, control) {
    return (
      '<div class="settings-row"><div><div class="settings-row-label">' + escapeHtml(label) + '</div><div class="settings-row-desc">' + escapeHtml(desc) + "</div></div><div>" + control + "</div></div>"
    );
  }

  function themeSelectHtml() {
    return (
      '<select class="select-input" id="theme-select">' +
      ["system", "light", "dark"].map((t) => '<option value="' + t + '"' + (state.theme === t ? " selected" : "") + ">" + t[0].toUpperCase() + t.slice(1) + "</option>").join("") +
      "</select>"
    );
  }

  function switchHtml(id, checked) {
    return '<label class="switch"><input type="checkbox" id="' + id + '"' + (checked ? " checked" : "") + '><span class="switch-track"></span></label>';
  }

  /* ============================= THEME / MOTION ============================= */

  function applyTheme() {
    const root = document.documentElement;
    if (state.theme === "light") root.setAttribute("data-theme", "light");
    else if (state.theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }

  function applyMotion() {
    document.body.classList.toggle("reduced-motion", state.reducedMotion);
  }

  /* ============================= BOOTSTRAP ============================= */

  /* ============================= GLOBAL SEARCH ============================= */

  let searchIndexCache = null;

  function buildSearchIndex() {
    const items = [];
    FUNDAMENTALS.forEach((f) => {
      items.push({ type: "A+/Net+ Fundamentals", title: f.title, snippet: f.goal, route: "lesson", param: f.id });
    });
    DOMAINS.forEach((d) => {
      [d.flagship, ...d.topics].forEach((l) => {
        items.push({ type: "D" + d.number + " · " + d.title, title: l.title, snippet: l.goal, route: "lesson", param: l.id });
      });
    });
    GLOSSARY.forEach((g) => {
      items.push({ type: "Glossary", title: g.term, snippet: g.plain, route: "glossary", param: null, glossaryQuery: g.term });
    });
    ACRONYMS.forEach((a) => {
      items.push({ type: "Acronym", title: a.acro + " — " + a.expansion, snippet: a.meaning, route: "acronyms", param: null });
    });
    COMPARISONS.forEach((c) => {
      items.push({ type: "Compare & Contrast", title: c.title, snippet: c.taglish, route: "compare", param: null, scrollId: "compare-" + c.id });
    });
    return items;
  }

  function getSearchIndex() {
    if (!searchIndexCache) searchIndexCache = buildSearchIndex();
    return searchIndexCache;
  }

  function openSearchModal() {
    const backdrop = document.getElementById("search-modal-backdrop");
    backdrop.hidden = false;
    const input = document.getElementById("search-modal-input");
    input.value = "";
    renderSearchResults("");
    setTimeout(() => input.focus(), 20);
  }

  function closeSearchModal() {
    document.getElementById("search-modal-backdrop").hidden = true;
  }

  function renderSearchResults(query) {
    const resultsEl = document.getElementById("search-modal-results");
    const q = query.trim().toLowerCase();
    const index = getSearchIndex();
    const items = !q
      ? index.slice(0, 8)
      : index.filter((it) => it.title.toLowerCase().indexOf(q) !== -1 || (it.snippet && it.snippet.toLowerCase().indexOf(q) !== -1)).slice(0, 20);

    if (items.length === 0) {
      resultsEl.innerHTML = '<div class="search-empty">No matches. Try a different term.</div>';
      return;
    }
    resultsEl.innerHTML = items.map((it, i) => (
      '<div class="search-result-item' + (i === 0 ? " active" : "") + '" data-search-index="' + i + '">' +
      '<div class="search-result-meta">' + escapeHtml(it.type) + "</div>" +
      '<div class="search-result-title">' + escapeHtml(it.title) + "</div>" +
      (it.snippet ? '<div class="search-result-snippet">' + escapeHtml(it.snippet.slice(0, 110)) + "</div>" : "") +
      "</div>"
    )).join("");
    resultsEl.querySelectorAll("[data-search-index]").forEach((row) => {
      row.addEventListener("click", () => activateSearchResult(items[parseInt(row.getAttribute("data-search-index"), 10)]));
    });
  }

  function activateSearchResult(item) {
    closeSearchModal();
    if (item.scrollId) pendingScrollTargetId = item.scrollId;
    if (item.glossaryQuery) pendingGlossaryQuery = item.glossaryQuery;
    navigate(item.route, item.param);
  }

  /* ============================= SHORTCUTS & SHELL ============================= */

  const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || "");
  const MOD_KEY = IS_MAC ? "⌘" : "Ctrl";

  const SHORTCUTS = [
    { keys: ["←"], label: "Previous lesson" },
    { keys: ["→"], label: "Next lesson" },
    { keys: ["Shift", "→"], label: "Mark complete, then next" },
    { keys: ["C"], label: "Mark complete / undo" },
    { keys: ["B"], label: "Bookmark this lesson" },
    { keys: ["O"], label: "Show / hide course content" },
    { keys: ["M"], label: "Show / hide the menu" },
    { keys: ["T"], label: "Show / hide Taglish" },
    { keys: ["/"], label: "Search" },
    { keys: [MOD_KEY, "K"], label: "Search" },
    { keys: ["?"], label: "Show this list" },
    { keys: ["Esc"], label: "Close dialog or panel" }
  ];

  function isTypingTarget(t) {
    if (!t) return false;
    const tag = (t.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable;
  }

  function modalOpen() {
    return !document.getElementById("search-modal-backdrop").hidden || !document.getElementById("keys-modal-backdrop").hidden;
  }

  function currentLessonId() {
    const { route, param } = parseHash();
    return route === "lesson" && param && findLessonFull(param) ? param : null;
  }

  function stepLesson(delta) {
    const id = currentLessonId();
    if (!id) return;
    const ids = allLessonIds();
    const next = ids[ids.indexOf(id) + delta];
    if (next) navigate("lesson", next);
  }

  let toastTimer = null;
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 1600);
  }

  function openKeysModal() {
    document.getElementById("keys-grid").innerHTML = SHORTCUTS.map((s) => (
      '<div class="keys-row"><span>' + escapeHtml(s.label) + '</span><span class="k">' +
      s.keys.map((k) => "<kbd>" + escapeHtml(k) + "</kbd>").join("") + "</span></div>"
    )).join("");
    document.getElementById("keys-modal-backdrop").hidden = false;
  }

  function closeKeysModal() {
    document.getElementById("keys-modal-backdrop").hidden = true;
  }

  function cycleTheme() {
    const order = ["system", "light", "dark"];
    state.theme = order[(order.indexOf(state.theme) + 1) % order.length];
    applyTheme();
    saveState();
    toast("Theme: " + state.theme[0].toUpperCase() + state.theme.slice(1));
  }

  function initShell() {
    const mq = window.matchMedia("(max-width: 860px)");

    document.getElementById("menu-toggle").addEventListener("click", toggleNav);
    document.getElementById("outline-toggle").addEventListener("click", toggleOutline);
    document.getElementById("wordmark").addEventListener("click", () => navigate("dashboard"));
    document.getElementById("theme-toggle").addEventListener("click", cycleTheme);
    document.getElementById("open-keys").addEventListener("click", openKeysModal);
    document.getElementById("keys-close").addEventListener("click", closeKeysModal);
    document.getElementById("keys-modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "keys-modal-backdrop") closeKeysModal();
    });
    document.getElementById("sidebar-backdrop").addEventListener("click", closeSidebarMobile);
    mq.addEventListener("change", () => applyLayout());

    document.getElementById("open-search").addEventListener("click", openSearchModal);
    document.getElementById("search-modal-close").addEventListener("click", closeSearchModal);
    document.getElementById("search-modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "search-modal-backdrop") closeSearchModal();
    });

    const searchInput = document.getElementById("search-modal-input");
    searchInput.addEventListener("input", (e) => renderSearchResults(e.target.value));
    searchInput.addEventListener("keydown", (e) => {
      const rows = Array.from(document.querySelectorAll(".search-result-item"));
      if (e.key === "Enter") {
        e.preventDefault();
        const active = document.querySelector(".search-result-item.active") || rows[0];
        if (active) active.click();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (rows.length === 0) return;
        let idx = rows.findIndex((r) => r.classList.contains("active"));
        if (idx === -1) idx = 0;
        else rows[idx].classList.remove("active");
        idx = e.key === "ArrowDown" ? Math.min(idx + 1, rows.length - 1) : Math.max(idx - 1, 0);
        rows[idx].classList.add("active");
        rows[idx].scrollIntoView({ block: "nearest" });
      }
    });

    document.addEventListener("keydown", (e) => {
      const key = e.key;
      if ((e.ctrlKey || e.metaKey) && (key === "k" || key === "K")) {
        e.preventDefault();
        openSearchModal();
        return;
      }
      if (key === "Escape") {
        if (!document.getElementById("search-modal-backdrop").hidden) closeSearchModal();
        else if (!document.getElementById("keys-modal-backdrop").hidden) closeKeysModal();
        else if (mq.matches && document.getElementById("sidebar").classList.contains("open")) closeSidebarMobile();
        else if (window.innerWidth <= 1180 && outlineVisible && document.body.classList.contains("has-outline")) toggleOutline();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey || modalOpen() || isTypingTarget(e.target)) return;

      const lessonId = currentLessonId();
      switch (key) {
        case "ArrowLeft":
          if (lessonId) { e.preventDefault(); stepLesson(-1); }
          break;
        case "ArrowRight":
          if (!lessonId) break;
          e.preventDefault();
          if (e.shiftKey) {
            if (!state.completedLessons[lessonId]) { toggleLessonComplete(lessonId); toast("Marked complete"); }
          }
          stepLesson(1);
          break;
        case "c": case "C":
          if (!lessonId) break;
          toggleLessonComplete(lessonId);
          toast(state.completedLessons[lessonId] ? "Marked complete" : "Marked incomplete");
          render({ keepScroll: true });
          break;
        case "b": case "B":
          if (!lessonId) break;
          toggleBookmark(lessonId);
          toast(state.bookmarks[lessonId] ? "Bookmarked" : "Bookmark removed");
          render({ keepScroll: true });
          break;
        case "t": case "T":
          if (!lessonId) break;
          state.taglishEnabled = !state.taglishEnabled;
          saveState();
          toast("Taglish " + (state.taglishEnabled ? "on" : "off"));
          render({ keepScroll: true });
          break;
        case "o": case "O":
          toggleOutline();
          break;
        case "m": case "M":
          toggleNav();
          break;
        case "/":
          e.preventDefault();
          openSearchModal();
          break;
        case "?":
          e.preventDefault();
          openKeysModal();
          break;
        default:
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    applyMotion();
    initShell();
    if (!location.hash) location.hash = "#/dashboard";
    render();
  });
})();
