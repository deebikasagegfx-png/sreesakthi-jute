import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()
const port = Number(process.env.PORT || 3001)
const recipient = process.env.FORM_SUBMIT_EMAIL || 'ssjbjute@gmail.com'
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    const localDevelopmentOrigin = process.env.NODE_ENV !== 'production'
      && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '')
    if (!origin || allowedOrigins.includes(origin) || localDevelopmentOrigin) return callback(null, true)
    return callback(new Error('Origin is not allowed'))
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json({ limit: '20kb' }))

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Sorry, something went wrong. Please try again.' },
})

function cleanText(value, maxLength = 3000) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength)
}

function labelField(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function validEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }))

app.post('/api/forms', formLimiter, async (request, response) => {
  const submittedFields = request.body?.fields
  if (!submittedFields || typeof submittedFields !== 'object' || Array.isArray(submittedFields)) {
    return response.status(400).json({ message: 'Sorry, something went wrong. Please try again.' })
  }

  const fields = Object.fromEntries(
    Object.entries(submittedFields)
      .filter(([key]) => /^[a-zA-Z][a-zA-Z0-9_-]{0,49}$/.test(key))
      .map(([key, value]) => [key, cleanText(value, key.toLowerCase().includes('message') || key === 'comment' ? 5000 : 500)]),
  )
  const email = cleanText(fields.email || '', 254).toLowerCase()
  const name = cleanText(fields.name || `${fields.firstName || ''} ${fields.lastName || ''}`, 200)
  const totalLength = Object.values(fields).reduce((total, value) => total + value.length, 0)
  const message = fields.message || fields.comment || ''
  const phone = fields.phone || fields.mobile || ''

  if (!name || !email || !validEmail(email) || !message
    || (phone && !/^\+?[0-9\s().-]{7,20}$/.test(phone)) || totalLength > 12000) {
    return response.status(400).json({ message: 'Sorry, something went wrong. Please try again.' })
  }

  const formName = cleanText(request.body?.formName || 'Website Form', 100) || 'Website Form'
  const pageName = cleanText(request.body?.pageName || '', 200)
  const pageUrl = cleanText(fields.pageUrl || request.get('referer') || '', 1000)
  const subjectProduct = cleanText(fields.product || fields.productName || '', 150)
  const subject = formName.toLowerCase().includes('comment')
    ? 'New Website Comment/Review'
    : subjectProduct
      ? `New Product Enquiry - Sree Sakthi Jute Bags - ${subjectProduct}`
      : `New Website Enquiry - Sree Sakthi Jute Bags`

  const mailFields = {
    _subject: subject,
    _template: 'table',
    ...fields,
    email,
    formName,
    pageName,
    pageUrl,
    submittedAt: new Date().toISOString(),
  }

  // FormSubmit is an email forwarding service; this server relay keeps the
  // service destination off the React bundle and does not require Gmail login.
  try {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    const origin = request.get('origin')
    const referer = request.get('referer')
    if (origin) headers.Origin = origin
    if (referer) headers.Referer = referer

    const serviceResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mailFields),
      signal: AbortSignal.timeout(15000),
    })
    const result = await serviceResponse.json().catch(() => ({}))
    if (!serviceResponse.ok || result.success === false || result.success === 'false') {
      const providerMessage = cleanText(result.message || '', 500)
      const activationRequired = /needs activation|activate form/i.test(providerMessage)
      const diagnostic = providerMessage || `FormSubmit returned HTTP ${serviceResponse.status}.`
      console.error('FormSubmit rejected a website form:', {
        status: serviceResponse.status,
        message: diagnostic,
      })
      return response.status(activationRequired ? 503 : 502).json({
        message: 'Sorry, something went wrong. Please try again.',
        code: activationRequired ? 'FORM_REQUIRES_ACTIVATION' : 'FORM_PROVIDER_REJECTED',
        diagnostic,
      })
    }

    return response.status(200).json({ message: 'Thank you! Your message has been sent successfully.' })
  } catch (error) {
    console.error('Website form delivery failed:', error.message)
    return response.status(502).json({ message: 'Sorry, something went wrong. Please try again.' })
  }
})

app.use((error, _request, response, _next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ message: 'Sorry, something went wrong. Please try again.' })
  }
  if (error.message === 'Origin is not allowed') {
    return response.status(403).json({ message: 'Sorry, something went wrong. Please try again.' })
  }
  console.error('Form API error:', error.message)
  return response.status(500).json({ message: 'Sorry, something went wrong. Please try again.' })
})

app.listen(port, () => console.log(`Form API listening on port ${port}`))
