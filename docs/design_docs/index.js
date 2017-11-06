const fs   = require('fs');
const path = require('path');

const filePaths = ['snippets/header', 'snippets/'];

const concatFiles = (dirname, fileNames, outputFile) => fs.writeFileSync(path.join(dirname, outputFile), readFiles(mapFiles(dirname, fileNames)).
join('  '));

const readFiles = fileNames => fileNames.map(name => fs.readFileSync(name));

const mapFiles = (dirname, files) => files.map(fileName => `${path.join(dirname, fileName)}.md`);
const getReadme = filePath =>  fs.readFileSync(path.join(__dirname, `${filePath}/README.md`));
const getHeader = () => getReadme('snippets/header');
const getAppendix = ()=> getReadme('snippets/appendix');
const stripOldAppendix = doc => doc.substring(0, doc.lastIndexOf('# Appendix') - 1);
const stripOldHeader = doc => doc.substring(doc.indexOf('# Project Goal'));
const fetchDesignDoc = () => fs.readFileSync(path.join(__dirname, 'design_doc.md'), 'utf-8');
const appendHeader   = () => fs.writeFileSync(path.join(__dirname, 'new_design_doc.md'), [getHeader(),
  stripOldAppendix(stripOldHeader(fetchDesignDoc())), getAppendix()].join(' '), 'utf-8');
appendHeader();

