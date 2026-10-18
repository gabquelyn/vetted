import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RolePage from "@/app/components/RolePage";
import { resolveRoleRoute, roleStaticParams, roleCopy } from "@/app/data/findworkPages";
import { faqsForRoute } from "@/app/data/findworkFaqs";

/**
 * One catch-all route serves all four permanent role URL shapes:
 *   /roles/{cluster}/{profession}
 *   /roles/{cluster}/{profession}/city/{city}
 *   /roles/{cluster}/{profession}/specialty/{specialty}
 *   /roles/{cluster}/{profession}/specialty/{specialty}/city/{city}
 *
 * Only the seeded / approved combinations are generated at build time, and
 * everything else is a 404 (dynamicParams = false) — the same rule the
 * original router enforced with isProfessionCityIndexable() and friends.
 *
 * Query-state on the base page (?specialty=…&location=…) is read on the client
 * inside <RolePage/>, so it does not make these pages dynamic.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return roleStaticParams();
}

// Next 15+: params is a Promise. (On Next 14, `await` on a plain object is harmless.)
type Props = { params: Promise<{ cluster: string; profession: string; rest?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cluster, profession, rest } = await params;
  const route = resolveRoleRoute(cluster, profession, rest ?? []);
  if (!route) return {};
  const copy = roleCopy(route.kind, route.profession, route.specialty, route.city);
  return {
    title: { absolute: copy.title },
    description: copy.description,
    // Query-state variants (?specialty=…, ?location=…) all canonicalise to this bare path.
    alternates: { canonical: copy.canonical },
  };
}

export default async function RoleRoutePage({ params }: Props) {
  const { cluster, profession, rest } = await params;
  const route = resolveRoleRoute(cluster, profession, rest ?? []);
  if (!route) notFound();

  const faqs = faqsForRoute(route.kind, route.profession, route.specialty, route.city);

  return (
    <RolePage
      kind={route.kind}
      professionSlug={route.profession.slug}
      specialtySlug={route.specialty?.slug ?? null}
      citySlug={route.city?.slug ?? null}
      faqs={faqs}
    />
  );
}
