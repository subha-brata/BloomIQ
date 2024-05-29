import { Document, Schema, model } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = model<UserDocument>('User', userSchema);

export default User;
