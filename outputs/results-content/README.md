# Results page source and verification

Source: https://www.pragmaticnutritionist.com/
Retrieved 27 October 2026. Exact retrieval time and HTML SHA-256 are in `source-metadata.json`.

The `/results` page contains the source homepage's six complete testimonials (Vijay Vallabh, Ankit, Shobha Manoharan, Amirtha, Prabhakaran and Dr. Smriti), its 4.9 rating and client-count label, four athlete outcomes (Sai Ameya, Charita Phanindranath, Aahana Singh and Dhairya Samahita Naveen), athlete consultation CTA and self-reported-results disclaimer.

Original wording, paragraph breaks, names, categories, initials, roles and achievements are preserved, including source spelling and incomplete punctuation. Star ratings are rendered as vector icons. The unfinished Wix placeholder (“Add a Catchy Title Here” and its template instructions), unrelated homepage sections, and global navigation/footer are not Results content and were not migrated into this page. No additional clinical metrics, verified-outcome claims or editorial testimonials were created. Filter labels/counts and the Results page title are interface elements.

`homepage-original.html` preserves the retrieved HTML; `homepage-main-text.txt` and `source-lines.json` preserve its main text. `migrated-source-lines.json` lists the 58 source strings selected for this page. `src/data/resultsContent.json` is the structured application data.

`verification.json` records checks at 320, 390, 768 and 1440px: all selected source strings present, all six reviews and four athlete profiles present, each category filter correct, all athlete photos load, no horizontal overflow or browser errors, and the booking button opens the existing modal. Screenshots were visually inspected. Production build, targeted ESLint and Git whitespace checks pass.

This migration verifies fidelity to the website; it does not independently verify the website's testimonial or performance claims.
