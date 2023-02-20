# React starter

pnpm starter react turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `server`: a [Fasify](https://www.fastify.io/) and [TRPC](https://trpc.io/) app
- `web`: another [React.js](https://reactjs.org/) app
- `ui`: a stub React component library shared
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tw-config`: tailwind css config library shared

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

### use full command

```
{
	"server": "node build/server/index.js",
	"build": "turbo run build",
	"dev": "turbo run dev --parallel",
	"start": "pnpm dev",
	"lint": "turbo run lint",
	"format": "prettier --write \"**/*.{ts,tsx,md}\""
}
```
