import { prisma } from "@/app/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { fieldId: string } }
) {
  const { fieldId } = params;

  if (!fieldId) {
    return NextResponse.json(
      { error: "fieldId not provided" },
      { status: 400 }
    );
  }

  const {
    waterSystem,
    fertilizerSystem,
    isReadyToHarvest,
    isHarvested,
    isConfirmed,
    isRejected,
    harvestStatus,
  } = await req.json();

  try {
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
    });

    if (!field) {
      return NextResponse.json({ error: "field not found" }, { status: 404 });
    }

    await prisma.field.update({
      where: { id: fieldId },
      data: {
        waterSystem: waterSystem,
        fertilizerSystem: fertilizerSystem,
        isReadyToHarvest: isReadyToHarvest,
        isHarvested: isHarvested,
        isConfirmed: isConfirmed,
        isRejected: isRejected,
        harvestStatus: harvestStatus,
      },
    });

    return NextResponse.json(
      { message: "Field successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating field:", error);
    return NextResponse.json(
      { error: "Error updating field" },
      { status: 500 }
    );
  }
}
