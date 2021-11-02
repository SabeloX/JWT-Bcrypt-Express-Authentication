import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    username: string,
    password: string,
    role: string
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, 'Username Required'],
        minLength: [6, 'At least 6 characters required!'],
        maxlength: [30, 'Too many character!'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password Required!' ],
        minLength: [ 6, 'At least 6 character required!' ]
    },
    role: {
        type: String,
        default: 'user'
    }
});

export const User = model<User>('User', userSchema);