# More Care implementation — exact source text

Updated 27 October 2026. This supersedes the earlier editorial migration notes.

## Routes and sources

- `/more-care/child-teen-nutrition`: complete archived Child & Teen main content, followed by complete ADHD main content at `#adhd`.
- `/more-care/diabetes`: complete archived Diabetes main content.
- `/more-care`: overview linking to the four service pages.
- `/more-care/pcos` and `/more-care/weight-loss`: existing source-derived editorial pages. There is no separate dedicated source copy in the checked navigation. The legacy `/pcos-diabetes-weight-loss` URL serves the same main text as Diabetes. These routes must not be described as independent exact-source migrations.

## Fidelity

The exact-source routes render `src/data/moreCareSourceContent.json`, generated directly from the saved main text. No source lines are omitted or rewritten. Original spelling, truncated plan features, testimonial labels (including the source's PCOS label on a child testimonial), ratings, repeated CTAs and FAQ answers are retained. Repeated currency/amount text is retained for assistive technology, matching its duplicate role in the source markup. Layout whitespace and zero-width spacers are normalized as in the archive. Source CTAs open the existing booking modal; related PCOS and weight-management links use local routes.

Shared site navigation and footer retain the project's design and wording. The exact line audit covers source main content, not global header/footer wording, image-embedded text, or text loaded only through untested source-site interactions. Full HTML and full-page text including navigation/footer remain in the original archives.

## Validation

`text-coverage.json` records source-to-rendered checks for all 417 main-content lines (161 Child & Teen, 83 ADHD, 173 Diabetes), including repeated occurrence counts, at 1440px and 390px. Zero missing lines or deficient occurrence counts; zero browser runtime errors or horizontal overflow. All 18 FAQ controls and source hero booking CTAs were exercised at both viewport sizes. Desktop and mobile screenshots were visually inspected. Production build, targeted ESLint, and Git whitespace checks pass.

## Child & Teen design refinement

Child & Teen and its ADHD section now use the established rounded phase-card style: numbered concern and feature cards, grouped parent reviews, a photo introduction, founder profile, checklist audiences and structured plan cards. Source strings, repeated occurrences and truncated source features remain unchanged. The source-to-rendered audit passes at desktop and mobile sizes after this design change.

User-requested exception: decorative emojis are removed from displayed source text and booking labels. The original archives remain intact; source wording is otherwise preserved.

## Unified whole-page pass

The Child & Teen route now uses a dedicated `ChildNutritionPage.jsx` and `childNutrition.css` instead of the accumulated generic source-section layouts. Audience sections are grouped, pricing copy and plans appear together, the generated family photo is used without cropping, all headings/body/cards share one scale, and ADHD care is a second coherent chapter. Added marketing labels from the prior intro were removed. All 244 Child & Teen/ADHD main-content lines remain (apart from the user-requested removal of decorative emojis). The original source's incomplete plan features and testimonial metadata remain unchanged. Desktop page height decreased from approximately 15,300px to 12,000px while keeping the source copy. Verified at 320, 390, 768 and 1440px: no horizontal overflow, no broken images, correct existing Outfit/Plus Jakarta Sans fonts, and no emojis. Source occurrence checks and all FAQ controls/hero booking interactions pass.

## Diabetes design pass

The Diabetes route now uses `DiabetesPage.jsx` with the shared care-page layout components. Original introduction, seven features, full audience guidance, both programs, metabolic approach, related-service copy, biography/credentials and nine FAQs are grouped into ten coherent sections. All 173 archived main-content lines and repeated occurrences pass checks at 1440 and 390px; decorative emojis are removed as requested. The source's joined Blood Sugar Management/Build text is visually separated into a heading and description without changing its wording. Verified at 320, 390, 768 and 1440px: no horizontal overflow, broken images, clipped buttons or font-family changes.

## PCOS design pass

The PCOS route uses `PcosPage.jsx` and the shared care-page layout. It retains the existing PCOS intro/description, neutral personalised approach, metabolic support text, existing Amirtha testimonial, credentials and consultation wording. The diabetes-specific second sentence in the shared personalised-approach paragraph is omitted because it is unrelated to this page; the neutral first sentence is preserved verbatim. A relevant local source-site food image and larger founder portrait are used. No condition-specific claims, plan pricing, FAQs or new editorial paragraphs were invented. This remains existing/shared copy, not a complete migration from a dedicated PCOS source page (none was available in the checked navigation). Verified at 320, 390, 768 and 1440px: existing font families, no emojis or horizontal overflow, images loaded, and booking works.

## Weight Loss design pass

The Weight Loss route shares the metabolic care layout with PCOS, using its own existing intro/description, weight-management image, Ankit testimonial and related-service links. Existing neutral personalised-approach, metabolic-health and credential wording is retained. The shared paragraph's diabetes-only sentence is omitted, as on PCOS. No dedicated source page was available in the checked navigation; no independent prices, FAQs or new clinical copy were created. Verified all existing content strings except that deliberately removed sentence, at 320/390/768/1440px with unchanged font families, no emojis/overflow/broken images; booking works. PCOS content and booking were also checked after sharing the layout.
