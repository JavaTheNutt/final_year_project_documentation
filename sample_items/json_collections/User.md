## User

__Implementation__ : _Abstract_

This represents a single user who will be contained in a user group. 

### Schema
```js
 const schema= {
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  surname: {
    type:String
  },
  addresses: [Address]
}
```

### Example Record

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
