const { PathFactory } = require('ldflex');
const { default: ComunicaEngine } = require('ldflex-comunica');
const { namedNode } = require('@rdfjs/data-model');

// The JSON-LD context for resolving properties
const context = {
  "@context": {
    "@vocab": "http://schema.org/Organization"
  }
};
// The query engine and its source
const queryEngine = new ComunicaEngine('http://reference.data.gov.uk/id/department/co');
// The object that can create new paths
const path = new PathFactory({ context, queryEngine });

const organization = path.create({ subject: namedNode('http://schema.org/Organization') });
showPerson(organization);

async function showPerson(organization) {
  console.log(`This organization is ${ await organization.email}`);

    
   
}