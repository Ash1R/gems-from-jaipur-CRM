import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
    console.error("Error adding edit:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await prisma.edit.delete({
      where: { id: String(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.error();
  }
}
