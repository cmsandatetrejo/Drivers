import styles from './Card.module.css';
import { Link } from 'react-router-dom';

const Card=({id, image, forename, teams})=>{
  let formatTeams='';
  if(teams){
    formatTeams=teams.split(',').join(', ');
  }
   
    

  return(
    <div className={styles.container}>
      <Link to={{pathname: `/detail/${id}`}}>
        <img className={styles.image} src={image} alt={forename}/>
        <h3 className={styles.forename}>{forename} </h3>
        <h3 className={styles.teams}>Teams: {formatTeams}</h3>
      </Link>      
    </div>
    
  );
}

export default Card;