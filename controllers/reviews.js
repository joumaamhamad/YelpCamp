const Review = require('../models/review');
const Campground = require('../models/campground');

module.exports.createReview = async (req , res , next) => {

    try{

        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)

    }catch(e){
        next(e);
    }
}

module.exports.deleteReview = async (req , res , next) => {

    try{

        const { id , reviewId } = req.params;
        await Campground.findByIdAndUpdate(id , { $pull: { reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId);
        res.redirect(`/campgrounds/${id}`)

    }
    catch(e){
        next(e);
    }

}