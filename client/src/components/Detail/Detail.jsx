import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const Detail = () => {
  const { detailId } = useParams();
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/drivers/${detailId}`);
        setData(response.data)
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [detailId]);

  return (
    
      <div className={styles.container}>
      {loading ? (
        <p style={{ color: "red" }}>esperando</p>
      ) : (
        <div className={styles.container2}>
          <h3>ID: {data.id}</h3>
          <h3>FORENAME: {data.forename}</h3>
          <h3>SURNAME: {data.surname}</h3>
          <h4>NATIONALITY: {data.nationality}</h4>
          <img src={data.image} alt="imagen de driver" className={styles.image}/>
          <p>DESCRIPTION: {data.description}</p>
          <h3>DATE OF BIRTHDAY: {data.dob}</h3>
          <h3>ESCUDERIAS: {data.teams}</h3>
        </div>        
      )}
    </div>
   
    
  );
};

export default Detail;