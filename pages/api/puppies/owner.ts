import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest,  res: NextApiResponse) {
    const ownerID = req.query.ownerID as string
  
    const client = await clientPromise;
    const db = client.db("puppyplaydate");
    const puppyCollection = db.collection('puppies');


    try {
        const userPuppies = await puppyCollection.find({ ownerID: ownerID }).toArray();
        console.log(userPuppies)
        if (!userPuppies || userPuppies.length === 0) {
            return res.status(204).json({ message: 'No puppies found for this owner' });
        }
        return res.status(200).json(userPuppies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}