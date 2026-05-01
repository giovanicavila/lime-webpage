import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs";
import { CodeBlock } from "@/components/code-block/code-block";

const INSTALL_TABS = [
  { value: "npm", label: "npm", code: "npm install lime-db" },
  { value: "pnpm", label: "pnpm", code: "pnpm add lime-db" },
  { value: "bun", label: "bun", code: "bun add lime-db" },
  { value: "yarn", label: "yarn", code: "yarn add lime-db" },
];

export function QuickStartPage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">Getting Started</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">Quick Start</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Set up Lime DB in under two minutes.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Installation</h2>
        <Tabs defaultValue="npm">
          <TabsList className="mb-2">
            <TabsHighlight className="flex gap-1 rounded-lg bg-muted p-1">
              {INSTALL_TABS.map(({ value, label }) => (
                <TabsHighlightItem
                  className="rounded-md"
                  key={value}
                  value={value}
                >
                  <TabsTrigger
                    className="relative z-10 cursor-pointer rounded-md px-3 py-1.5 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:text-foreground"
                    value={value}
                  >
                    {label}
                  </TabsTrigger>
                </TabsHighlightItem>
              ))}
            </TabsHighlight>
          </TabsList>
          <TabsContents>
            {INSTALL_TABS.map(({ value, code }) => (
              <TabsContent key={value} value={value}>
                <CodeBlock code={code} language="bash" />
              </TabsContent>
            ))}
          </TabsContents>
        </Tabs>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">
          1. Initialize the database
        </h2>
        <p className="mb-4 text-muted-foreground">
          Create a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            BrowserVectorDB
          </code>{" "}
          instance and call{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            init()
          </code>
          . The first call downloads the embedding model (~23 MB) and caches it
          in the browser.
        </p>
        <CodeBlock
          code={`import { BrowserVectorDB } from "lime-db";

const db = new BrowserVectorDB({
  dbName: "my-app",   // IndexedDB database name
  model: "Xenova/all-MiniLM-L6-v2", // optional — this is the default
});

await db.init((progress) => {
  console.log(\`Loading model: \${progress.status}\`);
});`}
          language="TypeScript"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">2. Add documents</h2>
        <p className="mb-4 text-muted-foreground">
          Pass any text string, optional metadata, and an optional collection
          name. Long texts are automatically chunked.
        </p>
        <CodeBlock
          code={`await db.addDocument(
  "React is a JavaScript library for building user interfaces.",
  { source: "docs", tags: ["react", "frontend"] },
  "articles",
);

await db.addDocument(
  "Vue.js is the progressive JavaScript framework.",
  { source: "docs" },
  "articles",
);`}
          language="TypeScript"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">3. Search by meaning</h2>
        <p className="mb-4 text-muted-foreground">
          Query returns the top-k most semantically similar document chunks with
          their cosine similarity score (0–1).
        </p>
        <CodeBlock
          code={`const results = await db.search("UI component libraries", {
  k: 5,
  collection: "articles",
  threshold: 0.3, // minimum similarity score
});

for (const result of results) {
  console.log(result.score.toFixed(3), result.text);
  // e.g.: 0.872  "React is a JavaScript library for building user interfaces."
}`}
          language="TypeScript"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">4. Manage documents</h2>
        <CodeBlock
          code={`// List all documents in a collection
const docs = await db.getDocuments("articles");

// Delete a document by ID
await db.deleteDocument(docs[0].id);`}
          language="TypeScript"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Full example</h2>
        <CodeBlock
          code={`import { BrowserVectorDB } from "lime-db";

async function main() {
  const db = new BrowserVectorDB({ dbName: "demo" });
  await db.init();

  await db.addDocument(
    "The quick brown fox jumps over the lazy dog.",
    {},
    "test",
  );
  await db.addDocument(
    "A fast orange canine leaps above a sleepy hound.",
    {},
    "test",
  );

  const results = await db.search("quick animal jumping", {
    k: 2,
    collection: "test",
  });
  console.log(results);
}

main();`}
          language="TypeScript"
        />
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/introduction"
        >
          <ChevronLeft className="h-4 w-4" />
          Introduction
        </Link>
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/architecture"
        >
          Architecture
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
