const {Router} = require("express");
const {getDrivers} = require("../controllers/getDrivers");
const getById= require("../controllers/getById");
const getByName= require("../controllers/getByName");
const driversRouter=Router();

driversRouter.get("/name", async (req,res)=>{
    
    try {
        const { forename } = req.query;
        
        const matchesArray = await getByName(forename);
        res.status(200).json(matchesArray);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

driversRouter.get("/:idDriver", async (req,res)=>{
    try {
        const {idDriver}=req.params;
        const driver= await getById(idDriver);
        console.log("driver",driver);
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

driversRouter.get("/", async (req,res)=>{
    try {
        const allDrivers= await getDrivers();
        res.status(200).json(allDrivers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
});




module.exports= driversRouter;