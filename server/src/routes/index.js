const { Router } = require("express");
const driversRouter= require("../routes/driversRouter");

const router = Router();

router.use("/drivers", driversRouter);
//router.use("/team", teamRouter);

module.exports = router;
