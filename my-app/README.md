# GitHub Contribution Intelligence Dashboard - Frontend

A modern React + TypeScript frontend for the GitHub Contribution Intelligence Dashboard. This application provides an interactive interface for analyzing GitHub contributions, detecting AI-generated code, and visualizing productivity metrics.

---

## Overview

The frontend is built with React 18.3.1 and TypeScript, featuring a modern component library stack with Material-UI and Radix UI. It provides real-time analytics visualization, AI detection results, and comprehensive productivity insights through an intuitive dashboard interface.

---

## Key Features

- **Interactive Dashboard**: Real-time contribution analytics and visualizations
- **AI Detection Interface**: Display multi-LLM analysis results with probability scores
- **Productivity Metrics**: Streak tracking, inactivity patterns, and performance scoring
- **Modern UI**: Material-UI components with Tailwind CSS styling
- **Data Visualization**: Recharts for comprehensive data representation
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **TypeScript Support**: Full type safety and developer experience

---

## Technology Stack

### Core Framework

- **React**: 18.3.1 with TypeScript support
- **Vite**: 6.3.5 for fast development and building
- **TypeScript**: Full type safety and IntelliSense

### UI Components & Styling

- **Material-UI**: 7.3.5 for comprehensive component library
- **Radix UI**: Accessible, unstyled primitive components
- **Tailwind CSS**: 4.1.12 for utility-first styling
- **Lucide React**: 0.487.0 for consistent iconography

### Data & Visualization

- **Recharts**: 2.15.2 for interactive charts and graphs
- **React Router**: 7.13.0 for client-side routing
- **React Hook Form**: 7.55.0 for form management
- **Date-fns**: 3.6.0 for date manipulation

### Additional Libraries

- **Motion**: 12.23.24 for smooth animations
- **Sonner**: 2.0.3 for toast notifications
- **React DnD**: 16.0.1 for drag-and-drop functionality
- **Next Themes**: 0.4.6 for dark/light mode support

---

## Project Structure

```
my-app/
├── src/
│   ├── app/                    # Main application components
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page-level components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   ├── assets/                # Static assets (images, fonts)
│   ├── styles/                # Global styles and CSS modules
│   ├── lib/                   # Library configurations
│   └── main.tsx               # Application entry point
├── public/                    # Public static files
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── tailwind.config.js         # Tailwind CSS configuration
```

---

## Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn/pnpm)

### Installation

1. **Navigate to the frontend directory:**

   ```bash
   cd my-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Lint and fix
npm run lint:fix
```

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_AI_DETECTION=true
VITE_ENABLE_ADVANCED_CHARTS=true

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

### Vite Configuration

The `vite.config.ts` file includes:

- **React plugin** for fast refresh
- **Path aliases** for clean imports
- **Build optimizations** for production
- **Development server** configuration

### TypeScript Configuration

- **Strict mode** enabled for type safety
- **Path mapping** for cleaner imports
- **React types** properly configured
- **ESLint integration** for code quality

---

## Component Architecture

### Design System

The application uses a component-based architecture with:

- **Atomic Design**: Components organized by complexity
- **Reusable Patterns**: Consistent UI patterns across the app
- **Type Safety**: Full TypeScript support for all components
- **Theme Support**: Consistent theming with Material-UI

### Key Components

#### Dashboard Components

- `AnalyticsDashboard`: Main analytics overview
- `ContributionChart`: Visualization of contribution data
- `ProductivityMetrics`: Performance indicators and scores
- `StreakTracker`: Contribution streak visualization

#### AI Detection Components

- `AIDetectionPanel`: Display AI analysis results
- `ProbabilityMeter`: Visual probability indicator
- `EvidenceList`: Evidence and reasoning display
- `VerdictCard`: Final verdict presentation

#### Form Components

- `RepositoryInput`: GitHub repository input form
- `AnalysisControls`: Analysis configuration options
- `FilterControls`: Data filtering and sorting

---

## API Integration

### Service Layer

The frontend communicates with the FastAPI backend through a structured service layer:

```typescript
// Example API service
import { apiClient } from "../lib/api-client";

export const analyzeRepository = async (data: AnalysisRequest) => {
  const response = await apiClient.post("/analyze-ai-contribution", data);
  return response.data;
};
```

### Error Handling

- **Global error boundaries** for React errors
- **API error interceptors** for backend errors
- **User-friendly error messages** with toast notifications
- **Retry mechanisms** for failed requests

### Data Flow

1. **User Input**: Form data captured and validated
2. **API Request**: Sent to FastAPI backend
3. **Response Processing**: Data transformed and validated
4. **UI Update**: Components re-render with new data
5. **Error Handling**: Graceful fallbacks and user feedback

---

## State Management

### React Hooks

The application uses React's built-in state management:

- **useState**: Local component state
- **useEffect**: Side effects and data fetching
- **useContext**: Global state sharing
- **Custom Hooks**: Reusable state logic

### Data Patterns

- **Server State**: API responses cached and synchronized
- **UI State**: Form inputs, loading states, user preferences
- **Derived State**: Computed values from other state

---

## Styling Strategy

### Tailwind CSS Integration

- **Utility-first approach** for rapid development
- **Component variants** using class-variance-authority
- **Responsive design** with mobile-first approach
- **Dark mode support** with next-themes

### Material-UI Theming

- **Custom theme** configuration
- **Consistent color palette** and typography
- **Component overrides** for brand consistency
- **Accessibility** considerations built-in

---

## Performance Optimizations

### Code Splitting

- **Route-based splitting** with React Router
- **Component lazy loading** for large features
- **Dynamic imports** for reduced bundle size

### Build Optimizations

- **Tree shaking** for unused code elimination
- **Minification** and compression
- **Asset optimization** and caching strategies

### Runtime Optimizations

- **React.memo** for component memoization
- **useMemo** and **useCallback** hooks
- **Virtualization** for large data sets

---

## Testing Strategy

### Unit Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage
```

### Component Testing

- **React Testing Library** for component testing
- **User interaction testing** with fireEvent
- **Accessibility testing** with jest-axe

### Integration Testing

- **API integration** testing with mock servers
- **End-to-end** workflow testing
- **Cross-browser** compatibility testing

---

## Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview build locally
npm run preview
```

### Deployment Options

- **Vercel**: Recommended for React applications
- **Netlify**: Alternative static hosting
- **AWS S3/CloudFront**: Custom CDN setup
- **Docker**: Containerized deployment

### Environment Configuration

Configure environment variables for production:

```env
# Production API
VITE_API_BASE_URL=https://your-api.vercel.app
VITE_API_TIMEOUT=30000

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your_production_ga_id
```

---

## Development Guidelines

### Code Standards

- **ESLint configuration** for code quality
- **Prettier integration** for consistent formatting
- **TypeScript strict mode** for type safety
- **Conventional commits** for version control

### Component Guidelines

- **Single responsibility** principle
- **Reusable and composable** components
- **Props interface** documentation
- **Accessibility** first approach

### Performance Guidelines

- **Optimize re-renders** with proper memoization
- **Lazy load** heavy components
- **Monitor bundle size** regularly
- **Use React DevTools** for profiling

---

## Contributing

### Development Workflow

1. **Create feature branch** from main
2. **Implement changes** with tests
3. **Run linting and tests**
4. **Submit pull request** with description
5. **Code review** and merge

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Components are reusable
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] Performance impact considered
- [ ] Accessibility is maintained

---

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors
   - Verify dependency versions
   - Clear node_modules and reinstall

2. **Development Server Issues**
   - Check port conflicts
   - Verify Vite configuration
   - Restart development server

3. **API Connection Issues**
   - Verify backend is running
   - Check CORS configuration
   - Validate API endpoints

### Debug Mode

Enable debug logging:

```bash
# Start with debug logging
DEBUG=* npm run dev
```

---

## License

This frontend application is part of the GitHub Contribution Intelligence Dashboard project and is licensed under the MIT License.
