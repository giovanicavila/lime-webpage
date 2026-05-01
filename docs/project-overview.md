# Project Overview — Lime DB

## What is Lime DB?

Lime DB is a **vector database that runs entirely inside the browser**. It lets you store text documents, convert them into mathematical representations (vectors/embeddings), and later search through them using natural language — all without a backend server or external database.

Think of it as a lightweight, private, offline-capable semantic search engine that lives in the user's own browser.

---

## Why does this exist?

Traditional databases search by exact keywords. If you search for `"car"`, documents containing only `"automobile"` won't show up.

Vector databases solve this by converting text into numbers that capture **meaning**. Similar meanings produce similar numbers, so searching for `"car"` can surface results about `"automobile"`, `"vehicle"`, or `"driving"`.

Lime DB brings this capability to the browser, enabling:

- AI-powered search in frontend-only apps
- Private document Q&A (data never leaves the device)
- RAG (Retrieval-Augmented Generation) pipelines running client-side
- Offline semantic search

---

## How it works — step by step

```
User text
    │
    ▼
┌─────────┐    splits into     ┌─────────────────────┐
│  Text   │ ─────────────────► │  Chunks (word windows│
│ document│                    │  with overlap)       │
└─────────┘                    └─────────┬───────────┘
                                         │
                                         ▼ embed each chunk
                               ┌─────────────────────┐
                               │  ML Model (ONNX)     │
                               │  Xenova/all-MiniLM   │
                               │  runs in browser     │
                               └─────────┬───────────┘
                                         │
                                         ▼ float32 array (384 dimensions)
                               ┌─────────────────────┐
                               │  IndexedDB           │
                               │  (persistent storage │
                               │   in the browser)    │
                               └─────────────────────┘

Search query
    │
    ▼  embed query
[vector] ──── cosine similarity ────► ranked chunks
```

### 1. Chunking
Long texts are split into smaller overlapping word windows (default: 200 words, 30-word overlap). Overlap prevents context from being lost at chunk boundaries.

### 2. Embedding
Each chunk is passed through a small transformer model (`all-MiniLM-L6-v2`) that produces a 384-dimensional float vector. This model runs locally in the browser via ONNX Runtime Web — no API calls, no internet required after the first load.

### 3. Storage
Vectors and their source text are persisted in **IndexedDB**, the browser's built-in key-value store. Data survives page refreshes.

### 4. Search
A query string is embedded into a vector using the same model, then compared against every stored chunk using **cosine similarity**. Results are ranked by similarity score and the top-k are returned.

---

## Technology stack

| Concern | Technology |
|---|---|
| Language | TypeScript |
| ML / Embeddings | `@xenova/transformers` (ONNX Runtime Web) |
| Model | `Xenova/all-MiniLM-L6-v2` (384-dim, ~23 MB) |
| Storage | IndexedDB (browser native) |
| Build / Dev server | Vite + Bun |

---

## Project structure

```
Lime/
├── src/
│   ├── index.ts        — public exports
│   ├── types.ts        — TypeScript interfaces
│   ├── vector-db.ts    — main BrowserVectorDB class
│   ├── db.ts           — IndexedDB wrapper
│   ├── embedder.ts     — ML model + cosine similarity
│   └── chunker.ts      — text splitting
├── docs/
│   ├── project-overview.md   — this file
│   ├── indexeddb.md          — how IndexedDB works
│   └── lime-db-api.md        — full API reference
└── index.html          — dev/test entrypoint
```
