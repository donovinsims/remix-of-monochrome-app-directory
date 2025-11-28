import { Metadata } from "next";

/**
 * Utility functions for generating metadata
 */

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

/**
 * Generate standard page metadata
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(
  type: "WebSite" | "ItemList" | "SoftwareApplication",
  data: Record<string, any>
) {
  const baseUrl = "https://remix-of-monochrome-app-directory.vercel.app";

  const schemas = {
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "App Directory",
      description:
        "Curated directory of iOS & macOS apps, workflows, repositories, and MCPs",
      url: baseUrl,
      ...data,
    },
    ItemList: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      ...data,
    },
    SoftwareApplication: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      ...data,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas[type]),
      }}
    />
  );
}
