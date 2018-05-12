#!/usr/bin/env node
require('loud-rejection/register');
const build = require('./src/build');

require('yargs')
  .command(
    'build',
    'Build the package.',
    yargs =>
      yargs.option('skip', {
        alias: 's',
        default: false,
        describe: 'Do not build if the file specified in "main" exists.',
      }),
    build,
  )
  .parse();
