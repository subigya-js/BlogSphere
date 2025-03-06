# BlogSphere

BlogSphere is a full-stack blog application built with Next.js.

## Features

- Next.js 13+ with App Router
- React 18
- TypeScript
- Tailwind CSS for styling
- Dynamic light/dark mode toggle
- Responsive design

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/subigya-js/BlogSphere.git
   ```

   ```
   cd BlogSphere
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Development Server

To start the development server, run:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/components`: Reusable React components
- `src/context`: React context for global state management (e.g., ThemeContext)

## Theme Toggle Implementation

The project implements a global theme toggle (light/dark mode) using React's Context API. The theme state is accessible throughout the application, allowing for consistent styling across all components.

Key files for the theme implementation:
- `src/context/ThemeContext.tsx`: Defines the theme context and provider
- `src/components/Navbar.tsx`: Contains the theme toggle button
- `src/app/layout.tsx`: Wraps the application with the ThemeProvider
- `src/app/page.tsx`: Demonstrates theme-aware styling in the main content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
