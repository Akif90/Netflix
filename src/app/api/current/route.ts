import {NextResponse, NextRequest} from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const {currentUser} = await serverAuth(req);

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json(error);
  }
}
