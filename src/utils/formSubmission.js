export async function submitWebsiteForm({ formName, pageName, fields }) {
  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formName,
      pageName,
      fields: { ...fields, pageUrl: window.location.href },
    }),
  }).catch((error) => {
    console.error('Website form request could not reach the server:', error)
    return null
  })

  if (!response) {
    throw new Error(formErrorMessage)
  }

  const result = await response.json().catch(() => ({}))
  if (!response.ok) {
    console.error('Website form submission failed:', {
      status: response.status,
      code: result.code || 'FORM_API_ERROR',
      diagnostic: result.diagnostic || result.message || 'The form API returned an error without details.',
    })
    if (result.code === 'FORM_REQUIRES_ACTIVATION') {
      throw new Error('Form delivery is awaiting activation. Open the FormSubmit activation email sent to ssjbjute@gmail.com, click “Activate Form,” then submit again.')
    }
    throw new Error(formErrorMessage)
  }

  return result
}

export const formSuccessMessage = 'Thank you! Your message has been sent successfully.'
export const formErrorMessage = 'Sorry, something went wrong. Please try again.'
