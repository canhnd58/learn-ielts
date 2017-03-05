import User from '../models/User'
import only from 'only'
import { ClientError } from '../errors'

export const index = (req, res, next) => {
    User.find()
        .select(User.showableFields())
        .then(found => res.json(found))
        .catch(err => next(err))
}

export const create = (req, res, next) => {
    User.create(only(req.body, User.creatableFields()))
        .then(created => res.json(created))
        .catch(err => next(err))
}

export const show = (req, res, next) =>{
    const user = only(req.user, User.showableFields())
    res.json(user)
}

export const update = (req, res, next) => {
    const user = Object.assign(req.user, only(req.body, User.updatableFields()))
    user.save()
        .then(saved => res.json(saved))
        .catch(err => next(err))
}

export const destroy = (req, res, next) => {
    req.user.remove()
        .then(removed => res.json())
        .catch(err => next(err))
}
