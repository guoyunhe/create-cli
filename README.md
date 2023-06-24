# @guoyunhe/create-cli

Initialize a Node.js command line tool project

## Get Started

### Create a new project

```bash
npm create @guoyunhe/cli my-cli
```

### Initialize an existing project

```bash
cd my-cli
npm init @guoyunhe/cli
```

### Project structure

```bash
├── dist # Build output
│   ├── index.js # CJS API entry
│   ├── index.mjs # ESM API entry
│   ├── index.d.ts # TypeScript declaration
│   ├── my-cli.js # CJS CLI script
│   └── my-cli.mjs # ESM CLI script
├── src # Source code
│   ├── bin # CLI scripts
│   │   └── my-cli.ts
│   ├── index.test.ts # API unit test
│   └── index.ts # API entry (add all exports here)
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── package.json
├── README.md
└── tsconfig.json
```

### Package scripts

```bash
# Build output
npm run build
# Build output in watch mode
npm run watch
# Format source code
npm run format
# Check lint issues
npm run lint
# Run unit tests (support all jest command options)
npm test
# Run unit tests in watch mode
npm test -- --watch
# Update unit test snapshots
npm test -- -u
```

## Advanced Options

### Initial package version

1.0.0 by default.

```bash
npm create @guoyunhe/cli my-cli --package-version 0.1.0
```

### Add multiple bin

Let's say, you want to add a new bin called `health-check`.

First, create `src/bin/health-check.ts`, with shebang `#!/usr/bin/env node`:

```ts
#!/usr/bin/env node

console.log('Doing health check...');

// Add your code...
```

Then, add bin entry to your `package.json`:

```json
{
  "bin": {
    "health-check": "dist/health-check.js"
  }
}
```
