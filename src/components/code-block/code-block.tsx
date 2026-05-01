import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group relative my-4 rounded-lg border border-border",
        className
      )}
    >
      {language && (
        <div className="flex items-center justify-between border-border border-b bg-muted/50 px-4 py-2">
          <span className="text-muted-foreground text-xs">{language}</span>
          <button
            aria-label={copied ? "Copied" : "Copy code"}
            className="flex items-center gap-1 rounded text-muted-foreground text-xs transition-colors hover:text-foreground"
            onClick={handleCopy}
            type="button"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      {!language && (
        <button
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute top-2.5 right-2.5 hidden items-center gap-1 rounded px-2 py-1 text-muted-foreground text-xs transition-colors hover:text-foreground group-hover:flex"
          onClick={handleCopy}
          type="button"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
      <pre className="overflow-x-auto bg-muted/30 p-4 text-sm leading-relaxed">
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
