import { Outlet } from "react-router";
import { DocHeader } from "@/components/doc-header/doc-header";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DocHeader />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
}
