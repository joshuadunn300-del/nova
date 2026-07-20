// TEMP renderer — stands in for Terminal 2's real frontend/src/renderer + sections/*.
// Swap `renderDocument` for Terminal 2's renderer at integration (contract in editor/README.md).
// Every editable text prop gets data-edit-path + contenteditable so the parent editor can
// rewrite content_json on input, and every section gets data-section-id for control targeting.

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function editableSpan(path, value, tag = 'span') {
  return `<${tag} data-edit-path="${path}" contenteditable="true">${esc(value)}</${tag}>`;
}

const SECTION_RENDERERS = {
  navbar: (props, path) => `
    <nav class="s-navbar">
      <div class="logo">${editableSpan(`${path}.logo`, props.logo)}</div>
      <ul>${(props.links || []).map((l, i) => `<li>${editableSpan(`${path}.links.${i}.label`, l.label, 'a')}</li>`).join('')}</ul>
    </nav>`,
  hero: (props, path) => `
    <header class="s-hero" data-bg-path="${path}.background" style="background:${esc(props.background || '#111')}">
      <div class="bg-overlay" data-hero-bg-trigger>Click to change background</div>
      <h1>${editableSpan(`${path}.headline`, props.headline, 'span')}</h1>
      <p>${editableSpan(`${path}.subheadline`, props.subheadline, 'span')}</p>
      <button type="button">${editableSpan(`${path}.cta_label`, props.cta_label, 'span')}</button>
      <form class="lead-form">${(props.form?.fields || []).map((f) => `<input placeholder="${esc(f)}" />`).join('')}</form>
    </header>`,
  services: (props, path) => `
    <section class="s-services">
      <h2>${editableSpan(`${path}.title`, props.title)}</h2>
      <div class="grid">${(props.items || []).map((it, i) => `
        <div class="card">
          <h3>${editableSpan(`${path}.items.${i}.name`, it.name)}</h3>
          <p>${editableSpan(`${path}.items.${i}.desc`, it.desc)}</p>
        </div>`).join('')}</div>
    </section>`,
  gallery: (props, path) => `
    <section class="s-gallery">
      <h2>${editableSpan(`${path}.title`, props.title)}</h2>
      <div class="grid">${(props.images || []).map((src) => `<div class="thumb" style="background-image:url('${esc(src)}')"></div>`).join('')}</div>
    </section>`,
  about: (props, path) => `
    <section class="s-about">
      <h2>${editableSpan(`${path}.title`, props.title)}</h2>
      <p>${editableSpan(`${path}.body`, props.body, 'p')}</p>
    </section>`,
  testimonials: (props, path) => `
    <section class="s-testimonials">
      <h2>${editableSpan(`${path}.title`, props.title)}</h2>
      <div class="grid">${(props.items || []).map((it, i) => `
        <blockquote>
          <p>${editableSpan(`${path}.items.${i}.quote`, it.quote, 'p')}</p>
          <cite>${editableSpan(`${path}.items.${i}.author`, it.author)}</cite>
        </blockquote>`).join('')}</div>
    </section>`,
  faq: (props, path) => `
    <section class="s-faq">
      <h2>${editableSpan(`${path}.title`, props.title)}</h2>
      ${(props.items || []).map((it, i) => `
        <details>
          <summary>${editableSpan(`${path}.items.${i}.q`, it.q)}</summary>
          <p>${editableSpan(`${path}.items.${i}.a`, it.a, 'p')}</p>
        </details>`).join('')}
    </section>`,
  cta: (props, path) => `
    <section class="s-cta">
      <h2>${editableSpan(`${path}.headline`, props.headline)}</h2>
      <button type="button">${editableSpan(`${path}.button_label`, props.button_label, 'span')}</button>
    </section>`,
  footer: (props, path) => `
    <footer class="s-footer">${editableSpan(`${path}.text`, props.text)}</footer>`,
};

export function renderSection(section, index) {
  const path = `sections.${index}.props`;
  const body = SECTION_RENDERERS[section.type]
    ? SECTION_RENDERERS[section.type](section.props || {}, path)
    : `<div class="s-unknown">Unknown section type: ${esc(section.type)}</div>`;
  const hiddenClass = section.visible === false ? ' hidden-section' : '';
  return `<div class="editor-section${hiddenClass}" data-section-id="${esc(section.id)}" data-section-index="${index}">${body}</div>`;
}

const BASE_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: var(--font, Inter, sans-serif); color: #1a1a1a; }
  .editor-section { position: relative; outline: 1px dashed transparent; }
  .editor-section:hover { outline-color: rgba(59,130,246,0.5); }
  .editor-section.hidden-section { display: none; }
  [contenteditable]:hover { outline: 1px dashed rgba(59,130,246,0.6); }
  [contenteditable]:focus { outline: 2px solid #3b82f6; background: rgba(59,130,246,0.06); }
  .s-navbar { display:flex; justify-content:space-between; align-items:center; padding:16px 32px; background:#fff; }
  .s-navbar ul { display:flex; gap:20px; list-style:none; margin:0; padding:0; }
  .s-hero { position:relative; padding:96px 32px; text-align:center; color:#fff; }
  .s-hero h1 { font-size:2.5rem; margin:0 0 12px; }
  .s-hero .bg-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    background:rgba(0,0,0,0); color:transparent; cursor:pointer; font-size:14px; }
  .s-hero:hover .bg-overlay { background:rgba(0,0,0,0.35); color:#fff; }
  .s-hero .lead-form { display:flex; gap:8px; justify-content:center; margin-top:20px; flex-wrap: wrap; }
  .s-hero button, .s-cta button { background: var(--primary,#9D174D); color:#fff; border:0; padding:10px 20px; border-radius:6px; }
  section { padding:64px 32px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:24px; margin-top:24px; }
  .card, blockquote, .thumb { background:#f6f6f8; padding:20px; border-radius:8px; margin:0; }
  .thumb { height:160px; background-size:cover; background-position:center; }
  .s-cta { text-align:center; background: var(--secondary,#15171f); color:#fff; }
  .s-footer { text-align:center; padding:24px; background:#0d0e13; color:#999; font-size:13px; }
  @media (max-width: 480px) { .s-hero h1 { font-size:1.6rem; } section { padding:32px 16px; } }
`;

const BRIDGE_SCRIPT = `
<script>
  (function() {
    function post(msg) { window.parent.postMessage(Object.assign({ source: 'nova-editor-preview' }, msg), '*'); }
    document.addEventListener('input', function (e) {
      var el = e.target.closest('[data-edit-path]');
      if (!el) return;
      post({ type: 'edit', path: el.getAttribute('data-edit-path'), value: el.innerText });
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-hero-bg-trigger]')) {
        var hero = e.target.closest('[data-bg-path]');
        post({ type: 'bg-click', path: hero.getAttribute('data-bg-path') });
      }
    });
  })();
</script>`;

export function renderDocument(doc) {
  const theme = doc.theme || {};
  const sectionsHtml = (doc.sections || []).map(renderSection).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8" />
    <style>:root{--primary:${theme.primary || '#9D174D'};--secondary:${theme.secondary || '#15171f'};--font:${theme.font || 'Inter'};}${BASE_CSS}</style>
    </head><body>${sectionsHtml}${BRIDGE_SCRIPT}</body></html>`;
}
