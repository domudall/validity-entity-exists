var createValidator = require('../')
  , assert = require('assert')

/* global describe, it */

describe('Entity exists validator', function () {

  it('should not provide an error message if findOne() returns a result', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null, { _id: 'aaaa', username: 'jim' })
    })
    validate('username', 'user name', { username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal(undefined, errMessage)
      done()
    })
  })

  it('should provide an error message if findOne() does not have a result', function (done) {
    var validate = createValidator(function (query, cb) {
      return cb(null)
    })
    validate('username', 'user name', { username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal('"jim" does not exist', errMessage)
      done()
    })
  })

  it('should allow you to provide a different name for the property in the other collection', function (done) {
    var validate = createValidator(function (query, cb) {
      assert.deepEqual(query, { otherproperty: 'jim' })
      return cb(null)
    }, 'otherproperty')

    validate('username', 'user name', { username: 'jim' }, function (err, errMessage) {
      if (err) return done(err)
      assert.equal('"jim" does not exist', errMessage)
      done()
    })
  })

})
