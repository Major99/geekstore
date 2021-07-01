const express = require("express");
const router = express.Router();

const {
  createActivity,
  getAllActivities
} = require("../controllers/activity");

const { requireSignin, adminMiddleware } = require("../controllers/auth");

const { createActivityValidator } = require('../validators/activity');
const { runValidation } = require('../validators/index')


//CREATE ACTIVITY ROUTE
router.post("/activity/create", createActivityValidator, runValidation,requireSignin, createActivity);

//GET ALL ACTIVITY ROUTE
router.get("/activities", getAllActivities);

module.exports = router;
