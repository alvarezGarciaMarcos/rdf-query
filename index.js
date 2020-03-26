const rdf = require("rdflib");
const ns = require("solid-namespace")(rdf);
const store = rdf.graph();

const fetcher = new rdf.Fetcher(store);

/**
 * Method that queries a profile for a specific field in an specific nameSpace
 * @param profile the URI to the profile
 * @param field the field to look for. Ex: 'fn'
 * @param ns the namespace to look in.
 */
const getSingleValueFromNamespace = (profile, field, ns) => {
  let _profile = store.sym(profile);
  return new Promise((resolve, reject) => {
    fetcher
      .load(_profile.doc())
      .then(() => {
        resolve(store.any(_profile, ns(field)));
      })
      .catch(error => reject(error));
  });
};

/**
 * Method that queries a profile for a specific field (that has multiple values as a response)
 * in an specific nameSpace
 * @param profile the URI to the profile
 * @param field the field to look for. Ex: 'fn'
 * @param ns the namespace to look in.
 */
const getMultipleValuesFromNamespace = (profile, field, ns) => {
  let _profile = store.sym(profile);
  return new Promise((resolve, reject) => {
    fetcher
      .load(_profile.doc())
      .then(() => {
        resolve(store.statementsMatching(_profile, ns(field)));
      })
      .catch(error => reject(error));
  });
};

/**
 * Returns single value properties from VCARD NameSpace
 * @param profile the profile to look into
 * @param  field the field to look for
 */
const getSingleValueFromVcard = (profile, field) =>
  getSingleValueFromNamespace(profile, field, ns.vcard);

/**
 * Returns single value properties from FOAF NameSpace
 * @param profile the profile to look into
 * @param  field the field to look for
 */
const getSingleValueFromFoaf = (profile, field) =>
  getSingleValueFromNamespace(profile, field, ns.foaf);

/**
 * Returns multiple value properties from FOAF NameSpace
 * @param profile the profile to look into
 * @param field the field to look for
 */
const getMultipleValuesFromFoaf = (profile, field) =>
  getMultipleValuesFromNamespace(profile, field, ns.foaf);

/**
 * Returns the name of an specific profile
 * @param profile the profile to look into
 */
const getName = profile => getSingleValueFromVcard(profile, "fn");

/**
 * Returns the image
 * @param profile the profile to look into
 */
const getImage = profile => getSingleValueFromVcard(profile, "hasPhoto");

/**
 * Returns all the friends
 * @param profile the profile to look into
 */
const getFriends = profile => getMultipleValuesFromFoaf(profile, "knows");

/**
 * Returns the name, image, and friends of a profile
 * @param profile the URI of a profile
 * @param callback the callback function
 */
const getInfoFromProfile = async (profile, callback) => {
  const name = getName(profile);
  const friends = getFriends(profile, "knows");
  const image = getImage(profile, "hasPhoto");

  Promise.all([name, friends, image]).then(values => {
    let friends = [];
    values[1].forEach(friend => {
      friends.push(friend.object.uri);
    });
    let profile = {
      name: values[0].value,
      friends: friends,
      image: values[2].value
    };
    callback(profile);
  });
};

exports.getName = getName;
exports.getFriends = getFriends;
exports.getImage = getImage;
exports.getInfoFromProfile = getInfoFromProfile;
exports.getMultipleValuesFromFoaf = getMultipleValuesFromFoaf;
exports.getSingleValueFromFoaf = getSingleValueFromFoaf;
exports.getSingleValueFromVcard = getSingleValueFromVcard;
exports.getMultipleValuesFromNamespace = getMultipleValuesFromNamespace;
exports.getSingleValueFromNamespace = getSingleValueFromNamespace;
