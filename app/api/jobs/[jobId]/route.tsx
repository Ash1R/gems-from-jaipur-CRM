import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const id = params.jobId;
  console.log("DELETE is called with jobs ", id);
  try {
    await prisma.job.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
