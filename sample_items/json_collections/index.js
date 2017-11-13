const fs = require('fs');
const path = require('path');
const names = [
    'Header',
    'Address',
    'User',
    'UserGroup'
];
const concatFiles = (dirname, fileNames, outputFile) => fs.writeFileSync(path.join(dirname,outputFile), readFiles(mapFiles(dirname, fileNames)).join('  '));

const readFiles  = fileNames => fileNames.map(name => fs.readFileSync(name));

const mapFiles = (dirname, files)=> files.map(fileName => `${path.join(dirname, fileName)}.md`);
const cleanup = () => fs.unlinkSync(path.join(__dirname, 'README.md'));

//cleanup();
concatFiles(__dirname,names, 'README.md');
