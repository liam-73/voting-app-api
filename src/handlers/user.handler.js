const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const userController = require('../controllers/user.controller');

const createUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.string().required(),
    age: Joi.number().min(18).required(),
    township: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      error: { code: 400, message: error.details[0].message },
    });

  try {
    const user = await userController.createUser(value);

    res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ error: { code: 400, message: e.message } });
  }
};

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.email().required(),
    password: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);

  if (error)
    return res.status(400).json({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });

  try {
    const { token, user } = await userController.login(value);

    return res.json({ token, user });
  } catch (e) {
    if (e.message === 'User Not Found') {
      return res.status(404).json({
        error: {
          code: 404,
          message: e.message,
        },
      });
    } else if (e.message === 'Wrong Password!') {
      return res.status(400).json({
        error: {
          code: 400,
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

const getProfile = (req, res) => {
  res.send(req.user);
};

const updateUser = async (req, res) => {
  const schema = Joi.object({
    params: { id: Joi.objectid() },
    body: {
      name: Joi.string().optional(),
      email: Joi.email().optional(),
      password: Joi.string().optional(),
      age: Joi.number().min(18).optional(),
      township: Joi.string().optional(),
    }.min(1),
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
    const user = await userController.updateUser({
      id: req.params.id,
      payload: req.body,
    });
  } catch (e) {
    if (e.message === 'User Not Found') {
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

const deleteUser = async (req, res) => {
  const schema = Joi.object({
    id: Joi.objectid(),
  });

  const { value, error } = schema.validate(req.params);

  if (error)
    return res.status(400).json({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });

  try {
    await userController.deleteUser(id);

    res.status(200).end();
  } catch (e) {
    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
};

const voteCandidate = async (req, res) => {
  const schema = Joi.object({
    id: Joi.objectid().required(),
  });

  const { value, error } = schema.validate(req.params);

  if (error)
    return res.status(400).json({
      error: {
        code: 400,
        message: error.details[0].message,
      },
    });

  try {
    await userController.voteCandidate(value.id);

    res.status(200).end();
  } catch (e) {}
};

module.exports = {
  createUser,
  login,
  getProfile,
  updateUser,
  deleteUser,
};
