import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  const client = await clientPromise
  const db = client.db("puppyplaydate");
  const puppyCollection = db.collection('puppies');
  
    if (req.method === "GET"){
        try {
          const puppies = await puppyCollection.find().toArray();
          res.status(200).json(puppies);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching puppies.' });
        }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }