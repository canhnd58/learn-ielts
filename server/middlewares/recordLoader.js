import mongoose from 'mongoose'
import User from '../models/User'
import { ClientError } from '../errors'

export const loadUser = (req, res, next) => load(User, req, next)

const load = (Model, req, next) => {
    const modelName = Model.modelName
    const { id } = req.params
    const error = new ClientError(`${modelName} ${id} not found`)

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(error)

    Model.findOne({ _id: id })
        .then(found => {
            if (!found) throw error
            req[modelName.toLowerCase()] = found
            return next()
        })
        .catch(err => next(err))
}
