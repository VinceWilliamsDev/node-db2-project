const router = require('express').Router()
const db = require('../data/dbConfig.js')

module.exports = router

router.post('/', (req, res) => {
    db('cars')
    .insert(req.body, 'id')
    .then(ids => {
        const id = ids[0]
        res.json({id})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        if (cars.length < 1) {
            return(res.status(404).json({error: 'no cars were found'}))
        } else {
            return (res.json(cars))
        }
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.get('/:id', (req, res) => {
    db('cars')
    .where('id', req.params.id)
    .then(car => {
        if (car.length > 0){
            return(res.json(car))
        } else {
            return(res.status(404).json({error: `The car with id ${req.params.id} was not found`}))
        }
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.put('/:id', (req, res) => {
    db('cars')
    .where('id', req.params.id)
    .update(req.body)
    .then(count => {
        if (count) {
            return res.json('updated record successfully')
        } else {
            return res.status(500).json('unable to update the record')
        }
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

router.delete('/:id', (req, res) =>{
    db('cars')
    .where('id', req.params.id)
    .del()
    .then(count => {
        if (count > 0) {
            return res.json(count)
        } else {
            return res.status(404).json({error: 'record not found'})
        }
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})
