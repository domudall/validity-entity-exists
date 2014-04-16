module.exports = createValidator

function createValidator(findOne, property) {

  function validate(key, keyDisplayName, object, callback) {

    var queryObject = {}

    queryObject[property || key] = object[key]

    findOne(queryObject, function (err, foundObject) {

      if (foundObject) {

        // Object was found, so the property is valid
        return callback(null, undefined)

      } else {

        // No object was found, so the property is invalid
        return callback(null, '"' + object[key] + '" does not exist')

      }

    })

  }

  return validate

}
