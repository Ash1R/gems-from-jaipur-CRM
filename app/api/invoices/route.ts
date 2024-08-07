import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { purchases: true },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { invoiceNumber, vendorName, purchases } = await req.json();
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        vendorName,
        purchases: {
          create: purchases,
        },
      },
    });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error creating job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
