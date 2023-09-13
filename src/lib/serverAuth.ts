import {NextRequest} from "next/server";
import {NextApiRequest} from "next";
import {getServerSession} from "next-auth";
import {getSession} from "next-auth/react";
import prismadb from "@/lib/prismadb";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const serverAuth = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Not Signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) throw new Error("Not signed in");
  return {currentUser};
};

export default serverAuth;
