# LEF Guard: the definitive edition

## Usage

```JSX
import Guard from 'meteor/lef:guards'

<Guard rule='admin_dashboard'>
  // guarded content
</Guard>
```

## Rule doc

Insert a rule document in the `rules` collection.

```json
{
  "_id": "admin_dashboard",
  "allowedFor": [ "admin" ]
}
```

## Todo

- Add admin panel for rules and roles setting
