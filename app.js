import { chapters, concepts, timeline, examChains, levelLabels } from "./data.js";

const STORAGE_KEY = "11408-grand-view-linear-v1";
const state = loadState();
let activeLevel = "all";
let searchTerm = "";
let toastTimer;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      mastered: new Set(stored.mastered || []),
      review: new Set(stored.review || []),
      lastConcept: stored.lastConcept || "o-language"
    };
  } catch {
    return { mastered: new Set(), review: new Set(), lastConcept: "o-language" };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    mastered: [...state.mastered],
    review: [...state.review],
    lastConcept: state.lastConcept
  }));
  updateProgress();
}

function stripHtml(value = "") {
  const node = document.createElement("div");
  node.innerHTML = value;
  return node.textContent || "";
}

function searchable(concept) {
  return [
    concept.title, concept.summary, concept.core, concept.memory,
    ...concept.formulas, ...concept.triggers, ...concept.steps,
    ...concept.traps, ...concept.tags
  ].map(stripHtml).join(" ").toLowerCase();
}

function matches(concept) {
  const levelMatch = activeLevel === "all" || concept.level === activeLevel;
  const searchMatch = !searchTerm || searchable(concept).includes(searchTerm.toLowerCase());
  return levelMatch && searchMatch;
}

function highlight(text) {
  if (!searchTerm || /[<>]/.test(text)) return text;
  const safe = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`(${safe})`, "ig"), '<mark class="search-hit">$1</mark>');
}

function renderNav() {
  $("#chapterNav").innerHTML = chapters.map((chapter, index) => {
    const count = concepts.filter(item => item.chapter === chapter.id).length;
    return `
      <button class="nav-item ${index === 0 ? "active" : ""}" data-chapter="${chapter.id}" type="button">
        <span class="nav-dot" style="background:${chapter.color}">${chapter.short}</span>
        <span class="nav-copy"><b>${chapter.title}</b><small>${chapter.subtitle}</small></span>
        <span class="nav-count">${count}</span>
      </button>`;
  }).join("");
}

function renderChains() {
  $("#chainGrid").innerHTML = examChains.map(chain => `
    <article class="chain-card">
      <div class="chain-top"><h3>${chain.title}</h3><span class="signal">${chain.signal}</span></div>
      <div class="chain-path">${chain.chain.map((step, index) => `${index ? "<i>→</i>" : ""}<span>${step}</span>`).join("")}</div>
    </article>`).join("");
}

function listBlock(title, items, className = "", ordered = false) {
  if (!items?.length) return "";
  const tag = ordered ? "ol" : "ul";
  return `<section class="detail-block ${className}"><h4>${title}</h4><${tag}>${items.map(value => `<li>${highlight(value)}</li>`).join("")}</${tag}></section>`;
}

function formulaBlock(items) {
  if (!items?.length) return "";
  return `<section class="detail-block wide"><h4>关键公式 / 结论</h4><div class="formula-list">${items.map(value => `<div class="formula">${value}</div>`).join("")}</div></section>`;
}

function relatedBlock(ids = []) {
  const related = ids.map(id => concepts.find(item => item.id === id)).filter(Boolean);
  if (!related.length) return "";
  return `<div class="related"><span>联动知识</span>${related.map(item => `<button type="button" data-related="${item.id}">${item.title}</button>`).join("")}</div>`;
}

function conceptCard(concept) {
  const mastered = state.mastered.has(concept.id);
  const review = state.review.has(concept.id);
  const shouldOpen = Boolean(searchTerm);
  return `
    <article class="concept-card ${mastered ? "mastered" : ""} ${shouldOpen ? "open" : ""}" id="${concept.id}" data-id="${concept.id}">
      <button class="concept-head" type="button" aria-expanded="${shouldOpen}">
        <span>
          <span class="concept-kicker"><span class="level-pill ${concept.level}">${levelLabels[concept.level]}</span><small>${concept.source.label}</small></span>
          <h3>${highlight(concept.title)}</h3>
          <p>${highlight(concept.summary)}</p>
        </span>
        <span class="head-actions"><span class="status-dot">✓</span><span class="chevron">⌄</span></span>
      </button>
      <div class="concept-body">
        ${concept.core ? `<div class="core-copy">${highlight(concept.core)}</div>` : ""}
        <div class="detail-grid">
          ${formulaBlock(concept.formulas)}
          ${listBlock("看到这些就启动", concept.triggers)}
          ${listBlock("考试处理步骤", concept.steps, "", true)}
          ${listBlock("易错边界", concept.traps, "trap")}
          ${concept.memory ? `<section class="detail-block memory"><h4>一句话记忆</h4><div>${concept.memory}</div></section>` : ""}
        </div>
        <div class="concept-footer">
          <div>${relatedBlock(concept.links)}<div class="tag-list">${concept.tags.map(tag => `<span># ${tag}</span>`).join("")}</div></div>
          <div class="card-buttons">
            <button class="review ${review ? "active" : ""}" type="button">${review ? "已加入复习" : "加入复习"}</button>
            <button class="done ${mastered ? "active" : ""}" type="button">${mastered ? "已掌握" : "标记掌握"}</button>
          </div>
        </div>
      </div>
    </article>`;
}

function renderContent() {
  const root = $("#contentRoot");
  let visibleTotal = 0;
  root.innerHTML = chapters.map(chapter => {
    const items = concepts.filter(item => item.chapter === chapter.id && matches(item));
    visibleTotal += items.length;
    if (!items.length && (searchTerm || activeLevel !== "all")) return "";
    const sourceInfo = concepts.find(item => item.chapter === chapter.id)?.source;
    return `
      <section class="chapter-section" id="chapter-${chapter.id}" data-chapter-section="${chapter.id}" style="--chapter-color:${chapter.color}">
        <header class="chapter-head">
          <div class="chapter-index" style="background:${chapter.color}">${chapter.index}</div>
          <div class="chapter-title"><small>${chapter.subtitle}</small><h2>${chapter.title}</h2></div>
          ${sourceInfo ? `<div class="chapter-source">${sourceInfo.range}<br /><a href="${sourceInfo.url}" target="_blank" rel="noreferrer">回到原讲解 ↗</a></div>` : ""}
        </header>
        <div class="concept-list">${items.map(conceptCard).join("")}</div>
      </section>`;
  }).join("");

  if (!visibleTotal) {
    root.innerHTML = `<div class="empty-state"><strong>没有找到对应知识点</strong><p>换一个关键词，或清除当前难度筛选。</p></div>`;
  }
  bindCardEvents();
  observeSections();
}

function renderTimeline() {
  $("#timeline").innerHTML = timeline.map(item => `
    <button class="timeline-item" data-jump="${item.chapter}" type="button">
      <time>${item.time}</time><b>${item.title}</b>
    </button>`).join("");
}

function bindCardEvents() {
  $$(".concept-card").forEach(card => {
    const id = card.dataset.id;
    $(".concept-head", card).addEventListener("click", () => {
      card.classList.toggle("open");
      const open = card.classList.contains("open");
      $(".concept-head", card).setAttribute("aria-expanded", String(open));
      if (open) {
        state.lastConcept = id;
        saveState();
      }
    });

    $(".done", card).addEventListener("click", event => {
      event.stopPropagation();
      if (state.mastered.has(id)) state.mastered.delete(id); else state.mastered.add(id);
      saveState();
      card.classList.toggle("mastered", state.mastered.has(id));
      const button = event.currentTarget;
      button.classList.toggle("active", state.mastered.has(id));
      button.textContent = state.mastered.has(id) ? "已掌握" : "标记掌握";
      showToast(state.mastered.has(id) ? "已计入掌握进度" : "已取消掌握标记");
    });

    $(".review", card).addEventListener("click", event => {
      event.stopPropagation();
      if (state.review.has(id)) state.review.delete(id); else state.review.add(id);
      saveState();
      const button = event.currentTarget;
      button.classList.toggle("active", state.review.has(id));
      button.textContent = state.review.has(id) ? "已加入复习" : "加入复习";
      showToast(state.review.has(id) ? "已加入复习清单" : "已移出复习清单");
    });

    $$('[data-related]', card).forEach(button => button.addEventListener("click", event => {
      event.stopPropagation();
      const targetId = button.dataset.related;
      let target = document.getElementById(targetId);
      if (!target) {
        activeLevel = "all";
        searchTerm = "";
        $("#searchInput").value = "";
        $("#chainSection").hidden = false;
        $$("#levelFilters button").forEach(item => item.classList.toggle("active", item.dataset.level === "all"));
        renderContent();
        target = document.getElementById(targetId);
      }
      target?.classList.add("open");
      $(".concept-head", target)?.setAttribute("aria-expanded", "true");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }));
  });
}

function updateProgress() {
  const percent = Math.round((state.mastered.size / concepts.length) * 100);
  $("#progressValue").textContent = `${percent}%`;
  $("#progressBar").style.width = `${percent}%`;
  $("#masteredCount").textContent = state.mastered.size;
  $("#conceptCount").textContent = concepts.length;
}

function jumpToChapter(chapterId) {
  const target = chapterId === "overview" ? $("#overview") : $(`#chapter-${chapterId}`);
  if (!target) {
    activeLevel = "all";
    searchTerm = "";
    $("#searchInput").value = "";
    $$("#levelFilters button").forEach(button => button.classList.toggle("active", button.dataset.level === "all"));
    renderContent();
    requestAnimationFrame(() => jumpToChapter(chapterId));
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
}

let observer;
function observeSections() {
  observer?.disconnect();
  const sections = [$("#overview"), ...$$('[data-chapter-section]')].filter(Boolean);
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id === "overview" ? "overview" : visible.target.dataset.chapterSection;
    $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.chapter === id));
  }, { rootMargin: "-15% 0px -70% 0px", threshold: [0, .1, .3] });
  sections.forEach(section => observer.observe(section));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function openMenu() {
  document.body.classList.add("menu-open");
  $("#scrim").hidden = false;
  $("#mobileMenuBtn").setAttribute("aria-expanded", "true");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  $("#scrim").hidden = true;
  $("#mobileMenuBtn").setAttribute("aria-expanded", "false");
}

function bindGlobalEvents() {
  $("#chapterNav").addEventListener("click", event => {
    const button = event.target.closest("[data-chapter]");
    if (button) jumpToChapter(button.dataset.chapter);
  });
  document.addEventListener("click", event => {
    const jump = event.target.closest("[data-jump]");
    if (jump) jumpToChapter(jump.dataset.jump);
  });

  $("#searchInput").addEventListener("input", event => {
    searchTerm = event.target.value.trim();
    renderContent();
    $("#chainSection").hidden = Boolean(searchTerm);
  });

  $("#levelFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-level]");
    if (!button) return;
    activeLevel = button.dataset.level;
    $$("#levelFilters button").forEach(item => item.classList.toggle("active", item === button));
    renderContent();
  });

  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" || (event.key === "/" && document.activeElement !== $("#searchInput"))) {
      event.preventDefault();
      $("#searchInput").focus();
    }
    if (event.key === "Escape") {
      if (searchTerm) {
        searchTerm = "";
        $("#searchInput").value = "";
        $("#chainSection").hidden = false;
        renderContent();
      }
      closeMenu();
    }
  });

  $("#continueBtn").addEventListener("click", () => {
    let card = document.getElementById(state.lastConcept);
    if (!card) {
      activeLevel = "all";
      searchTerm = "";
      renderContent();
      card = document.getElementById(state.lastConcept);
    }
    card?.classList.add("open");
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  $("#resetBtn").addEventListener("click", () => {
    if (!state.mastered.size && !state.review.size) return showToast("当前没有学习记录");
    if (!window.confirm("确定清空已掌握与复习标记吗？知识内容不会受影响。")) return;
    state.mastered.clear();
    state.review.clear();
    state.lastConcept = "o-language";
    saveState();
    renderContent();
    showToast("学习记录已重置");
  });

  $("#mobileMenuBtn").addEventListener("click", () => document.body.classList.contains("menu-open") ? closeMenu() : openMenu());
  $("#scrim").addEventListener("click", closeMenu);
}

function initPwa() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
}

renderNav();
renderChains();
renderContent();
renderTimeline();
updateProgress();
bindGlobalEvents();
initPwa();
