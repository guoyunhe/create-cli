# @guoyunhe/create-cli

Initialize a Node.js command line tool project

## Features

- TypeScript
- Localization

## Create or initialize a project

### NPM

Create a new project:

```bash
npm create @guoyunhe/cli my-new-cli
```

Initialize an existing project:

```bash
cd my-existing-cli
npm init @guoyunhe/cli
```

### PNPM

Create a new project:

```bash
pnpm create @guoyunhe/cli my-new-cli
```

Initialize an existing project:

```bash
cd my-existing-cli
pnpm init @guoyunhe/cli
```

### Yarn

Create a new project:

```bash
yarn init @guoyunhe/cli my-new-cli
```

Initialize an existing project:

```bash
cd my-existing-cli
yarn init @guoyunhe/cli
```

## Add multiple bin

Let's say, you want to add a new bin called `perform_health_check`.

First, create `src/bin/perform_health_check.ts`, with shebang `#!/usr/bin/env node`:

```ts
#!/usr/bin/env node

console.log('Doing health check...');

// Add your code...
```

Then, add bin entry to your `package.json`:

```json
{
    "bin": {
        "perform_health_check": "dist/cjs/bin/perform_health_check.js"
    }
}
```