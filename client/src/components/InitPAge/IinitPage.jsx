import styles from "./InitPage.module.css";
import { getDrivers, getTeams } from "../../redux/actions";
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";

const InitPage = ({login}) => {
  const dispatch=useDispatch();
  const [dispatchExecuted, setDispatchExecuted]= useState(false);
  
  useEffect(()=>{    
    if(!dispatchExecuted){
      dispatch(getDrivers());
      dispatch(getTeams());
      setDispatchExecuted(true);
    }       
  },[dispatchExecuted, dispatch]);
  
  const handleOnclick=()=>{
      login(true);
    }

    return (
        <div className={styles.container}>
          <h1 className={styles.title} >WELCOME TO</h1>
          <h1 className={styles.title}>DRIVERS</h1>   
          <button className={styles.btn} onClick={handleOnclick}>ENTRAR</button> 
          <img className={styles.image} src="https://www.grandprix.com.au/uploads/images/_HomePageHeroPreviewImage/FOR_HOMEPAGE_Video_Static.jpg" alt="imagen de vehiculo"/>
        </div>
    )
}

export default InitPage;