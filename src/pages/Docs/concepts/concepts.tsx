import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { CodeBlock } from "@/components/code-block/code-block";

export function ConceptsPage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">Core Concepts</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">
        Chunking &amp; Embeddings
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        How Lime DB converts text into searchable vectors.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Why embeddings?</h2>
        <p className="mb-4 text-muted-foreground">
          Computers can't natively compare the <em>meaning</em> of two
          sentences. But they can compare numbers. Embeddings solve this by
          representing text as a list of floating-point numbers — a{" "}
          <strong className="text-foreground">vector</strong> — where texts with
          similar meanings produce vectors that are close to each other in
          high-dimensional space.
        </p>
        <p className="text-muted-foreground">
          Lime DB uses a sentence transformer model (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            all-MiniLM-L6-v2
          </code>
          ) that produces 384-dimensional vectors. This model runs entirely in
          the browser via ONNX Runtime Web — no API calls, no server.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">What is chunking?</h2>
        <p className="mb-4 text-muted-foreground">
          The embedding model has a maximum token limit of 512 tokens (~300–400
          words). Documents longer than this must be split into smaller pieces —
          called <strong className="text-foreground">chunks</strong> — before
          embedding.
        </p>
        <p className="mb-4 text-muted-foreground">
          Chunks are created with overlap so that context is preserved at the
          boundaries. For example, with a chunk size of 200 and overlap of 20,
          the first chunk covers tokens 0–199, the second covers 180–379, and so
          on.
        </p>

        <div className="rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs">
          <div className="mb-2 text-muted-foreground">
            Document (600 tokens)
          </div>
          <div className="relative h-8 rounded bg-muted">
            <div className="absolute top-0 left-0 h-full w-[34%] rounded-l border border-primary/50 bg-primary/30" />
            <div className="absolute top-0 left-[30%] h-full w-[34%] border border-primary/30 bg-primary/20" />
            <div className="absolute top-0 left-[60%] h-full w-[40%] rounded-r border border-primary/50 bg-primary/30" />
          </div>
          <div className="mt-2 flex justify-between text-muted-foreground">
            <span>Chunk 1</span>
            <span>Chunk 2 (overlap)</span>
            <span>Chunk 3</span>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Configuring chunking</h2>
        <p className="mb-4 text-muted-foreground">
          Adjust chunk size and overlap when creating the database:
        </p>
        <CodeBlock
          code={`const db = new BrowserVectorDB({
  dbName: "my-app",
  chunkSize: 200,     // tokens per chunk (default: 500)
  chunkOverlap: 20,   // tokens to overlap between chunks (default: 50)
});`}
          language="TypeScript"
        />
        <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <p className="mb-1 font-medium">Guidelines</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Small chunks (100–200)
              </strong>
              : precise results, more storage, better for Q&amp;A
            </li>
            <li>
              <strong className="text-foreground">
                Large chunks (400–500)
              </strong>
              : more context per result, better for summarisation tasks
            </li>
            <li>
              <strong className="text-foreground">
                Overlap (10–15% of chunk)
              </strong>
              : prevents losing context at boundaries
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Cosine similarity</h2>
        <p className="mb-4 text-muted-foreground">
          When you call{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            search(query)
          </code>
          , Lime DB:
        </p>
        <ol className="mb-4 space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-primary">1.</span>
            Embeds the query text into a vector
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">2.</span>
            Computes the cosine similarity between the query vector and every
            stored chunk vector
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-primary">3.</span>
            Returns the top-k chunks sorted by similarity score
          </li>
        </ol>
        <p className="text-muted-foreground">
          Cosine similarity ranges from{" "}
          <strong className="text-foreground">0</strong> (completely unrelated)
          to <strong className="text-foreground">1</strong> (identical). A
          threshold of{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            0.3
          </code>{" "}
          is a good starting point for most use cases.
        </p>
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/architecture"
        >
          <ChevronLeft className="h-4 w-4" />
          Architecture
        </Link>
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/api-reference"
        >
          API Reference
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
