import express from 'express'

const categories = ['Food', 'Gaming', 'Coding', 'Other']

const entries = [
    { category: 'Food', content: 'Pizza is yummy!'},
    { category: 'Coding', content: 'Coding is fun!'},
    { category: 'Gaming', content: 'Skyrim is for the Nords!'}
]

const app = express()
const port = 5501

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API!'}))

app.get('/categories', (req, res) => res.send(categories))

app.get('/entries', (req, res) => res.send(entries))

app.get('/entries/:id', (req, res) => {
    const entry = entries[req.params.id]
    if (entry) {
        res.send(entry)
    } else {
        res.status(404).send({ error: 'Entry not found' })
    }
})

app.post('/entries', (req, res) => {
    // 1. Retroeve data frp, request (req)
    console.log(req.body)
    // 2. Parse/validate it
    // 3. Push the new entry to the entries array
    entries.push(req.body)
    // 4. Send the new entry with 201 status
    res.status(201).send('Post to /entries')
})

app.listen(port)