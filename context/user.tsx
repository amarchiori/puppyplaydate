import { Document, Schema, model, models } from 'mongoose'

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

const UserModel = models?.User || model<IUser>('User', UserSchema);

export { UserModel };
export type { IUser };
