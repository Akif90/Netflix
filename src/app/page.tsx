"use client";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Home() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  return (
    <>
      <h1 className="text-white text-lg text-center my-5">
        Welcome to Netflix
      </h1>
      <h2 className="text-white text-lg text-center my-5">
        Logged in as: {session?.user?.name}
      </h2>
      <button
        className="w-full rounded-xl bg-slate-500 my-5 hover:bg-neutral-800 h-10 text-white"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </>
  );
}
