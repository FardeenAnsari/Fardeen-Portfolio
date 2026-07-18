import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECTS } from "@/lib/data";
import { ProjectPageClient } from "./ProjectPageClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.id === params.slug);
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
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) notFound();

  return <ProjectPageClient project={project} />;
}
