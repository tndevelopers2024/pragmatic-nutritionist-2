import terms from './termsContent.json'

// The Terms of Use shares much of the Terms & Conditions text but contains
// additional clauses. Keep the two documents separate so neither loses terms.
const paragraph = text => ({ type: 'paragraph', text, inline: [{ text }] })

const extraLiability = paragraph('We are not responsible for content appearing on websites that link to us. You agree to defend and indemnify us against all claims arising from content on your site that links to ours.')
const extraMedical = paragraph('This website provides general health, nutrition, and wellness information. It is not intended as medical advice and should not be used to diagnose or treat any health condition. Always consult with a qualified healthcare provider before making changes to your diet or lifestyle. No information on this site has been evaluated by the FDA or is intended to diagnose, treat, cure, or prevent any disease.')
const acceptance = paragraph('By using this website, you signify your acceptance of these Terms and Conditions. If you do not agree, please do not use our site. Your continued use of the website following the posting of changes to these terms will be deemed your acceptance of those changes.')

const sections = terms.sections.map(section => {
  if (section.id === 'terms-5') return { ...section, blocks: [...section.blocks, extraLiability] }
  if (section.id === 'terms-10') return { ...section, title: 'NO ADVICE GIVEN- Medical Discalimer', blocks: [...section.blocks.slice(0, 2), extraMedical, ...section.blocks.slice(2)] }
  if (section.id === 'terms-12') return { ...section, blocks: [acceptance] }
  return section
})

sections.push(
  { id: 'terms-age-restriction', title: 'AGE RESTRICTION', blocks: [paragraph('This website is intended for individuals 18 years of age or older. By using the site, you confirm you meet this age requirement.')] },
  { id: 'terms-contact', title: 'CONTACT US', blocks: [paragraph('If you have any questions about these Terms and Conditions, please contact us at:'), { type: 'paragraph', text: 'contact@pragmaticnutrition.com', inline: [{ text: 'contact@pragmaticnutrition.com', href: 'mailto:contact@pragmaticnutrition.com' }] }] }
)

export default { ...terms, title: 'Terms of Use', sourceUrl: 'https://www.pragmaticnutritionist.com/terms-of-use', sections }
