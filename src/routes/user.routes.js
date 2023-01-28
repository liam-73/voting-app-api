const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userHandler = require('../handlers/user.handler');

// middleware
const authenticator = require('../middlewares/authenticator.middleware');

const router = new express.Router();

router.post('/', userHandler.createUser);

router.post('/login', userHandler.login);

router.get('/profile', authenticator, userHandler.getProfile);

router.patch('/:id', authenticator, userHandler.updateUser);

router.delete('/:id', authenticator, userHandler.deleteUser);

router.post('/voting/:id', authenticator, userHandler.voteCandidate);

router.post('/voting/:id', auth, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) return res.status(404).send();

    const township = candidate.township;

    if (candidate.township !== req.voter.township)
      return res.status(400).send({
        error: 'You can only vote for candidates from your township!',
      });

    const voterId = req.voter._id;

    if (candidate.voters.includes({ _id: voterId }))
      return res.status(400).send({ error: 'You can only vote once!' });

    candidate.voters = candidate.voters.concat({ _id: voterId });

    await candidate.save();
    res.send({ message: 'Voting Succeeded!' });
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/voters', async (req, res) => {
  try {
    const voters = await Voter.find({});

    res.send(voters);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
