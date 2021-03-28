import mongoose, { Schema, Document, ValidatorProps } from "mongoose";
import validator from "validator";

const carrerSchema: Schema = new Schema({
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

const educationalBackgroundSchema: Schema = new Schema({
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

const userSchema: Schema = new Schema({
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
      validator: (v: string) => validator.isEmail(v),
      message: (props: ValidatorProps) => `${props.value} is invalid email address`,
    },
  },
  groupEmail: {
    type: String,
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: (props: ValidatorProps) => `${props.value} is invalid email address`,
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
  educationalBackground: [educationalBackgroundSchema],
});

export interface ICarrer extends Document {
  groupname: String
  firstDate: String
  lastDate: String
  occupation: String
  contents: String
}

export interface IEducationalBackground extends Document {
  schoolname: String
  firstDate: String
  lastDate: String
  faculty: String
  department: String
  major: String
  achivement: String
}

export interface IUser extends Document {
  _id: Schema.Types.ObjectId
  userName: String
  firstName: String
  lastName: String
  email: String
  password: String
  groupEmail: String
  profile: String
  age: Number
  occupation: String
  permissionLevel: Number
  carrer: ICarrer[]
  educationalBackground: IEducationalBackground[]
}

const Users: mongoose.Model<IUser> = mongoose.model("Users", userSchema);
export default Users