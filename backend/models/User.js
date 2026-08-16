import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const STARTING_CREDITS = 50;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true,
        maxlength:32
    },
    email:{
        type : String,
        required : true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    passwordHash:{
        type:String,
        required:true,  
    },
    credits:{
        type:Number,
        default:STARTING_CREDITS,
        min : 0
    },
    emailVerified:{
        type:Boolean,
        default:true
    }
},  {
    timestamps: true
});

userSchema.methods.toClient = function () {
    return{
        id: this._id.toString(),
        name: this.name,
        email:this.email,
        credits:this.credits,
        emailVerified: Boolean(this.emailVerified),
        createdAt:this.createdAt
    };
};

userSchema.statics.hashPassword = function(plain){
    return bcrypt.hash(plain,10);
};

userSchema.methods.verifyPassword = function(plain){
    return bcrypt.compare(plain,this.passwordHash);

};

userSchema.statics.STARTING_CREDITS = STARTING_CREDITS;

export const User = mongoose.model("User",userSchema);


