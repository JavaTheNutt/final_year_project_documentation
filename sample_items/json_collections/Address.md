## Address

__Implementation__ : _Abstract_

This is the Address model, represented in JSON. 
The data at `loc` is subject to a Mongo `2dsphere` index, for geospatial querying.
### Schema
```js
const schema = {
  text: {
    type: String,
    required: true
  },
  loc: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  }
};
schema.index({loc: '2dsphere'});
```
### Example
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
