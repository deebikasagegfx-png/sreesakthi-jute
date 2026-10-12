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

All website enquiry, quote, contact, product, and article comment forms submit through Express `POST /api/forms`, which forwards them to `FORM_SUBMIT_EMAIL` through FormSubmit.co.

### Configure email forwarding

1. Set `FORM_SUBMIT_EMAIL=ssjbjute@gmail.com` and `CLIENT_ORIGINS` in the project-root `.env` file. `.env.example` lists the required variables.
2. The first submission may trigger a FormSubmit activation email. Open it and confirm the destination inbox before expecting form messages to be forwarded.
3. Run `npm run dev` to start both the Express API and Vite. After deploying, set `FORM_SUBMIT_EMAIL` and `CLIENT_ORIGINS` on the Node server and route `/api/*` to it.

FormSubmit sends submissions to the configured inbox and does not require Gmail credentials. Check that inbox's spam folder during setup.
# sreesakthi-jute


