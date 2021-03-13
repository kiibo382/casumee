import validator from "validator";
import mongoose from "../config/mongoose.js";
const Schema = mongoose.Schema;

const carrerSchema = new Schema({
  groupname: {
    type: String,
    required: true,
  },
  firstDate: {
    type: Date,
    required: true,
  },
  lastDate: Date,
  occupation: String,
  contents: String,
});

const educationalBackgroudSchema = new Schema({
  schoolname: {
    type: String,
    required: true,
  },
  firstDate: {
    type: Date,
    required: true,
  },
  lastDate: Date,
  faculty: String,
  department: String,
  major: String,
  achivement: String,
});

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email address`,
    },
  },
  groupEmail: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is invalid email address`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: Number,
    default: 1,
  },
  profile: String,
  age: Number,
  occupation: String,
  carrer: [carrerSchema],
  educationalBackgroud: [educationalBackgroudSchema],
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("Users", userSchema);

export function findByEmail(email) {
  return User.find({ "email": email })
}

export function findByUserName(userName) {
  return new Promise((resolve, reject) => {
    User.findOne({ "userName": userName })
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user)
        }
      });
  });
}

export function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

export function list(perPage, page) {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
}

export function putUser(userName, userData) {
  return User.findOneAndUpdate({ "userName": userName }, userData);
}

export function removeUser(userName) {
  return User.deleteMany({ "userName": userName })
    .then(() => {
      console.log("success")
    })
    .catch(() => {
      console.log("error")
      return "error"
    })
}
