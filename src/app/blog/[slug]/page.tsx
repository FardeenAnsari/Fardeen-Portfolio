import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { BLOG_POSTS_META } from "@/lib/data";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

const BLOG_CONTENT: Record<string, string[]> = {
  "building-trashium": [
    "When we started building Trashium as our final year project, we had one ambitious goal: make recycling genuinely rewarding for households in West Bengal.",
    "Traditional waste management in Indian cities suffers from three critical failures: zero household incentive (residents see no benefit from proper segregation), unpredictable pricing (kabadiwallas offer inconsistent rates), and inefficient collection routes.",
    "We built Trashium as a three-sided marketplace connecting households, collection crews, and administrators — powered by Green Credits, ML pricing, and route optimization.",
    "The gamification system features 20 eco-tiers from Seedling to Earth Guardian, streak multipliers with formula Multiplier = 1 + (0.05 × streak_days), 15 unique achievement badges, and streak shields purchasable in the marketplace.",
    "The hardest engineering challenge was pricing. We built a nightly Python pipeline using Linear Regression (MAPE ~6.11%) as primary and Random Forest (MAPE ~9.80%) as challenger, with a moving average guardrail to prevent sharp price drops that destroy user trust.",
    "Collection crews receive optimized routes using nearest-neighbor + 2-opt improvement — reducing carbon emissions and fuel costs across 5 districts in West Bengal.",
    "Building Trashium taught us that gamification only works when the underlying value proposition is genuine. Green Credits mean nothing if the payout calculation isn't fair and transparent. Every design decision was anchored in real behavioral economics.",
  ],
  "ml-pricing-engine": [
    "Pricing recyclables dynamically sounds straightforward until you realize it involves volatile commodity markets, logistics costs, behavioral economics, and real-time fairness guarantees.",
    "We built a three-layer pricing stack. Layer 1 is market value prediction using scikit-learn. Linear Regression on log-transformed market values achieved MAPE ~6.11%, while Random Forest hit ~9.80%.",
    "Layer 2 handles logistics cost calculation: logistics_cost = (BASE_TRANSPORT + COST_PER_KM × distance) / (STOPS_PER_RUN × weight). This ensures payouts scale fairly regardless of collection efficiency.",
    "Layer 3 is a moving average guardrail. Sudden 40% price drops destroy user trust. The guardrail prevents cold-start failures and sharp downward spikes that would erode confidence in the platform.",
    "The pipeline runs nightly via a cron job, updating prices for 5 waste types across 5 West Bengal districts. Each update is logged with confidence intervals so the admin dashboard shows trend direction.",
    "One unexpected lesson: explainability matters more than accuracy. Households needed to understand why prices changed, not just see a number. So we added price trend cards showing weekly movement and seasonal factors.",
  ],
  "ai-development-learning": [
    "In the rapidly evolving landscape of software engineering, artificial intelligence tools like GitHub Copilot and conversational LLMs have fundamentally changed how we write code. They offer unprecedented speed, allowing developers to scaffold applications in hours rather than days.",
    "However, this speed comes with a hidden risk: knowledge decay. When an AI writes the boilerplate, configuration, and even the core logic for you, it becomes alarmingly easy to treat the underlying system as a black box.",
    "The true value of an engineer isn't typing speed; it's the ability to design robust architectures, debug complex edge cases, and understand the deep technical implications of a technical choice. If you rely solely on AI to generate code you don't understand, you aren't engineering — you are just prompting.",
    "To use AI effectively while retaining and expanding your knowledge, you must adopt a 'Trust, but Verify and Dissect' approach. When an AI generates a solution, don't just accept it and move on. Read every line. Ask yourself: Why did it choose this design pattern? What are the security implications? How would I write a unit test for this?",
    "Furthermore, AI should be treated as an interactive pair programmer and tutor. Instead of asking 'Write a script to do X', try asking 'Explain the best practices for implementing X in this framework, and give me a small example'. This forces you to engage with the concepts and internalize the knowledge, rather than just copying and pasting.",
    "Ultimately, the goal is to leverage AI to handle the mundane tasks — the boilerplate, the syntax formatting, the repetitive CRUD operations — freeing your cognitive load to focus on the hard engineering problems: system architecture, data modeling, performance optimization, and user experience.",
    "By maintaining a strong foundational understanding of the technologies you use, and using AI as a multiplier rather than a crutch, you can achieve both incredible development velocity and deep technical mastery."
  ],
};

export async function generateStaticParams() {
  return BLOG_POSTS_META.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const paragraphs = BLOG_CONTENT[params.slug] || [post.excerpt, "Full article coming soon."];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-bg-primary">
      <div className="container-portfolio max-w-2xl space-y-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-sans tracking-wide uppercase">
          ← Back to Blog
        </Link>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="tech-badge">{post.category}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="tech-badge">{tag}</span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-primary leading-[1.1]">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-muted border-b border-border-subtle pb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">FA</div>
              <span>Fardeen Ansari</span>
            </div>
            <span className="flex items-center gap-1"><Calendar size={13} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{post.readTime}</span>
          </div>
        </div>

        <div className="space-y-8 font-serif">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-primary leading-loose text-xl md:text-[22px] text-pretty">{para}</p>
          ))}
        </div>

        <div className="pt-8 border-t border-border-subtle space-y-4">
          <h3 className="font-semibold text-primary">More Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {BLOG_POSTS_META.filter((p) => p.slug !== params.slug).slice(0, 2).map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="glass-card p-4 border border-border-subtle hover:border-border-default group">
                <span className="tech-badge mb-2 inline-block">{related.category}</span>
                <h4 className="text-sm font-semibold text-primary group-hover:text-gradient transition-all line-clamp-2">{related.title}</h4>
                <p className="text-xs text-muted mt-1">{related.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
