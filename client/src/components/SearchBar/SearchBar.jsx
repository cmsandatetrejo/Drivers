import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';


const SearchBar=()=>{
  const dispatch=useDispatch();
  const [serchValue, setSearchValue] = useState('Buscar por nombre');
  //console.log(serchValue);
  
  const handleInputChange=(event)=>{
    setSearchValue(event.target.value);
  };

  const handleSearch = () =>{
    dispatch(getByName(serchValue));
  };

  const handleInputFocus=()=>{
    if(serchValue==='Buscar por nombre'){
      setSearchValue('');
    }
  };

  const handleInputBlur=()=>{
    if(setSearchValue===''){
      setSearchValue('Buscar por nombre')
    }
  };

    return (
        <div className={styles.container}>
          <input type="search" name="search" id="search"  value={serchValue} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur}/>
          <button onClick={handleSearch} className={styles.btn}> Buscar </button>    
        </div>
    );
}

export default SearchBar;