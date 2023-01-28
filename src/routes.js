const router = require('express').Router();

const candidateRouter = require('./routes/candidate.routes');
const voterRouter = require('./routes/voter.routes');
const resultRouter = require('./routes/result.routes');

router.use('/candidates', candidateRouter);
router.use('/voters', voterRouter);
router.use('/results', resultRouter);

module.exports = router;
