import { Document, Schema, model, Model } from 'mongoose'

interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export { UserModel };
export type { IUser };
