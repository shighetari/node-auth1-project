module.exports = (req, res, next) => {
    // if (req.session && req.session.loggedIn) {
        next();
    // } else {
    //     res.status(401).json({ you: "ACCESS DENIED, must be logged in or have a valid session id" });
    // }
};
