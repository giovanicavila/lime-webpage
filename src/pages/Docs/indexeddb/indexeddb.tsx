import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import { CodeBlock } from "@/components/code-block/code-block";

export function IndexedDBPage() {
  return (
    <article>
      <p className="mb-2 font-medium text-primary text-sm">Guides</p>
      <h1 className="mb-4 font-bold text-3xl tracking-tight">IndexedDB</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        How Lime DB uses the browser's IndexedDB API for persistent storage.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">What is IndexedDB?</h2>
        <p className="mb-4 text-muted-foreground">
          IndexedDB is a low-level, browser-native API for storing large amounts
          of structured data persistently on the client device. Unlike
          localStorage, it supports complex objects, binary data, and is
          asynchronous — making it suitable for storing embedding vectors
          (arrays of floats).
        </p>
        <p className="text-muted-foreground">
          Lime DB uses IndexedDB as its primary storage engine. Data written
          with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            addDocument
          </code>{" "}
          persists across page refreshes and browser restarts, as long as the
          user does not clear browser data.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Database schema</h2>
        <p className="mb-4 text-muted-foreground">
          Lime DB creates one IndexedDB database (named via the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            dbName
          </code>{" "}
          config option) with a single object store:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            chunks
          </code>
          .
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Field</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["id", "string", "Unique chunk identifier"],
                ["docId", "string", "Parent document ID"],
                ["collection", "string", "Collection name"],
                ["text", "string", "Chunk text content"],
                [
                  "embedding",
                  "Float32Array",
                  "384-dimensional embedding vector",
                ],
                ["metadata", "object", "User-supplied document metadata"],
                ["createdAt", "number", "Unix timestamp (ms)"],
              ].map(([field, type, desc]) => (
                <tr
                  className="border-border border-b last:border-0"
                  key={field}
                >
                  <td className="px-4 py-3 font-mono text-foreground">
                    {field}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {type}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Inspecting data</h2>
        <p className="mb-4 text-muted-foreground">
          You can inspect the raw data in Chrome DevTools under{" "}
          <strong className="text-foreground">
            Application → Storage → IndexedDB
          </strong>
          . Look for the database name you passed to{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            BrowserVectorDB
          </code>
          .
        </p>
        <p className="text-muted-foreground">
          The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            embedding
          </code>{" "}
          field will show as a binary buffer — this is normal. The 384 float32
          values are serialized as a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            Float32Array
          </code>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Storage usage</h2>
        <p className="mb-4 text-muted-foreground">
          Each document chunk requires approximately:
        </p>
        <ul className="mb-4 space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              <strong className="text-foreground">~1.5 KB</strong> for the 384 ×
              4 byte embedding vector
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              <strong className="text-foreground">Variable</strong> storage for
              the text content and metadata
            </span>
          </li>
        </ul>
        <p className="text-muted-foreground">
          A typical document of 1,000 words produces 3–5 chunks, using roughly
          8–10 KB of storage.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Limitations</h2>
        <div className="space-y-3">
          {[
            [
              "No full-text index",
              "Lime DB performs a linear scan over all stored vectors when searching. For large datasets (10,000+ chunks), performance may degrade. Future versions will add ANN indexing.",
            ],
            [
              "Storage quota",
              "Browsers allow IndexedDB to use a percentage of available disk space (typically 60%+). Very large datasets may encounter quota errors.",
            ],
            [
              "Browser-only",
              "IndexedDB is not available in Node.js or server-side environments. Lime DB is designed exclusively for browser use.",
            ],
            [
              "No sync",
              "Data is local to the device and browser. It is not synced across devices or user sessions.",
            ],
          ].map(([title, desc]) => (
            <div className="rounded-lg border border-border p-4" key={title}>
              <p className="mb-1 font-semibold text-foreground">{title}</p>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-semibold text-xl">Clearing the database</h2>
        <p className="mb-4 text-muted-foreground">
          To remove all data for a Lime DB instance, you can delete the
          IndexedDB database via the browser DevTools or programmatically:
        </p>
        <CodeBlock
          code={`// Delete the entire IndexedDB database
indexedDB.deleteDatabase("my-app");`}
          language="TypeScript"
        />
      </section>

      <div className="flex items-center justify-between border-border border-t pt-8">
        <Link
          className="flex items-center gap-2 font-medium text-primary text-sm hover:underline"
          to="/docs/api-reference"
        >
          <ChevronLeft className="h-4 w-4" />
          API Reference
        </Link>
        <span />
      </div>
    </article>
  );
}
