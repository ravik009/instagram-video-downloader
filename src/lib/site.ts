import { Metadata } from "next";

export const site = {
  name: "InstaSaver",
  description: "Download Instagram videos, photos, reels, and stories",
  shortName: "InstaSaver",
  url: "https://instasaver.app",
  ogImage: "https://instasaver.app/og.jpg",
  links: {
    twitter: "https://twitter.com/instasaver",
    github: "https://github.com/instasaver",
  },
} as const;

export const siteMetadata: Metadata = {
  title: site.name,
  description: site.description,
  creator: "riad-azz",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    creator: "riad-azz",
    images: [site.ogImage],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/webmanifest.json",
};
