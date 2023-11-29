import { FILTRO_ORIGIN, FILTRO_TEAM, GET_BYNAME, GET_DRIVERS, GET_TEAMS, ORDENAR, POST_DRIVER, RESET_DRIVERS, RESET_SELECTEDTEAM, SET_SELECTEDORIGIN, SET_SELECTEDTEAM } from "./actions-types";

const initialState = {
    backUpDrivers: [],
    allDrivers:[],
    allTeams:[],
    selectedTeam: "",
    selectedOrigin: "",
    orden: {
      tipo: "",
      ascDesc: "",   
    }
}

const reducer=(state=initialState, {type, payload})=>{

  switch(type){
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: payload,
        backUpDrivers: payload,
      }
    case GET_BYNAME:
      return {
        ...state,
        allDrivers: payload
      }  
    case GET_TEAMS:
      return {
        ...state,
        allTeams: payload
      }  
    case POST_DRIVER:
      alert("Driver creado");
      return {
        ...state,
        allDrivers: [payload, ...state.allDrivers],
        backUpDrivers: [payload, ...state.backUpDrivers]
      }  
    case FILTRO_TEAM:
      return{
        ...state,
        allDrivers: payload,
        selectedOrigin: "",        
      }
    case RESET_DRIVERS:
      return{
        ...state,
        allDrivers: state.backUpDrivers,
        selectedTeam: "",
        selectedOrigin: "",
        orden: {
          tipo: "",
          ascDesc: "",   
        }
      }    
    case SET_SELECTEDTEAM:
      return{
        ...state,
        selectedTeam: payload,
      }
    case RESET_SELECTEDTEAM:
      return{
        ...state,
        selectedTeam: "",
      }
    case FILTRO_ORIGIN:
      return{
        ...state,
        allDrivers: payload,
        selectedTeam: "",
      }      
    case SET_SELECTEDORIGIN:
      return{
        ...state,
        selectedOrigin: payload,
      }  
    case ORDENAR:
      return{
        ...state,
        allDrivers: payload.driversOrdenados,
        orden: {
          ...state.orden,
          [payload.ordenobj.opcion1]: payload.ordenobj.tipo
        }
      }  
    default:
      return{...state}  
  }
}

export default reducer;