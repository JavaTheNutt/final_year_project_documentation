const fs     = require('fs');
const path   = require('path');
const parser = require('xml2json');

const fileNames = ['figures', 'references01'];

const concatFiles = (dirname, fileNames, outputFile) => fs.writeFileSync(path.join(dirname, outputFile), readFiles(mapFiles(dirname, fileNames)).
join('  '));

const readFiles = fileNames => fileNames.map(name => fs.readFileSync(name));

const mapFiles = (dirname, files) => files.map(fileName => `${path.join(dirname, fileName)}.md`);

const fetchSources   = () => fs.readFileSync('C:\\Users\\joewe\\AppData\\Roaming\\Microsoft\\Bibliography\\Sources.xml');
const convertSources = () => parser.toJson(fetchSources(), {object: true})['b:Sources']['b:Source'];
const mapSources     = sources => sources.map(source => mapReference(source));
const generateMarkdown = mappedReferences => mappedReferences.map(reference => reference.url ? generateWebsiteMarkdown(reference) : generateNonWebsiteMarkdown(reference));
const writeReferenceFile = () => fs.writeFileSync(path.join(__dirname, 'references01.md'),['# References', generateMarkdown(sortReferences(mapSources(convertSources()))).join(' ')].join(' '));
const mapReference = src => {
  'use strict';
  const reference = {};
  Object.assign(reference, addYear(src, mapAuthor(src['b:Author']['b:Author'])));
  console.log(`reference is now ${JSON.stringify(reference)}`);
  Object.assign(reference, mapGenericProperties(src));
  Object.assign(reference, (src['b:SourceType'] === 'DocumentFromInternetSite'|| src['b:SourceType'] === 'InternetSite')? mapWebsiteProperties(src): mapPublisherProperties(src));
  console.log(`assigned reference: ${JSON.stringify(reference)}`);
  return reference;
};
const addYear = (oldRecord, newRecord) => {
  'use strict';
  console.log(`adding year to: ${JSON.stringify(newRecord)}`);
  newRecord.citation += `, ${oldRecord['b:Year']}`;
  return newRecord;
};
const mapGenericProperties = record => {
  'use strict';
  console.log(`attempting to add generic properties from ${JSON.stringify(record)}`);
  return {
    type: record['b:SourceType'],
    title: record['b:Title'],
    year: record['b:Year']
  }
};
const mapPublisherProperties = record => {
  'use strict';
  return {
    publisher: record['b:Publisher']
  }
};
const mapWebsiteProperties = record => {
  'use strict';
  return {
    accessed: `${record['b:DayAccessed']}/${record['b:MonthAccessed']}/${record['b:YearAccessed']}`,
    url: record['b:URL']
  }
};
const mapAuthor      = author => {
  console.log(`attempting to map ${JSON.stringify(author)}`);
  if (author['b:Corporate']) {
    console.log('author is corporate');
    return mapCorporate(author)
  }
  return mapNameList(author['b:NameList']);
};
const mapNameList    = author => {
  console.log(`attempting to map namelist for ${JSON.stringify(author)}`);
  return {
    citation: `${author['b:Person']['b:Last']?`${author['b:Person']['b:Last']}, `:''}${author['b:Person']['b:First'].substring(0, 1)}`,
    name: `${author['b:Person']['b:Last']}, ${author['b:Person']['b:First']}`
  }
};
const mapCorporate   = author => {
  'use strict';
  console.log(`attempting to map ${JSON.stringify(author)}`);
  return {
    citation: `${author['b:Corporate']}`,
    name: author['b:Corporate'].indexOf('(') === -1 ? author['b:Corporate'] :
        author['b:Corporate'].substring(0, author['b:Corporate'].indexOf('(') - 1)
  }
};
const sortReferences = references => references.sort((elem1, elem2)=>{
  'use strict';
  if(elem1.citation < elem2.citation) return -1;
  return 1
});
const generateWebsiteMarkdown = reference => {
  'use strict';
  console.log(`attempting to generate website markdown for ${JSON.stringify(reference)}`);
  return `
  
  ## ${reference.citation}
  
  Author: ${reference.name}
  
  Year: ${reference.year}
  
  Title: ${reference.title}
  
  URL: ${reference.url}
  
  Accessed On: ${reference.accessed}
  `
};
const generateNonWebsiteMarkdown = reference => {
  'use strict';
  console.log(`attempting to generate non website markdown for ${JSON.stringify(reference)}`);
  return `
  
  ## ${reference.citation}
  
  Author: ${reference.name}
  
  Year: ${reference.year}
  
  Title: ${reference.title}
  
  Publisher: ${reference.publisher}
  `
};

//console.log(JSON.stringify());
writeReferenceFile();
concatFiles(__dirname, fileNames, 'README.md');

