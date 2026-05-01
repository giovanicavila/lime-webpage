import { DocNavList } from "@/components/doc-nav-list/doc-nav-list";

export function DocSidebar() {
  return (
    <aside
      aria-label="Documentation sidebar"
      className="fixed top-16 bottom-0 left-0 z-40 hidden w-64 overflow-y-auto border-border border-r bg-background px-4 py-6 md:block"
    >
      <DocNavList />
    </aside>
  );
}
