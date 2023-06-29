const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
feedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-__v -role -password',
  });
  next();
});

const Feedback = mongoose.model('Feedbacks', feedbackSchema);
module.exports = Feedback;
