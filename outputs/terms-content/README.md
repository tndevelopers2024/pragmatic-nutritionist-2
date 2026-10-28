# Terms & Conditions migration

Source: https://www.pragmaticnutritionist.com/terms-conditions
Retrieved 27 October 2026; exact timestamp and HTML SHA-256 are recorded in `src/data/termsContent.json`.

The local `/terms` page (also available at `/terms-conditions`) preserves all 78 nonempty source main-content blocks across the introduction and 12 source sections. Original wording, capitalization, spelling, punctuation and list items are retained. Layout whitespace and zero-width Wix spacer characters are normalized. The final “YOUR ACCEPTANCE OF THESE TERMS” heading has no following body in the source and remains without invented policy text.

Source heading levels are normalized for an accessible reading hierarchy. Desktop section navigation and a mobile disclosure reuse the source headings. The source Privacy Policy anchor points to the source homepage; the local version correctly targets `/privacy`. The source homepage URL retains its visible text and navigates to `/`. Shared site navigation and footer remain the existing project components. No generic placeholder or additional sales CTA is included in the legal document.

`terms-original.html` preserves the source HTML. `terms-main-text.txt` is its extracted main text. `source-blocks.json` contains source paragraphs, headings and list items with inline-link metadata. All extracted main-text lines were checked against those blocks.

`verification.json` records rendered fidelity checks at 320, 390, 768 and 1440px: no missing source blocks, all 12 sections present, working section anchors, correct local privacy link, no horizontal overflow or browser errors. Both local routes work; desktop and mobile previews were visually inspected. Build, targeted ESLint and Git whitespace checks pass.
