/* Performance-based question (PBQ) engine. Five interactive task types:
     order     put steps in the correct order (drag, or the up/down buttons)
     match     match each item to a category
     analysis  read evidence (a table or raw command output) and answer questions
     firewall  choose each rule's action and order; graded by simulating traffic
     form      choose the correct settings in a configuration form
   Tasks live in data-pbq.js (PBQ_TASKS). The same engine is used by the PBQ
   practice page (#/pbq) and by the mock exam (ext-mock.js) through window.PBQ.
   Uses the app's internal API from window.SECAPP. */

(function () {
  "use strict";

  const A = window.SECAPP;
  const esc = A.escapeHtml;

  const TYPE_LABELS = { order: "Ordering", match: "Matching", analysis: "Analysis", firewall: "Firewall rules", form: "Configuration" };

  /* ---------- answers ---------- */

  function initAnswer(task) {
    switch (task.type) {
      case "order": {
        let o = A.shuffle(task.items.map((_, i) => i));
        if (o.every((v, i) => v === i) && o.length > 1) o = o.slice(1).concat(o[0]);
        return { order: o };
      }
      case "match": return { map: {} };
      case "analysis": return { picks: {} };
      case "firewall": return { order: A.shuffle(task.rules.map((r) => r.id)), actions: {} };
      case "form": return { values: {} };
      default: return {};
    }
  }

  function isAnswered(task, ans) {
    if (!ans) return false;
    switch (task.type) {
      case "order": return !!ans.touched;
      case "match": return Object.keys(ans.map || {}).some((k) => ans.map[k]);
      case "analysis": return Object.keys(ans.picks || {}).length > 0;
      case "firewall": return !!ans.touched || Object.keys(ans.actions || {}).some((k) => ans.actions[k]);
      case "form": return Object.keys(ans.values || {}).some((k) => { const v = ans.values[k]; return Array.isArray(v) ? v.length > 0 : !!v; });
      default: return false;
    }
  }

  /* ---------- grading ---------- */

  function ruleMatches(rule, pkt) {
    return ["src", "dst", "proto", "port"].every((f) => rule[f] === "any" || String(rule[f]) === String(pkt[f]));
  }

  function simulate(rulesInOrder, actions, pkt) {
    for (let i = 0; i < rulesInOrder.length; i++) {
      const r = rulesInOrder[i];
      if (!actions[r.id]) continue;
      if (ruleMatches(r, pkt)) return { action: actions[r.id], rule: r };
    }
    return { action: "deny", rule: null };
  }

  function grade(task, ans) {
    ans = ans || initAnswer(task);
    const parts = [];
    if (task.type === "order") {
      task.items.forEach((text, pos) => {
        const placed = ans.order[pos];
        parts.push({ ok: placed === pos, label: "Position " + (pos + 1), detail: "Should be: " + text });
      });
    } else if (task.type === "match") {
      task.items.forEach((it, i) => {
        const pick = (ans.map || {})[i] || "";
        parts.push({ ok: pick === it.answer, label: it.text, detail: pick === it.answer ? "Correct: " + it.answer : "Your answer: " + (pick || "(none)") + ". Correct: " + it.answer + (it.why ? ". " + it.why : "") });
      });
    } else if (task.type === "analysis") {
      task.questions.forEach((q, i) => {
        const pick = (ans.picks || {})[i];
        const ok = pick === q.correct;
        const chosen = q.choices.find((c) => c.id === pick);
        const right = q.choices.find((c) => c.id === q.correct);
        parts.push({ ok: ok, label: q.prompt, detail: (ok ? "Correct. " : "Your answer: " + (chosen ? chosen.text : "(none)") + ". Correct: " + right.text + ". ") + (q.explanation || "") });
      });
    } else if (task.type === "firewall") {
      const byId = {};
      task.rules.forEach((r) => { byId[r.id] = r; });
      const ordered = (ans.order || []).map((id) => byId[id]);
      task.packets.forEach((pkt) => {
        const res = simulate(ordered, ans.actions || {}, pkt);
        const ok = res.action === pkt.expect;
        parts.push({
          ok: ok, label: pkt.label,
          detail: "Needs to be " + pkt.expect.toUpperCase() + ". With your rules it is " + res.action.toUpperCase() + (res.rule ? " (matched rule: " + res.rule.note + ")" : " (no rule matched: implicit deny)") + "."
        });
      });
    } else if (task.type === "form") {
      task.fields.forEach((f) => {
        const v = (ans.values || {})[f.id];
        if (f.kind === "checks") {
          const chosen = Array.isArray(v) ? v : [];
          const good = f.correct;
          const hits = chosen.filter((x) => good.indexOf(x) !== -1).length;
          const misses = chosen.filter((x) => good.indexOf(x) === -1).length;
          const s = Math.max(0, (hits - misses) / good.length);
          parts.push({ ok: s === 1, score: s, label: f.label, detail: s === 1 ? "Correct." : "You selected " + hits + " of " + good.length + " correct options and " + misses + " incorrect. Correct set: " + good.join("; ") + "." + (f.why ? " " + f.why : "") });
        } else {
          const ok = v === f.correct;
          parts.push({ ok: ok, label: f.label, detail: ok ? "Correct." : "Your answer: " + (v || "(none)") + ". Correct: " + f.correct + "." + (f.why ? " " + f.why : "") });
        }
      });
    }
    const total = parts.reduce((s, p) => s + (p.score !== undefined ? p.score : (p.ok ? 1 : 0)), 0);
    return { score: parts.length ? total / parts.length : 0, parts: parts };
  }

  /* ---------- rendering the interactive task ---------- */

  function mount(task, root, ans, opts) {
    const o = opts || {};
    const redraw = () => mount(task, root, ans, o);
    const changed = () => { if (o.onChange) o.onChange(ans); };
    const touch = () => { ans.touched = true; changed(); };

    root.innerHTML = "";
    const box = document.createElement("div");
    box.className = "pbq-box";
    root.appendChild(box);

    if (task.type === "order") {
      box.innerHTML = '<p class="pbq-instr">Arrange the items into the correct order. Drag an item, or use the arrow buttons.</p><ol class="pbq-order">' +
        ans.order.map((idx, pos) =>
          '<li class="pbq-item" ' + (o.locked ? "" : 'draggable="true"') + ' data-pos="' + pos + '"><span class="pbq-grip" aria-hidden="true"></span><span class="pbq-text">' + esc(task.items[idx]) + "</span>" +
          (o.locked ? "" : '<span class="pbq-moves"><button type="button" class="btn btn-sm" data-up="' + pos + '" aria-label="Move up">&uarr;</button><button type="button" class="btn btn-sm" data-down="' + pos + '" aria-label="Move down">&darr;</button></span>') + "</li>"
        ).join("") + "</ol>";
      const move = (from, to) => {
        if (to < 0 || to >= ans.order.length || from === to) return;
        const item = ans.order.splice(from, 1)[0];
        ans.order.splice(to, 0, item);
        touch();
        redraw();
      };
      box.querySelectorAll("[data-up]").forEach((b) => b.addEventListener("click", () => move(parseInt(b.getAttribute("data-up"), 10), parseInt(b.getAttribute("data-up"), 10) - 1)));
      box.querySelectorAll("[data-down]").forEach((b) => b.addEventListener("click", () => move(parseInt(b.getAttribute("data-down"), 10), parseInt(b.getAttribute("data-down"), 10) + 1)));
      let dragFrom = null;
      box.querySelectorAll(".pbq-item").forEach((li) => {
        li.addEventListener("dragstart", (e) => { dragFrom = parseInt(li.getAttribute("data-pos"), 10); if (e.dataTransfer) { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(dragFrom)); } li.classList.add("dragging"); });
        li.addEventListener("dragend", () => li.classList.remove("dragging"));
        li.addEventListener("dragover", (e) => { e.preventDefault(); });
        li.addEventListener("drop", (e) => { e.preventDefault(); if (dragFrom !== null) move(dragFrom, parseInt(li.getAttribute("data-pos"), 10)); dragFrom = null; });
      });
    } else if (task.type === "match") {
      box.innerHTML = '<p class="pbq-instr">Choose the best category for each item.</p><div class="pbq-matchlist">' +
        task.items.map((it, i) => {
          const cur = (ans.map || {})[i] || "";
          return '<div class="pbq-row"><span class="pbq-text">' + esc(it.text) + '</span><select class="select-input" data-m="' + i + '"' + (o.locked ? " disabled" : "") + '><option value="">Choose...</option>' +
            task.categories.map((c) => '<option value="' + esc(c) + '"' + (c === cur ? " selected" : "") + ">" + esc(c) + "</option>").join("") + "</select></div>";
        }).join("") + "</div>";
      box.querySelectorAll("[data-m]").forEach((sel) => sel.addEventListener("change", () => { ans.map[sel.getAttribute("data-m")] = sel.value; changed(); }));
    } else if (task.type === "analysis") {
      let ev = "";
      if (task.evidence.kind === "table") {
        ev = '<div class="table-wrap"><table><thead><tr>' + task.evidence.headers.map((h) => "<th>" + esc(h) + "</th>").join("") + "</tr></thead><tbody>" +
          task.evidence.rows.map((r) => "<tr>" + r.map((c) => "<td>" + esc(c) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
      } else {
        ev = '<pre class="pbq-pre">' + esc(task.evidence.text) + "</pre>";
      }
      box.innerHTML = (task.evidence.caption ? '<div class="pbq-caption">' + esc(task.evidence.caption) + "</div>" : "") + ev +
        task.questions.map((q, i) => (
          '<div class="pbq-q"><div class="pbq-qprompt"><b>' + (i + 1) + ".</b> " + esc(q.prompt) + "</div>" +
          q.choices.map((c) => '<label class="quiz-choice' + ((ans.picks || {})[i] === c.id ? " selected" : "") + '"><input type="radio" name="pq' + i + '" value="' + c.id + '"' + ((ans.picks || {})[i] === c.id ? " checked" : "") + (o.locked ? " disabled" : "") + "><span>" + esc(c.text) + "</span></label>").join("") + "</div>"
        )).join("");
      box.querySelectorAll("input[type=radio]").forEach((r) => r.addEventListener("change", () => {
        ans.picks[parseInt(r.name.slice(2), 10)] = r.value;
        changed();
        box.querySelectorAll('input[name="' + r.name + '"]').forEach((x) => x.closest(".quiz-choice").classList.toggle("selected", x.checked));
      }));
    } else if (task.type === "firewall") {
      const byId = {};
      task.rules.forEach((r) => { byId[r.id] = r; });
      box.innerHTML =
        '<p class="pbq-instr">Set an action for each rule and put the rules in the right order. Rules are checked top to bottom and the first match wins. Traffic that matches no rule is dropped (implicit deny). Leave a rule on "Choose..." to leave it out.</p>' +
        '<div class="pbq-reqs"><b>Required behavior</b><ul>' + task.packets.map((p) => "<li>" + esc(p.label) + " &mdash; <b>" + p.expect.toUpperCase() + "</b></li>").join("") + "</ul></div>" +
        '<div class="table-wrap"><table class="pbq-fw"><thead><tr><th>#</th><th>Move</th><th>Source</th><th>Destination</th><th>Protocol</th><th>Port</th><th>Action</th></tr></thead><tbody>' +
        ans.order.map((id, pos) => {
          const r = byId[id];
          const cur = (ans.actions || {})[id] || "";
          return "<tr><td>" + (pos + 1) + "</td><td>" + (o.locked ? "" : '<button type="button" class="btn btn-sm" data-up="' + pos + '" aria-label="Move rule up">&uarr;</button> <button type="button" class="btn btn-sm" data-down="' + pos + '" aria-label="Move rule down">&darr;</button>') + "</td>" +
            "<td>" + esc(r.src) + "</td><td>" + esc(r.dst) + "</td><td>" + esc(r.proto) + "</td><td>" + esc(String(r.port)) + "</td>" +
            '<td><select class="select-input" data-act="' + id + '"' + (o.locked ? " disabled" : "") + '><option value="">Choose...</option><option value="allow"' + (cur === "allow" ? " selected" : "") + '>Allow</option><option value="deny"' + (cur === "deny" ? " selected" : "") + ">Deny</option></select></td></tr>";
        }).join("") + "</tbody></table></div>";
      const move = (from, to) => {
        if (to < 0 || to >= ans.order.length) return;
        const item = ans.order.splice(from, 1)[0];
        ans.order.splice(to, 0, item);
        touch();
        redraw();
      };
      box.querySelectorAll("[data-up]").forEach((b) => b.addEventListener("click", () => move(parseInt(b.getAttribute("data-up"), 10), parseInt(b.getAttribute("data-up"), 10) - 1)));
      box.querySelectorAll("[data-down]").forEach((b) => b.addEventListener("click", () => move(parseInt(b.getAttribute("data-down"), 10), parseInt(b.getAttribute("data-down"), 10) + 1)));
      box.querySelectorAll("[data-act]").forEach((sel) => sel.addEventListener("change", () => { ans.actions[sel.getAttribute("data-act")] = sel.value; changed(); }));
    } else if (task.type === "form") {
      box.innerHTML = '<p class="pbq-instr">' + esc(task.instruction || "Choose the best setting for each field.") + '</p><div class="pbq-form">' +
        task.fields.map((f) => {
          const v = (ans.values || {})[f.id];
          if (f.kind === "checks") {
            const chosen = Array.isArray(v) ? v : [];
            return '<fieldset class="pbq-field"><legend>' + esc(f.label) + '</legend>' + f.options.map((opt) => '<label class="quiz-choice' + (chosen.indexOf(opt) !== -1 ? " selected" : "") + '"><input type="checkbox" data-chk="' + f.id + '" value="' + esc(opt) + '"' + (chosen.indexOf(opt) !== -1 ? " checked" : "") + (o.locked ? " disabled" : "") + "><span>" + esc(opt) + "</span></label>").join("") + "</fieldset>";
          }
          return '<div class="pbq-field"><label class="pbq-flabel" for="f-' + f.id + '">' + esc(f.label) + '</label><select class="select-input" id="f-' + f.id + '" data-sel="' + f.id + '"' + (o.locked ? " disabled" : "") + '><option value="">Choose...</option>' +
            f.options.map((opt) => '<option value="' + esc(opt) + '"' + (v === opt ? " selected" : "") + ">" + esc(opt) + "</option>").join("") + "</select></div>";
        }).join("") + "</div>";
      box.querySelectorAll("[data-sel]").forEach((sel) => sel.addEventListener("change", () => { ans.values[sel.getAttribute("data-sel")] = sel.value; changed(); }));
      box.querySelectorAll("[data-chk]").forEach((cb) => cb.addEventListener("change", () => {
        const id = cb.getAttribute("data-chk");
        const cur = Array.isArray(ans.values[id]) ? ans.values[id] : [];
        const next = cb.checked ? cur.concat([cb.value]) : cur.filter((x) => x !== cb.value);
        ans.values[id] = next;
        cb.closest(".quiz-choice").classList.toggle("selected", cb.checked);
        changed();
      }));
    }
  }

  function feedbackHtml(task, result) {
    const pct = Math.round(result.score * 100);
    return (
      '<div class="pbq-result"><div class="pbq-score ' + (pct >= 80 ? "good" : pct >= 50 ? "mid" : "low") + '">' + pct + "%</div><div class=\"pbq-parts\">" +
      result.parts.map((p) => '<div class="pbq-part ' + (p.ok ? "ok" : "bad") + '"><b>' + (p.ok ? "Correct" : "Incorrect") + ":</b> " + esc(p.label) + '<div class="pbq-detail">' + esc(p.detail) + "</div></div>").join("") +
      "</div>" + (task.explanation ? '<div class="quiz-explanation correct"><b>Why:</b> ' + esc(task.explanation) + "</div>" : "") + "</div>"
    );
  }

  /* ---------- practice page ---------- */

  function tasks() { return typeof PBQ_TASKS !== "undefined" ? PBQ_TASKS : []; }

  function bestFor(id) {
    const p = A.state.pbqProgress[id];
    return p ? Math.round(p.best * 100) : null;
  }

  function renderPbq(param) {
    const wrap = A.el("<div></div>");
    if (param) return renderTask(param);
    const list = tasks();
    const done = list.filter((t) => A.state.pbqProgress[t.id]).length;
    let html =
      '<div class="eyebrow">Performance-Based Questions</div><h1>PBQ practice</h1>' +
      '<p class="lede">The real exam opens with a few hands-on tasks instead of multiple choice. They are worth practicing on their own: ordering steps, matching items to categories, reading logs and command output, building a firewall ruleset, and choosing secure settings. ' +
      done + " of " + list.length + " attempted.</p>";
    Object.keys(TYPE_LABELS).forEach((type) => {
      const group = list.filter((t) => t.type === type);
      if (!group.length) return;
      html += "<h2>" + TYPE_LABELS[type] + "</h2><div class=\"lesson-list\">" +
        group.map((t, i) => {
          const b = bestFor(t.id);
          return '<div class="lesson-list-item" data-pbq-open="' + t.id + '" tabindex="0" role="link"><span class="ll-num">' + String(i + 1).padStart(2, "0") + '</span><div class="ll-main"><div class="ll-title">' + esc(t.title) + '</div><div class="ll-sum">' + esc(t.blurb || "") + '</div></div><div class="ll-meta">' +
            (t.objective ? '<span class="tag">Obj ' + esc(t.objective) + "</span>" : "") + '<span class="tag">' + (t.minutes || 5) + " min</span>" +
            (b !== null ? '<span class="tag tag-' + (b >= 80 ? "green" : "amber") + '">Best ' + b + "%</span>" : "") + "</div></div>";
        }).join("") + "</div>";
    });
    wrap.innerHTML = html;
    wrap.querySelectorAll("[data-pbq-open]").forEach((n) => {
      const go = () => A.navigate("pbq", n.getAttribute("data-pbq-open"));
      n.addEventListener("click", go);
      n.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
    });
    return wrap;
  }

  function renderTask(id) {
    const wrap = A.el("<div></div>");
    const list = tasks();
    const idx = list.findIndex((t) => t.id === id);
    const task = list[idx];
    if (!task) { wrap.innerHTML = '<div class="empty-state">Task not found. <button class="btn" id="pbq-back">Back</button></div>'; wrap.querySelector("#pbq-back").addEventListener("click", () => A.navigate("pbq")); return wrap; }
    const ans = initAnswer(task);
    wrap.innerHTML =
      '<div class="breadcrumb"><a href="#/pbq">PBQ practice</a> / ' + esc(TYPE_LABELS[task.type]) + "</div>" +
      "<h1>" + esc(task.title) + "</h1>" +
      '<div class="lesson-meta"><span class="tag">' + esc(TYPE_LABELS[task.type]) + "</span>" + (task.objective ? '<span class="tag">Objective ' + esc(task.objective) + "</span>" : "") + '<span class="tag">' + (task.minutes || 5) + " min</span></div>" +
      '<div class="card pbq-scenario">' + String(task.scenario).split("\n").map((p) => "<p>" + esc(p) + "</p>").join("") + "</div>" +
      '<div id="pbq-mount"></div>' +
      '<div class="btn-row"><button class="btn btn-primary" id="pbq-check">Check my answer</button><button class="btn" id="pbq-reset">Start over</button>' + (list[idx + 1] ? '<button class="btn" id="pbq-next">Next task</button>' : "") + "</div>" +
      '<div id="pbq-feedback"></div>';
    const mountEl = wrap.querySelector("#pbq-mount");
    mount(task, mountEl, ans, {});
    wrap.querySelector("#pbq-check").addEventListener("click", () => {
      const result = grade(task, ans);
      const prev = A.state.pbqProgress[task.id] || { best: 0, attempts: 0 };
      A.state.pbqProgress[task.id] = { best: Math.max(prev.best, result.score), attempts: prev.attempts + 1, last: result.score };
      A.recordActivity();
      A.saveState();
      const fb = wrap.querySelector("#pbq-feedback");
      fb.innerHTML = feedbackHtml(task, result);
      fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    wrap.querySelector("#pbq-reset").addEventListener("click", () => A.render({ keepScroll: true }));
    const nx = wrap.querySelector("#pbq-next");
    if (nx) nx.addEventListener("click", () => A.navigate("pbq", list[idx + 1].id));
    return wrap;
  }

  A.routes.pbq = renderPbq;
  window.PBQ = { tasks: tasks, mount: mount, grade: grade, initAnswer: initAnswer, isAnswered: isAnswered, feedbackHtml: feedbackHtml, TYPE_LABELS: TYPE_LABELS, simulate: simulate };
})();
