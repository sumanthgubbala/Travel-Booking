const express = require("express");
const {
  createTour,
  updateTour,
  getAllTour,
  getTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} = require("../Controller/tourController");

const {verifyAdmin} = require("../utils/verifyToken");

const router = express.Router();

//create new tour
router.post("/",verifyAdmin, createTour);

router.put("/:id",verifyAdmin,  updateTour);

router.delete("/:id",verifyAdmin,  deleteTour);

router.get("/:id", getTour);

router.get("/", getAllTour);

router.get("/serach/tours", getTourBySearch);

router.get("/serach/tours/getfeatured", getFeaturedTour);

router.get("/serach/getTourCount", getTourCount);



module.exports = router;
