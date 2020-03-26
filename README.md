# What is this?

Initially this library is designed to make RDF queries to Solid PODs, but it can be easily extended with the methods that it already has. I encourage you to participate on its growth and spread. Let's make rdf-query the main RDF library and unify all RDF related staff in it!

# Usage

```javascript
let rdfq = require("rdf-query");
```

Or

```javascript
import {...} from "rdf-query";
```

# Reference

| Method                                                 | Description                                                                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **getName(profile)**                                   | Returns the name of the profile passed as a parameter                                                             |
| **getImage(profile)**                                  | Returns the URI of the image of the specified profile                                                             |
| **getFriends(profile)**                                | Returns an array of URIs, that represent the list of friends of the profile specified as a parameter              |
| **getInfoFromProfile(profile)**                        | Returns the name, friends (as URIs), and image (as URI) from the specified profile                                |
| **getMultipleValuesFromFoaf(profile, field)**          | Returns an array of values from the _foaf_ namespace                                                              |
| **getSingleValueFromFoaf(profile, field)**             | Returns an object containing the value from the _foaf_ namespace                                                  |
| **getSingleValueFromVcard(profile, field)**            | Returns an object containing the value from the _vcard_ namespace                                                 |
| **getMultipleValuesFromNamespace(profile, field, ns)** | Returns an array containing objects with the information of the field you requested, from the specified namespace |
| **getSingleValueFromNamespace(profile, field, ns)**    | Returns an object containing the value of the field you requested, from the specified namespace                   |

# Example usage

## Getting the name of a user

This would be the code to get the name of a user, given his/her webId

```javascript
const rdf = require("rdf-query");

rdf
  .getName("https://timbl.solid.community/profile/card#me")
  .then(name => console.log(name.value));
```

Which will give us:

```javascript
"Tim Berners-Lee (solid.community)";
```

## Getting friends of a user

To get the URIs of the friends of a user, we will use this code:

```javascript
rdf
  .getFriends("https://timbl.solid.community/profile/card#me")
  .then(friends => {
    friends.map(friend => {
      console.log(friend.object.value);
    });
  });
```

Which returns:

```javascript
"http://www.w3.org/People/Berners-Lee/card#i";
"https://angelo.veltens.org/profile/card#me";
"https://gaia.solid.community/";
"https://jollyorc.solid.community/profile/card#me";
"https://melvin.solid.community/profile/card#me";
"https://nada.solid.community/profile/card#me";
"https://spoggy.solid.community/profile/card#me";
```
