const assert = require('assert');
const builtinModules = require('builtin-modules');
const fileExists = require('file-exists');
const readPkg = require('read-pkg');
const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const write = require('write');

async function build(args) {
  const pkg = await readPkg();
  assert(
    typeof pkg.main === 'string',
    '"main" must be defined in "package.json".',
  );

  if (args.skip && (await fileExists(pkg.main))) {
    return;
  }

  const external = pkg.dependencies
    ? [...builtinModules, ...Object.keys(pkg.dependencies)]
    : builtinModules;

  const bundle = await rollup({
    external,
    input: 'src/index.js',
    plugins: [json(), babel(), nodeResolve()],
  });

  await bundle.write({file: pkg.main, format: 'cjs', sourcemap: true});
  await write(`${pkg.main}.flow`, "// @flow\nexport * from '../src';");
  if (typeof pkg.module === 'string') {
    await bundle.write({file: pkg.module, format: 'es', sourcemap: true});
  }
}

module.exports = build;
