import { prisma } from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  }

  const { email, username } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        email: email,
        username: username,
      },
    });

    return NextResponse.json(
      { message: "User successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
