import { Document, Schema, model, models } from 'mongoose'

interface IUser extends Document {
  id: string,
  email: string;
  password: string;
  puppies: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  puppies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Puppy',
    },
  ],
});

const UserModel = model<IUser>('User', UserSchema);

export { UserModel };
export type { IUser };
