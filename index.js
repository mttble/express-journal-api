// import express from 'express'
// import { CategoryModel } from './db.js'
// import entryRoutes from './routes/entry_routes.js'
// import cors from 'cors'

// const app = express()
// const port = 5505

// app.use(cors())

// app.use(express.json())

// app.get('/', (req, res) => res.send({ info: 'Journal API!'}))

// app.get('/categories', async(req, res) => res.send(await CategoryModel.find()))

// app.use('/entries', entryRoutes)

import app from './app.js'

const port = 5505
app.listen(port)