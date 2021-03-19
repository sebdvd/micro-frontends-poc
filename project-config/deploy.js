/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const pkg = require(path.resolve(process.cwd(), 'package.json'));

const files = fs.readdirSync(path.resolve(process.cwd(), 'dist'));

const dest = path.resolve(
  process.cwd(),
  `../server/public/${pkg.name}/${pkg.version}`
);

try {
  fs.mkdirSync(dest, { recursive: true });
} catch {
  // noop
}

const isRoot = process.argv.includes('root');

for (const file of files) {
  const fullPath = path.resolve(process.cwd(), `dist/${file}`);
  if (isRoot && file === 'index.html') {
    const indexDest = path.resolve(
      process.cwd(),
      `../server/public/index.html`
    );
    console.log(`copy ${fullPath} to ${indexDest}`);
    fs.copyFileSync(fullPath, indexDest);
  } else {
    console.log(`copy ${fullPath} to ${dest}/${file}`);
    fs.copyFileSync(fullPath, `${dest}/${file}`);
  }
}
