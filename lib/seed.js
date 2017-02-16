import mongoose from 'mongoose'
import fs from 'fs'
import { DB_URI } from '../server/config'
import Card from '../server/models/Card'

mongoose.Promise = Promise
mongoose.connect(DB_URI)

const cardSeed = () => Card.remove().then(removed => Promise.all([
    Card.create({
        eng: "hello",
        vi: "xin chào"
    }),
    Card.create({
        eng: "good",
        vi: "tốt"
    })
]))

mongoose.connection.on('connected', () => {
    console.log('Connected to', DB_URI)
    Promise.all([
        cardSeed(),
    ])
    .then(res => console.log('Sample data created'))
    .catch(err => console.log(err))
    .then(() => mongoose.disconnect())
    .then(() => console.log('Disconnected from', DB_URI))
})
