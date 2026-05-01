import { Outlet } from "react-router";
import { DocSidebar } from "@/components/doc-sidebar/doc-sidebar";

export function DocLayout() {
  return (
    <div className="flex min-h-screen">
      <DocSidebar />
      <main className="flex-1 md:pl-64">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
