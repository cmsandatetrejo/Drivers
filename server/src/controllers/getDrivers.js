const axios=require("axios");
const URL="http://localhost:5000/drivers";
const defaultImageUrl="https://assets-global.website-files.com/5d816b07d269382588dbcab1/5f458a86a7975b7aea71412e_f1-logo-crit.jpg";
const {Driver,Team} = require("../db");

async function getDrivers(){
   
    const {data}=await axios(URL);
    if(!data) throw new Error("problemas con la api");

    const filteredArray=data.map((driver)=>{

        const imageUrl=driver.image.url!==""? driver.image.url : defaultImageUrl;

        return{
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: imageUrl,
            nationality: driver.nationality,
            dob: driver.dob,
            teams: driver.teams
        };
    });

    const driversDB=await Driver.findAll({
        include: Team,
    });
    const dataDriversDB=driversDB.map((driver)=>driver.toJSON());
    const driversFormated=dataDriversDB.map(driver=>{
        const teamsFormated=driver.Teams.map(team=>team.name);
            return {
                id: driver.id,
                forename: driver.forename,
                surname: driver.surname,
                description: driver.description,
                image: driver.image,
                nationality: driver.nationality,
                dob: driver.dob,
                teams: teamsFormated.join(', ')
            };
    }
    );
    
    const driverApiDB= driversFormated.concat(filteredArray);
    

    return driverApiDB;
}

module.exports={
    getDrivers,
};