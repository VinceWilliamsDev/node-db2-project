const express = require('express')
const carsRouter = require('./cars/carsRouter.js')

const server = express()

const port = process.env.PORT || 8000

server.use(express.json())

server.use('/api/cars', carsRouter)

server.get('/', (req, res) => {
    res.json('Welcome to the Car Emporium!!!')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})