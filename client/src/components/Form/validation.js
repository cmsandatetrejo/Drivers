const validation=(driverData)=>{
  let error={};
  const regex = /^[a-zA-Z\s]+$/;
  
  if(driverData.forename.trim()!=="" && !regex.test(driverData.forename)){
    error.forename="el nombre no debe contener numeros ni simbolos";
  }
  if(driverData.surname.trim()!=="" && !regex.test(driverData.surname)){
    error.surname="el apellido no debe contener numeros ni simbolos";
  }
  if(driverData.nationality.trim()!=="" && !regex.test(driverData.nationality)){
    error.nationality="la nacionalidad no debe contener numeros ni simbolos";
  }
  if(driverData.dob.trim()!==""){
    const dobDiv=driverData.dob.split("-");
    const dob= new Date(dobDiv[0], dobDiv[1]-1, dobDiv[2]);
    dob.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if(dob >= currentDate) error.dob="Fecha de nacimiento no valida";   
  }
  return error;
}

export default validation;