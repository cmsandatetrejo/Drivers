import styles from './Ordenamientos.module.css';
import { useDispatch, useSelector } from "react-redux";
import { ordenar } from "../../redux/actions";

const Ordenamientos=()=>{

  const orden=useSelector(state=>state.orden);
  const dispatch=useDispatch();

  const handleOrdenar=(event)=>{
    console.log(event.target.value);
    dispatch(ordenar(event.target.value));
  };

  return(
    <div className={styles.container}>
      <label htmlFor="ordenar">Ordenar por:</label>
        <select name="ordenar" value={orden.tipo} onChange={handleOrdenar}>
          <option value="">Select option</option>
          <option value="alfabetico">Orden alfabetico</option>
          <option value="año">Año de nacimiento</option>
        </select>
        <select name="ascDesc" value={orden.ascDesc} onChange={handleOrdenar} disabled={!orden.tipo}>
          <option value="">Select option</option>
          <option value="Ascendente">Ascendente</option>
          <option value="Descendente">Descendente</option>
        </select>
    </div>
  );
};

export default Ordenamientos;