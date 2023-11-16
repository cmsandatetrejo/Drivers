const {Driver,Team, sequelize}=require("../db");

const postDriver=async (newDriver)=>{
    
    const createDriver = await Driver.create(newDriver);

   if (newDriver.teams && Array.isArray(newDriver.teams)) {
      for (const teamName of newDriver.teams) {
      const team = await Team.findOne({ where: { name: teamName } });
      if (team) {
          await createDriver.addTeam(team);
          }
          }
    }
    
    if(!createDriver) throw new Error("problemas con la BD");

    const driverWithTeams = await Driver.findByPk(createDriver.id,{
      include: Team
    });

    const driverData= driverWithTeams.toJSON();
    const teams= driverData.Teams.map((team)=> team.name).join(", ");

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
}

module.exports= postDriver

