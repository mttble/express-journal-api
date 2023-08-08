import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'


const app = express()
const port = 5503

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API!'}))

app.get('/categories', async(req, res) => res.send(await CategoryModel.find()))

app.use('/entries', entryRoutes)


app.listen(port)