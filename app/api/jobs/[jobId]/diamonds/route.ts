import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;
  const {
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
    console.error("Error adding diamond:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.diamond.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.error();
  }
}
