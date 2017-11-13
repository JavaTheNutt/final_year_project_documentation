## User Auth

This collection represents a user authentication model. This model is kept seperate from the main model, so that data isn't leaked to the user.

### Schema

```js
const UserAuthSchema = {
  email: {
    type: String,
    required: true
  },
  user: {
    type: String, 
    required: false
  },
  firebaseId: {
    type: String,
    required: true
  }
}
```

### Example
```json
{
  "email": "joebloggs@test.com",
  "user": "5a01df962c747700186bfbcc",
  "firebaseId": "dfajksdhfjdsahfsdfdfj"
}
```
