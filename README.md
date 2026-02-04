# Shoe Size Converter

A modern, responsive, and easy-to-use shoe size converter application. Built with React, TypeScript, and Material UI, this tool allows users to instantly convert between EU, US, UK, CM, and Inches shoe sizes.

![Shoe Size Converter Logo](public/logo.png)

## Features

- **Real-time Conversion**: Instantly converts between multiple standards (EU, US, UK, CM, Inches).
- **Dark Mode Support**: Comes with a sleek dark mode enabled by default, with a toggle for light mode.
- **Internationalization (i18n)**: Fully localized in English and Finnish.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Interactive UI**: Featuring smooth animations, sliders, and intuitive input fields.
- **Offline Capable**: PWA-ready structure (Vite).

## Tech Stack

- **Framework**: [React](https://reactjs.org/) (v19) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Component Library**: [Material UI (MUI)](https://mui.com/) v7
- **Styling**: Emotion & CSS-in-JS
- **Internationalization**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Linting & Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Krugou/shoesizecharter.git
   cd shoesizecharter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run format`: Formats code using Prettier (if script added).

## Project Structure

```
src/
├── assets/          # Static assets
├── locales/         # Translation files (en, fi)
├── i18n.ts          # i18next configuration
├── App.tsx          # Main application component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.
