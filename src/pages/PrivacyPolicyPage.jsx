import { Search } from 'lucide-react'

export default function PrivacyPolicyPage() {
  function handleSearch(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const searchTerm = String(formData.get('search') || '').trim()
    if (!searchTerm) return

    const query = `site:sreesakthijutebags.in/privacy-policy/ ${searchTerm}`
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  }

  return (
    <main className="privacy-page not-found-style">
      <h1>This Page Doesn’t Seem To<br className="desktop-break" /> Exist.</h1>
      <p>It Looks Like The Link Pointing Here Was Faulty. Maybe Try Searching?</p>
      <form className="not-found-search" role="search" onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="not-found-search-input">Search Google for pages on this website</label>
        <input id="not-found-search-input" name="search" type="search" placeholder="Search Google..." />
        <button type="submit" aria-label="Search Google"><Search size={17} /></button>
      </form>
    </main>
  )
}
