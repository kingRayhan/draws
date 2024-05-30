import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { createBoardDto, updateProjectDto } from "./_dto";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
  // get current user
  const { userId, orgId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const boardId = searchParams.get("boardId");
  const projectId = searchParams.get("projectId");

  if (boardId) {
    const res = await prisma.board.findUnique({
      where: { id: boardId, userId },
    });
    if (!res) {
      return NextResponse.json(
        { message: "Board not found or does not belongs to you" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  }

  if (projectId) {
    const res = await prisma.board.findMany({
      where: { projectId, userId, orgId },
    });
    if (!res) {
      return NextResponse.json(
        { message: "Project not found or does not belongs to you" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, orgId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // validate body
  const validatedBody = createBoardDto.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.issues, { status: 400 });
  }

  const res = await prisma.board.create({
    data: {
      name: validatedBody.data?.name,
      projectId: validatedBody.data?.projectId,
      userId,
      orgId,
    },
  });
  return NextResponse.json({
    message: "Project created successfully!",
    project: res,
  });
}

export async function PATCH(request: NextRequest) {
  // get current user
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Board id is required!" },
      { status: 400 }
    );
  }

  // check if the project belongs to the user
  const exists = await prisma.board.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!exists) {
    return NextResponse.json(
      { message: "Board not found or does not belongs to you" },
      { status: 404 }
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

  // get current user
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // check if the project belongs to the user
  const exists = await prisma.board.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!exists) {
    return NextResponse.json(
      { message: "Board not found or does not belongs to you" },
      { status: 404 }
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
