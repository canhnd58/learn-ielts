import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { DB_URI } from '../server/config'
import Card from '../server/models/Card'
import Category from '../server/models/Category'

const WORD_FOLDER = 'lib/words'

mongoose.Promise = Promise
const con = mongoose.connect(DB_URI)

const cardSeed = () => {
    const files = fs.readdirSync(WORD_FOLDER)
    return Promise.all(files.map(file => {
        const text = fs.readFileSync(path.join(WORD_FOLDER, file), 'utf-8')
        const lines = text.trim().split('\n')

        return Category.create({ name: file }).then(category => Promise.all(lines.map(line => {
            let words = line.split('|')
            return Card.create({
                eng: words[0],
                vi: words[1],
                category: category._id
            })
        })))
    }))
}

mongoose.connection.on('connected', () => {
    console.log('Connected to', DB_URI)
    Promise.all([
        Category.remove(),
        Card.remove()
    ])
    .then(res => {
        console.log('Removed old data')
        return Promise.all([
            cardSeed()
        ])
    })
    .then(res => console.log('Created sample data'))
    .catch(err => console.log(err))
    .then(() => mongoose.disconnect())
    .then(() => console.log('Disconnected from', DB_URI))
})
