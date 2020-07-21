const router = require('express').Router()

const UsersModel = require('./users-model');
const usersModel = require("./users-model");

router.get('/' , (req, res) => {
    usersModel.find().then(result =>{
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errmessage: err.message})
    })
   
})

router.get('/:id', (req, res) => {
    const id = req.params

    usersModel.findById(id)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errmessage: err.message})
    })
})

//currently case sensitive, must fix.
router.get('/name/:username', (req, res) => {
    const username = req.params
    usersModel.findByName(username)
    .then(result => {
        console.log(result)
        res.json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errmessage: err.message})
    })
})


module.exports = router