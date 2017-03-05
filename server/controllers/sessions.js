import User from '../models/User'
import only from 'only'
import { ClientError } from '../errors'

export const login = (req, res, next) => {
    const { uname, passwd } = req.body
    User.findOne({ uname })
        .then(user => {
            if (!user || !user.isValidPasswd(passwd))
               throw new ClientError('Username or password is not correct')
            res.json({
                user: only(user, User.showableFields()),
                token: user.toJwt()
            })
        })
        .catch(err => next(err))
}

export const load = (req, res, next) => {
    const { _id } = req.session
    User.findOne({ _id })
        .then(user => {
            if (!user) throw new ClientError('Your session has expired')
            res.json({
                user: only(user, User.showableFields()),
                token: user.toJwt()
            })
        })
        .catch(err => next(err))
}
