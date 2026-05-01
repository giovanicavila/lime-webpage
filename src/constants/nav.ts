export interface NavItem {
  title: string;
  href: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const DOC_NAV: NavSection[] = [
  {
    section: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    section: "Core Concepts",
    items: [
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Chunking & Embeddings", href: "/docs/concepts" },
    ],
  },
  {
    section: "API Reference",
    items: [{ title: "BrowserVectorDB", href: "/docs/api-reference" }],
  },
  {
    section: "Guides",
    items: [{ title: "IndexedDB", href: "/docs/indexeddb" }],
  },
];

export const DOC_NAV_FLAT: NavItem[] = DOC_NAV.flatMap((s) => s.items);
