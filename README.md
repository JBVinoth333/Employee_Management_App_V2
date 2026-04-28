# People App Frontend

This is the Vite frontend for the People app. It is set up to deploy to GitHub Pages from the `main` branch using GitHub Actions.

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

If the frontend needs to talk to a backend outside the same origin, set `VITE_API_BASE_URL` in a local `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Publish to GitHub Pages

1. Push this project to a GitHub repository.
2. In the GitHub repository, open `Settings -> Pages` and set `Source` to `GitHub Actions`.
3. In the GitHub repository, open `Settings -> Secrets and variables -> Actions -> Variables`.
4. Add a repository variable named `VITE_API_BASE_URL` and set it to the public backend base URL, for example `https://your-backend.example.com`.
5. Push to `main` or run the `Deploy People App` workflow manually from the `Actions` tab.

The workflow automatically builds the app with the correct GitHub Pages base path using the repository name, so routes and static assets work under `https://<github-username>.github.io/<repo-name>/`.

## Production notes

- GitHub Pages hosts only the frontend. The People backend must be deployed separately.
- The app uses browser history routing, and `public/404.html` is already included to restore deep links on GitHub Pages.
- If the repository name changes, the workflow keeps working because the base path is derived during the build.
