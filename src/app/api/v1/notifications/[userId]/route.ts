import { prisma } from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = (await getServerSession(authOptions)) as Session;

  // Route protection
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await prisma.notification.updateMany({
      where: {
        user: {
          id: params.userId,
        },
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json(
      { message: "Successfully read all notification" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Error updating notification" },
      { status: 500 }
    );
  }
}
