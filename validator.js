module.exports = createValidator

function createValidator(findOne) {

  function validate(keys, keyDisplayName, object, callback) {

    var queryObject = {}
      , values = []

    // Force fields to be an array if only a single value
  ; [].concat(keys).forEach(function (field) {
      queryObject[field] = object[field]
      values.push(object[field])
    })

    values = values.join(',')

    findOne(queryObject, function (err, foundObject) {

      if (foundObject) {

        // Object was found, so the property is valid
        return callback(null, undefined)

      } else {

        // No object was found, so the property is invalid
        return callback(null, '"' + values + '" does not exist')

      }

    })

  }

  return validate

}