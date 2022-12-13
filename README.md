# @guoyunhe/create-cli

Initialize a Node.js command line tool project

## Get Started

### Create a new project

```bash
npm create @guoyunhe/cli my-new-cli
```

### Initialize/migrate an existing project:

```bash
cd my-existing-cli
npm init @guoyunhe/cli
```

### Project structure

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

### Package scripts

```bash
# Build output
npm run build
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
npm create @guoyunhe/cli my-new-cli --package-version 0.1.0
```

### Minimum supported Node.js version

Options: 12, 14, 16(default), 18.

```bash
npm create @guoyunhe/cli my-new-cli --node-version 14
```

### Use strict TypeScript configuration

```bash
npm create @guoyunhe/cli my-new-cli --strict
```

### Add multiple bin

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

### Pure ESM package

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
