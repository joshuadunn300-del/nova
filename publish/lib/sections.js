const { escapeHtml, escapeAttr } = require('./escape');

function safeUrl(url) {
  const u = (url || '').trim();
  if (!u) return '#';
  if (/^javascript:/i.test(u)) return '#';
  return escapeAttr(u);
}

function renderNavbar(props) {
  const logo = escapeHtml(props.logo || '');
  const links = Array.isArray(props.links) ? props.links : [];
  const linksHtml = links.map(l =>
    `<a class="nav-link" href="${safeUrl(l.href)}">${escapeHtml(l.label)}</a>`
  ).join('');
  const cta = props.ctaText
    ? `<a class="nav-cta" href="${safeUrl(props.ctaHref)}">${escapeHtml(props.ctaText)}</a>`
    : '';
  return `
  <nav class="section navbar">
    <div class="navbar-inner">
      <span class="logo">${logo}</span>
      <div class="nav-links">${linksHtml}</div>
      ${cta}
    </div>
  </nav>`;
}

function renderHero(props, siteId) {
  const headline = escapeHtml(props.headline || '');
  const sub = escapeHtml(props.subheadline || '');
  const ctaText = escapeHtml(props.ctaText || '');
  const ctaHref = safeUrl(props.ctaHref);
  const bg = props.backgroundImage ? safeUrl(props.backgroundImage) : '';
  const bgStyle = bg ? ` style="background-image:url('${bg}')"` : '';
  const form = props.form && props.form.enabled ? renderLeadForm(props.form, siteId) : '';
  return `
  <header class="section hero"${bgStyle}>
    <div class="hero-inner">
      <h1 class="hero-headline">${headline}</h1>
      ${sub ? `<p class="hero-sub">${sub}</p>` : ''}
      ${ctaText ? `<a class="btn btn-primary" href="${ctaHref}">${ctaText}</a>` : ''}
      ${form}
    </div>
  </header>`;
}

function renderLeadForm(form, siteId) {
  const submitText = escapeHtml(form.submitText || 'Get a Quote');
  const fields = Array.isArray(form.fields) && form.fields.length
    ? form.fields
    : [{ name: 'name', label: 'Name', type: 'text' }, { name: 'phone', label: 'Phone', type: 'tel' }, { name: 'email', label: 'Email', type: 'email' }];
  const fieldsHtml = fields.map(f => {
    const name = escapeAttr(f.name || 'field');
    const label = escapeHtml(f.label || f.name || '');
    const type = /^(text|tel|email)$/.test(f.type) ? f.type : 'text';
    return `<label class="lead-field">
      <span>${label}</span>
      <input type="${type}" name="${name}" required />
    </label>`;
  }).join('');
  return `
    <form class="lead-form" data-site-id="${escapeAttr(siteId || '')}" onsubmit="return NovaLead.submit(event, this)">
      ${fieldsHtml}
      <button type="submit" class="btn btn-primary">${submitText}</button>
      <p class="lead-form-status" aria-live="polite"></p>
    </form>`;
}

function renderServices(props) {
  const heading = escapeHtml(props.heading || 'Our Services');
  const items = Array.isArray(props.items) ? props.items : [];
  const itemsHtml = items.map(it => `
    <div class="service-card">
      <h3>${escapeHtml(it.title || '')}</h3>
      <p>${escapeHtml(it.description || '')}</p>
    </div>`).join('');
  return `
  <section class="section services">
    <h2>${heading}</h2>
    <div class="grid">${itemsHtml}</div>
  </section>`;
}

function renderGallery(props) {
  const heading = escapeHtml(props.heading || 'Gallery');
  const images = Array.isArray(props.images) ? props.images : [];
  const imgsHtml = images.map(img =>
    `<img loading="lazy" src="${safeUrl(img.src)}" alt="${escapeAttr(img.alt || '')}" />`
  ).join('');
  return `
  <section class="section gallery">
    <h2>${heading}</h2>
    <div class="gallery-grid">${imgsHtml}</div>
  </section>`;
}

function renderAbout(props) {
  const heading = escapeHtml(props.heading || 'About Us');
  const body = escapeHtml(props.body || '');
  const image = props.image ? `<img loading="lazy" src="${safeUrl(props.image)}" alt="${escapeAttr(heading)}" />` : '';
  return `
  <section class="section about">
    <div class="about-inner">
      <div class="about-text"><h2>${heading}</h2><p>${body}</p></div>
      ${image}
    </div>
  </section>`;
}

function renderTestimonials(props) {
  const heading = escapeHtml(props.heading || 'What Clients Say');
  const items = Array.isArray(props.items) ? props.items : [];
  const itemsHtml = items.map(it => {
    const rating = Math.max(0, Math.min(5, Number(it.rating) || 0));
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    return `<div class="testimonial-card">
      <p class="stars">${stars}</p>
      <p class="quote">"${escapeHtml(it.quote || '')}"</p>
      <p class="name">${escapeHtml(it.name || '')}</p>
    </div>`;
  }).join('');
  return `
  <section class="section testimonials">
    <h2>${heading}</h2>
    <div class="grid">${itemsHtml}</div>
  </section>`;
}

function renderFaq(props) {
  const heading = escapeHtml(props.heading || 'Frequently Asked Questions');
  const items = Array.isArray(props.items) ? props.items : [];
  const itemsHtml = items.map(it => `
    <details class="faq-item">
      <summary>${escapeHtml(it.question || '')}</summary>
      <p>${escapeHtml(it.answer || '')}</p>
    </details>`).join('');
  return `
  <section class="section faq">
    <h2>${heading}</h2>
    <div class="faq-list">${itemsHtml}</div>
  </section>`;
}

function renderCta(props) {
  const heading = escapeHtml(props.heading || '');
  const sub = escapeHtml(props.subheading || '');
  const btnText = escapeHtml(props.buttonText || '');
  const btnHref = safeUrl(props.buttonHref);
  return `
  <section class="section cta">
    <h2>${heading}</h2>
    ${sub ? `<p>${sub}</p>` : ''}
    ${btnText ? `<a class="btn btn-primary" href="${btnHref}">${btnText}</a>` : ''}
  </section>`;
}

function renderFooter(props) {
  const name = escapeHtml(props.businessName || '');
  const address = escapeHtml(props.address || '');
  const phone = escapeHtml(props.phone || '');
  const email = escapeHtml(props.email || '');
  const links = Array.isArray(props.links) ? props.links : [];
  const linksHtml = links.map(l => `<a href="${safeUrl(l.href)}">${escapeHtml(l.label)}</a>`).join('');
  const copyright = escapeHtml(props.copyrightText || `© ${new Date().getUTCFullYear()} ${props.businessName || ''}`);
  return `
  <footer class="section footer">
    <div class="footer-inner">
      <div><strong>${name}</strong>${address ? `<p>${address}</p>` : ''}${phone ? `<p>${phone}</p>` : ''}${email ? `<p>${email}</p>` : ''}</div>
      <div class="footer-links">${linksHtml}</div>
    </div>
    <div class="footer-bottombar">
      <span class="copyright">${copyright}</span>
      <span class="powered-by">&bull; Powered by Nova</span>
    </div>
  </footer>`;
}

const RENDERERS = {
  navbar: renderNavbar,
  hero: renderHero,
  services: renderServices,
  gallery: renderGallery,
  about: renderAbout,
  testimonials: renderTestimonials,
  faq: renderFaq,
  cta: renderCta,
  footer: renderFooter,
};

module.exports = { RENDERERS };
