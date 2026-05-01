import { FileText, Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DOC_NAV_FLAT } from "@/constants/nav";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = query.trim()
    ? DOC_NAV_FLAT.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : DOC_NAV_FLAT;

  const handleSelect = (href: string) => {
    navigate(href);
    onOpenChange(false);
    setQuery("");
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Search documentation</DialogTitle>
        <div className="flex items-center border-border border-b px-4 py-3">
          <Search
            aria-hidden="true"
            className="mr-3 h-4 w-4 shrink-0 text-muted-foreground"
          />
          <Input
            aria-label="Search documentation"
            autoFocus
            className="h-auto border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            value={query}
          />
          {query && (
            <Button
              aria-label="Clear search"
              className="ml-2 h-6 w-6"
              onClick={() => setQuery("")}
              size="icon"
              variant="ghost"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <div className="max-h-72 overflow-y-auto px-2 py-2">
          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-muted-foreground text-sm">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul>
              {filtered.map((item) => (
                <li key={item.href}>
                  <button
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                    onClick={() => handleSelect(item.href)}
                    type="button"
                  >
                    <FileText
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-muted-foreground"
                    />
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
