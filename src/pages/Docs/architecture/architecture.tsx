import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";

export function ArchitecturePage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">Core Concepts</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">Architecture</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        How Lime DB is structured and how its components work together.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Overview</h2>
        <p className="mb-4 text-muted-foreground">
          Lime DB is a single-package TypeScript library. Everything runs in the
          browser process — no Web Workers, no backend API calls, no cloud
          services.
        </p>
        <div className="rounded-lg border border-border bg-muted/40 p-6 font-mono text-sm">
          <div className="mb-2 text-center text-muted-foreground text-xs uppercase tracking-widest">
            Your application
          </div>
          <div className="mx-auto mb-1 h-px w-px border-border border-l-2" />
          <div className="rounded border border-primary/30 bg-primary/5 px-4 py-3 text-center text-foreground">
            BrowserVectorDB (lime-db)
          </div>
          <div className="mt-1 flex justify-around text-muted-foreground text-xs">
            <span>↙</span>
            <span>↘</span>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 rounded border border-border bg-background px-3 py-2 text-center text-xs">
              <div className="font-medium text-foreground">
                EmbeddingService
              </div>
              <div className="text-muted-foreground">@xenova/transformers</div>
            </div>
            <div className="flex-1 rounded border border-border bg-background px-3 py-2 text-center text-xs">
              <div className="font-medium text-foreground">StorageService</div>
              <div className="text-muted-foreground">IndexedDB</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Core components</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">BrowserVectorDB</h3>
            <p className="text-muted-foreground">
              The main entry point. Orchestrates the embedding and storage
              services. Exposes the public API:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                init
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                addDocument
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                search
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                getDocuments
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                deleteDocument
              </code>
              .
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">EmbeddingService</h3>
            <p className="text-muted-foreground">
              Wraps{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                @xenova/transformers
              </code>{" "}
              to load and run the ONNX sentence transformer model in the
              browser. Converts text strings into 384-dimensional float32
              vectors. The model is downloaded once and cached by the browser.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">StorageService</h3>
            <p className="text-muted-foreground">
              Manages all persistence via the IndexedDB API. Stores document
              chunks alongside their embedding vectors and metadata. Handles
              database versioning and object store creation.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">TextChunker</h3>
            <p className="text-muted-foreground">
              Splits long documents into overlapping chunks before embedding.
              Ensures that documents larger than the model's token limit (512
              tokens) are handled gracefully. See{" "}
              <Link
                className="text-primary hover:underline"
                to="/docs/concepts"
              >
                Chunking & Embeddings
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Data flow</h2>
        <ol className="space-y-3 text-muted-foreground">
          {[
            [
              "addDocument(text)",
              "TextChunker splits text into overlapping chunks",
            ],
            [
              "Chunk embedding",
              "Each chunk is embedded by EmbeddingService into a 384-dim vector",
            ],
            [
              "Persistence",
              "StorageService saves each chunk + its vector + metadata to IndexedDB",
            ],
            [
              "search(query)",
              "Query text is embedded into a vector by EmbeddingService",
            ],
            [
              "Cosine similarity",
              "Query vector is compared to all stored chunk vectors",
            ],
            ["Ranking", "Top-k most similar chunks are returned with scores"],
          ].map(([step, desc], i) => (
            <li className="flex gap-3" key={step}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-xs">
                {i + 1}
              </span>
              <span>
                <strong className="text-foreground">{step}</strong> — {desc}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Technology stack</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Layer</th>
                <th className="px-4 py-3 text-left font-medium">Technology</th>
                <th className="px-4 py-3 text-left font-medium">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Language", "TypeScript", "Type-safe library code"],
                [
                  "ML Runtime",
                  "@xenova/transformers",
                  "Run ONNX models in the browser",
                ],
                ["Model", "all-MiniLM-L6-v2", "Sentence embeddings, 384 dims"],
                ["Persistence", "IndexedDB", "Browser-native key-value store"],
                ["Build", "Vite + Bun", "Library bundling"],
              ].map(([layer, tech, purpose]) => (
                <tr
                  className="border-border border-b last:border-0"
                  key={layer}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {layer}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {tech}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/quick-start"
        >
          <ChevronLeft className="h-4 w-4" />
          Quick Start
        </Link>
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/concepts"
        >
          Chunking & Embeddings
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
