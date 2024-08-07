import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const {
    setterName, beforeWeight, afterWeight, diamondWeight, diamondQuality,
    settingDustWeight, totalLoss, totalNumberDiamondSet, totalCt, returnCt,
    brokenDiamondNumber, brokenDiamondCt
  } = await req.json();

  try {
    const newDiamond = await prisma.diamond.create({
      data: {
        setterName,
        beforeWeight,
        afterWeight,
        diamondWeight,
        diamondQuality,
        settingDustWeight,
        totalLoss,
        totalNumberDiamondSet,
        totalCt,
        returnCt,
        brokenDiamondNumber,
        brokenDiamondCt,
        jobId,
      },
    });
    return NextResponse.json(newDiamond);
  } catch (error) {
    console.error('Error adding diamond:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
