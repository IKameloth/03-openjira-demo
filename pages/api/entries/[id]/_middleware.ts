import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export function middleware(req: NextRequest, res: NextResponse) {
  const id = req.page.params?.id || "";

  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  if (!checkMongoIDRegExp.test(id)) {
    return new Response(JSON.stringify({ message: "Not valid ID " + id }), {
      status: 404,
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
