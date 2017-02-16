import Card from '../models/Card'
import only from 'only'

export const index = (req, res, next) => {
    const query = req.query.category ? { category: req.query.category } : {}
    Card.find(query).select(Card.showableFields())
        .then(cards => {
            res.json(cards)
        })
        .catch(err => next(err))
}
