const BUTTON_RADIUS = { Rounded: '0.375rem', Pill: '9999px', Sharp: '0px' };
const CARD_RADIUS = { Sharp: '0px', Soft: '0.75rem', Round: '1.5rem' };

function buildCss(theme) {
  const primary = /^#[0-9a-fA-F]{3,8}$/.test(theme.primary || '') ? theme.primary : '#9D174D';
  const secondary = /^#[0-9a-fA-F]{3,8}$/.test(theme.secondary || '') ? theme.secondary : '#15171f';
  const font = (theme.font || 'Inter').replace(/[^a-zA-Z0-9 ]/g, '') || 'Inter';
  const headingFont = (theme.headingFont || theme.font || 'Inter').replace(/[^a-zA-Z0-9 ]/g, '') || font;
  const btnRadius = BUTTON_RADIUS[theme.buttonStyle] || BUTTON_RADIUS.Rounded;
  const cardRadius = CARD_RADIUS[theme.cornerRadius] || CARD_RADIUS.Soft;

  return `
:root {
  --primary: ${primary};
  --secondary: ${secondary};
  --heading-font: '${headingFont}', system-ui, sans-serif;
  --btn-radius: ${btnRadius};
  --card-radius: ${cardRadius};
}
* { box-sizing: border-box; }
body { margin: 0; font-family: '${font}', system-ui, sans-serif; color: #1a1a1a; line-height: 1.5; overflow-wrap: break-word; }
h1, h2, h3 { font-family: var(--heading-font); }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--primary); text-decoration: none; }
.section { padding: 64px 24px; max-width: 1200px; margin: 0 auto; }
.btn { display: inline-block; padding: 12px 28px; border-radius: var(--btn-radius); font-weight: 600; }
.btn-primary { background: var(--primary); color: #fff; }

.navbar { padding: 16px 24px; background: #fff; border-bottom: 1px solid #eee; max-width: none; }
.navbar-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.logo { font-weight: 700; font-size: 1.25rem; color: var(--secondary); }
.nav-links { display: flex; gap: 20px; flex-wrap: wrap; }
.nav-link { color: var(--secondary); }
.nav-cta { background: var(--primary); color: #fff; padding: 8px 18px; border-radius: var(--btn-radius); }

.hero { background: linear-gradient(135deg, var(--secondary), #000); background-size: cover; background-position: center; color: #fff; padding: 96px 24px; text-align: center; max-width: none; }
.hero-inner { max-width: 720px; margin: 0 auto; }
.hero-headline { font-size: clamp(2rem, 5vw, 3rem); margin: 0 0 16px; }
.hero-sub { font-size: 1.15rem; opacity: 0.9; margin: 0 0 24px; }

.lead-form { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; background: rgba(255,255,255,0.08); padding: 24px; border-radius: var(--card-radius); text-align: left; }
.lead-field { display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
.lead-field input { padding: 10px 12px; border-radius: var(--card-radius); border: 1px solid #ccc; font-size: 1rem; }
.lead-form-status { margin: 0; font-size: 0.9rem; min-height: 1.2em; }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 32px; }
.service-card, .testimonial-card { background: #f7f7f8; border-radius: var(--card-radius); padding: 24px; }
h2 { font-size: clamp(1.5rem, 4vw, 2.25rem); color: var(--secondary); text-align: center; margin: 0; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 32px; }
.gallery-grid img { border-radius: var(--card-radius); object-fit: cover; aspect-ratio: 4/3; }

.about-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: center; }
.about-inner img { border-radius: var(--card-radius); }

.stars { color: #f5a623; letter-spacing: 2px; }
.quote { font-style: italic; }
.name { font-weight: 600; color: var(--secondary); }

.faq-list { margin-top: 32px; display: flex; flex-direction: column; gap: 12px; }
.faq-item { background: #f7f7f8; border-radius: var(--card-radius); padding: 16px 20px; }
.faq-item summary { cursor: pointer; font-weight: 600; }

.cta { background: var(--secondary); color: #fff; text-align: center; max-width: none; }
.cta .btn-primary { margin-top: 16px; }

.footer { background: #0d0e12; color: #ccc; max-width: none; padding-bottom: 0; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 24px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-links { display: flex; gap: 16px; flex-wrap: wrap; }
.footer a { color: #ccc; }
.footer-bottombar { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; color: #777; font-size: 0.85rem; }

@media (max-width: 768px) {
  .about-inner { grid-template-columns: 1fr; }
  .nav-links { order: 3; width: 100%; justify-content: center; }
  .footer-inner { flex-direction: column; text-align: center; }
  .footer-bottombar { flex-direction: column; gap: 8px; text-align: center; }
}
`.trim();
}

module.exports = { buildCss };
