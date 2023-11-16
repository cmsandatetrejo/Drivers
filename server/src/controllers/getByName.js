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

     
     /*const driverDB=await Driver.findAll({
        where: {
            forename: {
                [Op.iLike]: `%${nameToFind}%`
            }
        },
        include: Team
     }); 

    const driverData=driverDB.map(driver=>{
        const plainDriver=driver.get({plain:true});
        const arrayTeam=plainDriver.Teams.map(team=>
            team.name);
        plainDriver.Teams=arrayTeam.join(", ");
        
        return plainDriver;    
    });
    
    const combinedDrivers= driverData.concat(filteredDrivers).slice(0,15);
     console.log(combinedDrivers.length);*/
    return filteredDrivers;    
   
}

module.exports=getByName;