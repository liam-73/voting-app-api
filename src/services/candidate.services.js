const CandidateModel = require('../models/candidate.model');

const createUser = async (data) => {
  return await CandidateModel.create(data);
};

const getCandidates = async ({ township }) => {
  if (township) return await CandidateModel.find(township);
  else if (id) return await CandidateModel.findById(id);

  return await CandidateModel.find();
};

const getCandidateById = async (id) => {
  const candidate = await CandidateModel.findById(id);

  if (!candidate) throw new Error('Candidate Not Found');

  return candidate;
};

const updateCandidate = async ({ id, data }) => {
  const candidate = await CandidateModel.findById(id);

  if (!candidate) throw new Error('Candidate Not Found');

  const updates = Object.keys(data);
  updates.forEach((update) => (candidate[update] = req.body[update]));

  return await candidate.save();
};

const deleteCandidate = async (id) => {
  const candidate = await CandidateModel.findByIdAndDelete(id);

  if (!candidate) throw new Error('Candidate Not Found');

  return;
};

module.exports = {
  createUser,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
};
