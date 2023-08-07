import express from 'express'
import mongoose from 'mongoose'

const categories = [
    { name: 'Food' },
    { name: 'Gaming' },
    { name: 'Coding' },
    { name: 'Other' }
]


const entries = [
    { category: 'Food', content: 'Pizza is yummy!'},
    { category: 'Coding', content: 'Coding is fun!'},
    { category: 'Gaming', content: 'Skyrim is for the Nords!'}
]

mongoose.connect('mongodb+srv://flip242:<pw>@cluster0.bzqanvn.mongodb.net/journal?retryWrites=true&w=majority')
    .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose Connected!' : 'Mongoose Failed to connect'))
    .catch(err => console.error(err))

const entrySchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    entries: [entrySchema]
})

const CategoryModel = mongoose.model('Category', categorySchema)

// CategoryModel.create({
//     name: 'Foo',
//     entries: [
//         { content: 'Bar' },
//         { content: 'Bat' },
//     ]
// })

// async function addEntry() {
//     const theCat = await CategoryModel.findOne({ name: 'Coding' })
//     EntryModel.create({ content: 'Testing category ref', category: theCat._id })
// }
// addEntry()



const app = express()
const port = 5502

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API!'}))

app.get('/categories', async(req, res) => res.send(await CategoryModel.find()))

app.get('/entries', async (req, res) => res.send(await EntryModel.find()))

app.get('/entries/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findById(req.params.id)
        if (entry) {
        res.send(entry)
        } else {
        res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.post('/entries', async (req, res) => {
    try{
        const theCat = await CategoryModel.findOne({ name: req.body.category })
        if(theCat) {
            const insertedEntry = await EntryModel.create({ content: req.body.content, category: theCat._id})
            res.status(201).send(insertedEntry)
        } else {
            res.status(400).send({ error: 'Category not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.put('/entries/:id', async (req, res) => {
    try {
        // new true is to show updated entry not to return prev entry
        const entry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new:true })
        if (entry) {
            res.send(entry)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.delete('/entries/:id', async (req, res) => {
    try {
        const entry = await EntryModel.findByIdAndDelete(req.params.id)
        if (entry) {
            res.sendStatus(200)
        } else {
            res.status(404).send({ error: 'Entry not found' })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

app.listen(port)