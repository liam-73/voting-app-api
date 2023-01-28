const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  township: {
    type: String,
    required: true,
  },
  votedCandidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
  },
});

userSchema.pre('save', async function (next) {
  user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.AuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  await user.save();
  return token;
};

module.exports = mongoose.model('User', userSchema);
