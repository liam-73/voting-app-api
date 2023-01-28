const router = require('express').Router();

const authenticator = require('../middlewares/authenticator.middleware');
const upload = require('../middlewares/upload');
const candidateHandler = require('../handlers/candidate.handler');

router.use(authenticator);

router.post('/', upload.single('image'), candidateHandler.createUser);

router.get('/', candidateHandler.getCandidates);

router.get('/:township', candidateHandler.getCandidates);

router.get('/:id', candidateHandler.getCandidates);

router.patch('/:id', candidateHandler.updateCandidate);

router.delete('/:id', candidateHandler.deleteCandidate);

module.exports = router;
