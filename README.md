# LEF Guard: the definitive edition

## Usage

```JSX
import Guard from 'meteor/lef:guard'

const Basic = () => (
  <Guard rule={'admin_dashboard'}>
    // guarded content
  </Guard>)

const Shorthand = () => (
  <Guard>
    // only visible if logged in
  </Guard>)

const Redirect = () => (
  <Guard rule={'post_create'} redirect={'/posts'}>
    // redirects unless rule was met
  </Guard>)
```

**Important** Make sure to wrap your code with the user provider!

```JSX
import { UserProvider } from 'meteor/lef:utils'

<UserProvider>
  <App />
</UserProvider>
```

## Rule doc

Insert a rule document in the `rules` collection.

```json
{
  "_id": "admin_dashboard",
  "roles": [ "admin" ]
}
```

## Scratchpad future functionalities

```js
// document
{
  "_id": "123",
  "owner": "userId"
}

// user
{
  "_id": "userId"
}

// rule
{
  "_id": "view_documents",
  "roles": {
    "author": {
      "owner": "user._id"
    },
    "admin": {}
  }
}

Meteor.call('guard', 'view_documents', (e,r) => {
  if (r) {
    return 'jej!'
  }
})
```


## Todo

- Add admin panel for rules and roles setting
