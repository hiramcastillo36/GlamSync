const Review = require('../models/Review');

class ReviewRepository {
    async create(reviewData) {
        const review = new Review(reviewData);
        return await review.save();
    }

    async getAll() {
        return await Review.find({ isActive: true });
    }

    async getById(id) {
        return await Review.findById(id);
    }

    async update(id, reviewData) {
        return await Review.findByIdAndUpdate(id, reviewData, { new: true });
    }

    async delete(id) {
        return await Review.findByIdAndDelete(id);
    }
}

module.exports = {
    ReviewRepository
};
