import {NextResponse, NextRequest} from "next/server";
import {without} from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: NextRequest) {
  try {
    const {currentUser} = await serverAuth(req);
    const {movieId} = await req.json();
    const exisitingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!exisitingMovie) throw new Error("Invalid Id");
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {currentUser} = await serverAuth(req);
    const {movieId} = await req.json();
    const exisitingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!exisitingMovie) throw new Error("Invalid Id");

    const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: updatedFavouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {}
}
