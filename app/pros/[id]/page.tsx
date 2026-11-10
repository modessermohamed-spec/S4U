import { notFound } from "next/navigation";
import { DEMO_PROS, getDemoPro } from "@/lib/data";
import ProfileView from "./ProfileView";

export function generateStaticParams() {
  return DEMO_PROS.map((p) => ({ id: p.id }));
}

export default async function ProPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pro = getDemoPro(id);
  if (!pro) notFound();
  return <ProfileView pro={pro} />;
}
