import Fields from "./Fields";
import { prisma } from "../lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { Field, Humidity, Temperature } from "@prisma/client";

interface FieldsProps extends Field {
  temperatures: Temperature[];
  humidities: Humidity[];
}

const page = async () => {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) return redirect("/login");

  const fields = await prisma.field.findMany({
    include: {
      temperatures: true,
      humidities: true,
    },
  });

  return (
    <div>
      <Fields fields={fields as FieldsProps[]} />
    </div>
  );
};

export default page;
