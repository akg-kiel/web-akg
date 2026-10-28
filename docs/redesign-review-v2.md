# Design Critique: AKG-127 · Independent v2 re-check

## Verdict

**Yes: this is now a credible, coherent local church website design, not the rejected anonymous AI-template treatment.** The original identity, real church photograph, restrained hierarchy and concrete place names work together; the unavailable content no longer masquerades as a useful participation/contact journey. No residual P0/P1 design defect is confirmed in the supplied evidence. One small typography inconsistency remains; local-design acceptability is not user approval or production readiness.

- **Smoke Test:** Supplied results clean after triage at 390/768/1440px for `/`, `/gottesdienste`, `/gemeinde`, `/kontakt`. Three edge hits are the intentional full-bleed hero image; no reported overflow, overlaps, clipping, broken/distorted images, invisible content or contrast failures. Not independently rerun.
- **AI-Slop Risk:** Low — the welcome/services copy remains broadly phrased, but actual AKG identity and named local destinations now anchor it. No cluster of gradient/glass/card-grid/fake-proof fingerprints.
- **Execution:** Minor issues — measured shared edges and CTA geometry are sound; one H2 override escapes the intended cap.
- **Spec Conformance:** Strong on adopted blue/white/Figtree identity, truthful destinations and structural corrections; partial on the H2 cap.
- **Findings:** 1 total — P0: 0 · P1: 0 · P2: 1 · P3: 0.
- **Verified:** Native-resolution 1000px crops of supplied rebuilt v2 home (390/1440), Gemeinde (390/1440) and Kontakt (390); supplied measurements across all twelve route/width combinations; relevant source and logo hash. No builds, servers, browser sessions, test runs or app changes.

### Scope and evidence

Read AKG-127 description/acceptance criteria and comments (none); confirmed **Website AKG**, milestone **3 · MVP: Kernwebsite**, whose description requires approved core content. Linear updates and test execution remain with the parent.

Evidence: `/tmp/akg-v2-{home,gemeinde}-{390,1440}.png`, `/tmp/akg-v2-kontakt-390.png`, `/tmp/akg-v2-measurements.json`; native-resolution crops `/tmp/akg-review-v2-*.png`. Intent: `docs/brand-spec.md`, `docs/redesign-art-direction.md`, prior `docs/redesign-review-v1.md` and the correction brief. This evaluates the captured v2, not any later parent changes.

**Capture limitation:** The mobile Gemeinde screenshot has a blank reserved photo region before its visible credit. Desktop renders the photograph; the component is lazy-loaded and the capture script does not explicitly await image decode after scrolling. Measurements report no broken image. This is unresolved capture evidence, not proof of an application defect: parent should confirm the photo while scrolling and recapture it before claiming complete mobile image verification.

Keyboard/menu/focus, zoom, additional widths, populated/stale data, full accessibility and quality-command results were not independently verified here.

## Findings

### P0 — Critical

None confirmed.

### P1 — High

None confirmed.

### P2 — Medium

#### [F-01] Prose H2 override still exceeds the corrected scale · Inconsistency

- **Dimension:** Typography / Precision.
- **Location:** `src/styles/globals.css:583–585`, `.prose h2`; desktop Gemeinde history, Gottesdienste invitation and Kontakt content heading.
- **Issue:** The shared H2 cap is 32px, but this more-specific rule retains `clamp(1.75rem, 2.6vw, 2.4rem)`.
- **Impact:** Secondary prose headings regain unnecessary prominence; v1 F-03 is substantially corrected, not fully resolved.
- **Evidence:** Supplied 1440px measurements give **37.44px** for “Aus zwei Gemeinden wurde eine.”, “Gott begegnen. Im Glauben wachsen.” and “Verlässliche Kontaktwege”; ordinary section H2s are **32px**. Gemeinde desktop crop shows the larger history heading.
- **Recommendation:** Remove the `.prose h2` font-size override, retaining its margin rule, so it inherits the existing **28–32px** shared scale. No new token or redesign needed.

### P3 — Low

None worth adding.

## Resolved v1 findings

| v1                                                 | Re-check result                                                                                                                                                                                                                                                     |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-01: unavailable next steps presented as promises | **Resolved.** Contact unavailability is directly beneath H1; no fake question/form promise. Homepage groups promotion is replaced by named places with pending-profile labels; Gemeinde's overview link explicitly names its status.                                |
| F-02: places buried after general prose            | **Resolved.** Places now precede Leitbild/history. Places H2 moves from y≈2401 to **543 mobile**, and y≈1618 to **547 desktop**.                                                                                                                                    |
| F-03: oversized marketing hierarchy                | **Mostly resolved.** H1 is **60px home / 44px subpages desktop**, **40/36px mobile**. Repeated welcome/Miteinander slogan and homepage roof image are gone. Remaining H2 override is F-01 above.                                                                    |
| F-04: mobile photo entrance obscured               | **Resolved on homepage.** Image is **390 × 312px (5:4)**; entrance and forecourt remain visible, credit follows below.                                                                                                                                              |
| F-05: oversized repeated footer identity           | **Resolved in substance.** One identity line replaces duplicate logo/welcome; mobile footer is approximately **732px**, down from 941px. Slightly above the suggested target, but no longer a second marketing finale; do not shrink tap targets to chase a number. |
| F-06: tiny credits                                 | **Resolved.** `.photo-credit` is **15px / 22.5px**, readable in the captures, with linked attribution/license in normal flow.                                                                                                                                       |
| F-07: channel called livestream                    | **Resolved.** Footer now says **YouTube-Kanal**, with external indicator.                                                                                                                                                                                           |

## What Looks Good (Strengths)

- **P1 · Identity/authenticity:** Original logo remains proportional and unchanged; SHA-256 matches v1's recorded original: `f876966571e2cf45b5c444047eadf9fef1ecafce4ffe43471bb87dfb79e3fec9`. Actual Petruskirche photography supplies specificity without fabricated people or social proof.
- **P1 · Hierarchy:** One clear homepage action; at 390px it occupies y=481–535, before the photo and failure notices. Concrete places now lead the destination page.
- **P2 · Composition:** Shared content edges remain x=20 mobile / x=112 desktop; primary CTA is 54px high. Empty news is compressed; mobile homepage is 3312px instead of v1's 4570px.
- **P2 · Honesty:** Explicit preview limits and narrowly named external destinations preserve trust without returning to a status-dashboard aesthetic.

## Spec Conformance

| Rule                                              | Observed                                                | Status  |
| ------------------------------------------------- | ------------------------------------------------------- | ------- |
| Original identity; adopted blue/white and Figtree | Retained                                                | Strong  |
| Concrete orientation before general story         | Named places directly after Gemeinde intro              | Strong  |
| Headline restraint                                | H1 corrected; prose H2 still 37.44px desktop            | Partial |
| Mobile hero and attribution                       | 5:4 image, unobscured entrance, normal-flow 15px credit | Strong  |
| Compact ending; no repeated welcome               | Single identity line, grouped navigation                | Strong  |

## Top 3 Actions

1. Remove the prose H2 font-size override; this is a small correction, not grounds to restart the design.
2. Confirm the mobile Gemeinde lazy image in the parent's verification and replace the incomplete capture; retain independent keyboard/axe/quality checks as separate evidence.
3. Present this direction for user judgment. Keep live events/news, contacts, addresses/access information, editorial/media and legal approvals as explicit launch blockers—not invented content and not evidence that the local visual design is still rejected AI slop.
