"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LabelLegend } from "@/components/LabelLegend";
import { Markdown } from "@/components/Markdown";
import { BOOKING_PROMPT } from "@/lib/labels";

type Msg = {
  id: string;
  role: "user" | "bot";
  text: string;
  question?: string;
  error?: boolean;
};

const SESSION_KEY = "kratonbot-session";
const HISTORY_KEY = "kratonbot-history";

const SUGGESTIONS = [
  "Apa perbedaan Keraton Kasunanan dan Pura Mangkunegaran?",
  "Apa isi Perjanjian Giyanti?",
  "Ceritakan legenda Tari Bedhaya Ketawang",
  "Nilai Pancasila apa yang tercermin dari tradisi keraton?",
  "Bayangkan suasana saat keraton pindah dari Kartasura",
  "Aku mau berkunjung ke Pura Mangkunegaran",
];

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Penyimpanan browser tidak tersedia (mode privat); chat tetap jalan tanpa riwayat.
  }
}

export function ChatApp() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const sessionRef = useRef<string>("");
  const busyRef = useRef(false);
  const initRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const ask = useCallback(async (question: string, opts: { showUser: boolean }) => {
    const q = question.trim();
    if (!q || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    if (opts.showUser) setMessages((m) => [...m, { id: newId(), role: "user", text: q }]);

    let bot: Msg;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, sessionId: sessionRef.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || typeof data.reply !== "string") {
        throw new Error(data.error || "KratonBot tidak bisa dihubungi. Coba kirim ulang.");
      }
      bot = { id: newId(), role: "bot", text: data.reply, question: q };
    } catch (e) {
      bot = {
        id: newId(),
        role: "bot",
        text: e instanceof Error ? e.message : "Terjadi kesalahan. Coba kirim ulang.",
        question: q,
        error: true,
      };
    }
    setMessages((m) => [...m, bot]);
    busyRef.current = false;
    setBusy(false);
    inputRef.current?.focus();
  }, []);

  // Muat sesi & riwayat, lalu kirim pertanyaan dari tautan ?q= (sekali saja).
  useEffect(() => {
    // Jalan sekali saja (React Strict Mode menjalankan effect dua kali saat development).
    if (initRef.current) return;
    initRef.current = true;
    let sid = readStorage(SESSION_KEY);
    if (!sid) {
      sid = newId();
      writeStorage(SESSION_KEY, sid);
    }
    sessionRef.current = sid;
    try {
      const saved = JSON.parse(readStorage(HISTORY_KEY) || "[]");
      // localStorage baru bisa dibaca setelah mount (tidak ada di server), jadi setState di sini disengaja.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(saved)) setMessages(saved);
    } catch {
      // riwayat rusak: mulai kosong
    }
    setReady(true);

    const url = new URL(window.location.href);
    const q = url.searchParams.get("q");
    if (q) {
      url.searchParams.delete("q");
      window.history.replaceState(null, "", url.pathname + url.search);
      void ask(q, { showUser: true });
    }
  }, [ask]);

  useEffect(() => {
    if (ready) writeStorage(HISTORY_KEY, JSON.stringify(messages.slice(-60)));
  }, [messages, ready]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  function submit() {
    if (!input.trim() || busy) return;
    const q = input;
    setInput("");
    void ask(q, { showUser: true });
  }

  function retry(msg: Msg) {
    setMessages((m) => m.filter((x) => x.id !== msg.id));
    void ask(msg.question ?? "", { showUser: false });
  }

  function startOver() {
    const sid = newId();
    sessionRef.current = sid;
    writeStorage(SESSION_KEY, sid);
    writeStorage(HISTORY_KEY, null);
    setMessages([]);
    inputRef.current?.focus();
  }

  const last = messages[messages.length - 1];
  const awaitingBooking = !busy && last?.role === "bot" && !last.error && BOOKING_PROMPT.test(last.text);

  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[17rem_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-8">
          <section>
            <h2 className="mb-3 font-bold text-biru-tua">Arti tanda di jawaban</h2>
            <LabelLegend compact />
          </section>
          <section className="rounded-lg bg-emas-muda p-4 text-sm text-[#5c4a12]">
            Jadwal kunjungan dari KratonBot berupa undangan Google Calendar untuk pengingat, bukan tiket
            atau reservasi resmi dari pengelola.
          </section>
        </div>
      </aside>

      <div className="flex min-h-[70vh] flex-col">
        <details className="mb-4 rounded-lg border border-garis bg-white p-3 lg:hidden">
          <summary className="cursor-pointer font-semibold text-biru-tua">Arti tanda di jawaban</summary>
          <div className="mt-3">
            <LabelLegend compact />
          </div>
        </details>

        <div className="flex items-center justify-between gap-4 border-b border-garis pb-3">
          <h1 className="text-xl font-bold text-biru-tua">Tanya KratonBot</h1>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={startOver}
              disabled={busy}
              className="text-sm font-medium text-tinta-pudar underline underline-offset-2 hover:text-biru disabled:opacity-50"
            >
              Mulai percakapan baru
            </button>
          )}
        </div>

        <div className="flex-1 space-y-6 py-6" aria-live="polite">
          {ready && messages.length === 0 && (
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed">
                Sugeng rawuh. Aku KratonBot, pemandu AI untuk Keraton Kasunanan Surakarta dan Pura
                Mangkunegaran. Setiap jawabanku menyebut sumbernya, dan aku menandai mana fakta, tafsir, atau
                legenda.
              </p>
              <p className="mt-6 mb-3 font-semibold text-biru-tua">Coba tanyakan:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void ask(s, { showUser: true })}
                    className="rounded-full border border-biru/30 bg-white px-3.5 py-1.5 text-left text-sm text-biru-tua hover:border-biru hover:bg-biru-muda"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-biru px-4 py-2.5 whitespace-pre-wrap text-white">
                  {m.text}
                </p>
              </div>
            ) : (
              <article key={m.id} className="max-w-3xl">
                <p className="mb-1 text-sm font-bold text-biru">KratonBot</p>
                {m.error ? (
                  <div className="rounded-lg border border-[#e3b4ab] bg-[#fbeeeb] p-3 text-[#8a2f1d]">
                    <p>{m.text}</p>
                    <button
                      type="button"
                      onClick={() => retry(m)}
                      disabled={busy}
                      className="mt-2 font-semibold underline underline-offset-2 disabled:opacity-50"
                    >
                      Kirim ulang
                    </button>
                  </div>
                ) : (
                  <>
                    <Markdown>{m.text}</Markdown>
                    <ReportButton message={m} getSessionId={() => sessionRef.current} />
                  </>
                )}
              </article>
            ),
          )}

          {awaitingBooking && (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void ask("ya", { showUser: true })}
                className="rounded-lg bg-pareanom px-4 py-2 font-semibold text-white hover:bg-[#245536]"
              >
                Buat jadwal
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput("Ubah data: ");
                  inputRef.current?.focus();
                }}
                className="rounded-lg border border-garis bg-white px-4 py-2 font-semibold text-tinta hover:border-biru"
              >
                Ubah data
              </button>
            </div>
          )}

          {busy && (
            <p className="flex items-center gap-2 text-tinta-pudar" role="status">
              <span className="inline-flex gap-1" aria-hidden="true">
                <span className="size-1.5 animate-bounce rounded-full bg-biru [animation-delay:-0.3s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-biru [animation-delay:-0.15s]" />
                <span className="size-1.5 animate-bounce rounded-full bg-biru" />
              </span>
              KratonBot sedang mencari di sumber…
            </p>
          )}
          <div ref={endRef} />
        </div>

        <form
          className="sticky bottom-0 border-t border-garis bg-kapur pt-3 pb-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor="pesan" className="sr-only">
            Pertanyaan untuk KratonBot
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="pesan"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  submit();
                }
              }}
              rows={2}
              maxLength={2000}
              placeholder="Tanyakan sejarah, tradisi, atau rencana kunjunganmu…"
              className="max-h-40 min-h-12 flex-1 resize-y rounded-lg border border-garis bg-white px-3 py-2.5 focus:border-biru focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="h-12 rounded-lg bg-biru px-5 font-semibold text-white hover:bg-biru-tua disabled:cursor-not-allowed disabled:opacity-50"
            >
              Kirim
            </button>
          </div>
          <p className="mt-2 text-xs text-tinta-pudar">
            KratonBot bisa keliru. Periksa sumber di setiap jawaban, dan jangan menulis data pribadi selain yang
            diminta untuk jadwal kunjungan.
          </p>
        </form>
      </div>
    </div>
  );
}

function ReportButton({ message, getSessionId }: { message: Msg; getSessionId: () => string }) {
  const [state, setState] = useState<"idle" | "open" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function send() {
    setState("sending");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: message.question,
          answer: message.text,
          note,
          sessionId: getSessionId(),
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return <p className="mt-2 text-sm text-pareanom">Laporan terkirim. Terima kasih, tim akan memeriksanya.</p>;
  }
  if (state === "idle") {
    return (
      <button
        type="button"
        onClick={() => setState("open")}
        className="mt-2 text-sm text-tinta-pudar underline underline-offset-2 hover:text-biru"
      >
        Laporkan jawaban keliru
      </button>
    );
  }
  return (
    <div className="mt-3 max-w-xl rounded-lg border border-garis bg-white p-3">
      <label htmlFor={`catatan-${message.id}`} className="text-sm font-semibold">
        Apa yang keliru? (opsional)
      </label>
      <textarea
        id={`catatan-${message.id}`}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        maxLength={1000}
        className="mt-1 w-full rounded-md border border-garis px-2 py-1.5 text-sm focus:border-biru focus:outline-none"
      />
      {state === "error" && <p className="text-sm text-[#8a2f1d]">Laporan belum terkirim. Coba lagi.</p>}
      <div className="mt-2 flex gap-3 text-sm">
        <button
          type="button"
          onClick={() => void send()}
          disabled={state === "sending"}
          className="rounded-md bg-biru px-3 py-1.5 font-semibold text-white disabled:opacity-50"
        >
          {state === "sending" ? "Mengirim…" : "Kirim laporan"}
        </button>
        <button type="button" onClick={() => setState("idle")} className="text-tinta-pudar underline">
          Batal
        </button>
      </div>
    </div>
  );
}
