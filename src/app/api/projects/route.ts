import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { createProjectDto, updateProjectDto } from "./_dto";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({ where: { userId } });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // validate body
  const validatedBody = createProjectDto.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.issues, { status: 400 });
  }

  const res = await prisma.project.create({
    data: {
      name: validatedBody.data.name,
      description: validatedBody.data.description,
      userId,
    },
  });
  return NextResponse.json({
    message: "Project created successfully!",
    project: res,
  });
}

// PATCH
export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Id is required." }, { status: 400 });
  }

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // check if the project belongs to the user
  const exists = await prisma.project.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!exists) {
    return NextResponse.json(
      { message: "Project not found or does not belong to you." },
      { status: 404 }
    );
  }

  const body = await request.json();

  // validate body
  const validatedBody = updateProjectDto.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.issues, { status: 400 });
  }

  const res = await prisma.project.update({
    where: { id },
    data: {
      name: validatedBody.data?.name,
      description: validatedBody.data?.description,
    },
  });
  return NextResponse.json({
    message: "Project updated successfully!",
    project: res,
  });
}

// DELETE
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Id is required." }, { status: 400 });
  }

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // check if the project belongs to the user
  const exists = await prisma.project.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!exists) {
    return NextResponse.json(
      { message: "Project not found or does not belong to you." },
      { status: 404 }
    );
  }

  const res = await prisma.project.delete({
    where: { id },
  });
  return NextResponse.json({
    message: "Project deleted successfully!",
    project: res,
  });
}
