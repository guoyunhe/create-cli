import { outputFile, outputJSON, pathExists, readJSON } from 'fs-extra';
import merge from 'merge';
import { basename, join } from 'path';
import binTs from './template/bin.txt';
import changelog from './template/changelog.txt';
import editorconfig from './template/editorconfig.txt';
import gitignore from './template/gitignore.txt';
import indexTestTs from './template/index.test.txt';
import indexTs from './template/index.txt';
import packageJson from './template/package.json';
import readme from './template/readme.txt';
import tsconfigJson from './template/tsconfig.json';
import vscodeExtensions from './template/vscode-extensions.json';
import vscodeSettings from './template/vscode-settings.json';

export interface CreateProjectOptions {
  // Initial version number, 1.0.0 by default
  packageVersion?: string;
  // Minimum supported Node.js version, 16 by default
  nodeVersion?: '12' | '14' | '16' | '18';
  // Use strict TypeScript configuration
  strict: boolean;
}

export async function createProject(
  project: string | null,
  { packageVersion, nodeVersion = '16', strict }: CreateProjectOptions
) {
  if (!['12', '14', '16', '18'].includes(nodeVersion)) {
    throw new Error('--node-version must be one of the following: 12, 14, 16, 18');
  }

  const projectFullPath = project ? join(process.cwd(), project) : process.cwd();

  console.log('Project full path: ', projectFullPath);

  // .vscode/settings.json
  const vscodeSettingsPath = join(projectFullPath, '.vscode', 'settings.json');
  outputJSON(vscodeSettingsPath, vscodeSettings, { spaces: 2 });

  // .vscode/extensions.json
  const vscodeExtensionsPath = join(projectFullPath, '.vscode', 'extensions.json');
  outputJSON(vscodeExtensionsPath, vscodeExtensions, { spaces: 2 });

  // .editorconfig
  const editorConfigPath = join(projectFullPath, '.editorconfig');
  outputFile(editorConfigPath, editorconfig);

  // .gitignore
  const gitignorePath = join(projectFullPath, '.gitignore');
  outputFile(gitignorePath, gitignore);

  // tsconfig.json
  const tsconfigJsonPath = join(projectFullPath, 'tsconfig.json');
  let tsconfigPreset: string;
  if (['16', '18'].includes(nodeVersion) && strict) {
    tsconfigPreset = `@tsconfig/node${nodeVersion}-strictest`;
  } else {
    tsconfigPreset = `@tsconfig/node${nodeVersion}`;
  }
  const newTsconfigJson = { extends: tsconfigPreset + '/tsconfig.json', ...tsconfigJson };
  outputJSON(tsconfigJsonPath, newTsconfigJson, { spaces: 2 });

  // package.json
  const packageJsonPath = join(projectFullPath, 'package.json');
  let oldPackageJson: any = {};
  if (await pathExists(packageJsonPath)) {
    oldPackageJson = await readJSON(packageJsonPath, { throws: false });
  }
  const newPackageJson: any = {};
  merge.recursive(newPackageJson, oldPackageJson, packageJson);
  newPackageJson.name ||= basename(projectFullPath);
  newPackageJson.version = packageVersion || newPackageJson.version || '1.0.0';
  newPackageJson.devDependencies[tsconfigPreset] = '^1.0.0';
  newPackageJson.devDependencies['@types/node'] = `^${nodeVersion}.0.0`;
  const binName = basename(newPackageJson.name);
  newPackageJson.bin = {
    [binName]: `dist/cjs/bin/${binName}.js`,
  };
  outputJSON(packageJsonPath, newPackageJson, { spaces: 2 });

  // CHANGELOG.md
  const changelogPath = join(projectFullPath, 'CHANGELOG.md');
  const date = new Date().toISOString().substring(0, 10);
  const newChangelog = changelog.replaceAll('%date%', date).replaceAll('%version%', newPackageJson.version);
  outputFile(changelogPath, newChangelog);

  // README.md
  const readmePath = join(projectFullPath, 'README.md');
  const newReadme = readme.replaceAll('%name%', newPackageJson.name).replaceAll('%binName%', binName);
  outputFile(readmePath, newReadme);

  // src/bin/binName.ts
  const binTsPath = join(projectFullPath, 'src', 'bin', binName + '.ts');
  const newBinTs = binTs.replaceAll('%binName%', binName);
  outputFile(binTsPath, newBinTs);

  // src/index.ts
  const indexTsPath = join(projectFullPath, 'src', 'index.ts');
  outputFile(indexTsPath, indexTs);

  // src/index.test.ts
  const indexTestTsPath = join(projectFullPath, 'src', 'index.test.ts');
  outputFile(indexTestTsPath, indexTestTs);
}
