import bcrypt from "bcrypt";
import {NextResponse, NextRequest} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const {email, name, password} = await req.json();
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return NextResponse.json({error: "Email Taken", status: 400});

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
