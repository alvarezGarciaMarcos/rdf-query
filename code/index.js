const rdf = require('rdflib')
const ns = require('solid-namespace')(rdf)
const store = rdf.graph()

const me = store.sym('https://alvarezgarciamarcos.solid.community/profile/card#me')
const cesar = store.sym('https://themrcesi.inrupt.net/profile/card#me')
const profile = me.doc()

const fetcher = new rdf.Fetcher(store)
  
/* 
fetcher.load(profile)
  .then(response => {
    let name = store.any(me, ns.foaf('knows'))
    console.log(name)
  })
 */

getValueFromNamespace = (profile, field, ns) => {
  return new Promise((resolve, reject) => {
    fetcher.load(profile.doc())
      .then(response => {
        resolve(store.any(profile, ns(field)))
      })
      .catch(error => reject(error))
  })
}

getValueFromVcard = (profile, field) => getValueFromNamespace(profile, field, ns.vcard)
getValueFromFoaf = (profile, field) => getValueFromNamespace(profile, field, ns.foaf)


getInfoFromProfile = (profile, callback) => {
  const name = getValueFromVcard(profile, 'fn')
  const friends = getValueFromFoaf(profile, 'knows')
  const image = getValueFromVcard(profile, 'hasPhoto')

  Promise.all([name, friends, image])
    .then(values => {
      callback(values)
    })
}

getInfoFromProfile(cesar, (v) => console.log(v))