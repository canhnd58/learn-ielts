export const DEBUG                  = (process.env.NODE_ENV == 'development')
export const PUBLIC_PORT            = process.env.PUBLIC_PORT || 7777
export const HOST                   = process.env.HOST || 'localhost'
export const PROTOCOL               = process.env.PROTOCOL || 'http'
export const BASE_URL               = `${PROTOCOL}://${HOST}:${PUBLIC_PORT}`
export const API_URL                = `${BASE_URL}/api`
