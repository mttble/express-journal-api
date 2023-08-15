import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API!'}))

app.get('/categories', async(req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoutes)

export default app