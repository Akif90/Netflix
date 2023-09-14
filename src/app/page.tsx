"use client";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavourite from "@/hooks/useFavourite";

export default function Home() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  const {data: movies = []} = useMovieList();
  const {data: favourites = []} = useFavourite();
  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favourites} />
      </div>
    </>
  );
}
