import { NextRequest, NextResponse } from "next/server";
import { BLOG_POSTS_META } from "@/lib/data";

export const dynamic = "force-static";

export function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
