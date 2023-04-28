const { Router } = require('express');
const { getAll, } = require('../controllers/controllers');
const { Dog, Temperament } = require('../db')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const { name } = req.query;
        const dogs = await getAll();
        if (name) {
            const dog = dogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            dog.length ? res.status(200).json(dog) : res.status(400).json({ 'message': 'Upd, dog Not Found' })
        } else {
            res.status(200).json(dogs)
        }
    } catch (error) {
        next(error);
    }

})

router.get('/:idRaza', async (req, res, next) => {
    try {
        const { idRaza } = req.params;
        const dogs = await getAll();
        const idDog = dogs.filter(el => el.id == idRaza);
        if (idDog.length) {
            res.status(200).json(idDog);
        } else {
            res.status(400).json({ 'message': 'ID Not Found' })
        }
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {

    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    } = req.body

    if(!name || !min_height || !max_height || !min_weight || max_weight || temperaments ){
        return res.status(400).json({error: 'Complete all fields requerid'})
    }

    try {
    
        const fixedHeight = [min_height, max_height];
        const fixedWeight = [min_weight, max_weight];

        let dog = await Dog.create({
            name,
            height: fixedHeight,
            weight: fixedWeight,
            life_span,
            image: image ? image : "https://as1.ftcdn.net/v2/jpg/01/82/28/68/1000_F_182286837_8jXXTcn6uj7t3Wbmpu1bBW4Qg952MYiL.jpg",
        })

        let associatedTemp = await Temperament.findAll({
            where: { name: temperaments },
        })

        dog.addTemperament(associatedTemp);

        dog.length ? res.status(200).send("Dog created succesfully!") : res.status(400).json({error: 'Ups, something is wrong, Try Again.'})
        
    } catch (error) {

    }
})

module.exports = router