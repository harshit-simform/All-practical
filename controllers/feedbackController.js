const {
  Types: { ObjectId },
} = require('mongoose');
const { feedbackModel: Feedback } = require('../models');

const validateData = require('../validation');

exports.createFeedback = async (req, res, next) => {
  req.body.userId = req.user._id;
  const [result, errorMessage] = validateData(req.body, 'feedback');
  try {
    if (!result) throw new Error(errorMessage);
    const newFeedback = await Feedback.create({
      userId: req.body.userId,
      message: req.body.message,
      category: req.body.category,
      rating: req.body.rating,
      createdAt: req.body.createdAt,
    });
    res.status(201).json({
      status: 'success',
      message: 'Feedback created successfully!',
      newFeedback,
    });
  } catch (err) {
    res.status(result === false ? 401 : 500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = '-createdAt',
      fields = '',
      ...other
    } = req.query;

    const searchFields = JSON.stringify(other).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const feedback = await Feedback.find(JSON.parse(searchFields))
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort.split(',').join(' '))
      .select(fields.split(',').join(' '));

    res.status(200).json({
      status: 'success',
      Total_Feedback: feedback.length,
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.userFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ userId: req.user._id });
    res.status(200).render('showFeedback', {
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.averageRating = async (req, res, next) => {
  try {
    const feedback = await Feedback.aggregate([
      { $match: { userId: new ObjectId(req.params.id) } },
      {
        $group: {
          _id: '$userId',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.categoryData = async (req, res, next) => {
  try {
    const feedback = await Feedback.aggregate([
      {
        $group: {
          _id: '$category',
          averageRating: { $avg: '$rating' },
          totalRating: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      feedback,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
