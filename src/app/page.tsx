"use client";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";

export default function Home() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });
  return (
    <>
      <Navbar />
      <BillBoard />
    </>
  );
}
