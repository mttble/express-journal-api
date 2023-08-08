import mongoose from 'mongoose'

async function dbClose() {
    await mongoose.connection.close()
    console.log('Database disconnected')
}


    .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose Connected!' : 'Mongoose Failed to connect'))
    .catch(err => console.error(err))

const entrySchema = new mongoose.Schema({
    category: { type: mongoose.ObjectId, ref: 'Category' },
    content: { type: String, required: true }
})

const EntryModel = mongoose.model('Entry', entrySchema)

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

const CategoryModel = mongoose.model('Category', categorySchema)

export { EntryModel, CategoryModel, dbClose }
