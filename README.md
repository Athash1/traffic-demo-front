# traffic-demo

## Frontend Technologies

This project uses a variety of modern frontend technologies for efficient, scalable, and robust application development:

1. **Vue.js**: Vue.js is a progressive JavaScript framework for building user interfaces. It is designed from the ground up to be incrementally adoptable. The core library focuses on the view layer only and is easy to pick up and integrate with other libraries or existing projects.

2. **TypeScript**: TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers classes, modules, and interfaces to help you build robust components. The use of TypeScript for this project provides a more comfortable development experience with improved navigation, refactoring, and autocompletion.

3. **Element Plus**: Element Plus is a Vue.js 3.0 UI toolkit for web. It provides a rich selection of customizable components along with a full style guide for web applications.

4. **Vue I18n**: Vue I18n is internationalization plugin for Vue.js. It easily integrates some localization features to your Vue.js Application.

5. **Axios**: Axios is a promise-based HTTP client for the browser and Node.js. It has a simple and easy-to-use API that can also be used with Vue.js.

6. **Pinia**: Pinia is the Vue.js state management library that is intuitive, type safe, and easy to use. It provides a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It integrates well with Vue DevTools for time-travel debugging, state snapshot export and import, and more.

7. **Vite**: Vite is a modern front-end build tool that significantly improves the front-end development experience. It provides fast hot module replacement (HMR) and true out-of-the-box support for TypeScript, JSX, CSS, JSON, and other web-native file formats. It is used in this project for efficient and fast development and building process.

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

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

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
