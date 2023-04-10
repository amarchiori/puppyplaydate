import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
  
    const client = await clientPromise
    const db = client.db("puppyplaydate");
    const puppyCollection = db.collection('puppies');

    if(req.method === 'POST') {
        try {
          const { 
              ownerID,
              city,
              state,
              age,
              dog_name,
              tagline,
              intro,
              gender,
          } = req.body;
          const newPuppy = { 
            _id: id,
            ownerID,
            city,
            state,
            age,
            dog_name,
            tagline,
            intro,
            gender,
        };
          const result = await puppyCollection.insertOne(newPuppy);
          res.status(201).json(result);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating puppy.' });
        }
    }


}


