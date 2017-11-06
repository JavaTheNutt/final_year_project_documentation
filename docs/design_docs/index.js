const fs   = require('fs');
const path = require('path');

const fileNames = ['pageHeader', 'tableOfContents'];

const concatFiles = (dirname, fileNames, outputFile) => fs.writeFileSync(path.join(dirname, outputFile), readFiles(mapFiles(dirname, fileNames)).
join('  '));

const readFiles = fileNames => fileNames.map(name => fs.readFileSync(name));

const mapFiles = (dirname, files) => files.map(fileName => `${path.join(dirname, fileName)}.md`);

const getHeader = () => fs.readFileSync(path.join(__dirname, 'snippets/header/README.md'));

const stripOldHeader = doc => doc.substring(doc.indexOf('# Project Goal'));
const fetchDesignDoc = () => fs.readFileSync(path.join(__dirname, 'design_doc.md'), 'utf-8');
const appendHeader   = () => fs.writeFileSync(path.join(__dirname, 'new_design_doc.md'), [getHeader(),
  stripOldHeader(fetchDesignDoc())].join(' '), 'utf-8');
appendHeader();

