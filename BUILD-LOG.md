# Nova — Build Log

## LANDING CREW - L3 (pricing + integrations + testimonials + stats)

**Files (new, all under `frontend/src/marketing/sections/`):**
- `PricingSection.jsx`
- `Integrations.jsx`
- `TestimonialsMarquee.jsx`
- `StatsBand.jsx`

**PricingSection**
- Monthly $39/$79/$149, annual toggle shows $31/$63/$119 equivalents with "$X/mo billed monthly · $Y/yr · Save 20%" caption — $374/$758/$1430 yearly totals copied verbatim from rubric (not recomputed; the raw 20%-off math rounds slightly differently, rubric says the mapping is exact).
- 4 cards verbatim: Free Trial (= Starter, 3-day/card-required copy, "Nova branding shown"), Starter ("Remove Nova branding"), Pro (Most Popular, pink glow), Agency (Best Value).
- "Every plan includes" strip on all 4 cards.
- CTAs → `/signup` via react-router `Link`.
- **Exported `PRICING_PLANS` from `PricingSection.jsx`** — single source of truth. Billing.jsx should import this instead of keeping its own copy once it's ready to converge.

**Integrations** — 4 cards verbatim (Framer, Gmail, Google Maps, Script Writer), Request a feature / See all features links. Used lucide-react generic icons (Layers/Mail/MapPin/FileText) since lucide has no brand logos.

**TestimonialsMarquee** — header (4.9★, "200+ Agency Owners Scaled"), two CSS-keyframe marquee rows scrolling opposite directions, all 20 names/roles from the rubric with quotes written to match each listed hook. Product name swapped to Nova; YouTube-channel references genericized to "a YouTube video" — mentor's name never appears anywhere in the file.
- Note: the rubric pointed to a "recon transcript" for verbatim quote text that wasn't found in the vault (only name/role/hook keywords were present in `landing.md`) — quotes here are written from the hooks, not transcribed. Flag if the real transcript turns up later so these can be swapped for verbatim text.

**StatsBand** — 4 count-up-on-scroll stats via IntersectionObserver + rAF (no new dependency). Placeholder targets: 12,000+ leads generated, $1.2M+ client revenue generated, 40,000 websites analyzed, 800+ deals closed.
- **FLAG: Josh picks final stat numbers** — currently placeholders per rubric instruction.

**Self-grade:** B+. Copy, pricing math, and structure match the rubric closely; layout/spacing wasn't checked against a live render (no dev server run this pass — scope was 4 isolated files, not page assembly). Verify visually once another crew member wires these into the full landing page.

**Scope respected:** touched only the 4 new files above + this log. Nothing outside `frontend/src/marketing/` modified.

### L3 — Fidelity polish pass (interrupted, consolidating to single builder)

- Added `id="pricing"` / `id="integrations"` / `id="testimonials"` / `id="stats"` anchors on all 4 section wrappers for L4's nav/footer links (another pass has since also added `scroll-mt-24` to these — kept, not reverted).
- Confirmed the full page now assembles via `marketing/Landing.jsx` + `frontend/marketing-harness.html` (built by other terminals) — used that instead of a standalone harness.
- Started a live-vs-local comparison at 1440px against https://tenji.ai/: confirmed pricing H2/sub copy and layout rhythm match closely. One real delta spotted before being cut off — live site's "PRICING" eyebrow renders inside a pill badge with a leading dot (` ● PRICING`), ours is plain uppercase tracked text with no pill/dot. Not yet fixed.
- Playwright screenshot automation was blocked (no chromium binary installed, install command denied by sandbox); pivoted to the Claude-in-Chrome extension, which then stopped responding (stuck tab context, likely a pending side-panel permission prompt) — no mobile (375px) pass completed, and no hover/active-state or toggle-animation or marquee-jank or count-up-timing comparisons completed before the interrupt.
- **Orchestrator called for consolidation to a single builder mid-pass.** Stopping here per that instruction — no more edits after this commit.
- **Handoff for whoever continues fidelity polish:** the PRICING eyebrow pill/dot is the one confirmed delta; toggle animation, marquee smoothness, count-up timing, and card hover/active states vs. live tenji.ai are still unverified and worth a fresh pass.
