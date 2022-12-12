import { outputFile, outputJSON } from 'fs-extra';
import { join } from 'path';
import editorconfig from './template/editorconfig.txt';
import gitignore from './template/gitignore.txt';
import vscodeExtensions from './template/vscode-extensions.json';
import vscodeSettings from './template/vscode-settings.json';

export function createProject(project?: string) {
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
}
