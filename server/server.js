import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import jwt from 'express-jwt'
import livereload from 'connect-livereload'
import router from './router'
import errorHandler from './middlewares/errorHandler'
import bodyLogger from './middlewares/bodyLogger'
import { SECRET_KEY, LOCAL_PORT, DB_URI, PUBLIC_PATH, DEBUG } from './config'

mongoose.Promise = Promise // Use es6 Promise instead of mongoose default promise due to its deprecation warning

const app = express() // Yeah, this is an Express app

if (DEBUG) {
    app.use(livereload()) // Add livereload script to static files
    app.use(morgan('dev')) // Log coming requests
} else {
    app.use(morgan('combined'))
}

app.use(express.static(PUBLIC_PATH)) // Serve static files
app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www.form-urlencoded
app.use(bodyParser.json()) // Parse application/json
app.use(bodyLogger) // We now have req.body, just log it
app.use(jwt({ secret: SECRET_KEY, credentialsRequired: false, requestProperty: 'session' })) // Decode JSON web token, we now have req.session
app.use(router) // This is where we use defined routes
app.use(errorHandler) // Handle some types of error before returning to client

// Actually start server on a specific port
app.listen(LOCAL_PORT, () => {
  console.log('[INFO] Started listening on port', LOCAL_PORT)
})

mongoose.connect(DB_URI) // Connect to mongodb database

// Log mongodb connection status
mongoose.connection.on('connected', () => {
    console.log('[INFO] Connected to', DB_URI)
})

// Log mongodb connection status, the second time
mongoose.connection.on('disconnected', () => {
    console.log('[INFO] Disconnected from', DB_URI)
})

// That's all -.-
