import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { BLOG_POSTS_META } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import React from "react";

interface Props {
  params: { slug: string };
}

// Helper for ink-style headings and diagrams
const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-serif font-bold text-[#1F120D] mt-12 mb-6 border-b border-[#1F120D]/20 pb-2 relative z-10">{children}</h2>;
const P = ({ children }: { children: React.ReactNode }) => <p className="text-[#3D271D] leading-relaxed text-xl md:text-[22px] text-pretty relative z-10 mb-8 font-serif">{children}</p>;
const CodeBox = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="my-10 p-6 rounded-lg bg-[#2A1B14] text-[#E6CBA8] font-mono text-sm shadow-xl relative z-10 border border-[#4B2E2B]/50">
    <div className="text-xs text-[#E6CBA8]/50 mb-3 border-b border-[#E6CBA8]/20 pb-2">{title}</div>
    <pre className="whitespace-pre-wrap leading-relaxed">{children}</pre>
  </div>
);
const Diagram = ({ title, type }: { title: string, type: 'architecture' | 'flow' | 'ml' }) => (
  <div className="my-12 p-8 rounded-xl bg-[#EFE3D5] border-2 border-[#8C5A3C]/30 shadow-inner relative z-10 flex flex-col items-center justify-center min-h-[300px]">
    <div className="text-sm uppercase tracking-widest text-[#8C5A3C] mb-6 font-bold">{title}</div>
    {type === 'architecture' && (
      <div className="w-full max-w-lg flex flex-col gap-4 text-[#2A1B14] font-mono text-center text-sm">
        <div className="p-3 border-2 border-[#8C5A3C] border-dashed rounded bg-[#FFF8F0]">Client (Next.js App)</div>
        <div className="w-0.5 h-6 bg-[#8C5A3C] mx-auto" />
        <div className="p-3 border-2 border-[#8C5A3C] rounded bg-[#FFF8F0]">API Gateway (Vercel)</div>
        <div className="flex justify-center gap-8">
          <div className="w-px h-8 bg-[#8C5A3C]" />
          <div className="w-px h-8 bg-[#8C5A3C]" />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="p-3 border-2 border-[#8C5A3C] rounded bg-[#E6CBA8]">PostgreSQL (Supabase)</div>
          <div className="p-3 border-2 border-[#8C5A3C] rounded bg-[#E6CBA8]">ML Model (Python/FastAPI)</div>
        </div>
      </div>
    )}
    {type === 'ml' && (
      <div className="w-full max-w-md flex flex-col gap-2 text-[#2A1B14] font-mono text-center text-sm">
        <div className="flex justify-between items-center bg-[#FFF8F0] p-3 border-2 border-[#8C5A3C] rounded">
          <span>Scrap Market API</span> <span className="text-xl">→</span>
        </div>
        <div className="flex justify-between items-center bg-[#FFF8F0] p-3 border-2 border-[#8C5A3C] rounded">
          <span>Logistics Cost</span> <span className="text-xl">→</span>
        </div>
        <div className="flex justify-between items-center bg-[#FFF8F0] p-3 border-2 border-[#8C5A3C] rounded">
          <span>Historical Payouts</span> <span className="text-xl">→</span>
        </div>
        <div className="w-0.5 h-6 bg-[#8C5A3C] mx-auto" />
        <div className="p-4 bg-[#8C5A3C] text-[#FFF8F0] rounded font-bold">Random Forest Regressor</div>
        <div className="w-0.5 h-6 bg-[#8C5A3C] mx-auto" />
        <div className="p-3 border-2 border-[#8C5A3C] rounded bg-[#E6CBA8] font-bold">Dynamic Payout Price (₹)</div>
      </div>
    )}
    {type === 'flow' && (
      <div className="flex items-center gap-4 text-[#2A1B14] font-mono text-sm font-bold flex-wrap justify-center">
        <div className="p-4 border-2 border-[#8C5A3C] rounded-full w-24 h-24 flex items-center justify-center bg-[#FFF8F0]">Punch In</div>
        <div className="h-0.5 w-8 bg-[#8C5A3C]" />
        <div className="p-4 border-2 border-[#8C5A3C] rounded bg-[#FFF8F0]">Geofence Validate</div>
        <div className="h-0.5 w-8 bg-[#8C5A3C]" />
        <div className="p-4 border-2 border-[#8C5A3C] rounded bg-[#FFF8F0]">Payroll Engine</div>
        <div className="h-0.5 w-8 bg-[#8C5A3C]" />
        <div className="p-4 border-2 border-[#8C5A3C] rounded bg-[#E6CBA8]">Salary Credit</div>
      </div>
    )}
  </div>
);

const BLOG_CONTENT: Record<string, React.ReactNode[]> = {
  "building-trashium": [
    <P key="1">When we started building Trashium, our goal was to make recycling genuinely rewarding for households in West Bengal. Traditional waste management in Indian cities suffers from zero household incentive and highly inefficient, carbon-heavy collection routes.</P>,
    <P key="2">We realized that simply building another &quot;Uber for Trash&quot; wouldn&apos;t work. To make it sustainable, we needed to dramatically reduce collection costs while maximizing the perceived value for the household. This led us to the core philosophy of Trashium: <strong>Gamified Green Credits tied to dynamic ML pricing.</strong></P>,
    <H2 key="h1">The Technology Stack</H2>,
    <P key="3">Trashium connects households, collection crews, and administrative recycling hubs using a robust modern stack. We built the platform on Next.js 16 (App Router) and React 19, backed by Supabase for Auth and PostgreSQL.</P>,
    <Diagram key="d1" title="Trashium System Architecture" type="architecture" />,
    <P key="4">Rather than managing a complex Node.js monolith, we utilized React Server Components (RSC) with a strict Server-Client component split. The UI leverages Tailwind CSS v4, Framer Motion v12, and OGL WebGL Ribbons for a tactile &quot;Editorial Botanical&quot; design.</P>,
    <H2 key="h2">Designing the Gamification Engine</H2>,
    <P key="5">We built a 20-tier gamification system in `lib/gamification.ts`. Users start as a &quot;Seedling&quot; and can grind their way up to &quot;Earth Guardian.&quot; We implemented a Daily Grove Ritual (Log In, Sort Waste, Eco-Quiz) with a streak multiplier formula:</P>,
    <CodeBox key="c1" title="streak_multiplier.ts">
{`function calculateMultiplier(currentStreak: number): number {
  // Base formula: 5% bonus per consecutive pickup
  const baseBonus = 0.05 * currentStreak;
  
  return 1.0 + baseBonus;
}`}
    </CodeBox>,
    <P key="7">Users can also use their Green Credits in the Trashium Marketplace to purchase &quot;Streak Shields&quot; (preventing streak resets) or redeem them for partnered brand discounts. A PostgreSQL RPC `redeem_marketplace_item` safely handles stock validation and credit subtraction.</P>,
    <H2 key="h3">Route Optimization for Crews</H2>,
    <P key="8">To solve the logistics cost problem, we implemented Pathfinder Route Optimization using Nearest-Neighbor and 2-opt algorithms. Pickups are auto-geocoded to their sector centers, and the crew&apos;s interactive map (built with Leaflet) calculates the shortest sequence of stops.</P>,
    <P key="9">Building Trashium taught us how to seamlessly integrate Next.js, ML pipelines, and behavioral psychology to create a net positive for the planet.</P>,
  ],
  "ml-pricing-engine": [
    <P key="1">Pricing recyclables dynamically sounds straightforward until you realize it involves volatile commodity markets, logistics costs, behavioral economics, and real-time fairness guarantees.</P>,
    <P key="2">For Trashium, we couldn&apos;t rely on hardcoded arrays. We needed an engine that could predict fair market value, subtract operational costs, and output a &quot;Green Credit&quot; value that felt rewarding to the user. Thus, our Python ML Pricing Engine was born.</P>,
    <H2 key="h1">The Prediction Stack</H2>,
    <Diagram key="d1" title="Pricing Prediction Pipeline" type="ml" />,
    <P key="3">We built a sophisticated prediction pipeline using scikit-learn. Our production model uses Linear Regression on log-transformed market values, achieving a Mean Absolute Percentage Error (MAPE) of ~6.11%. We also run a Random Forest challenger model (~9.80% MAPE) to sanity-check predictions during non-linear market shocks.</P>,
    <H2 key="h2">The Logistics Penalty</H2>,
    <P key="4">Logistics costs are deterministically calculated. A household offering 1kg of plastic 10 kilometers away is fundamentally unprofitable compared to a household offering 10kg of plastic 1 kilometer away. The penalty is calculated as:</P>,
    <CodeBox key="c1" title="pricing.py">
{`def calculate_logistics_cost(distance_km, expected_stops, total_weight_kg):
    BASE_TRANSPORT = 15.0  # Flat truck deployment cost
    COST_PER_KM = 8.5      # Fuel and maintenance
    
    # Prorate the transport cost across all stops on the route
    shared_transport_cost = (BASE_TRANSPORT + (COST_PER_KM * distance_km)) / expected_stops
    
    # Calculate cost per kg
    cost_per_kg = shared_transport_cost / max(0.1, total_weight_kg)
    
    return cost_per_kg`}
    </CodeBox>,
    <P key="5">By subtracting this `cost_per_kg` (along with a 15% platform commission) from the ML predicted market value, we arrive at the absolute maximum payout we can offer without losing money.</P>,
    <H2 key="h3">Behavioral Smoothing Guardrails</H2>,
    <P key="6">If the ML model says plastic is worth ₹15 today, and tomorrow a market crash drops it to ₹8, users will feel cheated. To fix this, we implemented an Exponential Moving Average (EMA) guardrail. Prices are allowed to climb quickly during bull markets, but they are artificially slowed down during crashes, preserving user trust.</P>,
  ],
  "payroll-architecture": [
    <P key="1">VetanFlow was born out of a simple observation: modern small-to-medium enterprises (SMEs) in India are stuck between two extremes. On one end, they use messy Excel sheets. On the other end, they are forced to buy bloated enterprise HRMS software.</P>,
    <P key="2">We set out to build a lightweight, bank-grade payroll operations platform. Built with React 19, Express 5, and Supabase, it handles employee setup, time data, approvals, and payroll in one controlled monthly workflow.</P>,
    <H2 key="h1">Role-Based Control</H2>,
    <Diagram key="d1" title="VetanFlow Payroll Processing" type="flow" />,
    <P key="3">VetanFlow supports six distinct application roles: Owner, Admin, HR, Finance, Manager, and Employee. This isn&apos;t just about disabling UI buttons—it&apos;s a strict backend authorization model. The Express API checks the Bearer token, resolves the organizational role, and executes RLS-scoped reads or validated service writes.</P>,
    <H2 key="h2">Maker-Checker & Immutability</H2>,
    <P key="4">The most critical part of VetanFlow is the payroll calculation engine. HR maintains attendance, holidays, and locks the source month. Finance creates a run only from a locked month.</P>,
    <P key="5">To prevent fraud and errors, we enforce maker-checker separation. A maker submits the draft payroll, but a different authorized operator must approve and finalize it. Once finalized, Postgres triggers reject any mutations to the payroll data.</P>,
    <CodeBox key="c1" title="payroll_trigger.sql">
{`CREATE OR REPLACE FUNCTION prevent_finalized_edits()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'finalized' THEN
    RAISE EXCEPTION 'Cannot modify finalized payroll records';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`}
    </CodeBox>,
    <P key="6">This ensures that once a salary snapshot is approved, it becomes completely immutable at the database level.</P>,
    <H2 key="h3">Secure Document Delivery</H2>,
    <P key="7">Finally, VetanFlow securely handles sensitive documents. The backend generates one PDF per payroll line and uploads it to a private Supabase Storage bucket. Employees can only access their own payslips via short-lived signed URLs, protecting privacy across the organization.</P>,
    <P key="8">VetanFlow proves that you don&apos;t need a massive team to build enterprise-grade financial software—you just need a maniacal focus on database ACID properties, strict Role-Based Access Control, and clean architecture.</P>,
  ],
};

export async function generateStaticParams() {
  return BLOG_POSTS_META.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Fardeen Ansari`,
    description: `Read about ${post.title} on Fardeen Ansari's engineering blog.`,
  };
}

export default function BlogPost({ params }: Props) {
  const post = BLOG_POSTS_META.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const content = BLOG_CONTENT[params.slug];

  return (
    <div className="min-h-screen bg-[#DBCBB5] selection:bg-[#4B2E2B] selection:text-[#FFF8F0] relative overflow-hidden font-serif">
      {/* Rusted paper noise texture */}
      <div className="fixed inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
      {/* Brown vignette/burn edges */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#4B2E2B]/10 via-transparent to-[#4B2E2B]/20 pointer-events-none z-0" />
      
      <div className="container-portfolio max-w-3xl mx-auto pt-40 pb-20 relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#4B2E2B] font-medium mb-12 hover:text-[#C08552] transition-colors border border-[#4B2E2B]/20 rounded-full px-4 py-1.5 bg-[#FFF8F0]/30 backdrop-blur-sm"
        >
          <ArrowLeft size={16} />
          Back to Journal
        </Link>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FFF8F0] bg-[#4B2E2B] rounded-sm">{post.category}</span>
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#4B2E2B] border border-[#4B2E2B]/30 rounded-sm">{tag}</span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#1F120D] leading-[1.1] tracking-tight py-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-5 text-sm text-[#4B2E2B] border-b-2 border-[#4B2E2B]/20 pb-8 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4B2E2B] flex items-center justify-center text-[#FFF8F0] text-xs font-bold">FA</div>
              <span className="font-bold">Fardeen Ansari</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
          </div>
        </div>

        <div className="mt-12 mb-20">
          {content}
        </div>

        <div className="pt-12 border-t-2 border-[#4B2E2B]/20 space-y-6">
          <h3 className="text-2xl font-bold font-serif text-[#1F120D] italic">Continue Reading</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {BLOG_POSTS_META.filter((p) => p.slug !== params.slug).slice(0, 2).map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="block p-6 border-2 border-[#4B2E2B]/20 hover:border-[#4B2E2B] hover:bg-[#4B2E2B]/5 transition-all rounded-lg group bg-[#FFF8F0]/30 backdrop-blur-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C5A3C] mb-3 block">{related.category}</span>
                <h4 className="text-lg font-bold text-[#1F120D] group-hover:text-[#8C5A3C] transition-colors line-clamp-2 leading-snug">{related.title}</h4>
                <p className="text-xs text-[#4B2E2B] mt-4 font-mono">{related.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
