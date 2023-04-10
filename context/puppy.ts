import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';

interface IPuppy extends Document {
  _id: Schema.Types.ObjectId;
  ownerID: Schema.Types.ObjectId | IUser["_id"];
  city: string;
  state: string;
  age: number;
  dog_name: string;
  tagline: string;
  intro: string;
  gender: string;
}

const PuppySchema = new Schema<IPuppy>({
  _id: Schema.Types.ObjectId,
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
    required: true,
  },
});

const PuppyModel = model<IPuppy>('Puppy', PuppySchema);

export { PuppyModel };
export type { IPuppy };
