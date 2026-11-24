import type { Metadata } from "next";
import { SitePage, pages } from "@/components/sites/toketukcanarias/Pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: pages[slug].title };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <SitePage slug={slug} />;
}
