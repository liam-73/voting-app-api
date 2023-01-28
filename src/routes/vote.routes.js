const express = require('express');
const mongoose = require('mongoose');

const router = new express.Router();

const Candidate = require('../models/candidate.model');

router.get('/results/:id', async (req, res) => {
  try {
    const candidate = await Candidate.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $project: {
          _id: 0,
          name: 1,
          age: 1,
          township: 1,
          totalVotes: { $size: '$voters' },
        },
      },
    ]);

    if (!candidate) return res.status(404).send();

    res.send(candidate);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/results', async (req, res) => {
  const township = req.body.township;
  console.log(township);
  const candidates = await Candidate.aggregate([
    { $match: { township: township } },
    {
      $project: {
        _id: 0,
        name: 1,
        age: 1,
        township: 1,
        totalVotes: { $size: '$voters' },
      },
    },
  ]);

  try {
    res.send(candidates);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
