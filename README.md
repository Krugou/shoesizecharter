# Shoe Size Converter

A modern web application for converting shoe sizes between different country standards (EU, US, UK) and measurement units (CM, Inches).

![Shoe Size Converter](https://github.com/user-attachments/assets/06ccffbe-0fb1-4075-8a1d-27c8ddd7983c)

## Features

- 🔄 **Real-time conversion** between multiple shoe size standards
- 🌍 **International support**: EU, US, UK sizes
- 📏 **Measurement units**: Centimeters and Inches
- 🎯 **Default EU size 50** as starting point
- 💅 **Modern UI** built with Tailwind CSS
- ⚡ **Fast and responsive** powered by Vite and React

## Live Demo

Visit the live application at: https://krugou.github.io/shoesizecharter/

## Technologies Used

- **Vite** - Next generation frontend tooling
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub Actions** - CI/CD for automated deployment

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

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

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

1. Enter a shoe size in any field (EU, US, UK, CM, or Inches)
2. All other fields will automatically update with the converted values
3. The default EU size is set to 50
4. Values are approximate and may vary by manufacturer

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
