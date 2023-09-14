import {NextResponse, NextRequest} from "next/server";
import {without} from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest) {
  try {
    const {currentUser} = await serverAuth(req);
    const favourteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });

    return NextResponse.json(favourteMovies);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
