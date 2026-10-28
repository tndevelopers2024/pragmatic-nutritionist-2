# Privacy Policy migration

Source: https://www.pragmaticnutritionist.com/privacy-policy-1
Retrieved 27 October 2026; retrieval timestamp and original HTML SHA-256 are in `src/data/privacyContent.json`.

The local `/privacy` route and `/privacy-policy-1` alias render all 45 nonempty source main-content blocks across the introduction and 12 source sections. No privacy clauses were added, omitted or rewritten. Original spelling, punctuation, contact email, Wix/payment-provider statements and external opt-out links are retained. Blank Wix spacers and layout whitespace are normalized. Source line breaks and the five-item ordered list are preserved.

The page reuses the Terms legal layout with source-heading navigation on desktop and a collapsible section index on mobile. The source homepage URL retains its displayed text and routes to `/`. All external link destinations remain as supplied by the source. The shared site header and footer retain existing project content.

`privacy-original.html` preserves the retrieved HTML; `privacy-main-text.txt` is its main text; `source-blocks.json` contains the complete source blocks and inline link metadata. Extraction checked every main-text line against these blocks.

`verification.json` records checks at 320, 390, 768 and 1440px: all 45 source blocks present, all 12 sections present, ordered list and external links retained, section navigation works, no horizontal overflow or browser errors. Both routes work. Desktop/mobile previews were visually inspected. The Terms page was rechecked after sharing its layout. Production build, targeted ESLint and whitespace checks pass.
