const path = require('path');
const fsExtra = require('fs-extra');
const ejs = require('ejs');

const root = path.resolve(__dirname, '../');

const buildPath = path.resolve(root, 'build');

const publicPath = path.resolve(root, 'public');

const template = path.resolve(root, 'src/views/index.ejs');

const pages = {
  'home': 'index.html',
  'about': 'about.html',
};

const main = async () => {
  await fsExtra.remove(buildPath);

  await fsExtra.ensureDir(buildPath);

  fsExtra.readdirSync(publicPath).forEach(item => {
    fsExtra.copySync(
      path.resolve(publicPath, item),
      path.resolve(buildPath, item)
    );
  });

  await Promise.all(Object.keys(pages).map(async (page) => {
    const file = await ejs.renderFile(template, {page: page});
    const fileName = pages[page];
    fsExtra.outputFileSync(path.resolve(buildPath, fileName), file);
  }));
};

main().catch(console.error);
