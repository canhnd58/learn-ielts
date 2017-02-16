export default (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const firstErrorKey = Object.keys(err.errors)[0]
        res.status(422).send(err.errors[firstErrorKey].message)
    } else if (err.name === 'ClientError') {
        console.log('[CLIENT ERROR]', err.stack)
        res.status(422).send(err.message)
    } else {
        console.log('[SERVER ERROR]', err.stack)
        res.status(500).send('Server error')
    }
}
