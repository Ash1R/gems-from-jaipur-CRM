import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        castings: true,
        edits: true,
        diamonds: true,
      },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, name, castings, edits, diamonds } = await req.json();
    const newJob = await prisma.job.create({
      data: {
        id,
        name,
        castings: {
          create: castings,
        },
        edits: {
          create: edits,
        },
        diamonds: {
          create: diamonds,
        },
      },
      include: {
        castings: true,
        edits: true,
        diamonds: true,
      },
    });
    return NextResponse.json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.job.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting job:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
