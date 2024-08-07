import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, vendor, grams, weight, pricePerCt, amount, invoiceId } = body;
    //if (!date || !vendor || !grams || !weight || !pricePerCt || !amount || !invoiceId) {
    //  return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    //}

    const newPurchase = await prisma.purchase.create({
      data: { date, vendor, grams, weight, pricePerCt, amount, invoiceId },
    });
    return NextResponse.json(newPurchase);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to add purchase' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await prisma.purchase.delete({
      where: { id: Number(id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete purchase' }, { status: 500 });
  }
}
