const execa = require('execa');
const path = require('path');

const binPath = path.resolve(__dirname, '../bin.js');

function build(fixture, ...args) {
  const cwd = path.join(__dirname, 'fixtures', fixture);
  return execa(binPath, ['build', ...args], {cwd});
}

describe('build', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fails if no "main" is in "package.json".', async () => {
    await expect(build('no-main')).rejects.toThrow(
      '"main" must be defined in "package.json".',
    );
  });
});
