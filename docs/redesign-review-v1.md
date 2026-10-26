# Design Critique: AKG-127 · First redesign

## Verdict

**Much improved over the rejected MVP, but not yet an unqualified design approval.** The original logo and real Petruskirche photography finally make this recognizably AKG; the first screen is welcoming rather than an announcement of missing data. It still feels somewhat like a church landing-page template below that opening: oversized general-purpose slogans and repeated invitations outweigh concrete orientation. Keep the chosen blue/white, Figtree and photographs; improve the hierarchy and the honesty of the next steps, not the brand again.

- **Smoke Test:** Clean after triage at 390, 768 and 1440px on `/`, `/gottesdienste`, `/gemeinde`, `/kontakt`. Eight reported intersections and three edge hits are intentional overlays/full bleed or wrapped-inline bounding-box artifacts, not broken layout.
- **AI-Slop Risk:** Low on the literal fingerprint checklist; moderate residual template impression from oversized slogan sections and interchangeable invitation copy. This is no longer the rejected anonymous editorial skin.
- **Execution:** Minor issues — sound common edges and equal primary-control heights; mobile image treatment and footer proportions need correction.
- **Spec Conformance:** Strong on adopted identity, partial on structural direction, compactness and truthful destinations. Oxide red and Source Sans were proposals explicitly superseded by `brand-spec.md`, not missing implementation.
- **Findings:** 7 total — P0: 0 · P1: 3 · P2: 4 · P3: 0. Strengths separately.
- **Verified:** Supplied v1 screenshots inspected in native-resolution 1000px tiles; old MVP opening also inspected for comparison. Supplied measurements reviewed and existing read-only Playwright smoke pack independently rerun against parent-owned port 8787, with matching hit counts. Supplemental live measurements confirm mobile image/caption and footer dimensions. No source/tests/Linear changes, builds or server operations.

### Evidence and version boundary

Primary evidence: `/tmp/akg-v1-home-1440.png`, `/tmp/akg-v1-home-390.png`, `/tmp/akg-v1-gemeinde-1440.png`, `/tmp/akg-v1-kontakt-390.png`, `/tmp/akg-v1-measurements.json`. Crops: `/tmp/akg-review-{page}-{width}-{tile}.png`. Rerun: `/tmp/akg-review-v1-measurements.json`; supplemental measurements: `/tmp/akg-review-v1-precision.json`.

**This judges the built v1, not concurrent source edits.** Other work has changed subpages since this build; do not treat source inspection as proof a correction is visible. Parent is already removing the redundant welcome section and reducing the empty News zone/4570px mobile homepage. Those are valid corrections and are not duplicated as new assignments below. Rebuild and recapture before calling any finding resolved.

Not verified here: keyboard/menu states, 320/1024px, zoom/text enlargement, populated/stale/empty fixture states, full accessibility or launch readiness. A combined supplemental measurement command timed out after the complete smoke rerun had written its results; a shorter measurement run succeeded. Supplemental desktop measurements without an explicit font-ready wait are not used for typography judgments; those use the font-ready v1 dataset.

## Findings

### P0 — Critical

None confirmed in this review.

### P1 — High

#### [F-01] Invitations promise a useful next step before admitting it is unavailable · Gap

- **Dimension:** Microcopy / States / Emotional resonance.
- **Location:** Mobile `/kontakt`; homepage “Angebote & Gruppen — Wege, um Anschluss zu finden”; `/gemeinde` aside “Wege in die Gemeinde”.
- **Issue:** Contact opens with an invitation, then “Was möchtest du wissen?” and “Hier sollst du den passenden Kontakt finden, ohne lange suchen zu müssen”, despite offering no contact. Group-oriented links similarly sound like routes to actual participation, while the destination has no groups or meeting information.
- **Impact:** Visitors invest attention in a promised action and are sent back to general introductory pages. More warmth does not compensate for that loop.
- **Evidence:** `/tmp/akg-review-kontakt-390-0.png`: the no-contact disclosure starts around y=700, after several introductory paragraphs. Homepage tile `home-390-2`; Gemeinde tile `gemeinde-1440-1`. Current `angebote.astro` explicitly says no group list or meeting times; that source is corroborating scope evidence, not a screenshot of the latest edit.
- **Recommendation:** Immediately below “Kontakt”, state “Kontaktangaben sind in dieser Vorschau noch nicht verfügbar.” Remove the hypothetical question/promise and retain one honest alternative. Keep global navigation, but remove the extra promotional groups link while gated, or label its unavailable overview before the click. Do not invent contact details, groups or participation claims.

#### [F-02] The primary destination buries the concrete local orientation · Inconsistency

- **Dimension:** Information architecture / Hierarchy.
- **Location:** `/gemeinde`, `#orte` after Leitbild, history and another invitation aside.
- **Issue:** “Gemeinde kennenlernen” is the dominant homepage action, but the destination makes visitors read repeated general invitations before finding its three specific places.
- **Impact:** The strongest available authentic information is harder to reach than generic prose; the site still feels like an introduction to an introduction.
- **Evidence:** Font-ready dataset: “Kirche und Gemeindehäuser” starts at y=1618 desktop, y=2401 mobile. Desktop screenshot tile `gemeinde-1440-1` confirms the order. Art direction calls for named places immediately visible on this destination.
- **Recommendation:** Move the existing named place links directly below the short page introduction, or expose those exact links there and keep detail/history below. This requires no new facts or assets. Retain the explicit caveat that addresses/access information are not yet provided.

#### [F-03] Large marketing typography continues the template impression · Suggestion

- **Dimension:** Typography / AI-slop assessment / Composition.
- **Location:** Desktop homepage slogans and subpage headings, particularly “Das Miteinander macht den Unterschied.” and “Unsere Gemeinde”.
- **Issue:** Changing the font has not fully changed the earlier oversized editorial behavior. Generic statements still occupy the scale of major editorial content; the specific church name is much quieter.
- **Impact:** The opening is friendly, but successive huge promises feel commercially packaged rather than like a practical local congregation website.
- **Evidence:** Font-ready v1 values: homepage H1 82.08px; subpage H1 72px; major H2 51.84px. Art-direction starting points were 56/44/30px. The desktop Gemeinde introduction alone occupies 381px before the substantive section begins. See `home-1440-0`, `home-1440-2`, `gemeinde-1440-0` crops.
- **Recommendation:** Keep Figtree. Try desktop H1 60px homepage / 44px subpages, H2 32px; mobile H1 36–40px and H2 28px. Replace the “Miteinander” slogan with the concrete section subject rather than another invitation. These are design recommendations, not a claim that the alternative font/palette proposal is binding.

### P2 — Medium

#### [F-04] Mobile photo treatment conceals the church entrance · Inconsistency

- **Dimension:** Imagery / Emotional resonance / Precision.
- **Location:** Homepage `.welcome-photo` at 390px.
- **Issue:** The full-width credit overlay is intentional, but on mobile it covers the lower architecture. The visible result is essentially a tower crop, not the welcoming church/frontage visible on desktop.
- **Impact:** The best local visual evidence loses its human-scale point of arrival.
- **Evidence:** `home-390-0`: picture begins y=645. Measured image 390 × 292.5px, caption 390 × 53.78px starting y=883.75; only about 239px of image remains unobscured. Original photo is 5:4.
- **Recommendation:** On mobile put the credit in normal flow below the image and use the original 5:4 ratio (390 × 312px at this width). Preserve both tower and entrance. Recover the modest extra height from redundant copy/empty space, not by hiding the caption or cropping the entrance again.

#### [F-05] Footer is still almost a thousand pixels tall on mobile · Suggestion

- **Dimension:** Density / Composition / Precision.
- **Location:** Shared `.site-footer` and `.footer-heading`.
- **Issue:** The improved two-column links still follow a second large logo plus repeated welcome slogan. The footer dominates short placeholder pages.
- **Impact:** On `/kontakt`, the oversized ending reinforces how little actionable content precedes it.
- **Evidence:** Live 390px measurement: footer 940.53px; heading block 219.92px, including 24px gap and 32px bottom padding. The 2267px contact screenshot shares this footer, so approximately 41% of that page is its ending. See `kontakt-390-1`, `home-390-3/4`.
- **Recommendation:** Keep the complete original logo in the header. In the footer use one compact identity line or a smaller proportional logo, without another welcome slogan; target a heading block no taller than 96px. Reduce inter-group whitespace toward 24px while retaining 44px primary navigation targets and visible legal links. Aim for roughly 650–700px total at 390px rather than shrinking text/tap areas.

#### [F-06] Photo credits are unusually small for this otherwise readable site · Inconsistency

- **Dimension:** Typography / Accessibility intent.
- **Location:** `.photo-credit` under both photographs.
- **Issue:** Attribution is rendered at 11px while the art-direction guidance asks for 15px captions/status text.
- **Impact:** The authenticity/provenance layer becomes conspicuously fine print, especially on mobile. This is a readability concern, not a measured contrast failure.
- **Evidence:** Computed `.photo-credit` font-size 11px and line-height 16.5px; native-resolution mobile crops and tablet credit crops show the small text. No sub-11px/contrast detector failure was reported.
- **Recommendation:** Set captions to 15px / approximately 22px and allow normal wrapping below images. Keep both attribution and license links. Do not misclassify their intentional overlay as a collision.

#### [F-07] Footer labels a channel as a livestream · Inconsistency

- **Dimension:** Microcopy / Affordance.
- **Location:** “Livestream (YouTube)” in shared footer; `src/lib/site.ts`.
- **Issue:** The destination is a YouTube channel, not an evidenced currently running stream.
- **Impact:** The label promises a more specific experience than the available destination establishes.
- **Evidence:** `home-390-4` screenshot; `externalLinks` points to `/channel/UCXlzBLKlUkgAXdd-gPjKZRw`. Art direction explicitly calls for a channel link rather than a claimed live stream.
- **Recommendation:** “YouTube-Kanal” or “AKG auf YouTube”, retaining the external indicator. No external verification or new claim is required for that narrower label.

### P3 — Low

None worth prioritizing over the above.

## What Looks Good (Strengths)

- **P1 · Identity:** The real logo is intact, on white, and proportional. Local original download and `public/images/apostel-logo.png` have identical SHA-256 `f876966571e2cf45b5c444047eadf9fef1ecafce4ffe43471bb87dfb79e3fec9`. No redesign of the mark is needed.
- **P1 · Authenticity:** Actual Petruskirche brickwork and timber provide recognizability and warmth without fabricated people, stock church scenes or invented testimonials. Preserve them.
- **P1 · Hierarchy:** At 390px the primary CTA is fully visible at y=491–545, ahead of any source-failure notice. That is a real improvement over the old dark, unavailable-service panel.
- **P2 · Execution:** Main content edges align at x=20 mobile / x=112 desktop in the font-ready measurements. Both homepage primary buttons are approximately 54px high, with consistent padding. No need to invent alignment defects.
- **P2 · Visual restraint:** No ornamental card grid, gradients, glass, decorative icons, fake proof or animation. Blue is an intentional extension of the official logo, not an untouched AI palette.
- **P2 · Copy direction:** Plain German, direct address and visible destination links are much more approachable than the earlier production-process language. The remaining task is specificity, not making everything formal again.

### Detector triage

- Six image/link intersections: intentional hero caption overlay, two at each width. Three edge hits: intentional full-bleed hero image. Not P0 defects.
- Two additional tablet link/link hits: multi-line inline license-link bounding rectangles include empty space on the preceding line. `/tmp/akg-v1-gemeinde-768-reviewcrop.png` and `/tmp/akg-v1-home-768-reviewcrop.png` show separated text, not overprinted glyphs. Use client rects per line if refining this detector.
- No reported page overflow, unintended clipping, missing/distorted images, invisible content or computed contrast failures in the checked matrix. This does not certify zoom, focus, all states or image-background contrast.

### AI fingerprint coverage

No gradient text, dark glow, glassmorphism, metrics row, equal feature-card grid, emoji icons, repeated rounded-shadow surfaces, centered-everything composition, gradient blobs, gradient CTA, decorative bento, fake social proof or icon-circle rows. Brand-blue palette and Figtree are intentional, not defects. The mild remaining tell is generously repeated landing-page section treatment with broad invitation copy; distinguish that from claiming five nonexistent SaaS fingerprints.

## Spec Conformance

| Token / Rule          | Adopted intent                                       | Observed                                         | Status           |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------ | ---------------- |
| Logo                  | Original, unchanged                                  | Matching original file; proportional render      | ✓                |
| Palette               | Blue `#006c9e`, ink `#173b50`, white, wash `#eaf3f7` | Present in current CSS and screenshot appearance | ✓                |
| Font                  | Local Figtree                                        | Font-ready measurements report Figtree           | ✓                |
| Main mobile action    | Visible in first viewport                            | Bottom y≈545 at 390px                            | ✓                |
| Photo subject         | Preserve relevant architecture                       | Mobile caption obscures entrance                 | Needs correction |
| Type hierarchy        | Restrained, concrete subjects                        | 82/72/52px desktop headline tiers                | Partial          |
| Caption readability   | Art-direction guidance 15px                          | 11px                                             | ✗                |
| Primary journey       | Immediate named local orientation                    | Places heading at y=2401 mobile                  | ✗                |
| Compact footer        | No extra marketing finale                            | 941px mobile, repeated welcome                   | Partial          |
| Honest external label | Channel, not assumed live stream                     | “Livestream (YouTube)”                           | ✗                |

## Top 3 Actions

1. Remove dead-end participation/contact promises and surface the three actual place links near the top of `/gemeinde`.
2. Keep the chosen identity, but reduce headline scale and generic slogan repetition; finish the parent's already-underway welcome/News compression.
3. Repair the mobile photo/caption treatment and trim the shared footer, then recapture the rebuilt pages before approval.
