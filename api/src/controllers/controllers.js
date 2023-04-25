const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env



const getDogsApi = async () => { //me traigo todos los dog desde la API
    try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

        
        const apiInfo = await apiUrl.data.map(el => {
        // let temperamentArray = [];
        // if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        //     temperamentArray = el.temperament.split(", ");
        // }
        
            return {
                id: el.id,
                name: el.name,
                height: el.height.metric ? el.height.metric.split(" - ") : [],// verifico que que exista y si existe lo "spliteo"
                weight: el.weight.metric ? el.weight.metric.split(" - ") : [],// sino devuelo array vacio
                temperaments: el.temperament ? el.temperament.split(", ") : [],
                life_span: el.life_span,
                image: el.image.url,
            }
        })
    return apiInfo;
    } catch (error) {
        return null;
    }
    
};

const getDogsDb = async () => { //me traigo los dogs de mi base de datos
    try {
        return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    } catch (error) {
        return null;
    }
    
};

const getAll = async () => { //concateno ambos perros para devolver todos juntos
    try {
        const apiInfo = await getDogsApi();
    const dbInfo = await getDogsDb();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
    } catch (error) {
        return null;
    }
    
}

const getTemperaments = async () => { //me traigo los temperamentos
    try {
        const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = apiUrl.data.map(el=> el.temperament);
        const temperaments = apiInfo.toString().split(",")
       
        return temperaments;


    } catch (error) {
        return null;
    }
}

module.exports = {
    getDogsApi,
    getDogsDb,
    getAll,
    getTemperaments,
};