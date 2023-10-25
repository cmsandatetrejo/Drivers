const { Router } = require("express");
const {getDrivers} = require("../controllers/getDrivers");

const router = Router();

router.get("/drivers", getDrivers);

module.exports = router;
