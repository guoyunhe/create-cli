#!/usr/bin/env node

import { Command } from 'commander';
import { createProject } from '..';

const program = new Command('create-cli');

program
  .argument(
    '[project]',
    'Folder name for the created project. If not provided, use current folder name.'
  )
  .option('--package-version <version>', 'Initial package version number, 1.0.0 by default')
  .option(
    '--node-version <version>',
    'Minimum supported Node.js version, 16 by default. Available options: 14, 16, 18'
  )
  .option('--strict', 'Use strict TypeScript configuration')
  .action(createProject);

program.helpOption('-h, --help', 'Show full help');

if (typeof PACKAGE_VERSION === 'string') {
  program.version(PACKAGE_VERSION, '-v, --version', 'Show version number');
}

program.parse();
