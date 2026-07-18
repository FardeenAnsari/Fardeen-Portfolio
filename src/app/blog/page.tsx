import { Metadata } from "next";
import { SpaceInvaders } from "@/components/game/SpaceInvaders";
import LineSidebar from "@/components/navigation/LineSidebar";

export const metadata: Metadata = {
  title: "Blog — Coming Soon",
  description: "While you wait for the engineering insights, defend the earth!",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#DBCBB5] selection:bg-[#4B2E2B] selection:text-[#FFF8F0] relative overflow-hidden font-serif flex flex-col items-center">
      {/* Left Sidebar Navigation */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:block">
        <LineSidebar />
      </div>

      {/* Rusted paper noise texture */}
      <div className="fixed inset-0 opacity-40 mix-blend-multiply pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
      
      {/* Brown vignette/burn edges */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#4B2E2B]/10 via-transparent to-[#4B2E2B]/20 pointer-events-none z-0" />
      
      <div className="container-portfolio max-w-5xl mx-auto space-y-12 pt-16 md:pt-32 pb-24 px-6 md:px-12 lg:pl-32 xl:pl-12 relative z-10 flex flex-col items-center text-center">
        {/* Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#FFF8F0] bg-[#4B2E2B] rounded-sm">Writing</span>
          <h1 className="text-4xl lg:text-5xl font-black text-[#1F120D] mt-4 tracking-tight">
            Engineering <span className="font-serif italic text-[#8C5A3C]">Insights</span>
          </h1>
          <p className="text-[#3D271D] max-w-xl mx-auto text-lg leading-relaxed font-serif">
            The blog is currently being recalibrated. While you wait for deep dives into system design and machine learning, why not save the world?
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
