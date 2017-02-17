import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema({
    _id: {
        type: String,
        trim: true
    }
}, { _id: false })

CategorySchema.statics = {
    creatableAttrs: () => '_id',
    showableFields: () => '_id'
}

export default mongoose.model('Category', CategorySchema)
