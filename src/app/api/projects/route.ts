import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/db";
import { createProjectDto } from "./_dto";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello, Next.js!" });
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
