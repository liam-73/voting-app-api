const userModel = require('../models/user.model');

const createUser = async (data) => {
  return await userModel.create(data);
};

const getUserByEmail = async (email) => {
  return await userModel.findOne(email);
};

const getUserById = async (id) => {
  return await userModel.findById(id);
};

const updateUser = async ({ user, payload }) => {
  const updates = Object.keys(payload);
  updates.forEach((update) => (user[update] = payload[update]));
  await user.save();
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
};
