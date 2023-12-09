import DetailedField from "./detailField";
import { prisma } from "@/app/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { Field, FieldArea, Humidity, Temperature } from "@prisma/client";

interface FieldsProps extends Field {
  temperatures: Temperature[];
  humidities: Humidity[];
  fieldArea?: FieldArea;
}

const DetailField = async ({ params }: { params: { fieldsID: string } }) => {
  const session = (await getServerSession(authOptions)) as Session;

  if (!session) return redirect("/login");

  const field = await prisma.field.findUnique({
    where: {
      id: params.fieldsID,
    },
    include: {
      temperatures: true,
      humidities: true,
      fieldArea: true,
    },
  });

  return (
    <div>
      <DetailedField field={field as FieldsProps} />
    </div>
  );
};
export default DetailField;
