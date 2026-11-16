import { Metadata } from "next";
import { SpaceInvaders } from "@/components/game/SpaceInvaders";
import LineSidebar from "@/components/navigation/LineSidebar";

export const metadata: Metadata = {
  title: "Blog — Coming Soon",
  description: "While you wait for the engineering insights, defend the earth!",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-rule)] selection:text-[var(--color-ink)] relative overflow-x-clip font-body flex flex-col items-center">
      {/* Left Sidebar Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
        <LineSidebar />
      </div>

      <div className="container max-w-5xl mx-auto space-y-10 pt-16 md:pt-28 pb-24 px-6 relative z-10 flex flex-col items-center text-center">
        {/* Header */}
        <div className="space-y-4">
          <div className="section-label mx-auto">Technical Writing</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-ink)] font-display tracking-tight">
            Engineering Insights
          </h1>
          <p className="text-[var(--color-ink-2)] max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            The blog is being recalibrated for in-depth system architecture and ML case studies. 
            In the meantime, take a brief retro break with Space Invaders below.
          </p>
        </div>

        {/* Space Invaders Game */}
        <div className="w-full">
          <SpaceInvaders />
        </div>
      </div>
    </div>
  );
}
