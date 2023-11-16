const axios= require("axios");
const URL="http://localhost:5000/drivers";
const {Team}= require("../db");

async function getTeams(){
    

    const {data}= await axios(URL);
    if(!data)throw new Error("Problemas con la Api al obtener los Teams");
    
    const allTeams=[];
    data.map(driver=>{
        if(driver.teams){
          const teams= driver.teams.split(",");
          if(teams){
            teams.map(team=>{
              if(!allTeams.includes(team.trim())) allTeams.push(team.trim());  
            })
          } 
          ;
        }
    });

    allTeams.map(equipo=>{
      Team.create({
          name: equipo
      })  
    });
    
    return allTeams;
}

module.exports=getTeams;

