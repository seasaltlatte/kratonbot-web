import { Children, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IkonLontar } from "@/components/Icons";
import { TandaIkon, type Jenis } from "@/components/LabelLegend";
import { CLAIM_LABELS } from "@/lib/labels";

// Jawaban bot memakai emoji (📚 untuk sumber, 🟢🟡🟣🔵⚪ untuk jenis klaim). Emoji itu diganti ikon
// situs agar seragam dengan tampilan; teks aslinya tetap emoji supaya prompt bot tidak perlu diubah.
const JENIS_EMOJI = new Map<string, Jenis>(CLAIM_LABELS.map((l) => [l.emoji, l.jenis]));
const POLA = /(📚\s*|🟢|🟡|🟣|🔵|⚪️?)/u;

function gantiEmoji(children: ReactNode) {
  return Children.toArray(children).flatMap<ReactNode>((item, i) => {
    if (typeof item !== "string" || !POLA.test(item)) return [item];
    return item.split(POLA).map((part, j) => {
      const key = `${i}-${j}`;
      if (part.startsWith("📚")) {
        return <IkonLontar key={key} className="mr-1.5 inline size-[1.1em] -translate-y-px align-middle text-emas" />;
      }
      const jenis = JENIS_EMOJI.get(part.replace(/️/, ""));
      return jenis ? (
        <span key={key} className={`tanda-${jenis} mx-0.5 inline-flex -translate-y-px align-middle`}>
          <TandaIkon jenis={jenis} />
        </span>
      ) : (
        part
      );
    });
  });
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
          p: ({ children }) => <p>{gantiEmoji(children)}</p>,
          li: ({ children }) => <li>{gantiEmoji(children)}</li>,
          h3: ({ children }) => <h3>{gantiEmoji(children)}</h3>,
          strong: ({ children }) => <strong>{gantiEmoji(children)}</strong>,
          em: ({ children }) => <em>{gantiEmoji(children)}</em>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
