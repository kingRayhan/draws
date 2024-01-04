import prisma from "@/server/db";
import { NextRequest, NextResponse } from "next/server";
import { createProjectDto, updateProjectDto } from "./_dto";

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
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
    },
  });
  return NextResponse.json({
    message: "Project created successfully!",
    project: res,
  });
}

// PATCH
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  // validate body
  if (!id) {
    return NextResponse.json(
      { message: "Project id is required!" },
      { status: 400 }
    );
  }

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

  const res = await prisma.project.delete({
    where: { id },
  });
  return NextResponse.json({
    message: "Project deleted successfully!",
    project: res,
  });
}
