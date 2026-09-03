# Agent Contract

## Workflow

- Read the Linear issue, acceptance criteria, comments, and milestone before implementation.
- Confirm the issue belongs to **Website AKG**; the AKG team also contains unrelated website projects.
- Keep changes focused on one issue and preserve unrelated work.
- Update Linear when work starts, reaches review, or is completed.
- Never merge, deploy to production, change DNS, or close an issue without the requested finish line and successful checks.

## Project boundaries

- This repository replaces the old WordPress site at `akg-kiel.de`; treat that site as migration input, not unquestioned current truth.
- Migrate only content approved by the migration inventory. Do not recreate obsolete pages or WordPress structure by default.
- Keep **Website Konzerte** and **Website Dreimaster** as separate products and link to them where the information architecture requires it.
- Do not invent names, times, contact details, accessibility claims, donation information, legal text, or ChurchTools data. Use an approved source or mark the missing input.
- Keep one source of truth per content type and expose only data approved for public use.

## Technical work

- Until AKG-57 is resolved, do not lock or scaffold the application stack.
- After AKG-57, follow the finalized `web-konzerte` baseline, this repository's existing patterns, and the package scripts declared in `package.json`.
- Prefer semantic HTML and platform features; use local UI primitives only when they add necessary behavior.
- Keep credentials server-side and preserve Cloudflare deployment assumptions.
- Build accessibility, responsive behavior, privacy, and failure states into each relevant change rather than deferring them to launch.

## Validation

- Run the smallest relevant check during implementation and the repository's full quality command before handoff.
- For UI changes, verify keyboard use and representative mobile and desktop widths.
- Report checks run, known gaps, and external blockers accurately.
