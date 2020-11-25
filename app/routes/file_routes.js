// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const File = require('../models/file')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()


// CREATE
router.post('/files', requireToken, (req, res, next) => {
  // set owner of new file to be current user
  req.body.file.owner = req.user.id

  File.create(req.body.file)
    .then(file => {
      res.status(201).json({ file: file.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/files/:id', requireToken, removeBlanks, (req, res, next) => {
  // To prevent changing owner by deleting the key value pair
  delete req.body.file.owner

  File.findById(req.params.id)
    .then(handle404)
    .then(file => {
      // Pass the req to the requiredOwnership and it'll throw an error
      // if the current user is not the owner
      requireOwnership(req, file)
      return file.updateOne(req.body.file)

// Index
router.get('/files', requireToken, (req, res, next) => {
  File.find()
    .then(files => {
      return files.map(file => file.toObject())
    })
    .then(files => res.status(200).json({ files: files }))
    .catch(next)
})

// Destroy
router.delete('/files/:id', requireToken, (req, res, next) => {
  File.findById(req.params.id)
    .then(handle404)
    .then(file => {
      requireOwnership(req, file)
      file.deleteOne()

    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
