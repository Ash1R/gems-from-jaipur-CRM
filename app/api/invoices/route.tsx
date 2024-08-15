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
    console.error("Error fetching invoices:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Not adding any purchases array following
// https://www.prisma.io/docs/orm/prisma-client/queries/transactions#nested-writes-support-nested-updates-but-updates-are-not-dependent-writes---should-i-use-the-transaction-api
// "The most straightforward approach..." - see invoicepurchases route
export async function POST(req: NextRequest) {
  try {
    const { invoiceNumber, vendorName, purchases } = await req.json();
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        vendorName,
      },
    });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error creating invoice:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.invoice.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.error();
  }
}
