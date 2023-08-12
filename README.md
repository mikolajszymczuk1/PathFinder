# PathFinder

PathFinder is a simulator environment that let you observe and play with different pathfinding algorithms.

## Project stack:

| Tables | About |
|----------|------:|
| `Vue 3` | SPA Framework (Create app with components) |
| `Pinia` | State management library |
| `TypeScript` | Powerful upgrade for normal JavaScript |
| `VueUse` | Library with much useful hooks |
| `FontAwesome` | Library with nice svg icons |
| `Vitest` | For testing (Unit and Integrations tests) |
| `Cypress` | For E2E testing |

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
