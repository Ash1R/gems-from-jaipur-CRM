import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const purchase = await prisma.purchase.create({ data });
      res.status(200).json(purchase);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add purchase' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await prisma.purchase.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: 'Purchase deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete purchase' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
