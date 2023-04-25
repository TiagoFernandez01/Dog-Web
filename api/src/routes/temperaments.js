const Router = require('express');
const {Temperament} = require('../db');
const {getTemperaments} = require('../controllers/controllers')

const router = Router();

router.get('/', async (req,res,next) => {
    try {
        const temps = await getTemperaments();
        
        temps.forEach(el => { //creo o encuentro todos los temperamentos en mi base de datos
            let i = el.trim() // borro espacios en blanco que trae la API
            Temperament.findOrCreate({
                 where: { name: i }
            })
        })
    
        const allTemp = await Temperament.findAll();    
        res.status(200).json(allTemp);
    } catch (error) {
        next (error);
    }
})

module.exports = router;