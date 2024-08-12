import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    const plainPurchases = await prisma.purchaseWithoutInvoices.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(plainPurchases);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { date, vendor, grams, weight, pricePerCt, amount } = body;
    const plainPurchase = await prisma.purchaseWithoutInvoices.create({
      data: { date, vendor, grams, weight, pricePerCt, amount },
    });
    return NextResponse.json(plainPurchase);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.error();
  }
}

/*
export async function SOME(req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const purchase = await prisma.purchase.create({ data });
      res.status(200).json(purchase);
    } catch (error) {
      res.status(500).json({ error: "Failed to add purchase" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await prisma.purchase.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: "Purchase deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete purchase" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
*/
