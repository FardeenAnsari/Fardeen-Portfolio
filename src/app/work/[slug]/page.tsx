import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECTS } from "@/lib/data";
import { ProjectPageClient } from "./ProjectPageClient";

interface Props {
  params: { slug: string };
}

function getProjectBySlug(slug: string) {
  if (slug === "meneu") {
    return PROJECTS.find((p) => p.id === "restaurantpos");
  }
  return PROJECTS.find((p) => p.id === slug);
}

export async function generateStaticParams() {
  const slugs = PROJECTS.map((p) => ({ slug: p.id }));
  slugs.push({ slug: "meneu" });
  return slugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    openGraph: {
      title: `${project.title} by Fardeen Ansari`,
      description: project.description,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return <ProjectPageClient project={project} />;
}
