# IndexedDB — How It Works

## What is IndexedDB?

IndexedDB is a **low-level key-value database built into every modern browser**. Unlike `localStorage` (which is limited to ~5 MB and only stores strings), IndexedDB can store:

- Structured objects (plain JS objects, arrays)
- Binary data (ArrayBuffer, Blob)
- Large amounts of data (quota is typically 60%+ of disk space)
- Data that persists across page refreshes and browser restarts

It is the only browser-native storage that is suitable for storing large, structured datasets like vectors.

---

## Core concepts

### Database
A named container for all your data. You open it with a version number. When the version increases, you can run migrations in the `onupgradeneeded` event.

```ts
const req = indexedDB.open('my-database', 1);
req.onupgradeneeded = (e) => { /* create stores here */ };
req.onsuccess = (e) => { const db = e.target.result; };
```

### Object Store
Equivalent to a **table** in SQL or a **collection** in MongoDB. Each store has a `keyPath` (like a primary key) or uses auto-incremented keys.

```ts
// inside onupgradeneeded
const store = db.createObjectStore('docs', { keyPath: 'id', autoIncrement: true });
```

### Index
A secondary key you can query by. Indexes are created inside `onupgradeneeded` and allow efficient lookups without scanning every record.

```ts
store.createIndex('collection', 'collection', { unique: false });
```

### Transaction
Every read or write must happen inside a **transaction**. Transactions are scoped to one or more object stores and have a mode:
- `'readonly'` — for reads
- `'readwrite'` — for writes

```ts
const tx = db.transaction('docs', 'readwrite');
const store = tx.objectStore('docs');
store.add({ text: 'hello', collection: 'test' });
```

---

## The event-based API

IndexedDB is fully **asynchronous** but uses events (callbacks) instead of Promises. Every request returns an `IDBRequest` object:

```ts
const req = store.get(1);
req.onsuccess = () => console.log(req.result);
req.onerror   = () => console.error(req.error);
```

This is why most real-world code wraps IndexedDB in Promises:

```ts
function get(db: IDBDatabase, id: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const req = db.transaction('docs', 'readonly').objectStore('docs').get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}
```

---

## Cursors

To iterate over multiple records (e.g. delete all records matching a condition), you use a **cursor**:

```ts
const req = store.index('collection').openCursor(IDBKeyRange.only('test'));
req.onsuccess = (e) => {
  const cursor = e.target.result;
  if (cursor) {
    cursor.delete();   // delete this record
    cursor.continue(); // move to next
  }
  // cursor is null when iteration is done
};
```

---

## How Lime DB uses IndexedDB

Lime DB maintains two object stores inside the `browsevec` database:

### `docs` store

Stores one record per document added by the user.

| Field | Type | Description |
|---|---|---|
| `id` | `number` (auto) | Primary key |
| `text` | `string` | Full original text |
| `metadata` | `object` | User-supplied metadata |
| `collection` | `string` | Logical namespace |
| `createdAt` | `number` | Unix timestamp |
| `chunkCount` | `number` | How many chunks were created |

Index: `collection`

### `chunks` store

Stores one record per text chunk, including its embedding vector.

| Field | Type | Description |
|---|---|---|
| `id` | `number` (auto) | Primary key |
| `docId` | `number` | Reference to `docs.id` |
| `collection` | `string` | Logical namespace |
| `metadata` | `object` | Inherited from parent doc |
| `text` | `string` | Chunk text |
| `vector` | `number[]` | 384-dimension embedding |
| `index` | `number` | Chunk position within doc |

Indexes: `docId`, `collection`

---

## Limitations

| Limitation | Detail |
|---|---|
| **No cross-tab transactions** | Each tab has its own connection; concurrent writes can conflict |
| **No full-text search** | IndexedDB has no built-in query language; scans are O(n) |
| **Synchronous API unavailable** | Everything is async/event-based |
| **Storage quota** | Browser-managed; user can revoke it |
| **No server access** | Purely client-side; data does not sync automatically |

The O(n) scan limitation is relevant for Lime DB: every search loads **all chunks** from the collection into memory and computes cosine similarity one by one. This works well for thousands of chunks but would need an index structure (e.g. HNSW) for millions.
