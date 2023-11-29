const axios=require("axios");
const URL="http://localhost:5000/drivers";
const {getDrivers}=require("../controllers/getDrivers");
const {Driver, Team} = require("../db");
const {Op}=require("sequelize");

async function getByName(forename){
    
    const nameToFind=forename.toLowerCase();
    const allDrivers= await getDrivers();
    if(!allDrivers)throw new Error("Problemas con la Api");

    const filteredDrivers = allDrivers.filter((driver)=>{
        return driver.forename.toLowerCase().includes(nameToFind);
     }).slice(0, 15);

     
    
    return filteredDrivers;    
   
}

module.exports=getByName;