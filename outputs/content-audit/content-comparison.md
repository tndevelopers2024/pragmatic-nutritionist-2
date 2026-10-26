# Content comparison

Compared 26 October 2026. Local rendered pages checked in headless Chrome. Source main content extracted from current HTML; About testimonial slides also checked against the source carousel data recovered separately.

## Sports pages

Source: https://www.pragmaticnutritionist.com/sports-nutritionist-india

| Local route | Source content present |
| --- | --- |
| /sports-nutrition | Introduction, 8 plan features, 5 audience groups, founder biography, 3 FAQs |
| /sports-nutrition/youth-teen-athletes | 2 athlete profiles, 4 parent testimonials, 3 results, 4 FAQs |
| /sports-nutrition/competitive-athletes | 4 concerns, 2 results, 4 complete plans and pricing notes, 4 FAQs |

180 source semantic text blocks checked across the three local pages. All nontrivial blocks matched after normalization except “Have More Questions?”, which the user previously requested removed. This comparison normalizes punctuation, spaces, emoji and case; it is not a byte-for-byte typography check.

The five results are split between Youth (Wellington, Bengal Junior Open, Tamil Nadu gold) and Competitive (Ironman Goa, combat sports). They are not missing when the three pages are considered together.

Local navigation headings, FAQ support copy, and the three-step booking CTA are additional project content, not copied from the sports source. The repeated booking CTA includes “Root-Cause Diagnostic Review”, “Authentic Indian Food Protocol”, and “Direct Weekly Guidance”.

## About page

Source: https://www.pragmaticnutritionist.com/about-meenu-balaji-nutritionist

136 source semantic text blocks checked. All text is represented after normalization. The founder identity block is split into separate elements locally. Five athlete profiles, five testimonials, nine FAQs, credentials, philosophy, working approach, publications, research, disclaimer and international-client guidance are present.

Testimonials: Uma; Bhumiga; Vaidehi; Akila; Aakash. All five are available in the local carousel.

## Material differences

1. The About media gallery has 13 cards, but the original 13 image/article previews are absent. Icons are used instead.
2. Some gallery captions have been rewritten, especially the supplements, leaky-gut and child-nutrition entries.
3. The gallery adds explanatory summaries not supplied in the source. These should not be treated as verified article summaries.
4. Several gallery outlet/category labels say “Health Magazine” where the source captions refer to Thrive Magazine.
5. Local gallery cards have no article links. Source HTML image elements also did not expose article anchors, so missing original external URLs cannot be asserted from this extraction. Any restored links need independent verification.
6. About includes additional existing project elements such as an awards feature, athlete consultation CTA, and publication tags/callouts. These are not all source copy.
7. Source images are not fully mirrored: the About expertise areas use icons; other project photos/illustrations replace some source visuals. Athlete photos are present, including Niralya.

## Conclusion

Sports editorial copy is substantially complete across the three-page split, subject to the intentional removal above. About source text and testimonial content are present, but its media gallery is not a faithful content migration. No application files changed during this audit.
