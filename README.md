# validity-entity-exists

[![Build Status](https://travis-ci.org/domudall/validity-entity-exists.png?branch=master)](https://travis-ci.org/domudall/validity-entity-exists)

Validity style validator to ensure a separate entity exists when being added to
the current entity, for instance: the user must exist before adding their ID as
a document author.

## Installation

    npm install validity-entity-exists

## Usage

Below is a simple example for usage with schemata and save:

```js

var validity = require('validity')
  , schemata = require('schemata')
  , save = require('save')
  , documentCollection = save('document')
  , userCollection = save('user')
  , entityExistsValidator = require('validity-entity-exists')

var schema = schemata(
    { author:
      { type: String
      , validators: { all: [ entityExistsValidator(userCollection) ] }
      }
    })
```

## API

### var validate = entityExistsValidator(Function: findOne)

Create a validate function. `findOne(obj, cb)` should be a query function that
allows the validator access to whatever persistence mechanism you are using, in
order to check for the existence of the given property. `obj` is a query object
and `cb` is a callback function `cb(err, foundObject)`.

### validate(String:key, String:keyDisplayName, Object:object, Function:cb)

This is a validity compatible function, which in turn is used by schemata for
schema validation.

The callback signature cb(err, errorMessage).

err is an Error object if something bad happened and null otherwise.
errorMessage is a String if a validation error happened and undefined otherwise.

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)