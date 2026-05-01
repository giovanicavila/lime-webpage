import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { CodeBlock } from "@/components/code-block/code-block";

export function IntroductionPage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">Getting Started</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">Introduction</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Lime DB is a vector database that runs entirely inside the browser,
        enabling semantic search without a backend.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">What is Lime DB?</h2>
        <p className="mb-4 text-muted-foreground">
          Traditional databases search by exact keywords. If you search for{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "car"
          </code>
          , documents containing only{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "automobile"
          </code>{" "}
          won't show up.
        </p>
        <p className="text-muted-foreground">
          Lime DB solves this by converting text into numerical vectors that
          capture <strong className="text-foreground">meaning</strong>. Similar
          meanings produce similar vectors, so searching for{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "car"
          </code>{" "}
          can surface results about{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "automobile"
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "vehicle"
          </code>
          , or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            "driving"
          </code>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Key capabilities</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong className="text-foreground">Semantic search</strong> —
              find by meaning, not keywords
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong className="text-foreground">Browser-native</strong> — no
              backend, no server, no API keys
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong className="text-foreground">Offline-capable</strong> —
              data persists in IndexedDB across refreshes
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong className="text-foreground">Privacy-first</strong> — data
              never leaves the device
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>
              <strong className="text-foreground">RAG-ready</strong> — ideal for
              client-side retrieval-augmented generation pipelines
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Technology stack</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Concern</th>
                <th className="px-4 py-3 text-left font-medium">Technology</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Language", "TypeScript"],
                ["ML / Embeddings", "@xenova/transformers (ONNX Runtime Web)"],
                ["Model", "Xenova/all-MiniLM-L6-v2 (384-dim, ~23 MB)"],
                ["Storage", "IndexedDB (browser native)"],
                ["Build", "Vite + Bun"],
              ].map(([concern, tech]) => (
                <tr
                  className="border-border border-b last:border-0"
                  key={concern}
                >
                  <td className="px-4 py-3 text-foreground">{concern}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {tech}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Quick look</h2>
        <CodeBlock
          code={`const db = new BrowserVectorDB();
await db.init();
await db.addDocument("TypeScript is a typed superset of JavaScript.");
const results = await db.search("what is TypeScript?");
console.log(results[0].text);`}
          language="TypeScript"
        />
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <span />
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/quick-start"
        >
          Quick Start
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
