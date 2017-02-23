import Category from '../models/Category'
import only from 'only'

export const index = (req, res, next) => {
    Category.find()
        .sort('_id')
        .select(Category.showableFields())
        .then(data => {
            res.json(data)
        })
        .catch(err => next(err))
}
