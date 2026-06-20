# SimpleServerPassword — Website

**Live: [simpleserverpassword.vercel.app](https://simpleserverpassword.vercel.app)**

Landing page for [**SimpleServerPassword**](https://github.com/mateosmudarg/SimpleServerPassword), a server-side Fabric mod for Minecraft 1.20.1 that locks a server behind a single shared password.

This repo is **just the website** — the mod itself lives in its own repository.

## Stack

Plain static **HTML / CSS / JS**. No build step, no framework, no dependencies. Served from the repo root as-is.

| File | Purpose |
|------|---------|
| `index.html` | The page (semantic sections, `data-i18n` attributes for EN/ES) |
| `styles.css` | Dark-mode-first design, CSS custom properties for theming |
| `script.js` | Language toggle, sticky-nav state, live latest-release fetch |
| `favicon.svg` | Shield + keyhole mark |
| `vercel.json` | Deploy config (clean URLs, security headers) |

## Features

- **Dark-mode-first**, minimalist design with a single green accent.
- **EN / ES** language toggle — instant, no reload, persisted in `localStorage`.
- **Live download button** — fetches the latest release from the GitHub API client-side, with a static fallback link if the API is unreachable.
- Fully responsive / mobile-first.

## Local preview

No tooling required — open `index.html` in a browser. Or serve it:

```bash
npx serve .
# or
python -m http.server
```

## Deployment

Deployed on **Vercel**. Vercel serves the static files from the repo root; with the
project connected to this GitHub repo, every push to the default branch triggers an
automatic production deploy.

## License

[MIT](LICENSE).
