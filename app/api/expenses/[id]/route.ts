import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();
  const body = await request.json();
  const { date, description, withdraw, received } = body;

  if (!id) {
    return new NextResponse('ID is required', { status: 400 });
  }

  const updatedExpense = await prisma.expense.update({
    where: { id: Number(id) },
    data: { date, description, withdraw, received },
  });

  return NextResponse.json(updatedExpense);
}