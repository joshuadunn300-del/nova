const { escapeHtml } = require('./escape');
const { RENDERERS } = require('./sections');
const { buildCss } = require('./css');
const { buildLeadClientScript } = require('./leadClient');

function compileToHtml(contentJson, opts = {}) {
  if (!contentJson || typeof contentJson !== 'object') {
    throw new Error('compileToHtml: contentJson must be an object');
  }
  const theme = contentJson.theme || {};
  const sections = Array.isArray(contentJson.sections) ? contentJson.sections : [];
  const siteId = opts.siteId || contentJson.site_id || '';
  const leadEndpoint = opts.leadEndpoint || '/__lead';
  const title = escapeHtml(opts.title || theme.siteTitle || 'Website');

  const bodyHtml = sections
    .filter(s => s && s.visible !== false)
    .map(s => {
      const renderer = RENDERERS[s.type];
      if (!renderer) {
        // unknown section type: skip rather than crash the whole page
        return `<!-- unknown section type: ${escapeHtml(s.type || 'undefined')} -->`;
      }
      const props = s.props || {};
      return s.type === 'hero' ? renderer(props, siteId) : renderer(props);
    })
    .join('\n');

  const hasLeadForm = sections.some(s => s && s.type === 'hero' && s.props && s.props.form && s.props.form.enabled);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>${buildCss(theme)}</style>
</head>
<body>
${bodyHtml}
${hasLeadForm ? buildLeadClientScript(leadEndpoint) : ''}
</body>
</html>`;
}

module.exports = { compileToHtml };
