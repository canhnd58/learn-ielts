import { Router } from 'express'
import path from 'path'
import { PUBLIC_PATH } from './config'
import * as cards from './controllers/cards'
import * as categories from './controllers/categories'

const apiRouter = Router()
    .use('/cards', Router()
        .get('/', cards.index)
    )
    .use('/categories', Router()
        .get('/', categories.index)
    )
    .use('*', (req, res) => {
        res.status(404).send('API not found')
    })

const defaultRouter = Router().get('*', (req, res) => {
    if (req.accepts('html'))
        res.sendFile(path.join(PUBLIC_PATH, 'index.html'))
    else
        res.sendStatus(404)
})

const router = Router()
    .use('/api', apiRouter)
    .use(defaultRouter)

export default router
