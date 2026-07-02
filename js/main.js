// ============ Mobile nav ============
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ Tabs (Individuals / Startups / Enterprises) ============
const tabButtons = document.querySelectorAll('.tabs__btn');
const tabPanels = document.querySelectorAll('.tabs__panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => b.classList.remove('is-active'));
    tabPanels.forEach(p => p.classList.remove('is-active'));

    btn.classList.add('is-active');
    document.querySelector(`.tabs__panel[data-panel="${target}"]`).classList.add('is-active');
  });
});

// ============ Scenario console ticker ============
// Cycles through a small set of illustrative scenarios so the hero panel
// feels alive without relying on scroll-triggered animation.
const scenarios = [
  {
    query: '"Should we prepay the term loan or extend runway instead?"',
    rows: [
      { label: 'Outcome 1 — Prepay loan', value: 'Runway 6.1 mo', width: 52 },
      { label: 'Outcome 2 — Hold cash', value: 'Runway 9.4 mo', width: 71 },
      { label: 'Outcome 3 — Partial prepay', value: 'Runway 8.7 mo', width: 83 }
    ],
    pick: 'Outcome 3 — Partial prepay, preserve buffer'
  },
  {
    query: '"Fix or float the mortgage renewal this quarter?"',
    rows: [
      { label: 'Outcome 1 — Fixed rate', value: 'Cost ₹4.2L / yr', width: 61 },
      { label: 'Outcome 2 — Floating rate', value: 'Cost ₹3.6L / yr', width: 74 },
      { label: 'Outcome 3 — Split 60/40', value: 'Cost ₹3.8L / yr', width: 68 }
    ],
    pick: 'Outcome 2 — Float, rate cycle favours it'
  },
  {
    query: '"Hedge the EUR receivables or leave exposure open?"',
    rows: [
      { label: 'Outcome 1 — Full hedge', value: 'Risk −2.1%', width: 88 },
      { label: 'Outcome 2 — No hedge', value: 'Risk +6.4%', width: 34 },
      { label: 'Outcome 3 — Partial hedge', value: 'Risk +1.0%', width: 79 }
    ],
    pick: 'Outcome 3 — Partial hedge, keep upside'
  }
];

const consoleQuery = document.querySelector('.console__query');
const consoleRows = document.querySelectorAll('.console__row');
const pickValue = document.getElementById('pickValue');
const consoleTag = document.getElementById('consoleTag');

let scenarioIndex = 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyBestRow() {
  let bestIdx = 0;
  let bestWidth = -1;
  consoleRows.forEach((row, i) => {
    const w = parseInt(row.querySelector('.console__meter i').style.width, 10);
    if (w > bestWidth) { bestWidth = w; bestIdx = i; }
  });
  consoleRows.forEach((row, i) => row.classList.toggle('is-best', i === bestIdx));
}

function renderScenario(scenario) {
  if (!consoleQuery) return;
  consoleQuery.textContent = scenario.query;
  consoleRows.forEach((row, i) => {
    const data = scenario.rows[i];
    row.querySelector('.console__label').textContent = data.label;
    row.querySelector('.console__value').textContent = data.value;
    row.querySelector('.console__meter i').style.width = data.width + '%';
  });
  pickValue.textContent = scenario.pick;
  applyBestRow();
}

if (consoleQuery && !prefersReducedMotion) {
  applyBestRow();
  setInterval(() => {
    scenarioIndex = (scenarioIndex + 1) % scenarios.length;
    if (consoleTag) consoleTag.textContent = 'simulating…';
    consoleQuery.style.opacity = '0.4';
    setTimeout(() => {
      renderScenario(scenarios[scenarioIndex]);
      consoleQuery.style.opacity = '1';
      if (consoleTag) consoleTag.textContent = 'simulating…';
    }, 350);
  }, 5200);
} else if (consoleQuery) {
  applyBestRow();
}
