import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  try {
    const metalPurchases = await prisma.metalPurchase.findMany({
      orderBy: { date: 'desc' },
    });
    return NextResponse.json(metalPurchases);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, metalType, rate, grams, amount, vendor, paid } = body;
    const newPurchase = await prisma.metalPurchase.create({
      data: { date, metalType, rate, grams, amount, vendor, paid },
    });
    return NextResponse.json(newPurchase);
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.error();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, metalType, rate, grams, amount, vendor, paid } = body;
    const updatedPurchase = await prisma.metalPurchase.update({
      where: { id },
      data: { date, metalType, rate, grams, amount, vendor, paid },
    });
    return NextResponse.json(updatedPurchase);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await prisma.metalPurchase.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.error();
  }
}
