/**
 * JSON-LD schema.org builders (spec Phase 4).
 *
 * Rules enforced here:
 *  - ONE graph per page: every page composes its nodes and renders a single
 *    <JsonLdGraph nodes={[...]}/> (see src/components/seo/json-ld.tsx).
 *  - Stable @id anchors: `{origin}/#organization`, `#website`, and per page
 *    `{pageUrl}#webpage`, `{pageUrl}#breadcrumb`. Cross-references use @id.
 *  - The Organization node is emitted ONCE (root layout). Pages must never
 *    re-emit an Organization - reference `${SITE_URL}/#organization` by @id.
 *  - All URLs absolute https. `<` and `>` escaped at serialisation time.
 */
import { SITE_URL, siteUrlFor } from "@/lib/site-url";
import { ORG } from "@/lib/data/organization";
import type { ProgramPillar, CommunityWard } from "@/lib/data/organization";
import type { Faq } from "@/lib/data/faqs";
import type { LearnArticle } from "@/lib/data/learn";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_URL = `${SITE_URL}${ORG.logo}`;

type Node = Record<string, unknown>;

/* ── Organization (NGO) — emitted once, in the root layout ─────────────── */
export function organizationNode(): Node {
  return {
    "@type": "NGO",
    "@id": ORG_ID,
    name: ORG.legalName,
    alternateName: [...ORG.alternateName],
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 800,
      height: 800,
      caption: ORG.logoAlt,
    },
    image: LOGO_URL,
    description: ORG.description,
    slogan: ORG.slogan,
    foundingDate: ORG.foundingDate,
    nonprofitStatus: "https://schema.org/NonprofitType",
    email: ORG.email,
    telephone: ORG.phone ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.address.street ?? undefined,
      addressLocality: ORG.address.locality,
      addressRegion: ORG.address.region,
      postalCode: ORG.address.postalCode ?? undefined,
      addressCountry: ORG.address.country,
    },
    ...(ORG.geo ? { geo: { "@type": "GeoCoordinates", latitude: ORG.geo.lat, longitude: ORG.geo.lng } } : {}),
    areaServed: {
      "@type": "City",
      name: ORG.areaServedCity,
      containedInPlace: { "@type": "Country", name: "Kenya" },
    },
    knowsAbout: [...ORG.knowsAbout],
    knowsLanguage: [...ORG.knowsLanguage],
    sameAs: [...ORG.sameAs],
    contactPoint: ORG.contactPoint.map((cp) => ({
      "@type": "ContactPoint",
      contactType: cp.contactType,
      email: cp.email,
      ...(cp.telephone ? { telephone: cp.telephone } : {}),
      areaServed: cp.areaServed,
      availableLanguage: [...cp.availableLanguage],
    })),
    // Founder / employee Person nodes are added ONLY after written human
    // confirmation (R1). See PENDING_HUMAN_INPUT in organization.ts.
    identifier:
      ORG.registrationNumber != null
        ? {
            "@type": "PropertyValue",
            propertyID: "KE-CBO-Registration",
            value: ORG.registrationNumber,
          }
        : undefined,
  };
}

/* ── WebSite — emitted once, in the root layout ────────────────────────── */
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: ORG.legalName,
    alternateName: ORG.displayName,
    description: ORG.description,
    inLanguage: ["en-KE", "sw-KE"],
    publisher: { "@id": ORG_ID },
    // No SearchAction: no real site search exists yet (spec 4.2).
  };
}

/* ── WebPage + Breadcrumb ──────────────────────────────────────────────── */
export interface Crumb {
  name: string;
  path: string;
}

export function webPageNode(opts: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage" | "FAQPage" | "ItemPage";
  datePublished?: string;
  dateModified?: string;
  breadcrumbHasOwnNode?: boolean;
}): Node {
  const url = siteUrlFor(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-KE",
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.type === "AboutPage" || opts.type === "ContactPage"
      ? { mainEntity: { "@id": ORG_ID } }
      : {}),
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  const url = siteUrlFor(path);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteUrlFor(c.path),
    })),
  };
}

/* ── Service (program pillar) ──────────────────────────────────────────── */
export function serviceNode(program: ProgramPillar): Node {
  const url = siteUrlFor(`/programs/${program.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `${program.name} Program`,
    serviceType: program.serviceType,
    description: program.summary,
    url,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Nairobi County, Kenya",
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Young women",
      suggestedMinAge: 15,
      suggestedMaxAge: 25,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: ORG.phone ?? undefined,
      servicePostalAddress: {
        "@type": "PostalAddress",
        addressLocality: ORG.address.locality,
        addressCountry: ORG.address.country,
      },
    },
    isRelatedTo: {
      "@type": "Service",
      name: "BINTI Rising Initiative Youth Empowerment Programs",
    },
  };
}

/* ── Course (hasOfferCatalog entry used on /programs) ──────────────────── */
export function offerCatalogNode(programs: ProgramPillar[]): Node {
  return {
    "@type": "OfferCatalog",
    "@id": `${siteUrlFor("/programs")}#catalog`,
    name: "BINTI Rising Program Pillars",
    itemListElement: programs.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${p.name} Program`,
        url: siteUrlFor(`/programs/${p.slug}`),
        description: p.summary,
      },
      priceCurrency: "KES",
      price: 0,
      priceSpecification: {
        "@type": "PriceSpecification",
        price: 0,
        priceCurrency: "KES",
        valueAddedTaxIncluded: true,
      },
      availability: "https://schema.org/InStock",
      eligibleCustomerType: "https://schema.org/EligibleCustomerType",
    })),
  };
}

/* ── FAQPage ───────────────────────────────────────────────────────────── */
export function faqPageNode(faqs: Faq[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${siteUrlFor("/faqs")}#faqpage`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/* ── Article (learn guides, stories) ───────────────────────────────────── */
export function articleNode(opts: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  wordCount: number;
  image?: string;
  authorName: string;
}): Node {
  const url = siteUrlFor(opts.path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: {
      "@type": "Organization",
      name: opts.authorName,
      url: siteUrlFor("/about"),
    },
    publisher: { "@id": ORG_ID },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    wordCount: opts.wordCount,
    inLanguage: "en-KE",
    image: opts.image ?? LOGO_URL,
  };
}

/* ── DefinedTermSet (SRHR glossary - high leverage for AI extraction) ──── */
export function definedTermSetNode(articles: LearnArticle[]): Node {
  const terms = articles.flatMap((a) =>
    a.blocks
      .filter((b): b is Extract<LearnArticle["blocks"][number], { type: "term" }> => b.type === "term")
      .map((b) => ({
        "@type": "DefinedTerm",
        name: b.term,
        description: b.definition,
        inDefinedTermSet: undefined as string | undefined,
      }))
  );
  return {
    "@type": "DefinedTermSet",
    "@id": `${siteUrlFor("/learn")}#definedtermset`,
    name: "BINTI Rising Glossary: SRHR, Mental Health and Money Terms for Young Women",
    url: siteUrlFor("/learn"),
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      inDefinedTermSet: `${siteUrlFor("/learn")}#definedtermset`,
    })),
  };
}

/* ── ItemList (communities, stories, learn hubs) ───────────────────────── */
export function itemListNode(opts: {
  path: string;
  name: string;
  items: { name: string; path: string }[];
}): Node {
  return {
    "@type": "ItemList",
    "@id": `${siteUrlFor(opts.path)}#itemlist`,
    name: opts.name,
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: siteUrlFor(it.path),
    })),
  };
}

/* ── Place (community ward page) ───────────────────────────────────────── */
export function communityNode(ward: CommunityWard): Node {
  const url = siteUrlFor(`/communities/${ward.slug}`);
  return {
    "@type": "Place",
    "@id": `${url}#place`,
    name: `${ward.name}, Nairobi`,
    description: ward.description,
    url,
    ...(ward.lat != null && ward.lng != null
      ? { geo: { "@type": "GeoCoordinates", latitude: ward.lat, longitude: ward.lng } }
      : {}),
    containedInPlace: {
      "@type": "City",
      name: "Nairobi",
      sameAs: "https://en.wikipedia.org/wiki/Nairobi",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: ward.name,
      addressRegion: ORG.address.region,
      addressCountry: ORG.address.country,
    },
  };
}

/* ── DonateAction (donation page) ──────────────────────────────────────── */
export function donateActionNode(): Node {
  return {
    "@type": "DonateAction",
    "@id": `${siteUrlFor("/get-involved/donate")}#donate`,
    name: "Donate to BINTI Rising Initiative",
    recipient: { "@id": ORG_ID },
    url: siteUrlFor("/get-involved/donate"),
    description:
      "Support BINTI Rising Initiative's free programs for young women aged 15-25 in Nairobi, Kenya. Contact info@bintirising.org to give via M-Pesa or bank transfer.",
    // Payment methods published only after finance-confirmed details
    // (PENDING_HUMAN_INPUT). Email is the verified channel today.
    potentialUse: "One-time and recurring donations, KES.",
  };
}

/* ── Graph helpers ─────────────────────────────────────────────────────── */

/**
 * Site-level nodes: Organization + WebSite. Composed into EVERY page's
 * single graph via fullPageGraph() - never emitted as a separate block.
 */
export function siteGraph(): Node[] {
  return [organizationNode(), websiteNode()];
}

/**
 * Full per-page graph (spec 4.1): Organization + WebSite + the page's own
 * nodes, serialised as ONE {"@context","@graph":[...]} script per page.
 * Stable @ids mean the Organization node is the SAME entity on every page
 * (never a competing duplicate).
 */
export function fullPageGraph(pageNodes: Node[]): Node[] {
  return [...siteGraph(), ...pageNodes];
}

/** Standard per-page pair: WebPage + BreadcrumbList. */
export function pageGraph(opts: {
  path: string;
  title: string;
  description: string;
  type?: Parameters<typeof webPageNode>[0]["type"];
  crumbs: Crumb[];
  extra?: Node[];
}): Node[] {
  return [
    webPageNode(opts),
    breadcrumbNode(opts.path, opts.crumbs),
    ...(opts.extra ?? []),
  ];
}
