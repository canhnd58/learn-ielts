import mongoose, { Schema } from 'mongoose'
import only from 'only'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'

const UserSchema = new Schema({
    uname: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true
    }
}, { timestamps: true })

UserSchema.pre('save', function(next) {
    if (!this.isModified('passwd')) return next()
    this.passwd = this.constructor.encryptPassword(this.passwd)
    next()
})

UserSchema.methods = {
    isValidPasswd: function (passwd) {
        return bcrypt.compareSync(passwd, this.passwd)
    },
    toJwt: function () {
        const user = Object.assign({}, only(this, this.constructor.showableFields()))
        return jwt.sign(user, SECRET_KEY)
    }
}

UserSchema.statics = {
    creatableFields: () => 'uname passwd',
    updatableFields: () => 'passwd',
    showableFields: () => 'uname _id',
    encryptPassword: pass => bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null)
}

export default mongoose.model('User', UserSchema)
