import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    { message: "Blog admin API is not available in this deployment. Content is managed via src/lib/data/index.ts." },
    { status: 501 }
  );
}
