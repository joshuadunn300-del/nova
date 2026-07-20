import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SiteRenderer from '../../renderer/SiteRenderer.jsx';

// Compiles content_json to a single standalone static HTML file for real publish/hosting —
// reuses T2's REAL <SiteRenderer> (non-editable mode, so plain semantic markup, no
// contentEditable/data-edit-path cruft) via react-dom/server, same source of truth as the
// live editor preview, rather than pulling in T5's publish/lib/compile.js: that's a Node
// CommonJS module in a sibling top-level folder outside frontend/, unreachable from a Vite
// browser bundle without editing shared config (T2's file) — this achieves the same output
// (a self-contained static HTML string) without any of that cross-module-system friction.
function escapeHtml(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function collectPageCss() {
  const inline = Array.from(document.querySelectorAll('style')).map((s) => s.textContent).join('\n');
  const linked = await Promise.all(
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) =>
      fetch(l.href).then((r) => r.text()).catch(() => '')
    )
  );
  return `${inline}\n${linked.join('\n')}`;
}

export async function compileStaticHtml(doc, siteName) {
  const [css, bodyHtml] = await Promise.all([
    collectPageCss(),
    Promise.resolve(renderToStaticMarkup(createElement(SiteRenderer, { content: doc }))),
  ]);
  const title = escapeHtml(siteName || doc.seo?.title || 'Website');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
${doc.seo?.description ? `<meta name="description" content="${escapeHtml(doc.seo.description)}" />` : ''}
<style>${css}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}
