import {NextResponse, NextRequest} from "next/server";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    await serverAuth(req);
    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
