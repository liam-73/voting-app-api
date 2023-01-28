const Joi = require('joi');

const candidateController = require('../controllers/candidate.controller');

const createUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().optional(),
    township: Joi.string().required(),
    party: Joi.string().optional(),
    avatar_url: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });

  try {
    const candidate = await userController.createUser({ ...req.body });

    return res.json(candidate);
  } catch (e) {
    return res.status(500).send({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await candidateController.getCandidates({
      township: req.params.township,
      id: req.params.id,
    });

    res.json(candidates);
  } catch (e) {
    if (e.message === 'Candidate Not Found') {
      return res.status(404).json({
        error: {
          code: 404,
          message: e.message,
        },
      });
    }

    res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
};

const updateCandidate = async (req, res) => {
  const schema = Joi.object({
    params: { id: Joi.string() },
    body: {
      name: Joi.string().optional(),
      age: Joi.number().optional(),
      township: Joi.string().optional(),
      party: Joi.string().optional(),
    },
  });

  const { value, error } = schema.validate(req);

  if (error)
    return res.status(400).json({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });
  try {
    const candidate = await candidateController.updateCandidate({
      id,
      data: req.body,
    });

    return res.json(candidate);
  } catch (e) {
    if (e.message === 'Candidate Not Found') {
      return res.status(404).json({
        error: {
          code: 404,
          message: e.message,
        },
      });
    }

    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
};

const deleteCandidate = async (req, res) => {
  const schema = Joi.object({
    params: { id: Joi.string().required() },
  });

  const { value, error } = schema.validate(req);

  try {
    await candidateController.deleteCandidate(id);

    res.status(200).end();
  } catch (e) {
    if (e.message === 'Candidate Not Found') {
      return res.status(404).json({
        error: {
          code: 404,
          message: e.message,
        },
      });
    }

    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
};

module.exports = {
  createUser,
  getCandidates,
  updateCandidate,
  deleteCandidate,
};
