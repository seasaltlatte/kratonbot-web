"use client";

import Link from "next/link";
import { useState } from "react";
import { LabelChip } from "@/components/LabelLegend";
import { SourceList } from "@/components/SourceList";
import type { Card, Kategori } from "@/lib/cards";
import { CLAIM_LABELS, KATEGORI_INDEX } from "@/lib/labels";

type QuizKategori = Extract<Kategori, "FAKTA" | "TAFSIR" | "LEGENDA">;
const CHOICES: QuizKategori[] = ["FAKTA", "TAFSIR", "LEGENDA"];
const MIX: Record<QuizKategori, number> = { FAKTA: 3, TAFSIR: 3, LEGENDA: 2 };

const HINTS: Record<QuizKategori, string> = {
  FAKTA: "Isinya tercatat di sumber yang bisa dicek, misalnya tanggal perjanjian atau nama bangunan.",
  TAFSIR: "Isinya pendapat atau makna yang ditarik seseorang. Perhatikan kata seperti “dimaknai”, “mencerminkan”, atau “menurut analisis”.",
  LEGENDA: "Isinya kisah yang dipercaya turun-temurun dan tidak bisa dibuktikan secara sejarah. Perhatikan kata seperti “dipercaya” atau “dikisahkan”.",
};

function shuffle<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function excerpt(isi: string) {
  const sentences = isi.split(/(?<=\.)\s+/);
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > 300) break;
    out = out ? `${out} ${s}` : s;
  }
  return out;
}

export function Quiz({ pool }: { pool: Card[] }) {
  const [questions, setQuestions] = useState<Card[]>([]);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState<QuizKategori | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    const picked = CHOICES.flatMap((k) => shuffle(pool.filter((c) => c.kategori === k)).slice(0, MIX[k]));
    setQuestions(shuffle(picked));
    setStep(0);
    setAnswer(null);
    setScore(0);
  }

  function choose(k: QuizKategori) {
    if (answer) return;
    setAnswer(k);
    if (k === questions[step].kategori) setScore((s) => s + 1);
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl">
        <p className="text-lg leading-relaxed">
          Kamu akan membaca {MIX.FAKTA + MIX.TAFSIR + MIX.LEGENDA} potongan dari kartu pengetahuan KratonBot. Tebak
          jenisnya: fakta tercatat, tafsir, atau legenda. Setelah menjawab, kamu akan melihat sumbernya.
        </p>
        <button
          type="button"
          onClick={start}
          className="mt-8 rounded-lg bg-sogan px-6 py-3 text-lg font-semibold text-white hover:bg-sogan-tua"
        >
          Mulai kuis
        </button>
      </div>
    );
  }

  if (step >= questions.length) {
    const total = questions.length;
    const message =
      score === total
        ? "Sempurna. Kamu bisa membedakan sejarah dari tafsir dan legenda."
        : score >= total * 0.6
          ? "Bagus. Beberapa tafsir dan legenda memang terdengar seperti fakta, dan itulah yang perlu diwaspadai dari jawaban AI."
          : "Tidak apa-apa. Membedakan fakta dari tafsir dan legenda memang tidak mudah, apalagi kalau kalimatnya terdengar yakin.";
    return (
      <div className="max-w-2xl">
        <p className="text-5xl font-extrabold text-sogan-tua">
          {score} <span className="text-2xl font-bold text-tinta-pudar">dari {total} tepat</span>
        </p>
        <p className="mt-4 text-lg leading-relaxed">{message}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={start}
            className="rounded-lg bg-sogan px-5 py-2.5 font-semibold text-white hover:bg-sogan-tua"
          >
            Main lagi
          </button>
          <Link href="/jelajah" className="font-semibold text-sogan underline underline-offset-4">
            Baca semua kartu pengetahuan
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[step];
  const correct = answer === q.kategori;
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between text-sm text-tinta-pudar">
        <span>
          Pertanyaan {step + 1} dari {questions.length}
        </span>
        <span>Skor: {score}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-garis" aria-hidden="true">
        <div className="h-1.5 rounded-full bg-sogan" style={{ width: `${(step / questions.length) * 100}%` }} />
      </div>

      <blockquote className="mt-8 border-l-4 border-emas pl-5 text-xl leading-relaxed">{excerpt(q.isi)}</blockquote>
      <p className="mt-3 text-sm text-tinta-pudar">Tentang: {q.situs}</p>

      <fieldset className="mt-8" disabled={answer !== null}>
        <legend className="mb-3 font-semibold">Menurutmu, ini termasuk apa?</legend>
        <div className="flex flex-wrap gap-3">
          {CHOICES.map((k) => {
            const l = CLAIM_LABELS[KATEGORI_INDEX[k]];
            const state =
              answer === null
                ? "border-garis bg-white hover:border-sogan"
                : k === q.kategori
                  ? "border-pareanom bg-pareanom-muda"
                  : k === answer
                    ? "border-[#c96b5a] bg-[#fbeeeb]"
                    : "border-garis bg-white opacity-60";
            return (
              <button
                key={k}
                type="button"
                onClick={() => choose(k)}
                className={`rounded-lg border-2 px-4 py-2.5 font-semibold ${state}`}
              >
                <span aria-hidden="true">{l.emoji}</span> {l.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      {answer && (
        <div className="mt-8 rounded-lg border border-garis bg-white p-5" role="status">
          <p className={`text-lg font-bold ${correct ? "text-pareanom" : "text-[#8a2f1d]"}`}>
            {correct ? "Tepat." : "Belum tepat."} Ini termasuk <LabelChip index={KATEGORI_INDEX[q.kategori]} />
          </p>
          <p className="mt-2 text-tinta-pudar">{HINTS[q.kategori as QuizKategori]}</p>
          <h3 className="mt-5 font-bold text-sogan-tua">{q.judul}</h3>
          <p className="mt-1 leading-relaxed">{q.isi}</p>
          <SourceList sumber={q.sumber} className="mt-3" />
          <button
            type="button"
            onClick={() => {
              setStep((s) => s + 1);
              setAnswer(null);
            }}
            className="mt-6 rounded-lg bg-sogan px-5 py-2.5 font-semibold text-white hover:bg-sogan-tua"
            autoFocus
          >
            {step + 1 < questions.length ? "Pertanyaan berikutnya" : "Lihat hasil"}
          </button>
        </div>
      )}
    </div>
  );
}
