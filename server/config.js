import path from 'path'

export const DEBUG                  = (process.env.NODE_ENV == 'development')
export const SECRET_KEY             = process.env.SECRET_KEY || 'canh-super-secret'
export const LOCAL_PORT             = process.env.LOCAL_PORT || 7777
export const DB_URI                 = process.env.DB_URI || 'mongodb://localhost/learn-ielts'
export const PUBLIC_PATH            = process.env.PUBLIC_PATH || path.join(__dirname, '..', 'public')
export const UPLOAD_PATH            = process.env.UPLOAD_PATH || path.join(__dirname, '..', 'upload')
