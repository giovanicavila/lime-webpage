# Lime DB — API Reference

## Installation

Lime DB is a browser-only library. Import directly from `src/index.ts` (requires a bundler like Vite):

```ts
import { BrowserVectorDB } from './src/index.ts';
```

---

## `BrowserVectorDB`

The main class. Orchestrates embedding, chunking, and storage.

### Constructor

```ts
new BrowserVectorDB(config?: BrowserVectorDBConfig)
```

#### `BrowserVectorDBConfig`

| Option | Type | Default | Description |
|---|---|---|---|
| `dbName` | `string` | `'browsevec'` | IndexedDB database name |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | HuggingFace model identifier |
| `chunkSize` | `number` | `200` | Max words per chunk |
| `chunkOverlap` | `number` | `30` | Overlapping words between chunks |

```ts
const db = new BrowserVectorDB({
  dbName: 'my-app',
  chunkSize: 150,
  chunkOverlap: 20,
});
```

---

### `init(onProgress?)`

```ts
db.init(onProgress?: ProgressCallback): Promise<BrowserVectorDB>
```

Opens IndexedDB and downloads/caches the ML model. Must be called before any other method. Returns `this` for chaining.

```ts
await db.init((progress) => console.log(progress));
```

The `onProgress` callback receives model download progress events from `@xenova/transformers`. The model (~23 MB) is cached in the browser after the first load.

---

### `addDocument(text, metadata?, collection?)`

```ts
db.addDocument(
  text: string,
  metadata?: Record<string, unknown>,
  collection?: string,
): Promise<AddDocumentResult>
```

Splits `text` into chunks, embeds each one, and persists everything to IndexedDB.

| Parameter | Default | Description |
|---|---|---|
| `text` | — | Full text to index |
| `metadata` | `{}` | Arbitrary key-value data stored alongside the document |
| `collection` | `'default'` | Logical namespace to group documents |

Returns `{ docId: number, chunks: number }`.

```ts
const result = await db.addDocument(
  'TypeScript is a typed superset of JavaScript.',
  { source: 'wikipedia', lang: 'en' },
  'articles',
);
// { docId: 1, chunks: 1 }
```

---

### `search(query, options?)`

```ts
db.search(query: string, options?: SearchOptions): Promise<ChunkResult[]>
```

Embeds `query` and returns the most similar chunks from the collection.

#### `SearchOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `k` | `number` | `5` | Maximum number of results to return |
| `collection` | `string` | `'default'` | Collection to search |
| `threshold` | `number` | `0.0` | Minimum similarity score (0–1) |

#### `ChunkResult`

```ts
interface ChunkResult {
  id: number;
  docId: number;
  collection: string;
  metadata: Record<string, unknown>;
  text: string;       // chunk text
  vector: number[];   // 384-dim embedding
  index: number;      // position within original document
  score: number;      // cosine similarity (0–1, higher = more similar)
}
```

```ts
const results = await db.search('what is TypeScript?', {
  k: 3,
  collection: 'articles',
  threshold: 0.3,
});

for (const r of results) {
  console.log(r.score.toFixed(3), r.text);
}
```

---

### `getDocuments(collection?)`

```ts
db.getDocuments(collection?: string): Promise<DocRecord[]>
```

Returns all documents in a collection (without chunk vectors).

```ts
const docs = await db.getDocuments('articles');
```

---

### `deleteDocument(docId)`

```ts
db.deleteDocument(docId: number): Promise<void>
```

Deletes a document and all its associated chunks.

```ts
await db.deleteDocument(1);
```

---

### `clearCollection(collection?)`

```ts
db.clearCollection(collection?: string): Promise<void>
```

Deletes all documents and chunks in a collection.

```ts
await db.clearCollection('articles');
```

---

### `stats(collection?)`

```ts
db.stats(collection?: string): Promise<StatsResult>
```

Returns document and chunk counts for a collection.

```ts
const s = await db.stats('articles');
// { collection: 'articles', documents: 10, chunks: 47 }
```

---

### `buildContext(results)`

```ts
db.buildContext(results: ChunkResult[]): string
```

Formats search results into a numbered context string, suitable for feeding to an LLM.

```ts
const context = db.buildContext(results);
// [1] (score: 0.912)
// TypeScript is a typed superset of JavaScript.
//
// ---
//
// [2] (score: 0.841)
// ...
```

---

### `ragPrompt(query, results)`

```ts
db.ragPrompt(query: string, results: ChunkResult[]): string
```

Builds a full RAG (Retrieval-Augmented Generation) prompt combining the context and the user's question.

```ts
const prompt = db.ragPrompt('What is TypeScript?', results);
// You are a precise assistant. Use ONLY the context below to answer.
// ...
```

Pass `prompt` directly to any LLM API (OpenAI, Gemini, Ollama, etc.).

---

## Internal modules

These are exported from `src/index.ts` and available for advanced use:

### `Database`

Raw IndexedDB wrapper. Handles `open()`, `addDoc()`, `addChunk()`, `deleteDoc()`, `deleteChunk()`, `getDocsByCollection()`, `getChunksByDoc()`, `getChunksByCollection()`, `clearCollection()`.

### `Embedder`

Wraps `@xenova/transformers`. Use `load()` to initialize, `embed(text)` to get a vector, `Embedder.cosineSimilarity(a, b)` for similarity math.

### `Chunker`

Plain text splitter. `chunk(text)` returns `string[]`.

---

## Full example

```ts
import { BrowserVectorDB } from './src/index.ts';

const db = new BrowserVectorDB({ collection: 'docs' });
await db.init();

// Index documents
await db.addDocument('The Eiffel Tower is in Paris, France.', { id: 'wiki-1' }, 'geo');
await db.addDocument('Mount Fuji is the highest mountain in Japan.', { id: 'wiki-2' }, 'geo');
await db.addDocument('The Amazon river is the largest river by discharge.', { id: 'wiki-3' }, 'geo');

// Search
const results = await db.search('Where is a famous tower?', {
  k: 2,
  collection: 'geo',
  threshold: 0.2,
});

// Build RAG prompt
const prompt = db.ragPrompt('Where is a famous tower?', results);

// Pass prompt to your LLM of choice
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  }),
});
```
