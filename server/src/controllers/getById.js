const axios=require("axios");
const URL="http://localhost:5000/drivers"

const getById= async(idDriver)=>{
    console.log(URL+`/${idDriver}`);
    const {data}= await axios(URL+`/${idDriver}`);
    if(!data) throw new Error("no existe driver con ese id"); 
    
    return {
        forename: data.name.forename,
        surname: data.name.surname,
        description: data.description,
        image: data.image.url,
        nationality: data.nationality,
        dob: data.dob,
    };
    
}

module.exports=getById;