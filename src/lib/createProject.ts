import { outputFile, outputJSON } from 'fs-extra';
import { join } from 'path';
import changelog from './template/changelog.txt';
import editorconfig from './template/editorconfig.txt';
import gitignore from './template/gitignore.txt';
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

export function createProject(
  project: string | null,
  { packageVersion = '1.0.0', nodeVersion = '16', strict }: CreateProjectOptions
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
    tsconfigPreset = `@tsconfig/node${nodeVersion}-strictest/tsconfig.json`;
  } else {
    tsconfigPreset = `@tsconfig/node${nodeVersion}/tsconfig.json`;
  }
  const newTsconfigJson = { extends: tsconfigPreset, ...tsconfigJson };
  outputJSON(tsconfigJsonPath, newTsconfigJson, { spaces: 2 });

  // CHANGELOG.md
  const changelogPath = join(projectFullPath, 'CHANGELOG.md');
  const date = new Date().toISOString().substring(0, 10);
  const newChangelog = changelog.replace('%date%', date).replace('%version%', packageVersion);
  outputFile(changelogPath, newChangelog);
}
