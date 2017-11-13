
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
