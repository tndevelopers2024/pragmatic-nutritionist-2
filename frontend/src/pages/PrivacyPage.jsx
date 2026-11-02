import TermsPage from './TermsPage'

const paragraph = (text) => ({ type: 'paragraph', text, inline: [{ text }] })
const link = (text, href) => ({ type: 'paragraph', text, inline: [{ text, href }] })

// This describes the flows visible in this application. The operator must review
// the complete policy and its actual hosting and email provider settings before launch.
const content = {
  title: 'Privacy information',
  intro: [paragraph('This page describes how information is handled by the website. Contact us with privacy questions.')],
  sections: [
    { id: 'privacy-1', title: 'Contact enquiries', blocks: [paragraph('When you submit the contact form, the information you enter is sent to the website server and, if mail delivery is configured, forwarded by email to the team. Please avoid including sensitive medical information in an initial enquiry.') ] },
    { id: 'privacy-2', title: 'Gut symptom quiz', blocks: [paragraph('Quiz answers stay in the browser while you use the quiz. If you choose to open the WhatsApp link, the prepared message includes your name, selected goal and score. Your phone number, email and individual answers are not included in that message.') ] },
    { id: 'privacy-3', title: 'External services', blocks: [paragraph('The site loads fonts from Google Fonts. When you follow a WhatsApp, social media, payment or other external link, the destination service handles your visit under its own privacy terms. The hosting and email providers may process technical information needed to provide their services.') ] },
    { id: 'privacy-4', title: 'Questions', blocks: [paragraph('For questions about your information, contact the team at:'), link('meenu@pragmaticnutritionist.com', 'mailto:meenu@pragmaticnutritionist.com')] }
  ]
}

export default function PrivacyPage() {
  return <TermsPage document={content} />
}
