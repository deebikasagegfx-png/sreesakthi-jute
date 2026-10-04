import { useState } from 'react'
import { formErrorMessage, formSuccessMessage, submitWebsiteForm } from '../utils/formSubmission'

const detailsKey = 'sree-sakthi-comment-details'

function loadDetails() {
  try {
    return JSON.parse(window.localStorage.getItem(detailsKey) || '{"name":"","email":"","website":""}')
  } catch {
    return { name: '', email: '', website: '' }
  }
}

export default function CommentSection() {
  const [details, setDetails] = useState(loadDetails)
  const [saveDetails, setSaveDetails] = useState(() => window.localStorage.getItem(detailsKey) !== null)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateDetails(event) {
    const updated = { ...details, [event.target.name]: event.target.value }
    setDetails(updated)
    if (saveDetails) window.localStorage.setItem(detailsKey, JSON.stringify(updated))
  }

  function updateSaveChoice(event) {
    const checked = event.target.checked
    setSaveDetails(checked)
    if (checked) window.localStorage.setItem(detailsKey, JSON.stringify(details))
    else window.localStorage.removeItem(detailsKey)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    setIsSubmitting(true)
    setStatus('')
    try {
      const fields = Object.fromEntries(new FormData(formElement).entries())
      const pageTitle = document.querySelector('main h1')?.textContent?.trim() || window.location.pathname
      fields.pageUrl = window.location.href
      await submitWebsiteForm({
        formName: 'Website Comment/Review Form',
        pageName: pageTitle,
        fields,
      })
      setStatus(formSuccessMessage)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : formErrorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="article-comment" id="respond" aria-labelledby="blog-comment-title">
      <div className="article-comment-heading">
        <p className="article-kicker">JOIN THE CONVERSATION</p>
        <h2 id="blog-comment-title">Leave a <em>Comment</em></h2>
        <p>Your email address will not be published. Required fields are marked <b>*</b></p>
      </div>
      <form className="article-comment-form" onSubmit={handleSubmit}>
        <label className="article-comment-field article-comment-message">Comment *<textarea name="comment" placeholder="Type here…" required /></label>
        <div className="article-comment-fields">
          <label className="article-comment-field">Name *<input name="name" autoComplete="name" value={details.name} onChange={updateDetails} required /></label>
          <label className="article-comment-field">Email *<input name="email" type="email" autoComplete="email" value={details.email} onChange={updateDetails} required /></label>
          <label className="article-comment-field">Website<input name="website" type="url" autoComplete="url" value={details.website} onChange={updateDetails} /></label>
        </div>
        <label className="article-comment-save"><input type="checkbox" checked={saveDetails} onChange={updateSaveChoice} /><span>Save my name, email, and website in this browser for the next time I comment.</span></label>
        <button className="article-comment-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Post Comment'}</button>
        {status && <p className="article-comment-status" role="status" aria-live="polite">{status}</p>}
      </form>
    </section>
  )
}
