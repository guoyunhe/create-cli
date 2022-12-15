# %name%

## Install

### Run directly

```bash
npx %name%
```

### Install on system

```bash
npm i -g %name%
%binName%
```

### Install in project

```bash
npm i -D %name%
```

Add script entry:

```json
{
  "scripts": {
    "%binName%": "%binName%"
  }
}
```

Run:

```bash
npm run %binName%
```

## Options

### `--help`

Show help

### `--version`

Show version
