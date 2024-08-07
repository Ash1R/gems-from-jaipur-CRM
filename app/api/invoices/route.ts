import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber: data.invoiceNumber,
          vendorName: data.vendorName,
          purchases: {
            create: data.purchases,
          },
        },
      });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add invoice' });
    }
  } else if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany({
        include: { purchases: true },
      });
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
