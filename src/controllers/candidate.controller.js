const candidateService = require('../services/candidate.services');

const createUser = async (data) => {
  const user = await candidateService.createUser(data);
  return user;
};

const getCandidates = async ({ id, township }) => {
  if (payload.id) {
    return await candidateService.getCandidateById(payload.id);
  }

  const candidates = await candidateService.getCandidates(payload);
  return candidates;
};

const updateCandidate = async ({ id, data }) => {
  const candidate = await candidateService.updateCandidate(id, data);
  return candidate;
};

const deleteCandidate = async (id) => {
  await candidateService.deleteCandidate(id);
};

module.exports = {
  createUser,
  getCandidates,
  updateCandidate,
  deleteCandidate,
};
