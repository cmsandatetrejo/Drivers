const { Router } = require("express");
const driversRouter= require("../routes/driversRouter");
const teamRouter= require("../routes/teamRouter");

const router = Router();

router.use("/drivers", driversRouter);
//router.use("/team", teamRouter);

module.exports = router;
