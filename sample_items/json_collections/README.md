# Data Structure

This section contains the details for how the data will be represented in the database. There is a combination of conceptual database models, an physical mongo BSON implementations
  ## Address

__Implementation__ : _Abstract_

This is the Address model, represented in JSON. 
The data at `loc` is subject to a Mongo `2dsphere` index, for geospatial querying.
```json
  {
    "_id": "5a01df962c747700186bfbcb",
    "text": "123 fake street",
    "loc": {
      "type": "Point",
      "coordinates": [10, 10]
    }
  }
```
  ## User

__Implementation__ : _Abstract_

This represents a single user who will be contained in a user group. 

```json
  {
    "_id": "5a01df962c747700186bfbcd",
    "email": "jane.bloggs@test.com",
    "firstName": "jane",
    "surname": "bloggs",
    "addresses": [{
      "_id": "5a01df962c747700186bfbcb",
      "text": "234 fake street",
      "loc": {
        "type": "Point",
        "coordinates": [12, 10]
      }
    }]
  }
```
  
## UserGroup

 __Implementation__ : _Concrete_

This is the user group mongodb collection. This is a concrete model that will be persisted to the database. Made up of [User]() and [Address]() conceptual models.
```json
 {
  "_id": "5a01df962c747700186bfbca",
  "name": "bloggs family",
  "primaryAddress": "5a01df962c747700186bfbcb",
  "addresses":[{
    "_id": "5a01df962c747700186bfbcb",
    "text": "123 fake street",
    "loc": {
      "type": "Point",
      "coordinates": [10, 10]
    }
  }],
  "users":[{
    "_id": "5a01df962c747700186bfbcc",
    "email": "joe.bloggs@test.com",
    "firstName": "joe",
    "surname": "bloggs",
    "addresses": []
  },{
    "_id": "5a01df962c747700186bfbcd",
    "email": "jane.bloggs@test.com",
    "firstName": "jane",
    "surname": "bloggs",
    "addresses": [{
      "_id": "5a01df962c747700186bfbcb",
      "text": "234 fake street",
      "loc": {
        "type": "Point",
        "coordinates": [12, 10]
      }
    }]
  }]
}
```
