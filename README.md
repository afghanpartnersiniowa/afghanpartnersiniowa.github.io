# Afghan Partners in Iowa

Site: https://www.afghanpartnersiniowa.org

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tools Used](#tools-used)
3. [Installation](#installation)
4. [Setup (VS Code)](#setup-vs-code)
5. [Running the Project](#running-the-project)
6. [Contributing](#contributing)

## Project Overview

This repository contains the source code for the Afghan Partners in Iowa website. The site is built using [Eleventy (11ty)](https://www.11ty.dev/), a simple static site generator, uses [Tailwind CSS](https://tailwindcss.com/) for styling, and [Alpine.js](https://alpinejs.dev/) for interactivity. The project is designed to be easy to set up and modify, allowing contributors to quickly make changes and deploy updates.

## Tools Used

- **Node.js** (JavaScript runtime)
- **npm** (Node package manager)
- **Eleventy (11ty)** (Static site generator)
- **Tailwind CSS** (Utility-first CSS framework, built with the project)
- **Alpine.js** (Lightweight JavaScript framework for interactivity)
- **VS Code** (Recommended code editor)

### Tool Installation

1. **Node.js & npm**
   - Download and install from [nodejs.org](https://nodejs.org/).
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **VS Code**
   - Download and install from [code.visualstudio.com](https://code.visualstudio.com/).

3. **Eleventy, Tailwind CSS, and Alpine.js**
   - These are installed as dependencies in the project. You do not need to install them globally.

## Tailwind CSS & Alpine.js Usage

Both [Tailwind CSS](https://tailwindcss.com/) and [Alpine.js](https://alpinejs.dev/) are included in this project:

- **Tailwind CSS** is used for styling and utility classes. It is built with the project and you can use its classes in your HTML files.
- **Alpine.js** is used to add simple interactivity. It is included automatically (see `.eleventy.js`), so you can use Alpine.js features in your HTML templates with `x-data`, `x-show`, etc. No extra installation is needed.

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/afghanpartnersiniowa/afghanpartnersiniowa.github.io.git
   cd afghanpartnersiniowa.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Setup (VS Code)

1. Open the project folder in VS Code:
   - Go to `File` > `Open Folder...` and select the project directory.

2. (Optional) Install recommended VS Code extensions:
   - **ESLint** (for JavaScript linting)
   - **Prettier** (for code formatting)
   - **Tailwind CSS IntelliSense** (for Tailwind CSS autocomplete)

3. Review the `package.json` file for available scripts.

## Running the Project

To start a local development server and see your changes live:

```bash
npm run serve
```

- The site will be available at [http://localhost:8080](http://localhost:8080).
- Edit files in the `src/` directory. The site will reload automatically when you save changes.

## GitHub Pages Deployment

Deployment is triggered manually using the GitHub Actions workflow (`.github/workflows/deploy.yml`):

- Go to the **Actions** tab on GitHub and select the ["Trigger deploy to GitHub Pages"](https://github.com/afghanpartnersiniowa/afghanpartnersiniowa.github.io/actions/workflows/deploy.yml) workflow.
- Click **Run workflow** and choose whether to publish the site or just build and upload a zip for review.
- The workflow will install dependencies, build the project, and (if selected) publish it to https://afghanpartnersiniowa.org. It may take a few minutes to complete and for the changes to appear live.
- No deployment happens automatically on push; you must trigger the workflow manually.
- After the workflow completes, you can download the zip file for review by clicking the "github-pages" artifact link in the workflow run summary. ([Example](https://github.com/afghanpartnersiniowa/afghanpartnersiniowa.github.io/actions/runs/15003338931#artifacts))

## Contributing

1. Create a new branch for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```
2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Describe your changes"
   ```
3. Push your branch and open a pull request on GitHub.

---

If you have any questions, please open an issue or contact the project maintainers.
