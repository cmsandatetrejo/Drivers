import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Filtros from "../Filtros/Filtros";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetDrivers } from "../../redux/actions";
import Ordenamientos from "../Ordenamientos/Ordenamientos";

const NavBar=()=>{
  const location= useLocation();
  const dispatch=useDispatch();

  const handleReset=()=>{
    console.log("vamos a resetear");
    dispatch(resetDrivers());
  };

  return(
    <div className={styles.container}>
      <Link to={"/home"}>
        <button className={styles.btn}>Home</button>
      </Link>
      {location.pathname==="/home" &&(
        <>
          <Link to={"home/form"}>
            <button className={styles.btn}>Creat Driver</button>
          </Link>
          <SearchBar/>
          <Filtros/>
          <Ordenamientos/>
          <button onClick={handleReset} className={styles.btn}>Show All</button>
        </>        
      )}      
    </div>
  );
};

export default NavBar;