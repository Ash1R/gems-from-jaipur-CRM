import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;
  const { stepType, weightBefore, weightAfter, polishGuy, cost } =
    await req.json();

  try {
    const newEdit = await prisma.edit.create({
      data: {
        stepType,
        weightBefore,
        weightAfter,
        polishGuy,
        jobId,
        cost,
      },
    });
    return NextResponse.json(newEdit);
  } catch (error) {
    console.error('Error adding edit:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
