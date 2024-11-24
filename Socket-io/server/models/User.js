import {Schema, model} from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import validator from 'validator'
import bcrypt from 'bcrypt'


const {isEmail} = validator

const UserSchema = new Schema({
    username:{
        type: String,
        required:[true, 'username is required'],
        unique: [true, 'Username already exists']
    },

    email:{
        type: String,
        required: [true, 'email is required'],
        validate: [isEmail, 'Not an email'],
        unique: [true, 'Email already exists']
    },
    password:{
        type: String,
        required: [true, 'password is required'],
    }
}, {timestamps: true})

UserSchema.plugin(mongooseUniqueValidator)

UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword
    })
    .set(function(value){
        this._confirmPassword = value
    })


    UserSchema.pre('validate', function (next) {
        if (this.password !== this.confirmPassword) {
          this.invalidate('confirmPassword', 'Passwords dont match');
        }
        next();
      });



UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      console.log('HASH: ', hash);
      this.password = hash;
      next();
    });
});

const User = model('User', UserSchema);
export default User;