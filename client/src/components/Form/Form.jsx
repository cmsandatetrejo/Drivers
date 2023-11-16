import { useSelector } from "react-redux";
import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTeams, postDriver } from "../../redux/actions";
import validation from "./validation";

const Form=()=>{
  
  const dispatch=useDispatch();
  const allTeams=useSelector(state=>state.allTeams);
  
  const [errors,setErrors]=useState({});
  const [selectedTeam,setSelectedTeam]=useState("");
  const [driverData, setDriverData]= useState({
    
    forename: "",
    surname: "",
    nationality: "",
    image: "",
    dob: "",
    description: "",
    teams: [],
  });

  console.log("tieneError",Object.keys(errors).length !== 0);

  const handleChange=(event)=>{
    setDriverData({
      ...driverData,
      [event.target.name]: event.target.value, 
    });    
    
    const objError=validation({
      ...driverData,
      [event.target.name]: event.target.value
    });
    setErrors(objError);
    
  };

  const handleSelectedChange=(event)=>{
    setSelectedTeam(event.target.value);
    if(!(driverData.teams.includes(event.target.value))){
      setDriverData({
        ...driverData,
        teams: [...driverData.teams, event.target.value]
      });
    }
    
  };

  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(postDriver(driverData)); 
    setDriverData({
      forename: "",
      surname: "",
      nationality: "",
      image: "",
      dob: "",
      description: "",
      teams: [],
    }); 
  };
  
  return(
    <form className={styles.containerForm} onSubmit={handleSubmit}>
      <h2 style={{color:"red"}}>Introduce los campos para crear un nuevo driver</h2>
        <div className={styles.forenameSurname}>
        
        <label htmlFor="forename">FORENAME:</label>
        <input type="text" name="forename" value={driverData.forename} onChange={handleChange}/>
        {errors.forename && <p>{errors.forename}</p>}
        <label htmlFor="surname">SURNAME:</label>
        <input type="text" name="surname" value={driverData.surname} onChange={handleChange}/>
        {errors.surname && <p>{errors.surname}</p>}
      </div>
      
      <div className={styles.containerInt}>
        <label htmlFor="nationality">NATIONALITY</label>
        <input type="text" name="nationality" value={driverData.nationality} onChange={handleChange}/>
        {errors.nationality && <p>{errors.nationality}</p>}

        <label htmlFor="image">IMAGE</label>
        <input type="url" name="image" value={driverData.image} onChange={handleChange}/>

        <label htmlFor="dob">DATE OF BIRTHDAY</label>
        <input type="date" name="dob" value={driverData.dob} onChange={handleChange}/>
        {errors.dob && <p>{errors.dob}</p>}

        <label htmlFor="description">DESCRIPTION</label>
        <input type="text" name="description" value={driverData.description} onChange={handleChange}/>

        <label htmlFor="teams">Teams</label>
        <select name="teams" value={selectedTeam} onChange={handleSelectedChange}>
          <option value="">Select a team</option>
          {
            Array.isArray(allTeams)&&allTeams.map((team, index)=>(
              <option key={index} value={team}>
                {team}
              </option>
            ))
          }
        </select>
      </div>     
      <button disabled={Object.keys(errors).length !== 0 || Object.values(driverData).some(value=>value==='') || selectedTeam === ''}>CREATE DRIVER</button>    
      
    </form>
  );    
};

export default Form;