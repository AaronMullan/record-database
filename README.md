### Approach

1. Work vertically. That means build the tests, route and model for one entity/resource at a time. Horizontal would be building all the mongoose models first. Don't do that, go vertical!
1. Start with the entities/resources that don't depend on other resources: `Label`, `Artist`, and `User`
1. Do model unit tests: validate, required, other rules
1. As you tackle e2e API tests, you will need to drop all used collections in `beforeEach`. If you need a related model, that is already tested in another file, you
don't need to retest things you have already tested (like basic POST and GET).

## Models (Entities/Resources)

* Label
* Record
* Artist
* User
* User Notes

### Directions Key
* `<...>` is a placeholder for actual data.
* `S` = string, `D` = date, `N` = number, `I` = ObjectId
* Properties marked with `R` are required.

`_id` (and `__v`) properties omitted for clarity.

### Label

```
{
  name: <name-of-label RS>,
  address: {
    city: <city S>
    state: <state S>
    country: <country S>
  }
}
```

### Record

```
{
  title: <title of record RS>,
  label: <label _id RI>,
  released: <4-digit year RN>,
  band: [{
    instrument: <name of instrument S>,
    artist: <artist _id RI>
  }]
}
```

### Artist

```
{
   name: {
    type: String,
    required: true
  },
  instrument: String,
  dateofBirth: Date,
  dateofDeath: Date
}
```

### User

```
{
  email: <string RS>,
  password: <RS>
}
```


### User Notes

```
{
  record: <record-id RI>
  user: <user _id RI>
  condition: <text S>,
  notes: <text S>,
}
```

### Routes

Pick the set of routes that fit with your vertical slice.

#### GET

While the schemas should look like the data definitions above, these are descriptions of the data that should be returned from the various `GET` methods. You will need to use `lean`, `populate`, `select` and combining data to shape the appropriate response.

##### `GET /labels`

```
[{ _id, name }]
```

##### `GET /labels/:id`

```
{ _id, name, address, records: [{ _id, title }] }
```

##### `GET /records`

```
[{
    _id, title, released,
    label: { _id, name }
}]
```

##### `GET /records/:id`

```
{
    title,
    released,
    label: { _id, name },
    band: [{
        _id,
        role,
        actor: { _id, name }
    }],
    reviews: [{
        id,
        rating,
        review,
        user: { _id, name }
    ]
}
```

##### `GET /artists`

```
[{ _id, name }]
```

##### `GET /artists/:id`

```
{
    name,
    dob,
    pob,
    records: [{
      id,
      title,
      released
    }]
}
```

##### `GET /user`

```
[{
  _id,
  name,
  company
}]
```

##### `GET /user/:id`

```
{
    _id,
    name,
    company,
    reviews: [{
        _id,
        rating,
        review,
        record: { _id, title }
    }]
}
```

##### `GET /reviews`

**limit to 100 highest rated**

```
[{
    _id,
    rating,
    review,
    record: { _id, title }
}]
```

#### POST/PUT

Label, Records, and Artists, Users and Reviews can be added.

Only Users can be updated.

#### DELETE

Reviews and Users **However**:
1. Users cannot be deleted if there are reviews

## Testing

* Unit tests for models
* E2E API tests for supported routes

## Deploy

Deploy to heroku

## Rubric:

* Models: 5pts
* Relationships: 5pts
* Routes: 5pts
* Project Organization and Testing: 5pts
