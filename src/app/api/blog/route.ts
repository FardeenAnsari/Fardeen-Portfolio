import { NextResponse } from "next/server";
import { BLOG_POSTS_META } from "@/lib/data";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ posts: BLOG_POSTS_META, total: BLOG_POSTS_META.length });
}
