# Franklin Villanueva — Portfolio

A personal developer portfolio built with Astro, React, and Tailwind CSS. It presents Franklin's profile, experience, education, projects, and technical skills in a responsive single-page layout.

## Features

- Spanish, English, and Chinese language selector. The selected language is saved in the browser.
- Light and dark theme toggle.
- Keyboard command palette (`Ctrl/Cmd + K`) with quick actions for printing and opening social profiles.
- Responsive project cards with links to live demos and source repositories.
- Contact and social profile links.
- Print-friendly styles.

## Tech stack

- [Astro](https://astro.build/) with the React integration
- [React](https://react.dev/) for interactive controls and components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Motion](https://motion.dev/) for interface animations
- [React Icons](https://react-icons.github.io/react-icons/) for command palette icons

## Requirements

- Node.js `>=22.12.0`
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Astro starts the local development server at [http://localhost:4321](http://localhost:4321).

## Available commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server. |
| `pnpm build` | Build the production site into `dist/`. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm astro -- --help` | Show Astro CLI help. |

## Project structure

```text
.
├── cv.json                    # Portfolio content and profile data
├── public/                    # Static images and favicon
└── src/
    ├── components/            # Page sections and interactive React components
    ├── context/               # Theme state
    ├── layouts/               # Shared page layout and metadata
    ├── pages/                 # Astro routes
    ├── styles/                # Global styles and theme styling
    └── translations/          # Spanish, English, and Chinese copy
```

## Updating the portfolio

- Edit `cv.json` to update profile details, work history, education, skills, and project metadata.
- Edit `src/translations/es.json`, `src/translations/en.json`, or `src/translations/zh.json` to update translated interface copy and project descriptions. Keep the same keys in each file so the language selector can find every translation.
- Add or replace project images in `public/` and update the corresponding image paths in `cv.json`.

## Production build

```bash
pnpm build
pnpm preview
```

The static site output is written to `dist/`.
