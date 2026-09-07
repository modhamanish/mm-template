# MMTemplate Documentation Portal (React.js + Docusaurus)

This branch (`docs`) hosts the official documentation website for **MMTemplate**, inspired by [gorhom.dev/react-native-bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/).

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm start
```

Runs the site locally at `http://localhost:3000/mm-template/`.

---

## 📝 Editing Documentation

All documentation pages are written in standard Markdown (`.md`) inside the `docs/` directory:

- `docs/intro.md`: Introduction and quick start
- `docs/getting-started/installation.md`: Prerequisites and environment setup
- `docs/getting-started/interactive-wizard.md`: Explanation of the 3-step interactive CLI setup
- `docs/guides/architecture.md`: Clean architecture and directory breakdown
- `docs/guides/navigation.md`: React Navigation v7 configuration
- `docs/guides/state-and-api.md`: TanStack Query and Axios integration
- `docs/guides/theming.md`: Light/Dark mode and color tokens
- `docs/guides/localization.md`: i18n English & Hindi setup
- `docs/guides/components.md`: UI component catalog
- `docs/guides/troubleshooting.md`: Common issues and solutions

---

## 🌐 Deployment to GitHub Pages

### 1. Automatic Deployment (Recommended)
Every push to the `docs` branch automatically triggers the `.github/workflows/deploy-docs.yml` workflow, which builds and publishes the website to:
👉 **`https://modhamanish.github.io/mm-template/`**

> **Note**: In your GitHub repository settings, make sure:
> **Settings -> Pages -> Source** is set to **GitHub Actions**.

### 2. Manual CLI Deployment
You can also manually build and publish to GitHub Pages:
```bash
npm run deploy
```
