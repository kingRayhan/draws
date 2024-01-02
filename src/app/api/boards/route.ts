import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { createBoardDto, updateProjectDto } from "./_dto";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, Next.js!" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // validate body
  const validatedBody = createBoardDto.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.issues, { status: 400 });
  }

  const res = await prisma.board.create({
    data: {
      name: validatedBody.data?.name,
      projectId: validatedBody.data?.projectId,
    },
  });
  return NextResponse.json({
    message: "Project created successfully!",
    project: res,
  });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Board id is required!" },
      { status: 400 }
    );
  }

  // validate body
  const validatedBody = updateProjectDto.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.issues, { status: 400 });
  }

  const res = await prisma.board.update({
    where: { id },
    data: {
      name: validatedBody.data?.name,
      description: validatedBody.data?.description,
      appStates: validatedBody.data?.appStates,
      elements: validatedBody.data?.elements,
    },
  });
  return NextResponse.json({
    message: "Project updated successfully!",
    project: res,
  });
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  // validate body
  if (!id) {
    return NextResponse.json(
      { message: "Project id is required!" },
      { status: 400 }
    );
  }

  const res = await prisma.board.delete({
    where: { id },
  });
  return NextResponse.json({
    message: "Board deleted successfully!",
    board: res,
  });
}
