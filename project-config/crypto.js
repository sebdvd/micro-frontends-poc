const { createHash } = require('crypto');
const fs = require('fs');

function hash(content, { algorithm = 'md4', encoding = 'hex' } = {}) {
  return createHash(algorithm)
    .update(
      typeof content === 'string' ? Buffer.from(content, 'utf-8') : content
    )
    .digest(encoding);
}

function hashFile(
  source,
  { algorithm = 'md4', encoding = 'hex', readFile = false } = {}
) {
  let content = source;
  if (readFile) {
    content = fs.readFileSync(source, { encoding: 'utf8' });
  }
  return hash(content, { algorithm, encoding });
}

module.exports = { hash, hashFile };
