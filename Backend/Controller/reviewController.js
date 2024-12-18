const Tour = require("../Models/Tour.js");
const Review = require("../Models/Review.js");

exports.createReview =async (req,res)=>{
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body });
    
    try {
        const savedReview = await newReview.save();
        //after the review has been saved we need to update the reviews array of the tour
        await Tour.findByIdAndUpdate(tourId,{
            $push:{
                reviews:savedReview._id
            }
        })
        res.status(201).json({ 
            success:true,
            message: "Review created successfully" ,
            data: savedReview
        });
        
    }catch(err){
        res.status(400).json({
            success:false,
            message:"Couldn't save review"
        })

    }
}