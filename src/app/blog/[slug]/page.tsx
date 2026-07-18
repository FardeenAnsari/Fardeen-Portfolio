import { redirect } from "next/navigation";

export default function BlogPostPage() {
  // Temporarily disabled individual blogs while the game is active
  redirect("/blog");
}
