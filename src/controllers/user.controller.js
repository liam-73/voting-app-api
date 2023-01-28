const bcrypt = require('bcrypt');

const userService = require('../services/user.services');

const createUser = async (data) => {
  const user = await userService.createuser(data);
  return user;
};

const login = async ({ email, password }) => {
  const user = await userService.getUserByEmail(email);

  if (!user) throw new Error('User Not Found');

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Wrong Password!');

  const token = user.AuthToken();

  return { token, user };
};

const updateUser = async ({ id, payload }) => {
  const user = await userService.getuserByEmail(id);

  if (!user) throw new Error('User Not Found');

  return await userService.updateUser({ user, payload });
};

const deleteUser = async (id) => {
  const user = await userService.getUserById(id);

  if (!user) throw new Error('User Not Found');

  return await userService.deleteUser(id);
};

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
};
