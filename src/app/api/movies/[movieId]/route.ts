import {NextResponse, NextRequest} from "next/server";
import {without} from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: NextRequest,
  {params}: {params: {movieId: string}}
) {
  try {
    await serverAuth(req);
    const {movieId} = params;

    if (!movieId) throw new Error("Invalid Movie Id");
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) throw new Error("Movie does not exist");
    return NextResponse.json(movie);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
