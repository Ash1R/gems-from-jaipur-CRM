import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const { jobId } = params;
  const { date, caster, goldSilver, castingWeight, pureWeight, goldRate } =
    await req.json();

  try {
    const newCasting = await prisma.casting.create({
      data: {
        date,
        caster,
        goldSilver,
        castingWeight,
        pureWeight,
        jobId,
        goldRate,
      },
    });
    return NextResponse.json(newCasting);
  } catch (error) {
    console.error("Error adding casting:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.casting.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.error();
  }
}
