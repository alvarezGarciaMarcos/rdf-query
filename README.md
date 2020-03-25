# Install

To install the package simply issue the following command:

```bash
npm i rdf-query
```

# Usage

```javascript
let rdfq = require("rdf-query/rdf-query");
```

Or

```javascript
import /*methods-you-want*/ "rdf-query/rdf-query";
```

# Reference

| Method                                        | Params                                                                                                                                                                     | Description                                                                                          |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **getName(profile)**                          | String profile: a String URI that represents the profile to get the name from                                                                                              | Returns the name of the profile passed as a parameter                                                |
| **getImage(profile)**                         | String profile: a String URI that represents the profile to get the image from                                                                                             | Returns the URI of the image of the specified profile                                                |
| **getFriends(profile)**                       | String profile: a String URI that represents the profile to get friends from                                                                                               | Returns an array of URIs, that represent the list of friends of the profile specified as a parameter |
| **getInfoFromProfile(profile)**               | String profile: a String URI that represents the profile to get info from                                                                                                  | Returns the name, friends (as URIs), and image (as URI) from the specified profile                   |
| **getMultipleValuesFromFoaf(profile, field)** | String profile String profile: a String URI that represents the profile to get info from; String field: a String representing the field of the namespace you want to query | Returns the desired node from the specified profile                                                  |

|

```

```
