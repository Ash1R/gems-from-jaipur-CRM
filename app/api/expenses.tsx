// pages/api/expenses.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } else if (req.method === "POST") {
    const { date, description, withdraw, received } = req.body;
    const newExpense = await prisma.expense.create({
      data: { date, description, withdraw, received },
    });
    res.json(newExpense);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    await prisma.expense.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  }
};
