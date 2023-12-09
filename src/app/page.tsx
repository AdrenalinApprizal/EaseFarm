import Home from "./Home";
import { prisma } from "./lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { Field, Humidity, Temperature, User } from "@prisma/client";

interface FieldsProps extends Field {
  temperatures: Temperature[];
  humidities: Humidity[];
}

const page = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) return redirect("/login");

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
  });

  const fields = await prisma.field.findMany({
    include: {
      temperatures: true,
      humidities: true,
    },
  });

  // find fields with harvestTime === "Now!" and take one of them
  const harvestField = fields.filter(
    (field) => field.harvestTime === "Now!"
  )[0];

  // find fields with pest === true and take one of them
  const pestField = fields.filter((field) => field.pest)[0];

  // Convert harvestTime to number and sort fields, if parseInt result is NaN, dianggap 0
  const sortedFields = fields.sort((a, b) => {
    const aHarvestTime = parseInt(a.harvestTime) || 0;
    const bHarvestTime = parseInt(b.harvestTime) || 0;

    return aHarvestTime - bHarvestTime;
  });

  // Take the first field
  const nearestHarvestField = sortedFields[0];

  return (
    <div>
      <Home
        user={user as User}
        harvestField={harvestField as FieldsProps}
        pestField={pestField as FieldsProps}
        nearestHarvestField={nearestHarvestField as FieldsProps}
      />
    </div>
  );
};

export default page;
