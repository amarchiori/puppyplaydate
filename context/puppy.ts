import { Schema, model, Document, models } from 'mongoose';
import { IUser } from './user';

enum Gender {
  MALE = 'male',
  FEMALE ='female',
}

interface IPuppy extends Document {
  ownerID: IUser["_id"];
  city: string;
  state: string;
  age: number;
  dog_name: string;
  tagline: string;
  intro: string;
  gender: Gender;
}

const PuppySchema = new Schema<IPuppy>({
  ownerID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dog_name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
});

const PuppyModel = models?.Puppy || model<IPuppy>('Puppy', PuppySchema);

export { PuppyModel, Gender };
export type { IPuppy };