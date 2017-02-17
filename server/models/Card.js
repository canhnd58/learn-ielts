import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema({
    eng: {
        type: String,
        trim: true
    },
    vi: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        ref: 'Category'
    }
})

CardSchema.statics = {
    creatableFields: () => 'eng vi category',
    showableFields: () => 'eng vi'
}

export default mongoose.model('Card', CardSchema)
