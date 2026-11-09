import { Children, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IkonLontar } from "@/components/Icons";

// Jawaban bot memakai "📚 Sumber:"; emoji itu diganti ikon lontar agar seragam dengan situs.
function gantiEmojiSumber(children: ReactNode) {
  const items = Children.toArray(children);
  const first = items[0];
  if (typeof first !== "string" || !first.trimStart().startsWith("📚")) return children;
  return [
    <IkonLontar key="ikon" className="mr-1.5 inline size-[1.1em] -translate-y-px align-middle text-emas" />,
    first.trimStart().replace(/^📚\s*/, ""),
    ...items.slice(1),
  ];
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          p: ({ children }) => <p>{gantiEmojiSumber(children)}</p>,
          li: ({ children }) => <li>{gantiEmojiSumber(children)}</li>,
          h3: ({ children }) => <h3>{gantiEmojiSumber(children)}</h3>,
          strong: ({ children }) => <strong>{gantiEmojiSumber(children)}</strong>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
