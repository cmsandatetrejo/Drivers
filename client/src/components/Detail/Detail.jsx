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
    <div>
      {loading ? (
        <p style={{ color: "red" }}>esperando</p>
      ) : (
        <div>
          <h2>ID: {data.id}</h2>
          <h2>FORENAME: {data.forename}</h2>
          <h2>SURNAME: {data.surname}</h2>
          <h2>NATIONALITY: {data.nationality}</h2>
          <img src={data.image} alt="imagen de driver"/>
          <h2>DESCRIPTION: {data.description}</h2>
          <h2>DATE OF BIRTHDAY: {data.dob}</h2>
          <h2>ESCUDERIAS: {data.teams}</h2>

        </div>
        
      )}
    </div>
  );
};

export default Detail;