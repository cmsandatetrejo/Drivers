const {Router} = require("express");
const {getDrivers} = require("../controllers/getDrivers");
const getById= require("../controllers/getById");
const getByName= require("../controllers/getByName");
const postDriver= require("../controllers/postDriver");
const getTeams= require("../controllers/getTeams");
const getTeamsOfBd = require("../controllers/getTeamsOfBd");

const driversRouter=Router();
const {Team}= require("../db");

driversRouter.get("/teams", async (req,res)=>{
    try {
          const teamsCount= await Team.count();
          
          if(teamsCount === 0 ){
            const allTeams=await getTeams();
            res.status(200).send("The Teams was created succesfully in the BD");
          }
          else{
            const allTeams=await getTeamsOfBd();
            res.status(200).json(allTeams);
          }  
          
            
    } catch (error) {
       res.status(500).json({error: error.message}); 
    }
});

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
        //console.log("driver",driver);
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

driversRouter.post("/", async (req, res)=>{
    let creado;
    try {
        const newDriver=req.body;
        creado=await postDriver(newDriver);
        res.status(200).json(creado);

    } catch (error) {
        res.status(500).json({error: "Falta una o mas propiedades requeridas para crear el Driver "+error.message});
                
    }
});

module.exports= driversRouter;