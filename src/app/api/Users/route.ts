import { NextApiRequest, NextApiResponse } from "next";
import {User} from '@/lib/models/User';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required." });
    }

    // Simulate saving the user to a database
    return res.status(200).json({ message: `User ${name} aged ${age} created successfully.` });
  }

  return res.status(405).json({ message: "Method not allowed." });
}
