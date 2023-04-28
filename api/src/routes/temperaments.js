const Router = require('express');
const {Temperament} = require('../db');
const {getTemperaments} = require('../controllers/controllers')

const router = Router();

router.get('/', async (req,res,next) => {
    try {
        const temps = await getTemperaments();
        
        temps.forEach(el => { 
            let i = el.trim() // borro espacios en blanco que trae la API
            Temperament.findOrCreate({
                 where: { name: i }
            })
        })
    
        const allTemp = await Temperament.findAll();    
        allTemp ? res.status(200).json(allTemp) : res.status(400).json({error: 'Ups, spmething is wrong; Try Again.'})
    } catch (error) {
        next (error);
    }
})

module.exports = router;