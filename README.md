# 🎬 TMDB Movie Search & Collection

A modern, fully-featured movie search application built with Next.js 15, TypeScript, and Redux Toolkit. Browse, search, and save your favorite movies using The Movie Database (TMDB) API.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://your-app-name.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black.svg)](https://nextjs.org/)

### Deploy to Vercel

<a href="https://tmdb-next-ts.vercel.app" target="_blank">
  <img src="https://vercel.com/button" alt="Deploy with Vercel" />
</a>

## ✨ Features

- 🔍 **Advanced Search** - Search movies by title with real-time results
- 📊 **Detailed Information** - View comprehensive movie details including ratings, runtime, and production companies
- 🎥 **Trailer Integration** - Watch movie trailers directly from YouTube
- 💾 **Save Collections** - Select and download your favorite movies as CSV
- 🌓 **Dark/Light Theme** - Seamless theme switching with persistent preferences
- 📱 **Responsive Design** - Optimized for all screen sizes
- ⚡ **Server-Side Rendering** - Fast initial page loads with Next.js SSR
- 🧪 **Fully Tested** - Comprehensive test coverage with Jest over 97%

## 🛠️ Tech Stack

### Core
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React 18](https://react.dev/)** - UI library with latest features

### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Efficient state management
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** - Data fetching and caching
- **[Context API](https://react.dev/reference/react/createContext)** - Theme management

### UI & Styling
- **[React Bootstrap](https://react-bootstrap.github.io/)** - UI components
- **[SASS/SCSS](https://sass-lang.com/)** - Advanced styling
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### Testing & Quality
- **[Jest](https://jestjs.io/)** - Unit and integration testing
- **[React Testing Library](https://testing-library.com/react)** - Component testing
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- TMDB API key (get it from [TMDB](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Barvinko/TMDB.git
   cd TMDB
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format:fix   # Format code with Prettier
npm run lint-staged  # Run Prettier and ESLint only for commit files

# Testing
npm run test         # Run tests
npm run test:coverage # Run tests with coverage report
```

## 🎨 Key Features Explained

### Movie Search
Browse popular movies or search by title. Results are paginated and cached for optimal performance.

### Movie Details Modal
Click any movie card to view detailed information including:
- High-resolution backdrop and poster
- User ratings with visual circular progress
- Release date, genres, and runtime
- Overview and tagline
- Production companies with logos
- Trailer playback (when available)

### Collection Management
- Select multiple movies using checkboxes
- View selected count in a sticky footer
- Download your collection as a formatted CSV file
- Deselect all with one click

### Theme Switching
Toggle between light and dark themes. Your preference is saved in localStorage and persists across sessions.

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm run test

# Run with coverage report
npm run test:coverage
```

The application is covered by tests: 
| Metric | Coverage |
|--------|----------|
| **Statements** | **99.11%** |
| Branches | 98.52% |
| Functions | 97.95% |
| Lines | 99.01% |

## 📁 Project Structure

```
├── app/                              # Next.js 15 App Router
│   ├── page/[page]/                 # Dynamic route for pagination
│   │   ├── details/[id]/            # Movie details modal route
│   │   │   └── page.tsx             # Details page component
│   │   ├── layout.tsx               # Nested layout for paginated pages
│   │   └── page.tsx                 # Movie list page
│   ├── error.tsx                    # Error boundary
│   ├── layout.tsx                   # Root layout with providers
│   ├── loading.tsx                  # Loading UI
│   ├── not-found.tsx                # 404 page
│   └── page.tsx                     # Home page (redirects to /page/1)
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/              # Main navigation header
│   │   │   └── Layout/              # Root layout wrapper with providers
│   │   ├── providers/
│   │   │   ├── ErrorBoundary/       # Global error handling
│   │   │   └── ThemeProvider/       # Theme context provider
│   │   ├── SearchList/
│   │   │   ├── CardList/            # Grid of movie cards
│   │   │   │   ├── Card/            # Individual movie card
│   │   │   │   └── CardList.tsx     # Cards container
│   │   │   ├── Search/              # Search input component
│   │   │   ├── Store/               # Selected movies panel
│   │   │   └── SearchList.tsx       # Main search & list component
│   │   └── UI/
│   │       ├── CircularRating/      # Circular progress rating
│   │       └── Spinner/             # Loading spinner
│   │
│   ├── store/
│   │   ├── query/
│   │   │   └── api.ts               # RTK Query API definitions
│   │   ├── selectedCardsSlice.ts    # Redux slice for movie selection
│   │   ├── localStorageSlice.ts     # Redux slice for saving search queries
│   │   ├── ThemeContext.tsx         # Theme context definition
│   │   └── store.ts                 # Redux store configuration
│   │
│   ├── constants/                   # Сonstant variables and enums 
│   ├── utilities/                   # Reused functions
│   ├── types/                       # TypeScript type definitions
│   ├── mocks/                       # Mock data for testing
│   ├── __mocks__/                   # Jest mocks
│   ├── style/                       # Global SCSS styles
│   ├── jest.setup.ts                # Jest configuration
│   ├── jest.polyfills.ts            # Polyfills for testing
│   └── setupTests.ts                # Testing setup
│
├── public/
│   └── favicon.svg                  # App favicon
│
├── .husky/                          # Git hooks (pre-commit, pre-push)
│
├── .env.local                       # Environment variables (not committed)
├── .gitignore                       # Git ignore rules
├── .prettierrc                      # Prettier configuration
├── eslint.config.js                 # ESLint configuration
├── jest.config.ts                   # Jest testing configuration
├── next.config.js                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies & scripts
```

## 👤 Author

**Vladyslav Barvinko**
- GitHub: [@Barvinko](https://github.com/Barvinko/TMDB)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/vladyslav-barvinko-a445851a9)

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- UI components from [React Bootstrap](https://react-bootstrap.github.io/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)