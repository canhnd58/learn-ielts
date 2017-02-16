import Category from '../models/Category'
import only from 'only'

export const index = (req, res, next) => {
    Category.find().select(Category.showableFields())
        .then(cats => {
            res.json(cats)
        })
        .catch(err => next(err))
}
