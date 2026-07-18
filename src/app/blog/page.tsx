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
    <div className="min-h-screen bg-[#DBCBB5] selection:bg-[#4B2E2B] selection:text-[#FFF8F0] relative overflow-hidden font-serif">
      {/* Rusted paper noise texture */}
      <div className="fixed inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
      {/* Brown vignette/burn edges */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#4B2E2B]/10 via-transparent to-[#4B2E2B]/20 pointer-events-none z-0" />
      
      <div className="container-portfolio max-w-4xl mx-auto space-y-16 pt-32 pb-24 relative z-10">
        {/* Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FFF8F0] bg-[#4B2E2B] rounded-sm">Writing</span>
          <h1 className="text-4xl lg:text-5xl font-black text-[#1F120D] mt-4 tracking-tight">
            Engineering <span className="font-serif italic text-[#8C5A3C]">Insights</span>
          </h1>
          <p className="text-[#3D271D] max-w-xl text-lg leading-relaxed font-serif">
            Deep dives into system design, machine learning pipelines, full-stack patterns, and the craft of building great software.
          </p>
        </div>

        {/* Featured posts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-serif text-[#1F120D] italic">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-7 border-2 border-[#4B2E2B]/20 hover:border-[#4B2E2B] hover:bg-[#4B2E2B]/5 transition-all rounded-lg group bg-[#FFF8F0]/30 backdrop-blur-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFF8F0] bg-[#4B2E2B] rounded-sm">{post.category}</span>
                  <ArrowUpRight size={16} className="text-[#8C5A3C] group-hover:text-[#1F120D] transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F120D] group-hover:text-[#8C5A3C] transition-all leading-snug mb-3 font-serif">
                    {post.title}
                  </h3>
                  <p className="text-[#3D271D] text-sm leading-relaxed line-clamp-3 font-serif">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#4B2E2B] pt-4 border-t border-[#4B2E2B]/20 font-mono">
                  <span>{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* More articles */}
        {others.length > 0 && (
          <div className="space-y-6 pt-8 border-t-2 border-[#4B2E2B]/20">
            <h2 className="text-2xl font-bold font-serif text-[#1F120D] italic">More Articles</h2>
            <div className="divide-y-2 divide-[#4B2E2B]/10">
              {others.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-start justify-between gap-4 py-6 group hover:bg-[#4B2E2B]/5 px-4 rounded-lg transition-colors -mx-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#4B2E2B] border border-[#4B2E2B]/30 rounded-sm">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-[#1F120D] group-hover:text-[#8C5A3C] transition-all font-serif">
                      {post.title}
                    </h3>
                    <p className="text-[#3D271D] text-sm line-clamp-1 font-serif">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-[#4B2E2B] font-mono pt-1">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-[#8C5A3C] group-hover:text-[#1F120D] transition-colors flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
