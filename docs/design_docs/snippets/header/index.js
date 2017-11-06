const fs   = require('fs');
const path = require('path');

const fileNames = [
    'pageHeader',
    'tableOfContents'
];

const concatFiles = (dirname, fileNames, outputFile) => fs.writeFileSync(path.join(dirname,outputFile), readFiles(mapFiles(dirname, fileNames)).join('  '));

const readFiles  = fileNames => fileNames.map(name => fs.readFileSync(name));

const mapFiles = (dirname, files)=> files.map(fileName => `${path.join(dirname, fileName)}.md`);


concatFiles(__dirname,fileNames, 'README.md');
