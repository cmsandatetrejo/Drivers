import styles from './Cards.module.css';
import Card from '../Card/Card';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect, useState } from 'react';

const Cards=()=>{

  const allDrivers=useSelector(state=>state.allDrivers);
  
  const [driversToShow, setDriversToShow] = useState([]);
  const [page, setPage] = useState(0);
  const driversPerPage=9;
 
  const handlePrev=()=>{
    const prevPage=page-1;
    if(prevPage<0) return;
    const firstIndex=prevPage*driversPerPage;
    const lastIndex=firstIndex+driversPerPage;
    setDriversToShow([...allDrivers].slice(firstIndex, lastIndex));
    setPage(prevPage);
  };

  const handleNext=()=>{
    const totalDrivers = allDrivers.length;
    console.log("allDrivers",allDrivers.length);
    const nextPage = page+1;
    const firstIndex= nextPage*driversPerPage;
    const lastIndex= firstIndex+driversPerPage;
    if(firstIndex>totalDrivers) return;
    //console.log("firstIn:", firstIndex, " lastInd:",lastIndex )
    setDriversToShow([...allDrivers].slice(firstIndex, lastIndex));
    setPage(nextPage);
  };

  const handleSet=()=>{
    setDriversToShow(allDrivers.slice(0,driversPerPage));
    setPage(0);
  }

  useEffect(()=>{
    
    handleSet();
  },[allDrivers]);
  

    return (
      <div>
        <div className={styles.container2}>
          <h3 className={styles.h3}>Pag: {page}</h3>
          <div className={styles.buttonContainer}>
            <button className={styles.buttonL} onClick={handlePrev}>Prev</button>
            <button className={styles.buttonR} onClick={handleNext}>Next</button>
          </div>          
        </div>
        <div className={styles.container}>
        {
          driversToShow.length===0 ? (<p style={{color:'red'}}>Esperando...</p>) : (
            driversToShow.map(driver=>(
              <Card
                key={driver.id}
                id={driver.id}
                image={driver.image}
                forename={driver.forename}
                teams={driver.teams}
              />
            ))
          )
        }      
        
        </div>
      </div>
      
        
    );
}

export default Cards;