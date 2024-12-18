const User = require("../Models/User.js");

//create new User
exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create try again",
    });
  }
};

//update the User
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update try again",
    });
  }
};

//delete a User
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
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

//get single User
exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully found User",
      data: User,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//get all User
exports.getAllUser = async (req, res) => {
  
  try {
    const Users = await User.find({})
    res.status(200).json({
      success: true,
      message: "Successfully found all Users",
      data: Users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to find all Users",
    });
  }
};