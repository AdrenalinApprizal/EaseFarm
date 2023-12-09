import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const produk = await prisma.produk.findMany({
            // ini orderby nama lahan aja
            orderBy: {
                jenisBrg: "asc"
            }
        })

        const { searchParams } = new URL(request.url)
        console.log(request.url)
        const searchQuery = searchParams.get("q") || ""

        const filteredProduk = produk.filter(##ini nama schema nya) => {
            return produk.namaBrg.toLowerCase().includes(searchQuery?.toLowerCase() || "")
        })

        return NextResponse.json(filteredProduk , {status: 200})
    } catch (error: any) {

        return NextResponse.json(error, {status: 500})
    }
}