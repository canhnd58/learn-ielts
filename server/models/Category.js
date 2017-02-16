import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema({
    name: {
        type: String,
        trim: true
    }
})

CategorySchema.statics = {
    creatableAttrs: () => 'name',
    showableFields: () => 'name'
}

export default mongoose.model('Category', CategorySchema)
