import styles from './Filtros.module.css';
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { filtroByOrigin, filtroByTeam, setSelectedOrigin, setSelectedTeam } from "../../redux/actions";


const Filtros=()=>{

  const selectedOrigin=useSelector(state=>state.selectedOrigin);
  const selectedTeam=useSelector(state=>state.selectedTeam);
  const allTeams=useSelector(state=>state.allTeams);
  const dispatch=useDispatch();
  const sortedTeams=allTeams.sort((a, b) => a.localeCompare(b));

  const handleTeamChange=(event)=>{
    dispatch(setSelectedTeam(event.target.value));     
    dispatch(filtroByTeam(event.target.value));    
  };

  const handleOriginChange=(event)=>{
    dispatch(setSelectedOrigin(event.target.value));
    dispatch(filtroByOrigin(event.target.value));
  };

    return(
      <div className={styles.container}>
        <div>
          <label htmlFor="teams">Filtrar por team:</label>
            <select name="teams" value={selectedTeam} onChange={handleTeamChange}>
              <option value="">Select a team</option> 
              {
                Array.isArray(sortedTeams)&&sortedTeams.map((team,index)=>(
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))
              }   
            </select>          
        </div>
        <div>
          <label htmlFor="origin">Filtrar por origen:</label>
          <select name="origin" value={selectedOrigin} onChange={handleOriginChange}>
            <option value="">Select Origin</option>
            <option value="API">API</option>
            <option value="Base de datos">Base de Datos</option>
          </select>        
        </div>
        
      </div>
      
    );

}

export default Filtros;

