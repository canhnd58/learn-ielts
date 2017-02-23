import mongoose, { Schema } from 'mongoose'

const CardSchema = new Schema({
    eng: {
        type: String,
        trim: true,
        lowercase: true
    },
    vi: {
        type: String,
        trim: true,
        lowercase: true
    },
    example: {
        type: String,
        trim: true,
        default: '[No example]'
    },
    category: {
        type: String,
        ref: 'Category'
    }
})

CardSchema.statics = {
    creatableFields: () => 'eng vi example category',
    showableFields: () => 'eng vi example'
}

export default mongoose.model('Card', CardSchema)
