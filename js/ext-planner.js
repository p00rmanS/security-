/* Exam date planner (#/planner). Given an exam date and how many minutes a
   day you can study, it takes the steps you have NOT yet finished on your
   chosen study path and packs them into the days that remain, reserving the
   last three days for mock exams and light review. Because it is rebuilt from
   your current progress every time, it adapts when you fall behind or get
   ahead. Also adds a countdown card to the dashboard. */

(function () {
  "use strict";

  const A = window.SECAPP;
  const esc = A.escapeHtml;
  const DAY = 86400000;
  const FLASH_MIN = 10;

  function localIso(d) {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }

  function parseLocal(iso) {
    const p = iso.split("-").map((x) => parseInt(x, 10));
    return new Date(p[0], p[1] - 1, p[2]);
  }

  function today() {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }

  function daysUntil(iso) {
    return Math.round((parseLocal(iso) - today()) / DAY);
  }

  function stepMinutes(s) {
    if (s.type === "lesson") { const f = A.findLessonFull(s.id); return f && f.lesson.minutes ? f.lesson.minutes : 12; }
    if (s.type === "quiz") return 20;
    return 5;
  }

  function defaultPath(daysLeft) {
    return daysLeft <= 16 ? "cram" : daysLeft <= 50 ? "core" : "beginner";
  }

  function build(daysLeft, dailyMin, pathId) {
    const path = A.buildPath(pathId);
    const remaining = [];
    path.stages.forEach((st) => st.steps.forEach((s) => {
      if (!A.stepDone(s, path.id)) remaining.push({ step: s, stage: st.title, minutes: stepMinutes(s) });
    }));
    const studyDays = Math.max(0, daysLeft - 3);
    const days = [];
    let i = 0;
    for (let d = 0; d < studyDays; d++) {
      const cap = Math.max(20, dailyMin - FLASH_MIN);
      const items = [];
      let used = 0;
      while (i < remaining.length && (used === 0 || used + remaining[i].minutes <= cap)) {
        items.push(remaining[i]);
        used += remaining[i].minutes;
        i++;
      }
      days.push({ offset: d, items: items, minutes: used + FLASH_MIN });
    }
    const leftover = remaining.slice(i);
    const leftoverMin = leftover.reduce((s, x) => s + x.minutes, 0);
    const totalMin = remaining.reduce((s, x) => s + x.minutes, 0);
    const neededPerDay = studyDays ? Math.ceil(totalMin / studyDays) + FLASH_MIN : null;
    return { path: path, remaining: remaining, days: days, leftover: leftover, leftoverMin: leftoverMin, totalMin: totalMin, studyDays: studyDays, neededPerDay: neededPerDay };
  }

  function taper(daysLeft) {
    const out = [];
    if (daysLeft >= 3) out.push({ offset: daysLeft - 3, title: "Full timed mock exam", detail: "Take a Full exam in Mock exam mode, then study the weakest objectives it reports.", route: "mock" });
    if (daysLeft >= 2) out.push({ offset: daysLeft - 2, title: "Fix what the mock exam exposed", detail: "Practice your weakest objectives and run every flashcard deck until nothing is due.", route: "paths", param: "weak" });
    if (daysLeft >= 1) out.push({ offset: daysLeft - 1, title: "Light review and rest", detail: "Read the Exam Cram Sheet and your ports and acronyms flashcards. Check your ID and the test center or online-proctoring rules. Sleep.", route: "cram" });
    return out;
  }

  function dateLabel(offset) {
    const d = new Date(today().getTime() + offset * DAY);
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }

  function itemRow(x) {
    return '<li class="ol-lesson" data-pl-step="' + esc(JSON.stringify(x.step)) + '" tabindex="0" role="link"><span class="ol-text">' + esc(A.stepTitle(x.step)) +
      '<span class="ol-sub">' + (x.step.type === "lesson" ? "Lesson" : x.step.type === "quiz" ? "Quiz checkpoint" : "Task") + " &middot; " + x.minutes + " min &middot; " + esc(x.stage) + "</span></span></li>";
  }

  function renderPlanner() {
    const wrap = A.el("<div></div>");
    const S = A.state;
    const daysLeft = S.examDate ? daysUntil(S.examDate) : null;

    let html =
      '<div class="eyebrow">Exam date planner</div><h1>Plan backwards from your exam</h1>' +
      '<p class="lede">Tell the app when your exam is and how long you can study each day. It packs the steps you have not finished into the days you have, saves the last three days for a mock exam and rest, and re-plans automatically whenever your progress changes.</p>' +
      '<div class="card"><div class="two-col">' +
      '<div><label class="settings-row-label" for="pl-date">Exam date</label><input type="date" class="text-input" id="pl-date" style="width:100%;margin-top:6px;" value="' + esc(S.examDate || "") + '" min="' + localIso(today()) + '"></div>' +
      '<div><label class="settings-row-label" for="pl-min">Study time per day</label><select class="select-input" id="pl-min" style="width:100%;margin-top:6px;">' +
      [30, 45, 60, 90, 120, 150, 180].map((m) => '<option value="' + m + '"' + (S.dailyMinutes === m ? " selected" : "") + ">" + (m >= 60 ? (m / 60) + " h" : m + " min") + "</option>").join("") + "</select></div></div></div>";

    if (daysLeft === null) {
      html += '<div class="empty-state">Pick your exam date above to see your plan.</div>';
      wrap.innerHTML = html;
      bind(wrap, null);
      return wrap;
    }
    if (daysLeft < 0) {
      html += '<div class="card"><b>That date has passed.</b><p style="margin:6px 0 0;">Choose your next exam date above.</p></div>';
      wrap.innerHTML = html;
      bind(wrap, null);
      return wrap;
    }

    const pathId = S.activePath || defaultPath(daysLeft);
    const plan = build(daysLeft, S.dailyMinutes, pathId);
    const hrs = Math.round((plan.totalMin / 60) * 10) / 10;
    const pathOptions = ["beginner", "core", "cram", "weak"].map((id) => ({ id: id, title: A.buildPath(id).def.title }));

    html +=
      '<div class="resume"><div><div class="eyebrow">Exam countdown</div><h1 style="margin:0;">' + (daysLeft === 0 ? "Exam day" : daysLeft + " day" + (daysLeft === 1 ? "" : "s") + " to go") + "</h1>" +
      "<p style=\"margin:6px 0 0;\">" + esc(parseLocal(S.examDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })) + ' &middot; ' + plan.remaining.length + " steps left (about " + hrs + " h) on <b>" + esc(plan.path.def.title) + "</b></p></div></div>" +
      '<div class="card"><label class="settings-row-label" for="pl-path">Study path</label><select class="select-input" id="pl-path" style="width:100%;margin-top:6px;">' +
      pathOptions.map((o) => '<option value="' + o.id + '"' + (o.id === pathId ? " selected" : "") + ">" + esc(o.title) + (o.id === defaultPath(daysLeft) ? " (suggested for your timeline)" : "") + "</option>").join("") + "</select></div>";

    if (plan.leftover.length) {
      html += '<div class="card" style="border-left:4px solid var(--red);"><b>This plan does not fit your timeline.</b><p style="margin:6px 0 0;">' + plan.leftover.length + " steps (about " + Math.round(plan.leftoverMin / 60 * 10) / 10 + " h) will not fit before your final review days at " + S.dailyMinutes + " minutes a day. You can: study about " + plan.neededPerDay + " minutes a day, switch to the " + esc(A.buildPath(daysLeft <= 16 ? "cram" : "core").def.title) + " path, or move the exam date later. It is better to book the exam when your mock exams say you are ready than to rush.</p></div>";
    } else if (daysLeft < 4) {
      html += '<div class="card"><b>Final stretch.</b><p style="margin:6px 0 0;">With this little time, focus on the mock exam, your weakest objectives, flashcards, and rest.</p></div>';
    }

    const todays = plan.days[0];
    html += '<h2>Today</h2><div class="card">';
    if (daysLeft <= 3) {
      const t = taper(daysLeft).find((x) => x.offset === 0);
      html += t ? "<b>" + esc(t.title) + "</b><p>" + esc(t.detail) + '</p><button class="btn btn-primary" data-pl-go="' + t.route + (t.param ? "/" + t.param : "") + '">Open</button>' : "<b>Exam day.</b><p style=\"margin:4px 0 0;\">Rest, eat, bring your ID, and arrive early (or finish your online-proctoring check). You are prepared.</p>";
    } else if (todays && todays.items.length) {
      html += '<ul class="ol-lessons" style="display:block;border:none;">' + todays.items.map(itemRow).join("") + '</ul><div class="btn-row"><button class="btn btn-primary" data-pl-go="flashcards">' + FLASH_MIN + " min of flashcards</button></div>";
    } else {
      html += "<b>Nothing left on this path for today.</b><p style=\"margin:4px 0 0;\">Take a mock exam to find what to strengthen next.</p><button class=\"btn btn-primary\" data-pl-go=\"mock\">Open the mock exam</button>";
    }
    html += "</div>";

    html += "<h2>Your schedule</h2>" + '<div class="outline-page">';
    plan.days.forEach((d) => {
      if (!d.items.length) return;
      html += '<div class="ol-module' + (d.offset === 0 ? " open" : "") + '"><button class="ol-module-head" data-bp-toggle>' + A.icon("chevronRight", 14, "chev") + '<span class="ol-module-name"><b>' + esc(dateLabel(d.offset)) + "</b><span>" + d.items.length + " steps &middot; about " + d.minutes + " min including flashcards</span></span></button><ul class=\"ol-lessons\">" + d.items.map(itemRow).join("") + "</ul></div>";
    });
    taper(daysLeft).forEach((t) => {
      html += '<div class="ol-module open"><div class="ol-module-head" style="cursor:default;"><span class="ol-module-name"><b>' + esc(dateLabel(t.offset)) + ": " + esc(t.title) + "</b><span>" + esc(t.detail) + "</span></span></div></div>";
    });
    html += '<div class="ol-module open"><div class="ol-module-head" style="cursor:default;"><span class="ol-module-name"><b>' + esc(dateLabel(daysLeft)) + ": Exam day</b><span>Rest, ID, arrive early. Trust the work you have done.</span></span></div></div></div>";

    wrap.innerHTML = html;
    bind(wrap, plan);
    return wrap;
  }

  function bind(wrap, plan) {
    const S = A.state;
    const date = wrap.querySelector("#pl-date");
    if (date) date.addEventListener("change", () => { S.examDate = date.value || null; A.saveState(); A.render({ keepScroll: true }); });
    const min = wrap.querySelector("#pl-min");
    if (min) min.addEventListener("change", () => { S.dailyMinutes = parseInt(min.value, 10); A.saveState(); A.render({ keepScroll: true }); });
    const p = wrap.querySelector("#pl-path");
    if (p) p.addEventListener("change", () => { S.activePath = p.value; S.navCourseOrder = false; A.saveState(); A.render({ keepScroll: true }); });
    wrap.querySelectorAll("[data-bp-toggle]").forEach((b) => b.addEventListener("click", () => b.parentElement.classList.toggle("open")));
    wrap.querySelectorAll("[data-pl-go]").forEach((b) => b.addEventListener("click", () => { const t = b.getAttribute("data-pl-go").split("/"); A.navigate(t[0], t[1] || null); }));
    wrap.querySelectorAll("[data-pl-step]").forEach((row) => {
      const go = () => A.goToStep(JSON.parse(row.getAttribute("data-pl-step")));
      row.addEventListener("click", go);
      row.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    });
  }

  /* ---------- dashboard card ---------- */

  A.hooks.dashboard.push({
    html: function () {
      const S = A.state;
      if (!S.examDate) {
        return '<div class="card path-prompt"><div><b>When is your exam?</b><p>Set the date and the app will plan your study days backwards from it.</p></div><button class="btn btn-primary" data-goto="planner">Set exam date</button></div>';
      }
      const dl = daysUntil(S.examDate);
      if (dl < 0) return '<div class="card path-prompt"><div><b>Your exam date has passed.</b><p>Set the next one to plan again.</p></div><button class="btn" data-goto="planner">Open planner</button></div>';
      const plan = build(dl, S.dailyMinutes, S.activePath || defaultPath(dl));
      const todays = plan.days[0];
      const items = dl <= 3 ? taper(dl).filter((x) => x.offset === 0).map((x) => x.title) : (todays ? todays.items.slice(0, 3).map((x) => A.stepTitle(x.step)) : []);
      return '<div class="card path-prompt"><div style="flex:1;min-width:0;"><div class="eyebrow" style="margin-bottom:4px;">Exam in ' + dl + " day" + (dl === 1 ? "" : "s") + '</div><b>Today</b><p style="margin-bottom:0;">' + (items.length ? items.map(esc).join(" &middot; ") : (dl === 0 ? "Exam day. Rest and arrive early." : "Take a mock exam to find what to strengthen.")) +
        (plan.leftover.length ? ' <span style="color:var(--red);">Your plan does not fit; open the planner.</span>' : "") + '</p></div><button class="btn btn-primary" data-goto="planner">Open planner</button></div>';
    }
  });

  A.routes.planner = renderPlanner;
})();
