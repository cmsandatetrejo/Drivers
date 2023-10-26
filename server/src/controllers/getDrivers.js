const axios=require("axios");
const URL="http://localhost:5000/drivers";
const defaultImageUrl="https://i.ytimg.com/vi/tns05Bv-ABA/hqdefault.jpg";

async function getDrivers(){
   
    const {data}=await axios(URL);
    if(!data) throw new Error("problemas con la api");

    const filteredArray=data.map((driver)=>{

        const imageUrl=driver.image.url!==""? driver.image.url : defaultImageUrl;

        return{
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: imageUrl,
            nationality: driver.nationality,
            dob: driver.dob,
        };
    });

    return filteredArray;
}

module.exports={
    getDrivers,
};