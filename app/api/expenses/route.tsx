import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET(request: NextRequest) {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { date, description, withdraw, received } = body;
  const newExpense = await prisma.expense.create({
    data: { date, description, withdraw, received },
  });
  return NextResponse.json(newExpense);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await prisma.expense.delete({
    where: { id: Number(id) },
  });
  return new NextResponse(null, { status: 204 });
}
