const axios=require("axios");
const URL="http://localhost:5000/drivers";

const handlerGetDrivers=async(req,res)=>{
    try {
        const {data}=await axios(URL);
        console.log(data);
        if(!data) return res.status(400).send ("problemas con la api");
        else {
            const filteredArray=data.map((driver)=>{
                let newObj={
                    
                }
            });
        }

    } catch (error) {
        
    }
}

module.exports={
    handlerGetDrivers,
};