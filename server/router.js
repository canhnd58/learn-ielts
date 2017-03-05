import { Router } from 'express'
import path from 'path'
import { PUBLIC_PATH } from './config'
import * as loader from './middlewares/recordLoader'
import * as cards from './controllers/cards'
import * as categories from './controllers/categories'
import * as users from './controllers/users'
import * as sessions from './controllers/sessions'

const apiRouter = Router()
    .use('/login', Router()
        .get('/', sessions.load)
        .post('/', sessions.login)
    )
    .use('/users', Router()
        .param('id', loader.loadUser)
        .get('/', users.index)
        .post('/', users.create)
        .get('/:id', users.show)
        .put('/:id', users.update)
        .delete('/:id', users.destroy)
    )
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
