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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.purchaseWithoutInvoices.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, vendor, grams, weight, pricePerCt, amount } = body;
    const updatedPlainPurchase = await prisma.purchaseWithoutInvoices.update({
      where: { id },
      data: {
        date,
        vendor,
        grams: parseFloat(grams),
        weight: parseFloat(weight),
        pricePerCt: parseFloat(pricePerCt),
        amount: parseFloat(amount),
      },
    });
    return NextResponse.json(updatedPlainPurchase);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.error();
  }
}
