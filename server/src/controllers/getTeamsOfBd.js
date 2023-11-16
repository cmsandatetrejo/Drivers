const {Team} = require("../db");

const getTeamsOfBd= async ()=>{
    const allTeams= await Team.findAll({
        attributes: ['name']
    });

    if(!allTeams) throw new Error("Problemas con la base de datos");

    const teamNames=allTeams.map(team=>team.name);
    return teamNames;
}

module.exports=getTeamsOfBd;