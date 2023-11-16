const axios=require("axios");
const URL="http://localhost:5000/drivers";
const {Driver,Team} = require("../db");

const getById= async(idDriver)=>{
    //console.log(URL+`/${idDriver}`);

    if(!isNaN(idDriver))
    {
        const {data}= await axios(URL+`/${idDriver}`);
        if(!data) throw new Error("No existe driver con ese id"); 
        
        return {
            id: data.id,
            forename: data.name.forename,
            surname: data.name.surname,
            description: data.description,
            image: data.image.url,
            nationality: data.nationality,
            dob: data.dob,
            teams: data.teams
        };
    }
    
    const driverDb = await Driver.findByPk(idDriver,{
      include: Team
    });

    if(!driverDb) throw new Error("No existe un Driver con ese ID");

    const driverData= driverDb.toJSON();
    const teams= driverData.Teams.map((team)=> team.name).join(', ');

    return {
      id: driverData.id,
      forename: driverData.forename,
      surname: driverData.surname,
      description: driverData.description,
      image: driverData.image,
      nationality: driverData.nationality,
      dob: driverData.dob,
      teams: teams
    };

    //console.log("DDDriver:", driverDb.dataValues.Teams[0].dataValues.name);
}

module.exports=getById;

//driverDb.dataValues.Teams[0].dataValues.name (esto es para poder acceder a la string de teams)