const bcryptjs = require("bcryptjs"); // << add this line for hasing
const router = require("express").Router();

const usersModel = require('../users/users-model')

// router.post('/register', (req, res) => {
//     let credentials = req.body;
//     const rounds = 8
//     const hash = bcryptjs.hashSync(credentials.password, rounds)
//     credentials.password = hash;

//     usersModel.add(credentials)
//     .then(saved => {
//         console.log(saved)
//         res.status(201).json(saved)
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({errMessage: err.message})
//     })
// })

router.post('/register', (req, res) => {
    let creds = req.body
    const hash = bcryptjs.hashSync(creds.password, 8)

    creds.password = hash

    usersModel.add(creds)
    .then( user => {
            console.log(user)
            res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    usersModel.filterBy({username})
    .then(user => {
        console.log(user)
        if (user && bcryptjs.compareSync(password, user.password)){
            req.session.loggedIn = true
            req.session.username = user.username
            res.status(200).json({message: `Welcome ${user.username}`, session: req.session})
        } else {
            res.status(401).json({errMessage: 'invalid credentials'})
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errMessage: err.message})
    })
})

router.get("/logout", (req, res) => {
        if (req.session) {
            console.log(req.session)
            req.session.destroy(err=> {
                if (err){
                    res.status(500).json({errmessage: `error logging out, please try later. ERROR: ${err.message}`})
                } else {
                    res.status(204).end()
                }
            })
        } else {
            res.status(200).json({message: 'already logged out'})
        }
})


module.exports = router