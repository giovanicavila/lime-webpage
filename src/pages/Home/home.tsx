import { ArrowRight, /* Github */ Lock, Search, Wifi, Zap } from "lucide-react";
import { Link } from "react-router";
import { CodeBlock } from "@/components/code-block/code-block";
import { LimeLogo } from "@/components/lime-logo/lime-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QUICK_EXAMPLE = `import { BrowserVectorDB } from "lime-db";

const db = new BrowserVectorDB({ dbName: "my-app" });
await db.init();

// Index a document
await db.addDocument(
  "TypeScript is a typed superset of JavaScript.",
  { source: "wiki" },
  "articles",
);

// Search by meaning
const results = await db.search("what is TypeScript?", {
  k: 3,
  collection: "articles",
});

console.log(results[0].score, results[0].text);`;

const FEATURES = [
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find documents by meaning, not exact keywords. Powered by transformer embeddings running locally.",
  },
  {
    icon: Lock,
    title: "Privacy-First",
    description:
      "Data never leaves the device. Everything — embeddings, search, storage — runs in the browser.",
  },
  {
    icon: Wifi,
    title: "Offline-Capable",
    description:
      "Built on IndexedDB. Documents persist across page refreshes with zero network dependency.",
  },
  {
    icon: Zap,
    title: "Zero Backend",
    description:
      "No server, no API keys, no configuration. Drop it into any frontend project and go.",
  },
];

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-20 text-center sm:pt-32">
        <Badge className="mb-6" variant="secondary">
          v0.1 · Browser-native
        </Badge>
        <h1 className="mb-6 font-bold text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          The Browser-Native
          <br />
          <span className="text-primary">Vector Database</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Store, embed, and search documents using natural language — entirely
          in the browser. No backend required.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/docs/introduction">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://github.com/lime-db/lime-db"
              rel="noreferrer"
              target="_blank"
            >
              {/* <Github className="mr-2 h-4 w-4" /> */}
              View on GitHub
            </a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-border border-t bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-3 text-center font-bold text-2xl sm:text-3xl">
            Built for the browser
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Every feature designed to work entirely client-side.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon
                    aria-hidden="true"
                    className="mb-4 h-8 w-8 text-primary"
                  />
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code example */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-3 text-center font-bold text-2xl sm:text-3xl">
          Simple API
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          Three methods to index and search your documents.
        </p>
        <CodeBlock code={QUICK_EXAMPLE} language="TypeScript" />
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/docs/quick-start">
              Read the full guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-muted-foreground text-sm sm:flex-row">
          <div className="flex items-center gap-2">
            <LimeLogo size={18} />
            <span>Lime DB</span>
          </div>
          <p>Released under the MIT License. Built for the open web.</p>
        </div>
      </footer>
    </>
  );
}
