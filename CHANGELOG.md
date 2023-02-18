# Changelog

## 1.6.0 - 2023-02-18

- Changed `package.json` template:
  - Updated `@guoyunhe/node-scripts` to 2.0
- Changed `bin` template:
  - Removed unneeded null check for `PACKAGE_VERSION`

## 1.5.1 - 2023-02-11

- Fixed bin path

## 1.5.0 - 2023-02-11

- Updated `@guoyunhe/node-scripts` to 2.0
- Splitted `package.json` template into `package-defaults.json` and `package-overrides.json`
- Changed to not override `src/index.ts`, `README.md`, `CHANGELOG.md`
- Simplified `.gitignore` template

## 1.4.1 - 2023-01-26

- Change Prettier `printWidth` to `100`
- Fix VSCode `editor.rulers` settings

## 1.4.0 - 2023-01-22

- Initialize `description` and `keywords`
- Use `package-json-from-git` to initialize `repository`, `homepage`, `bugs` and `author` fields in `package.json` from Git data

## 1.3.0 - 2022-12-17

- Add `typings` attribute to `package.json`

## 1.2.0 - 2022-12-17

- Rename `cli-scripts` to `node-scripts`

## 1.1.0 - 2022-12-17

- Format `package.json` with `sort-package-json`

## 1.0.0 - 2022-12-16

- Support create basic cli project
- Support `--package-version` option
- Support `--node-version` option
- Support `--strict` option
