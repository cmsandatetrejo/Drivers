const {handlerGetDrivers}=require("../handlers/handlerGetDrivers");

async function getDrivers(req, res){
    const arrayDrivers=handlerGetDrivers(req, res);
}

module.exports={
    getDrivers,
};