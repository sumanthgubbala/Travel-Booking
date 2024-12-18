const Booking = require("../Models/Booking");

exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  
  try {
    const savedBooking = await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: savedBooking,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Error creating booking",
    });
    
  }
};


//get single booking
exports.getBooking = async (req, res) => {

    const id = req.params.id;

    try {
        const book = await Booking.findById(id);
        res.status(200).json({
            success: true,
            message: "Booking found",
            data: book
        })

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Booking not found",
        })

    }
}


exports.getALLBooking = async (req, res) => {

    const id = req.params.id;

    try {
        const bookings = await Booking.find({});
        res.status(200).json({
            success: true,
            message: "Booking found",
            data: bookings
        })

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Bookings not found",
        })

    }
}
