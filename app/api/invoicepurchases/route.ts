import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";

/*
// Create a user and assign them to the team
const user = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    team: {
      connect: {
        id: team.id,
      },
    },
  },
})
*/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceId, date, vendor, grams, weight, pricePerCt, amount } = body;
    const purchase = await prisma.purchase.create({
      data: {
        date,
        vendor,
        grams,
        weight,
        pricePerCt,
        amount,
        invoice: { connect: { id: invoiceId } },
      },
    });
    return NextResponse.json(purchase);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.purchase.delete({
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
