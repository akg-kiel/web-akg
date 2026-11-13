const grid = document.querySelector('#entwuerfe');
const skill = document.querySelector('#skill');
const model = document.querySelector('#model');
const count = document.querySelector('#result-count');
const viewer = document.querySelector('#viewer');
const frame = document.querySelector('#design-frame');
const stage = document.querySelector('#preview-stage');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const previewStatus = document.querySelector('#preview-status');
let designs = [];
let visible = [];
let selected;
let viewportWidth = 1440;
let requestNumber = 0;
let opener;

function replaceURL(url) {
  try {
    history.replaceState(null, '', url);
  } catch {
    // Embedded comparison views may forbid History API updates; controls still work.
  }
}

function fitPreview() {
  const scale = Math.min(1, stage.clientWidth / viewportWidth);
  frame.style.width = `${viewportWidth}px`;
  frame.style.height = `${Math.ceil(stage.clientHeight / (scale || 1))}px`;
  frame.style.transform = `translateX(-50%) scale(${scale})`;
  document.querySelector('#viewport-info').textContent =
    `${viewportWidth} px · ${Math.round(scale * 100)} %`;
}

function updatePaging() {
  const index = visible.findIndex((design) => design.id === selected?.id);
  previous.disabled = index <= 0;
  next.disabled = index < 0 || index === visible.length - 1;
  document.querySelector('#position').textContent = `${index + 1} / ${visible.length}`;
}

function filterDesigns() {
  visible = designs.filter(
    (design) =>
      (skill.value === 'all' || design.skill === skill.value) &&
      (model.value === 'all' || design.model === model.value)
  );
  grid.replaceChildren(
    ...visible.map((design) => {
      const article = document.createElement('article');
      article.className = 'design-card';
      const button = document.createElement('button');
      button.className = 'design-trigger';
      button.type = 'button';
      const image = document.createElement('img');
      image.className = 'thumbnail';
      image.src = design.thumbnail;
      image.alt = '';
      image.width = 640;
      image.height = 400;
      image.loading = 'lazy';
      const meta = document.createElement('div');
      meta.className = 'card-meta';
      const labels = document.createElement('span');
      labels.textContent = `${design.skillName} · ${design.modelName}`;
      const number = document.createElement('span');
      number.textContent = `0${design.number}`;
      meta.append(labels, number);
      const heading = document.createElement('h2');
      heading.textContent = design.title;
      const description = document.createElement('p');
      description.className = 'card-description';
      description.textContent = design.description;
      button.append(image, meta, heading);
      button.addEventListener('click', () => openDesign(design, button));
      article.append(button, description);
      return article;
    })
  );
  count.textContent = `${visible.length} von ${designs.length} Entwürfen`;
  const url = new URL(location.href);
  for (const [key, value] of [
    ['skill', skill.value],
    ['model', model.value]
  ]) {
    if (value === 'all') url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  replaceURL(url);
}

async function openDesign(design, trigger) {
  selected = design;
  if (trigger) opener = trigger;
  document.querySelector('#viewer-title').textContent = design.title;
  document.querySelector('#viewer-meta').textContent =
    `${design.skillName} · ${design.modelName} · Variante ${design.number}`;
  document.querySelector('#design-description').textContent = design.description;
  document.querySelector('#open-design').href = design.path;
  frame.title = `${design.title} · ${design.skillName} · ${design.modelName}`;
  updatePaging();
  if (!viewer.open) viewer.showModal();
  replaceURL(`#${design.id}`);
  fitPreview();
  const currentRequest = ++requestNumber;
  frame.hidden = true;
  stage.setAttribute('aria-busy', 'true');
  previewStatus.hidden = false;
  previewStatus.textContent = 'Entwurf wird geladen …';
  try {
    const response = await fetch(design.path);
    if (!response.ok) throw new Error('Design unavailable');
    const html = await response.text();
    if (currentRequest !== requestNumber || !viewer.open) return;
    frame.srcdoc = html;
  } catch {
    if (currentRequest !== requestNumber) return;
    previewStatus.textContent =
      'Dieser Entwurf konnte nicht geladen werden. Versuche es erneut oder nutze „Separat öffnen“.';
    stage.setAttribute('aria-busy', 'false');
  }
}

frame.addEventListener('load', () => {
  if (!viewer.open || !frame.srcdoc) return;
  frame.hidden = false;
  previewStatus.hidden = true;
  stage.setAttribute('aria-busy', 'false');
  // srcdoc preserves the site's frame-denial headers; sandbox blocks draft scripts.
  frame.contentDocument?.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    event.preventDefault();
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const target = frame.contentDocument.getElementById(href.slice(1));
      if (!target) return;
      frame.contentWindow.scrollTo(
        0,
        target.getBoundingClientRect().top + frame.contentWindow.scrollY
      );
      target.focus({ preventScroll: true });
    } else {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    }
  });
  frame.contentDocument?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') viewer.close();
  });
  fitPreview();
});

previous.addEventListener('click', () => {
  const index = visible.findIndex((design) => design.id === selected?.id);
  if (index > 0) openDesign(visible[index - 1]);
});
next.addEventListener('click', () => {
  const index = visible.findIndex((design) => design.id === selected?.id);
  if (index >= 0 && index < visible.length - 1) openDesign(visible[index + 1]);
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => {
  ++requestNumber;
  frame.srcdoc = '';
  replaceURL(location.pathname + location.search);
  opener?.focus();
});
viewer.addEventListener('keydown', (event) => {
  if (
    event.target.matches('input,select,textarea') ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  )
    return;
  if (event.key === 'ArrowLeft' && !previous.disabled) previous.click();
  if (event.key === 'ArrowRight' && !next.disabled) next.click();
});
document.querySelectorAll('[data-width]').forEach((button) =>
  button.addEventListener('click', () => {
    viewportWidth = Number(button.dataset.width);
    document
      .querySelectorAll('[data-width]')
      .forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    fitPreview();
  })
);
new ResizeObserver(fitPreview).observe(stage);
for (const select of [skill, model]) select.addEventListener('change', filterDesigns);
document.querySelector('.filters').addEventListener('submit', (event) => event.preventDefault());

try {
  const response = await fetch('/entwuerfe/catalog.json');
  if (!response.ok) throw new Error('Catalog unavailable');
  designs = await response.json();
  const params = new URLSearchParams(location.search);
  if ([...skill.options].some((option) => option.value === params.get('skill')))
    skill.value = params.get('skill');
  if ([...model.options].some((option) => option.value === params.get('model')))
    model.value = params.get('model');
  const requestedId = location.hash.slice(1);
  filterDesigns();
  const requested = designs.find((design) => design.id === requestedId);
  if (requested) {
    if (!visible.includes(requested)) {
      skill.value = requested.skill;
      model.value = requested.model;
      filterDesigns();
    }
    await openDesign(requested);
  }
} catch {
  count.textContent = 'Übersicht nicht verfügbar';
  document.querySelector('#gallery-error').hidden = false;
} finally {
  grid.setAttribute('aria-busy', 'false');
}
