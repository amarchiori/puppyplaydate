import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const id = query.id as string;

  const client = await clientPromise;
  const db = client.db("puppyplaydate");
  const puppyCollection = db.collection('puppies');

  switch (method) {
    case 'GET':
      try {
        const puppy = await puppyCollection.findOne({ _id: new ObjectId(id) });
        if (!puppy) {
          return res.status(404).json({ message: 'Puppy not found' });
        }
        res.status(200).json(puppy);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'PUT':
      try {
        const { 
            city,
            state,
            age,
            dog_name,
            tagline,
            intro,
            gender,
        } = req.body;
          const updatedPuppy = { 
            city,
            state,
            age,
            dog_name,
            tagline,
            intro,
            gender,
        };
        const result = await puppyCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedPuppy });
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Puppy not found' });
        }
        res.status(200).json({ message: 'Puppy updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'DELETE':
      try {
        const result = await puppyCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Puppy not found' });
        }
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}