const Review  = require('../models/review');
const Book = require("../models/book");
const User = require("../models/user");

const page_limit = 5;

function validateReviewForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.content !== 'string' || payload.content.trim().length < 3) {
        isFormValid = false;
        errors.content = 'Review must be more than 3 symbols long.';
    }

    return {
        success: isFormValid,
        errors
    };
}

exports.getReviews  = (req, res) => {
        let bookId = req.params.bookId;
        Review
            .find({ book: bookId })
            .populate({ path: 'user', select: 'username' })
            .sort({ creationDate: -1 })
            .limit(page_limit)
            .then((reviews) => {
                res.status(200).json({
                    message: '',
                    data: reviews
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    }

exports.addReview = (req, res) => {
        let bookId = req.params.bookId;
        let userId = req.user._id;
        let review = req.body.content;

        let validationResult = validateReviewForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Review form validation failed!',
                errors: validationResult.errors
            });
        }

        User.findById(userId).then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Sorry, but you\'re not allowed to review on books'
                });
            }

            Book.findById(bookId).then((book) => {
                if (!book) {
                    return res.status(400).json({
                        message: 'There is no book with the given id in our database.'
                    });
                }

                Review.create({ content: review }).then((newReview) => {
                    console.log(book);
                    book.reviews.push(newReview._id);
                    newReview.book = book._id;
                    newReview.user = userId;
                    user.reviewsCount += 1;

                    user.save();
                    book.save();
                    newReview.save().then(() => {
                        Review
                            .findById(newReview._id)
                            .populate({ path: 'user', select: 'username' })
                            .then((review) => {
                                return res.status(200).json({
                                    message: 'Review posted successfully!',
                                    data: review
                                });
                            });
                    });
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong, please try again.'
                    });
                });
            });
        });
    }


exports.deleteReview = (req, res) => {
        let reviewId = req.params.reviewId;
        let userId = req.user._id;

        Review.findById(reviewId).then((review) => {
            if (!review) {
                return res.status(400).json({
                    message: 'There is no review with the given id in our database.'
                });
            }

            if (review.user.toString() !== userId) {
                return res.status(401).json({
                    message: 'You\'re not allowed to delete other user review!'
                });
            }

            Review.findByIdAndRemove(review._id).then(() => {
                Book.updateOne({ _id: review.book }, { $pull: { reviews: review._id } }).then(() => {
                    User.findById(req.user._id).then((user) => {
                        user.save();
                        return res.status(200).json({
                            message: 'Review deleted successfully!'
                        });
                    });
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    }