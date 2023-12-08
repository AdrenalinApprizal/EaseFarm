import { prisma } from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    throw new Error("Email, username, and password are required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      throw new Error(`User with email of ${user.username} already exists`);
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: await hash(password, 10),
        role: "CUSTOMER",
      },
    });

    return NextResponse.json(
      { message: "User successfully created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
