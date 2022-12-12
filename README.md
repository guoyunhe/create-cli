# @guoyunhe/create-cli

Initialize a Node.js command line tool project

## Features

- TypeScript
- Localization

## Create or initialize a project

Create a new project:

```bash
npm create @guoyunhe/cli my-new-cli
```

Initialize an existing project:

```bash
cd my-existing-cli
npm init @guoyunhe/cli
```

## Project structure

```bash
├── dist                    # Build output
│   ├── cjs                 # CJS format
│   │   ├── bin             # CJS CLI scripts
│   │   │   └── my-cli.js
│   │   └── index.js        # CJS API entry
│   ├── esm                 # ESM module format
│   │   ├── bin             # ESM CLI scripts
│   │   │   └── my-cli.js
│   │   └── index.js        # ESM API entry
│   └── dts                 # TypeScript types
│       └── index.d.ts
├── src                     # Source code
│   ├── bin                 # CLI scripts
│   │   ├── my-cli.spec.ts  # CLI unit test
│   │   └── my-cli.ts       # CLI script
│   ├── index.spec.ts       # API unit test
│   └── index.ts            # API entry (add all exports here)
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── package.json
├── README.md
└── tsconfig.json
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

## Pure ESM package

If you want your package to be pure ESM, you should modify the following attributes in `package.json`:

```json
{
  "type": "module",
  "bin": {
    "my-cli": "dist/esm/bin/my-cli.js"
  },
  "main": "dist/esm/index.js"
}
```
