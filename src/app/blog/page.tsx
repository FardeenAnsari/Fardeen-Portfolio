import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { BLOG_POSTS_META } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Engineering Insights",
  description: "Thoughts on full-stack engineering, system design, machine learning, and building products with craft.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS_META.filter((p) => p.featured);
  const others = BLOG_POSTS_META.filter((p) => !p.featured);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container-portfolio space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="section-label">Writing</span>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4">
            Engineering{" "}
            <span className="font-serif italic text-gradient">Insights</span>
          </h1>
          <p className="text-secondary max-w-xl">
            Deep dives into system design, machine learning pipelines, full-stack patterns, and the craft of building great software.
          </p>
        </div>

        {/* Featured posts */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-primary">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-7 border border-border-subtle hover:border-border-default group block space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="tech-badge">{post.category}</span>
                  <ArrowUpRight size={16} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary group-hover:text-gradient transition-all leading-snug mb-2">
                    {post.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted pt-2 border-t border-border-subtle">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* More articles */}
        {others.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">More Articles</h2>
            <div className="divide-y divide-border-subtle">
              {others.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-start justify-between gap-4 py-5 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tech-badge text-xs">{tag}</span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-primary group-hover:text-gradient transition-all">
                      {post.title}
                    </h3>
                    <p className="text-secondary text-sm line-clamp-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-muted group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
