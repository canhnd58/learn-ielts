export default (req, res, next) => {
    if (Object.keys(req.body).length === 0)
        return next()

    const body = Object.assign({}, req.body)
    if (body.passwd) {
        body.passwd = '[FILTERED]'
    }
    console.log('[INFO] Params:', body)
    next()
}
