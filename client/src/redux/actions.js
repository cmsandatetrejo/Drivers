import axios from 'axios';
import {FILTRO_ORIGIN, FILTRO_TEAM, GET_BYNAME, GET_DRIVERS, GET_TEAMS, ORDENAR, POST_DRIVER, RESET_DRIVERS, RESET_SELECTEDTEAM, SET_SELECTEDORIGIN, SET_SELECTEDTEAM} from './actions-types';

export const getDrivers=()=>{
  
  return async (dispatch) => {
    try {
      
      const response=await axios.get("http://localhost:3001/drivers");
      
      const {data}= response;
      
      if(!data.length) throw Error("No se encontraron Drivers");

      return dispatch({
        type: GET_DRIVERS,
        payload: data,
      });
    } catch (error) {
        console.log(error.message);      
    }
  };
}

export const getTeams=()=>{
  
  return async (dispatch) => {
    try {
      
      const response=await axios.get("http://localhost:3001/drivers/teams");
      
      const {data}= response;
      
      if(!data.length) throw Error("No se encontraron Teams");

      return dispatch({
        type: GET_TEAMS,
        payload: data,
      });
    } catch (error) {
        console.log(error.message);      
    }
  };
}

export const postDriver=(driver)=>{
  return async (dispatch) => {
    try {
      
      const response=await axios.post("http://localhost:3001/drivers", driver);
      
      const {data}= response;
      
      if(!data) throw Error("No se pudo guardar el Driver");

      return dispatch({
        type: POST_DRIVER,
        payload: data,
      });
    } catch (error) {
        console.log(error.message);      
    }
  };

}

export const getByName=(name)=>{
  return async (dispatch) => {
    try {
      
      const response=await axios.get("http://localhost:3001/drivers/name", {
        params: {
          forename: name,
        },
      });
      
      const {data}= response;
      console.log("enActions", data);

      if(!data.length) throw Error("No se encontraron coincidencias");

      return dispatch({
        type: GET_BYNAME,
        payload: data,
      });
    } catch (error) {
        console.log(error.message);      
    }
  };
};

export const filtroByTeam=(team)=>{
  
  return (dispatch, getState)=> {
    const { allDrivers} =getState();
    
    const filteredDrivers=allDrivers.filter((driver)=>{
      if(driver.teams){
        const teamsArray=driver.teams.split(", ");
        return teamsArray.includes(team);
      }
      return false;
    });
    
    dispatch({
      type: FILTRO_TEAM,
      payload: filteredDrivers,
    });
  };
  
};

export const resetDrivers=()=>{
  return (dispatch)=>{

    dispatch({
      type: RESET_DRIVERS,
      
    });
  }
};

export const setSelectedTeam=(team)=>{
  return (dispatch)=>{
    dispatch({
      type: SET_SELECTEDTEAM,
      payload: team,
    });
  }};

export const resetSelectedTeam=()=>{
  return (dispatch)=>{
    dispatch({
      type: RESET_SELECTEDTEAM,
      
    });
  };
};  

export const filtroByOrigin=(origin)=>{
  return (dispatch, getState)=>{
    const {allDrivers} = getState();
    let filteredDrivers =[];
    console.log("origin en actions",origin);
    if(origin==="API"){
      filteredDrivers=allDrivers.filter((driver)=>!isNaN(driver.id));
    } else if(origin === "Base de datos") {
        filteredDrivers = allDrivers.filter((driver)=> isNaN(driver.id));
    }
    
    dispatch({
      type: FILTRO_ORIGIN,
      payload: filteredDrivers,
    });
  };
};

export const setSelectedOrigin=(origin)=>{
  return (dispatch)=>{
    dispatch({
      type: SET_SELECTEDORIGIN,      
      payload: origin,
    });
  };
};

export const ordenar=(ordenar)=>{
  return (dispatch, getState)=>{
    const {allDrivers, orden}=getState();
    console.log("que tiene orden",orden.tipo);
    let ordenobj={};
    let driversOrdenados=[];
    if(ordenar==="alfabetico"){
      driversOrdenados= [...allDrivers].sort((a,b)=>a.forename.localeCompare(b.forename));
      ordenobj={
        opcion1: "tipo",
        tipo: "alfabetico",       
      }
    }else if(ordenar==="año"){
      driversOrdenados = [...allDrivers].sort((a, b) =>{
        const dateA=new Date(a.dob);
        const dateB=new Date(b.dob);
        return dateA-dateB;
      }); 
      ordenobj={
        opcion1: "tipo",
        tipo: "año",
      }
    }
    if(ordenar==="Ascendente"&&orden.tipo==="alfabetico"){
      driversOrdenados= [...allDrivers].sort((a,b)=>a.forename.localeCompare(b.forename));
      ordenobj={
        opcion1: "ascDesc",
        tipo: "Ascendente",       
      }
    }else if(ordenar==="Ascendente"&&orden.tipo==="año"){
        driversOrdenados = [...allDrivers].sort((a, b) =>{
        const dateA=new Date(a.dob);
        const dateB=new Date(b.dob);
        return dateA-dateB;
      }); 
      ordenobj={
        opcion1: "ascDesc",
        tipo: "Ascendente",
      }
    }else if(ordenar==="Descendente"&&orden.tipo==="alfabetico"){
            driversOrdenados = [...allDrivers].sort((a, b) =>
            b.forename.localeCompare(a.forename)
          );
          ordenobj = {
            opcion1: "ascDesc",
            tipo: "Descendente",
          };
        }else if(ordenar==="Descendente"&&orden.tipo==="año"){
                driversOrdenados = [...allDrivers].sort((a, b) => {
                  const dateA = new Date(a.dob);
                  const dateB = new Date(b.dob);
                  return dateB - dateA;
                });
                ordenobj = {
                  opcion1: "ascDesc",
                  tipo: "Descendente",
                };
              }

    dispatch({
      type: ORDENAR,
      payload: {driversOrdenados,ordenobj}
    });
  };
};