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
    <P key="1">When we started building Trashium as our final year project, we had one ambitious goal: make recycling genuinely rewarding for households in West Bengal. Traditional waste management in Indian cities suffers from three critical failures: zero household incentive, unpredictable pricing by informal collectors, and highly inefficient, carbon-heavy collection routes.</P>,
    <P key="2">We realized that simply building another &quot;Uber for Trash&quot; wouldn&apos;t work. The economics of municipal solid waste (MSW) are razor-thin. To make it sustainable, we needed to dramatically reduce collection costs while maximizing the perceived value for the household. This led us to the core philosophy of Trashium: <strong>Gamified Green Credits tied to dynamic ML pricing.</strong></P>,
    <H2 key="h1">The Three-Sided Architecture</H2>,
    <P key="3">Trashium operates as a three-sided marketplace. It connects households, collection crews, and administrative recycling hubs. Building a system that synchronizes state across three distinct user roles in real-time required a robust architecture.</P>,
    <Diagram key="d1" title="Trashium System Architecture" type="architecture" />,
    <P key="4">We chose React Native for the household and crew apps to ensure cross-platform availability, backed by a Node.js/Express monolithic core and PostgreSQL. For real-time updates—such as tracking a collection crew&apos;s location—we implemented WebSockets. This ensures households receive push notifications exactly 5 minutes before the pickup truck arrives, solving the notorious &quot;missed pickup&quot; problem.</P>,
    <H2 key="h2">Designing the Gamification Engine</H2>,
    <P key="5">Human behavior is fascinating. During our beta testing, we found that offering households ₹50 for their plastics resulted in a 12% retention rate. But offering them 500 &quot;Green Credits&quot; (equivalent to ₹50) and a &quot;Bronze Seedling&quot; badge resulted in a 47% retention rate.</P>,
    <P key="6">We built a 20-tier gamification system. Users start as a &quot;Seedling&quot; and can grind their way up to &quot;Earth Guardian.&quot; We implemented streak multipliers with a precise decay formula:</P>,
    <CodeBox key="c1" title="streak_multiplier.ts">
{`function calculateMultiplier(currentStreak: number, lastPickup: Date): number {
  const daysSinceLastPickup = getDaysDifference(lastPickup, new Date());
  
  // Break streak if more than 14 days
  if (daysSinceLastPickup > 14) return 1.0;
  
  // Base formula: 5% bonus per consecutive pickup
  const baseBonus = 0.05 * currentStreak;
  const maxBonus = 0.50; // Cap at 50% extra credits
  
  return 1.0 + Math.min(baseBonus, maxBonus);
}`}
    </CodeBox>,
    <P key="7">Users can also use their Green Credits in the Trashium Marketplace to purchase &quot;Streak Shields&quot; (preventing streak resets during vacations) or redeem them for partnered brand discounts. This closed-loop economy keeps the system engaging without bleeding fiat capital.</P>,
    <H2 key="h3">Route Optimization for Crews</H2>,
    <P key="8">The most expensive part of recycling logistics is fuel. A collection truck driving randomly to fulfill scattered requests will burn more cash than the scrap is worth. We implemented a Nearest-Neighbor algorithm paired with a 2-Opt local search heuristic to calculate the most fuel-efficient route every morning at 4 AM.</P>,
    <P key="9">This optimization reduced total fleet kilometers by 23% during our 5-district pilot in West Bengal. Building Trashium taught us that software isn&apos;t just about code—it&apos;s about manipulating logistics and human psychology to create a net positive for the planet.</P>,
  ],
  "ml-pricing-engine": [
    <P key="1">Pricing recyclables dynamically sounds straightforward until you realize it involves volatile commodity markets, logistics costs, behavioral economics, and real-time fairness guarantees. The scrap metal and plastics market fluctuates daily, meaning fixed pricing models will inevitably lead to marketplace bankruptcy.</P>,
    <P key="2">For Trashium, we couldn&apos;t rely on hardcoded arrays. We needed an engine that could predict fair market value, subtract operational costs, and output a &quot;Green Credit&quot; value that felt rewarding to the user. Thus, our ML Pricing Engine was born.</P>,
    <H2 key="h1">The Prediction Stack</H2>,
    <Diagram key="d1" title="Pricing Prediction Pipeline" type="ml" />,
    <P key="3">We built a three-layer pricing stack. Layer 1 handles market value prediction. We scraped historical scrap commodity prices and trained two models using scikit-learn. Linear Regression on log-transformed market values achieved a Mean Absolute Percentage Error (MAPE) of ~6.11%, while our challenger Random Forest model hit ~9.80% but was better at catching non-linear spikes during market shocks.</P>,
    <H2 key="h2">The Logistics Penalty</H2>,
    <P key="4">Layer 2 handles logistics cost calculation. A household offering 1kg of plastic 10 kilometers away is fundamentally unprofitable compared to a household offering 10kg of plastic 1 kilometer away. We created a dynamic penalty formula:</P>,
    <CodeBox key="c1" title="logistics_cost.py">
{`def calculate_logistics_cost(distance_km, stops_on_route, total_weight_kg):
    BASE_TRANSPORT = 15.0  # Flat truck deployment cost
    COST_PER_KM = 8.5      # Fuel and maintenance
    
    # Prorate the transport cost across all stops on the route
    route_efficiency_factor = max(1, stops_on_route)
    shared_transport_cost = (BASE_TRANSPORT + (COST_PER_KM * distance_km)) / route_efficiency_factor
    
    # Calculate cost per kg
    cost_per_kg = shared_transport_cost / max(0.1, total_weight_kg)
    
    return cost_per_kg`}
    </CodeBox>,
    <P key="5">By subtracting this `cost_per_kg` from the ML predicted market value, we arrive at the absolute maximum payout we can offer without losing money. But we don&apos;t output this raw number.</P>,
    <H2 key="h3">Behavioral Smoothing Guardrails</H2>,
    <P key="6">Layer 3 is the psychological layer. If the ML model says plastic is worth ₹15 today, and tomorrow a market crash drops it to ₹8, users will feel cheated and abandon the platform. Humans hate loss more than they love gains.</P>,
    <P key="7">To fix this, we implemented a 7-day Exponential Moving Average (EMA) guardrail. Prices are allowed to climb quickly during bull markets, but they are artificially slowed down during crashes. We eat the temporary margin loss to preserve user trust, treating the margin difference as a Customer Acquisition Cost (CAC).</P>,
    <P key="8">This engine has processed thousands of pricing requests, ensuring Trashium remains economically viable while households feel they are getting a fair, predictable deal for saving the planet.</P>,
  ],
  "payroll-architecture": [
    <P key="1">VetanFlow was born out of a simple observation: modern small-to-medium enterprises (SMEs) in India are stuck between two extremes. On one end, they use messy Excel sheets and WhatsApp groups to track attendance. On the other end, they are forced to buy bloated, expensive enterprise HRMS software that takes months to implement.</P>,
    <P key="2">We set out to build a lightweight, bank-grade payroll system that just works. The architecture needed to be fault-tolerant—because you absolutely cannot mess up someone&apos;s salary—and fast enough to process bulk payouts for 500+ employees in seconds.</P>,
    <H2 key="h1">The Event-Driven Flow</H2>,
    <Diagram key="d1" title="VetanFlow Payroll Processing" type="flow" />,
    <P key="3">At the heart of VetanFlow is an event-driven architecture. When an employee punches in via the mobile app, the payload includes precise GPS coordinates and a timestamp. Our backend instantly checks these coordinates against a predefined geofence (using PostGIS spatial queries). If they are within 50 meters of the office polygon, the attendance event is logged as valid.</P>,
    <H2 key="h2">Idempotent Salary Processing</H2>,
    <P key="4">The most critical part of VetanFlow is the payroll calculation engine. At the end of the month, the system aggregates all attendance events, calculates overtime, subtracts leave without pay (LWP), applies tax deductions (TDS), and generates a final payout figure.</P>,
    <P key="5">When dealing with money, distributed systems face the dreaded &quot;double-spend&quot; problem. If the network drops while processing a salary, and the admin clicks &quot;Run Payroll&quot; again, you risk paying everyone twice. We solved this by making the payout endpoint strictly idempotent.</P>,
    <CodeBox key="c1" title="payout_service.ts">
{`async function executePayout(companyId: string, month: string, idempotencyKey: string) {
  // 1. Check if this exact operation was already processed
  const existingJob = await db.query(
    'SELECT status FROM payroll_jobs WHERE idempotency_key = $1',
    [idempotencyKey]
  );
  
  if (existingJob && existingJob.status === 'COMPLETED') {
    return { status: 200, message: "Already processed" };
  }

  // 2. Open a database transaction
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    
    // 3. Mark as PROCESSING to lock the row
    await client.query(
      'INSERT INTO payroll_jobs (idempotency_key, status) VALUES ($1, $2)',
      [idempotencyKey, 'PROCESSING']
    );

    // 4. Execute bank API transfers here...
    
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}`}
    </CodeBox>,
    <P key="6">Using an <code>idempotency_key</code> (usually a hash of the company ID and the month string) ensures that even if the client retries the request 100 times due to terrible internet, the database transaction only commits the bank transfer once.</P>,
    <H2 key="h3">Reporting and Export</H2>,
    <P key="7">Finally, we built a robust reporting engine. Using Puppeteer and specialized CSV streaming buffers, VetanFlow can instantly export complex tax compliance reports and PDF payslips. Streaming the CSV chunks directly to the HTTP response, rather than holding 500 rows in server memory, kept our server costs incredibly low.</P>,
    <P key="8">VetanFlow proves that you don&apos;t need a massive team to build enterprise-grade financial software—you just need a maniacal focus on database ACID properties and edge-case handling.</P>,
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
      
      <div className="container-portfolio max-w-3xl mx-auto pt-32 pb-20 relative z-10">
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
