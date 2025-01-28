# Task Managment App
<img src="/resources/tasks-app.png">

<img src="/resources/home-app.png">

This Task Managment App project is built using [Vite.js](https://vite.dev/) and provide a user-friendly platform for managing tasks efficiently.

## Project Structure

The project follows a standard React/TypeScript structure with the following directories:

```
src/
├── assets          # Application-wide assets (images, icons, etc.)
├── components      # Reusable UI components
│   ├── form       # Form-related components
│   ├── layout     # Layout components for page structure
│   └── shared     # Shared utilities and components
├── hooks           # Custom React hooks
├── pages           # Main application pages
│   ├── list        # List functionality pages
│   │   └── components  # List components
│   └── tasks       # Task management pages
│       └── components  # Task components
├── store           # Redux-based state management
│   └── features    # Feature modules for state management
│       ├── api     # API-related reducers and actions
│       ├── tasks    # Task-related reducers and actions
│       └── user     # User-related reducers and actions
├── types           # TypeScript type definitions
│   ├── shared      # Shared types across the application
│   ├── task        # Task-specific types
│   └── user        # User-specific types
└── utils          # Utility functions and helpers
│   └── tests       # Test utilities
│
└── App.tsx         # Routes configuration
└── main.tsx        # Root application

 __tests__/      # Unit and integration tests
│   ├── list        # Tests for list functionality
│   │   └── __snapshots__  # Snapshot files for tests
│   └── tasks       # Tests for task functionality
│       └── __snapshots__  # Snapshot files for tests

```


## Getting Started Frontend

Now run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `src/pages/home`.

## Running Tests and Test Coverage Analysis

To run the tests, you can use `jest` with the following command:

```bash
npm test
# or
yarn test
# or
pnpm test
```

To generate the test coverage report, use this command:

```bash
npx jest --coverage
# or
yarn test:coverage
# or
pnpm test:coverage
```

Open `coverage/lcov-report/index.html` in your browser to view the code coverage report.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tslint.configs.recommendedTypeChecked` or `tslint.configs.strictTypeChecked`
- Optionally add `...tslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
```
