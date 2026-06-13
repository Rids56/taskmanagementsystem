# GitHub Pages Deployment Guide

## Step 1: Add `homepage` in `package.json`

Add the following property to your `package.json` file:

```json
{
  "homepage": "https://Rids56.github.io/taskmanagementsystem"
}
```

---

## Step 2: Add Deploy Script

Install `gh-pages`:

```bash
yarn add -D gh-pages
```

Add the following script to the `scripts` section of `package.json`:

```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

Example:

```json
{
  "scripts": {
    "start:web": "vite",
    "build:web": "tsc && vite build",
    "preview": "vite preview",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## Step 3: Configure Vite Base Path

Update `vite.config.ts` and add the `base` property inside `defineConfig`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/taskmanagementsystem/',
});
```

---

## Step 4: Build the Project

```bash
yarn build:web
```

This will generate the production files inside the `dist` folder.

---

## Step 5: Deploy to GitHub Pages

Run:

```bash
yarn deploy
```

This command will publish the contents of the `dist` folder to the `gh-pages` branch.

---

## Step 6: Configure GitHub Pages

1. Go to the repository Settings.
2. Open the Pages section.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/(root)**

4. Save the changes.

---

## Live URL

After deployment completes, the application will be available at:

```text
https://Rids56.github.io/taskmanagementsystem/
```

## Updating the Live Website

After the initial setup, you do not need to work directly on the gh-pages branch.

## Workflow

1. Make Changes

Make your updates in either the initdev or production branch.

2. Commit and Push Changes
   git add .
   git commit -m "Your changes"
   git push origin production
3. Deploy to GitHub Pages
   yarn deploy

The gh-pages package will automatically:

Build the latest version of the application (if predeploy is configured).
Update the gh-pages branch.
Publish the latest changes to GitHub Pages.

## Notes

Do not manually edit the gh-pages branch.
The gh-pages branch is used only for hosting generated build files.
Whenever you want to update the live website, simply run:

yarn deploy
Live URL : https://Rids56.github.io/taskmanagementsystem/

Changes typically become visible within a few minutes after deployment.
