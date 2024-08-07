import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const { date, caster, goldSilver, castingWeight, pureWeight } = await req.json();

  try {
    const newCasting = await prisma.casting.create({
      data: {
        date,
        caster,
        goldSilver,
        castingWeight,
        pureWeight,
        jobId,
      },
    });
    return NextResponse.json(newCasting);
  } catch (error) {
    console.error('Error adding casting:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
