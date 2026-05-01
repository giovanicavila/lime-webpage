import { Navigate, Route, Routes } from "react-router";
import { DocLayout } from "@/layout/doc-layout";
import { RootLayout } from "@/layout/root-layout";
import { ApiReferencePage } from "@/pages/Docs/api-reference/api-reference";
import { ArchitecturePage } from "@/pages/Docs/architecture/architecture";
import { ConceptsPage } from "@/pages/Docs/concepts/concepts";
import { IndexedDBPage } from "@/pages/Docs/indexeddb/indexeddb";
import { IntroductionPage } from "@/pages/Docs/introduction/introduction";
import { QuickStartPage } from "@/pages/Docs/quick-start/quick-start";
import { HomePage } from "@/pages/Home/home";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<HomePage />} index />
        <Route element={<DocLayout />}>
          <Route path="docs">
            <Route element={<Navigate replace to="introduction" />} index />
            <Route element={<IntroductionPage />} path="introduction" />
            <Route element={<QuickStartPage />} path="quick-start" />
            <Route element={<ArchitecturePage />} path="architecture" />
            <Route element={<ConceptsPage />} path="concepts" />
            <Route element={<ApiReferencePage />} path="api-reference" />
            <Route element={<IndexedDBPage />} path="indexeddb" />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
