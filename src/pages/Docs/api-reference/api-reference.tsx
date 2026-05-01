import { ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { CodeBlock } from "@/components/code-block/code-block";
import { Badge } from "@/components/ui/badge";

interface MethodProps {
  name: string;
  signature: string;
  description: string;
  params?: Array<{ name: string; type: string; description: string }>;
  returns?: string;
  example: string;
}

function MethodSection({
  name,
  signature,
  description,
  params,
  returns,
  example,
}: MethodProps) {
  return (
    <div className="mb-10 overflow-hidden rounded-lg border border-border">
      <div className="border-border border-b bg-muted/50 px-4 py-3">
        <h3 className="font-mono font-semibold text-base text-foreground">
          {name}
        </h3>
        <p className="mt-0.5 font-mono text-muted-foreground text-sm">
          {signature}
        </p>
      </div>
      <div className="space-y-4 px-4 py-4">
        <p className="text-muted-foreground">{description}</p>

        {params && params.length > 0 && (
          <div>
            <p className="mb-2 font-semibold text-foreground text-sm">
              Parameters
            </p>
            <div className="space-y-2">
              {params.map((p) => (
                <div
                  className="flex flex-col gap-0.5 sm:flex-row sm:gap-3"
                  key={p.name}
                >
                  <code className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
                    {p.name}
                  </code>
                  <Badge className="w-fit" variant="outline">
                    {p.type}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    {p.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {returns && (
          <div>
            <p className="mb-1 font-semibold text-foreground text-sm">
              Returns
            </p>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
              {returns}
            </code>
          </div>
        )}

        <div>
          <p className="mb-2 font-semibold text-foreground text-sm">Example</p>
          <CodeBlock code={example} language="TypeScript" />
        </div>
      </div>
    </div>
  );
}

export function ApiReferencePage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">API Reference</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">
        BrowserVectorDB
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Full API reference for the{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
          BrowserVectorDB
        </code>{" "}
        class.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Constructor</h2>
        <p className="mb-4 text-muted-foreground">
          Creates a new database instance. All options are optional.
        </p>
        <CodeBlock
          code={`import { BrowserVectorDB } from "lime-db";

const db = new BrowserVectorDB(config?: BrowserVectorDBConfig);`}
          language="TypeScript"
        />
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Option</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "dbName",
                  "string",
                  '"lime-vector-db"',
                  "IndexedDB database name",
                ],
                [
                  "model",
                  "string",
                  '"Xenova/all-MiniLM-L6-v2"',
                  "Hugging Face model identifier",
                ],
                ["chunkSize", "number", "500", "Tokens per chunk"],
                [
                  "chunkOverlap",
                  "number",
                  "50",
                  "Overlap tokens between chunks",
                ],
              ].map(([opt, type, def, desc]) => (
                <tr className="border-border border-b last:border-0" key={opt}>
                  <td className="px-4 py-3 font-mono text-foreground">{opt}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {type}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {def}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-semibold text-xl">Methods</h2>

        <MethodSection
          description="Loads the embedding model into memory. Must be called before addDocument or search. The model is cached by the browser after the first download (~23 MB)."
          example={`await db.init((progress) => {
  if (progress.status === "progress") {
    console.log(\`\${progress.file}: \${progress.progress?.toFixed(1)}%\`);
  }
});`}
          name="init"
          params={[
            {
              name: "onProgress",
              type: "(progress: ProgressInfo) => void",
              description:
                "Optional callback to track model download progress. Receives an object with status, name, file, progress, loaded, and total fields.",
            },
          ]}
          returns="Promise<void>"
          signature="init(onProgress?: (progress: ProgressInfo) => void): Promise<void>"
        />

        <MethodSection
          description="Chunks, embeds, and stores a document in IndexedDB. Returns the document ID. Long texts are automatically split into overlapping chunks — each chunk gets its own embedding."
          example={`const docId = await db.addDocument(
  "React is a library for building user interfaces.",
  { source: "docs", tags: ["react"] },
  "articles",
);
console.log(docId); // "doc_abc123"`}
          name="addDocument"
          params={[
            {
              name: "text",
              type: "string",
              description: "The document content to store and index.",
            },
            {
              name: "metadata",
              type: "Record<string, unknown>",
              description:
                "Optional key-value metadata attached to all chunks of this document.",
            },
            {
              name: "collection",
              type: "string",
              description:
                'Optional collection name for namespacing. Defaults to "default".',
            },
          ]}
          returns="Promise<string>"
          signature="addDocument(text: string, metadata?: Record<string, unknown>, collection?: string): Promise<string>"
        />

        <MethodSection
          description="Embeds the query and returns the top-k most semantically similar document chunks, sorted by descending similarity score."
          example={`const results = await db.search("JavaScript framework", {
  k: 3,
  collection: "articles",
  threshold: 0.3,
});

// Each result: { id, text, score, metadata, docId, collection }
for (const r of results) {
  console.log(r.score.toFixed(3), r.text);
}`}
          name="search"
          params={[
            {
              name: "query",
              type: "string",
              description: "Natural language query text.",
            },
            {
              name: "options.k",
              type: "number",
              description: "Number of results to return. Default: 5.",
            },
            {
              name: "options.collection",
              type: "string",
              description: "Restrict search to a specific collection.",
            },
            {
              name: "options.threshold",
              type: "number",
              description:
                "Minimum cosine similarity score (0–1) to include a result.",
            },
          ]}
          returns="Promise<SearchResult[]>"
          signature="search(query: string, options?: SearchOptions): Promise<SearchResult[]>"
        />

        <MethodSection
          description="Returns all stored documents, optionally filtered by collection."
          example={`const docs = await db.getDocuments("articles");
console.log(docs.length);`}
          name="getDocuments"
          params={[
            {
              name: "collection",
              type: "string",
              description: "Optional collection name to filter by.",
            },
          ]}
          returns="Promise<Document[]>"
          signature="getDocuments(collection?: string): Promise<Document[]>"
        />

        <MethodSection
          description="Deletes a document and all its chunks from IndexedDB."
          example={`const docs = await db.getDocuments();
await db.deleteDocument(docs[0].id);`}
          name="deleteDocument"
          params={[
            {
              name: "docId",
              type: "string",
              description: "The document ID returned by addDocument.",
            },
          ]}
          returns="Promise<void>"
          signature="deleteDocument(docId: string): Promise<void>"
        />
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/concepts"
        >
          <ChevronLeft className="h-4 w-4" />
          Chunking &amp; Embeddings
        </Link>
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/indexeddb"
        >
          IndexedDB Guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
