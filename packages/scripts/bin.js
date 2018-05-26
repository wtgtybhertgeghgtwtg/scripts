#!/usr/bin/env node
require('loud-rejection/register');
const build = require('./src/build');

require('yargs')
  .command(
    'build',
    'Build the package.',
    yargs =>
      yargs
        .option('input', {
          alias: 'i',
          default: 'src/index.js',
          describe: 'The entry point of the bundle.',
        })
        .option('skip', {
          alias: 's',
          default: false,
          describe: 'Do not build if the file specified in "main" exists.',
        }),
    build,
  )
  .parse();
