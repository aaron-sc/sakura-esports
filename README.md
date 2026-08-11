# Sakura Eclipse — Esports Org Website

Static site (HTML/CSS/JS only, no build step) for Sakura Eclipse.

## Structure

```
index.html          Home page (hero, about, games overview, Discord CTA)
teams.html           Full, filterable roster listing for every team
404.html              Custom not-found page
assets/css/style.css   All styles
assets/js/data.js       Games + rosters — edit this to add/rename teams
assets/js/main.js       Site behavior (nav, animations, filtering, etc.)
assets/img/logo.png     Org logo (used as favicon, nav mark, hero mark)
```

## Editing rosters

Everything about games and teams lives in one place: [assets/js/data.js](assets/js/data.js).
Add, rename, or remove a team by editing the `GAMES` array — both the homepage
games grid and the `teams.html` filtered listing pull from this file automatically.

## Editing the Discord link

Update the `DISCORD_URL` constant at the top of `assets/js/data.js`. It's used
everywhere Discord is linked or copied.

## Running locally

No build step needed — just serve the folder. From this directory:

```
python -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub (branch `main`).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`, then **Save**.
5. GitHub will publish the site at `https://<username>.github.io/<repo-name>/`
   within a minute or two.

No further configuration is required — this is a plain static site.
