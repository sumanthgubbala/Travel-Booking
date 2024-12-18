const Tour = require("../Models/Tour.js");

//create new tour
exports.createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create try again",
    });
  }
};

//update the tour
exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update try again",
    });
  }
};

//delete a tour
exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete try again",
    });
  }
};

//get single tour
exports.getTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate('reviews');
    res.status(200).json({
      success: true,
      message: "Successfully found tour",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get all tour
exports.getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({}).populate('reviews')
      .skip(page * 5)
      .limit(5);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully found all tours",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to find all tours",
    });
  }
};

//get tour by search
exports.getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i"); // i means case insensitive
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    //gte means greater than equal
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');
    res.status(200).json({
      success: true,
      message: "Successfully found all tours",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to found all tours",
    });
  }
};

exports.getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
    res.status(200).json({
      success: true,
      message: "Successfully found all tours",
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to find all tours",
    });
  }
};

exports.getTourCount = async (req, res) => {
    try{
        const tourcount = await Tour.estimatedDocumentCount()
        res.status(200).json({
            success:true,
            message:"Successfully found all tours",
            data: tourcount
        })
    }catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to fetch all tours",
        })

    }
}
