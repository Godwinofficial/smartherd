# SmartHerd Zambia

A livestock monitoring and management system built with React, Vite, and Tailwind CSS.

## Features

- Live herd tracking and monitoring
- Health monitoring dashboard
- Device management
- Analytics and reporting
- Alert center for critical events
- Animal management system

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in your Vercel dashboard
3. Vercel will automatically detect the Vite configuration and deploy

### Environment Variables

If your application requires environment variables, create a `.env.local` file:

```
VITE_API_URL=your_api_url_here
```

## Project Structure

- `src/` - Source code
  - `components/` - React components
  - `pages/` - Page components
  - `data/` - Mock data and utilities
  - `assets/` - Static assets
- `public/` - Public assets
- `index.html` - HTML entry point

## Technologies

- **React** 18.3.1
- **Vite** 5.3.1
- **Tailwind CSS** 3.4.4
- **React Query** (@tanstack/react-query)
- **Lucide React** - Icon library

## License

This project is proprietary to SmartHerd Zambia.
