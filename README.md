# Sree Sakthi Jute Bags

Responsive React website for Sree Sakthi Jute Bags, built with Vite.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The site includes home, about, products, contact, and privacy pages. Product images are stored locally in `public/images`.

## Website forms

The popup enquiry, home quote, contact/product enquiry, and article comment forms submit through the Express `POST /api/forms` endpoint. The server forwards each complete submission to `deebika02032005@gmail.com` through FormSubmit.co; it does not connect to Gmail or require a Gmail password, API key, or service account. Submissions include the form name, page URL, and server submission time. All forms use browser required-field/email validation, and disable their submit button while sending.

### Configure email forwarding

1. No FormSubmit account is required. The first form submission sends an activation email to `deebika02032005@gmail.com`; open it and click its confirmation link. Check spam if it does not appear. Forwarding starts after confirmation.
2. Keep `FORM_SUBMIT_EMAIL=deebika02032005@gmail.com` in the project-root `.env` file. This is a routing address, not a credential. The server reads it with `dotenv`; Vite does not expose it to React because it has no `VITE_` prefix. `.env` is ignored by Git.
3. Run `npm run dev` from the project root to start the Express API on port 3001 and Vite on port 5173. Restart the server after changing `.env`.
4. Submit a form and check the recipient inbox. FormSubmit's AJAX forwarding endpoint is documented at [formsubmit.co/ajax-documentation](https://formsubmit.co/ajax-documentation); the service's first-use email confirmation is described on [its setup page](https://formsubmit.co/).

For deployment, set `FORM_SUBMIT_EMAIL` and `CLIENT_ORIGINS` as environment variables on the Node server, and route `/api/*` to it. The React app does not need any email service credentials.
