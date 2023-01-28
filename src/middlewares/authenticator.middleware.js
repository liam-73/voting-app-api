const jwt = require('jsonwebtoken');

const Voter = require('../models/voter')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const voter = await Voter.findOne({_id: decoded._id});

        if(!voter) throw new Error();
        req.voter = voter;
        next();
    } catch(e) {
        res.status(500).send();
    }
};

module.exports = auth;