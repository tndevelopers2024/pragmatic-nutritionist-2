import nodemailer from 'nodemailer'

const MAX = { name: 100, email: 200, phone: 30, concern: 150, mode: 60, message: 3000 }

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : '')

let transporter
function getTransporter() {
  if (transporter) return transporter
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  const port = Number(SMTP_PORT) || 587
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })
  return transporter
}

/**
 * POST /api/send-mail
 * Body: { name, email, phone, concern, mode, message, website }
 * `website` is a honeypot field; real users leave it empty.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error('send-mail: SMTP environment variables are not configured')
    return res.status(500).json({ ok: false, error: 'Mail service is not configured' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}

  // Honeypot: pretend success so bots do not retry
  if (body.website) return res.status(200).json({ ok: true })

  const data = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    concern: clean(body.concern, MAX.concern),
    mode: clean(body.mode, MAX.mode),
    message: typeof body.message === 'string' ? body.message.trim().slice(0, MAX.message) : ''
  }

  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid name and email address' })
  }

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '-'],
    ['Concern', data.concern || '-'],
    ['Preferred mode', data.mode || '-']
  ]

  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || `"Pragmatic Nutrition Website" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
      subject: `New website enquiry from ${data.name}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${data.message || '-'}`,
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
        .join('')}</table><p style="font-family:sans-serif;font-size:14px"><b>Message</b><br>${escapeHtml(
        data.message || '-'
      ).replace(/\n/g, '<br>')}</p>`
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('send-mail failed:', err)
    return res.status(502).json({ ok: false, error: 'Could not send your message. Please try WhatsApp instead.' })
  }
}
