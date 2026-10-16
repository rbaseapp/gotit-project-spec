# 40 — Program chooser in DEV

Owner request, 2026-10-13: replace the new-program chooser with the supplied
Hebrew reference image. `/courses?choose=1` uses a modular controlled Web view
under the existing DEV design gate. It contains a language-pair panel, an
illustrated personal-AI-program card and an illustrated beginner-path card.
Production and the shared header retain their existing behavior.

FR-CHOOSER-DEV-001: selected target/support codes update names, flags, prepared-path
discovery and personal-setup URL. FR-CHOOSER-DEV-002: prepared navigation saves a
changed profile pair and verifies the published catalog before opening the map.
Unavailable, pending and failed catalog states remain distinct with retry.
NFR-CHOOSER-DEV-001: eight UI locales, shared searchable keyboard comboboxes,
RTL/LTR CSS, stacked mobile cards and busy-state action guards.

UC-CHOOSER-DEV-001: learner opens My Programs creation, selects language pair,
then opens personal intake or the available prepared map; back returns to programs.
Choosing a language alone creates no course and changes no profile/learning evidence.
No API, backend, Core, Chrome, billing, privacy or schema contract changes.

Web checkout: `../gotIt-front-chooser-dev`, base DEV `81798c0`. Typecheck, ESLint,
build, 341 Vitest cases/56 files and 21 gateway/security cases passed. Twelve
chooser cases cover both old and new views. Final desktop comparison, 320px RTL/LTR
and combobox keyboard checks passed after reconnecting the browser. Mobile document
scroll width equals client width. No unresolved P0/P1/P2 visual issue remains.
Web `docs/program-chooser/README.md` and root `design-qa.md` own detailed evidence
and raster asset provenance. Do not treat source publication as deployment.

## DEV release — 2026-10-13

Web `9734604b4acc5bac365d8163f21a9f65616382a2` was manually deployed to DEV Web
`srv-dar6dng473hc73a0ns1g` as `dep-db70u90u01pc73bt9f10`.
Render reports Deploy succeeded / Live (59.4 seconds). Auto-deploy remains disabled.
Authenticated acceptance confirms the new heading, both loaded illustrations and
the real catalog-enabled prepared action. Personal CTA opens the existing en/he
intake form; prepared CTA opens `/english-learning` with the real published map.
No course creation, lesson start, evidence/reward or billing write was performed.
No browser error/warning logs. Production was not deployed; Backend/Core unchanged.
Rollback is DEV Web `81798c0`. Web `docs/program-chooser/evidence` holds screenshots.

Final mobile correction: Web `06b1764883f8cef69d9dcac08713e3fa2699a868` contains
the scaled mascot within its slot below 760px. Build passed again. DEV release
`dep-db7114vf3r2c73crbv40` is Live (57.8s); the final authenticated 319 CSS pixel
check reads client/scroll width 297px and verifies the new clipping rule. Local
320px RTL/LTR checks also pass. This supersedes `9734604` as the final live source.
