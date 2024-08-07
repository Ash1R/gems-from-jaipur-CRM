import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { purchases: true },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceNumber, vendorName } = body;
    const newInvoice = await prisma.invoice.create({
      data: { invoiceNumber, vendorName },
    });
    return NextResponse.json(newInvoice);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add invoice' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, purchases } = body;
    const updatedInvoice = await prisma.invoice.update({
      where: { id },
      data: { purchases: { create: purchases } },
    });
    return NextResponse.json(updatedInvoice);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}