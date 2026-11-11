"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IkonPena, IkonPerisai } from "@/components/Icons";
import type { AiIllustration, GalleryItem } from "@/lib/gallery";

type StyleMode = "pagi" | "senja" | "sketsa";

function clamp(v: number, min = 0, max = 255): number {
  return v < min ? min : v > max ? max : v;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Mengubah foto arsip asli menjadi ilustrasi lukisan cat air & sketsa tinta arsitektur
 * dengan mempertahankan 100% bentuk, proporsi, dan sudut pandang foto arsip.
 */
async function renderWatercolorReconstruction(
  imageUrl: string,
  mode: StyleMode
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        // Gunakan ukuran optimal (maks lebar 960px) agar proses filter Kuwahara cepat & tajam
        const maxW = 960;
        const scale = Math.min(1, maxW / img.naturalWidth);
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context tidak tersedia");

        ctx.drawImage(img, 0, 0, w, h);
        const srcData = ctx.getImageData(0, 0, w, h);
        const src = srcData.data;
        const totalPixels = w * h;

        // 1. Hitung luminansi & saturasi awal, serta rentang kontras (persentil 2% - 98%)
        const lumArr = new Float32Array(totalPixels);
        const hist = new Uint32Array(256);
        let totalSat = 0;

        for (let i = 0; i < totalPixels; i++) {
          const idx = i * 4;
          const r = src[idx];
          const g = src[idx + 1];
          const b = src[idx + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          lumArr[i] = lum;
          hist[Math.min(255, Math.max(0, Math.round(lum)))]++;

          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          totalSat += maxC > 0 ? (maxC - minC) / maxC : 0;
        }

        const avgSat = totalSat / totalPixels;
        const isColorPhoto = avgSat > 0.22;

        let lowCut = 0;
        let highCut = 255;
        let acc = 0;
        for (let i = 0; i < 256; i++) {
          acc += hist[i];
          if (acc >= totalPixels * 0.02) {
            lowCut = i;
            break;
          }
        }
        acc = 0;
        for (let i = 255; i >= 0; i--) {
          acc += hist[i];
          if (acc >= totalPixels * 0.02) {
            highCut = i;
            break;
          }
        }
        const range = Math.max(40, highCut - lowCut);

        // Normalisasi luminansi (0..1)
        const normLum = new Float32Array(totalPixels);
        for (let i = 0; i < totalPixels; i++) {
          normLum[i] = Math.max(0, Math.min(1, (lumArr[i] - lowCut) / range));
        }

        // 2. Hitung gradien Sobel (untuk deteksi tekstur dedaunan & garis sketsa tinta arsitektur)
        const gradMag = new Float32Array(totalPixels);
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const tl = normLum[(y - 1) * w + (x - 1)];
            const tc = normLum[(y - 1) * w + x];
            const tr = normLum[(y - 1) * w + (x + 1)];
            const ml = normLum[y * w + (x - 1)];
            const mr = normLum[y * w + (x + 1)];
            const bl = normLum[(y + 1) * w + (x - 1)];
            const bc = normLum[(y + 1) * w + x];
            const br = normLum[(y + 1) * w + (x + 1)];

            const gx = -tl - 2 * ml - bl + tr + 2 * mr + br;
            const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;
            gradMag[y * w + x] = Math.min(1, Math.sqrt(gx * gx + gy * gy));
          }
        }

        // 3. Pewarnaan Historis (Historical Colorization) per piksel berdasarkan zona & tekstur
        const colored = new Uint8ClampedArray(totalPixels * 4);

        for (let y = 0; y < h; y++) {
          const ny = y / h; // posisi vertikal 0 (atas) .. 1 (bawah)
          for (let x = 0; x < w; x++) {
            const i = y * w + x;
            const idx = i * 4;
            const l = normLum[i];
            const gEdge = gradMag[i];

            let rOut: number;
            let gOut: number;
            let bOut: number;

            if (mode === "sketsa") {
              // Mode Sketsa Lontar: wash cat air sepia-zaitun hangat di atas perkamen
              const skyWeight = smoothstep(0.55, 0.1, ny) * smoothstep(0.65, 0.88, l);
              const paperR = lerp(198, 246, Math.pow(l, 0.85));
              const paperG = lerp(172, 235, Math.pow(l, 0.88));
              const paperB = lerp(136, 210, Math.pow(l, 0.92));

              rOut = lerp(paperR, 212, skyWeight * 0.55);
              gOut = lerp(paperG, 224, skyWeight * 0.55);
              bOut = lerp(paperB, 228, skyWeight * 0.65);
            } else if (isColorPhoto) {
              // Jika foto arsip sudah berwarna (misal reruntuhan bata / taman), ubah ke palet lukisan cat air hangat
              const r0 = src[idx];
              const g0 = src[idx + 1];
              const b0 = src[idx + 2];
              const warmR = lerp(r0, 244 * l, 0.22) + 10;
              const warmG = lerp(g0, 232 * l, 0.22) + 6;
              const warmB = lerp(b0, 205 * l, 0.28) - 4;
              rOut = warmR;
              gOut = warmG;
              bOut = warmB;
            } else {
              // Foto arsip hitam-putih / sepia: Rekonstruksi warna historis multi-zona
              // a) Bobot Langit (bagian atas, terang, tekstur halus)
              const skyW =
                smoothstep(0.62, 0.08, ny) *
                smoothstep(0.62, 0.85, l) *
                (1 - smoothstep(0.12, 0.38, gEdge));

              // b) Bobot Pepohonan / Dedaunan (tekstur tinggi, luminansi gelap-menengah)
              const foliageW =
                smoothstep(0.08, 0.35, gEdge) *
                smoothstep(0.08, 0.28, l) *
                (1 - smoothstep(0.52, 0.78, l)) *
                smoothstep(0.85, 0.2, ny);

              // c) Bobot Atap Sirap / Genteng Terakota & Kayu Jati (tengah, gelap-menengah)
              const roofW =
                smoothstep(0.15, 0.38, ny) *
                (1 - smoothstep(0.58, 0.78, ny)) *
                smoothstep(0.12, 0.26, l) *
                (1 - smoothstep(0.48, 0.68, l)) *
                (1 - foliageW * 0.6);

              // d) Bobot Halaman / Tanah (bagian bawah)
              const groundW = smoothstep(0.58, 0.88, ny) * (1 - smoothstep(0.75, 0.95, l));

              // Palet dasar (Dinding kapur keraton / tiang / bayangan hangat)
              let baseR: number, baseG: number, baseB: number;
              if (l < 0.35) {
                const t = l / 0.35;
                baseR = lerp(46, 118, t);
                baseG = lerp(38, 98, t);
                baseB = lerp(34, 82, t);
              } else if (l < 0.72) {
                const t = (l - 0.35) / 0.37;
                baseR = lerp(118, 218, t);
                baseG = lerp(98, 202, t);
                baseB = lerp(82, 174, t);
              } else {
                const t = (l - 0.72) / 0.28;
                baseR = lerp(218, 248, t);
                baseG = lerp(202, 241, t);
                baseB = lerp(174, 224, t);
              }

              // Warna Langit sesuai mode
              const skyR = mode === "senja" ? lerp(236, 248, ny) : lerp(158, 228, ny);
              const skyG = mode === "senja" ? lerp(182, 222, ny) : lerp(196, 236, ny);
              const skyB = mode === "senja" ? lerp(148, 192, ny) : lerp(226, 244, ny);

              // Warna Pepohonan Cat Air (Hijau Pareanom / Olive Tropis)
              const folR = lerp(58, 126, l);
              const folG = lerp(86, 148, l);
              const folB = lerp(54, 92, l);

              // Warna Atap Terakota / Kayu Jati Keraton
              const roofR = lerp(112, 184, l);
              const roofG = lerp(68, 118, l);
              const roofB = lerp(48, 82, l);

              // Warna Tanah / Pelataran Pasir & Batu
              const grdR = lerp(142, 218, l);
              const grdG = lerp(120, 196, l);
              const grdB = lerp(94, 162, l);

              // Campurkan seluruh zona secara mulus
              rOut = baseR;
              gOut = baseG;
              bOut = baseB;

              rOut = lerp(rOut, roofR, roofW * 0.65);
              gOut = lerp(gOut, roofG, roofW * 0.65);
              bOut = lerp(bOut, roofB, roofW * 0.65);

              rOut = lerp(rOut, folR, foliageW * 0.75);
              gOut = lerp(gOut, folG, foliageW * 0.75);
              bOut = lerp(bOut, folB, foliageW * 0.75);

              rOut = lerp(rOut, grdR, groundW * 0.55);
              gOut = lerp(gOut, grdG, groundW * 0.55);
              bOut = lerp(bOut, grdB, groundW * 0.55);

              rOut = lerp(rOut, skyR, skyW * 0.85);
              gOut = lerp(gOut, skyG, skyW * 0.85);
              bOut = lerp(bOut, skyB, skyW * 0.85);
            }

            colored[idx] = clamp(rOut);
            colored[idx + 1] = clamp(gOut);
            colored[idx + 2] = clamp(bOut);
            colored[idx + 3] = 255;
          }
        }

        // 4. Filter Lukisan Cat Air Kuwahara (Radius = 3)
        // Menghaluskan tekstur foto menjadi sapuan kuas cat air sambil menjaga ketajaman tepi bangunan
        const painted = new Uint8ClampedArray(totalPixels * 4);
        const radius = 3;

        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const outIdx = (y * w + x) * 4;
            if (y < radius || y >= h - radius || x < radius || x >= w - radius) {
              painted[outIdx] = colored[outIdx];
              painted[outIdx + 1] = colored[outIdx + 1];
              painted[outIdx + 2] = colored[outIdx + 2];
              painted[outIdx + 3] = 255;
              continue;
            }

            let bestVar = Infinity;
            let bestR = 0;
            let bestG = 0;
            let bestB = 0;

            // 4 kuadran sekitar piksel (Kuwahara)
            const quads = [
              [-radius, 0, -radius, 0],
              [0, radius, -radius, 0],
              [-radius, 0, 0, radius],
              [0, radius, 0, radius],
            ];

            for (let q = 0; q < 4; q++) {
              const [dx0, dx1, dy0, dy1] = quads[q];
              let sumR = 0,
                sumG = 0,
                sumB = 0;
              let sumL = 0,
                sumL2 = 0;
              let count = 0;

              for (let dy = dy0; dy <= dy1; dy++) {
                const py = y + dy;
                const rowOffset = py * w;
                for (let dx = dx0; dx <= dx1; dx++) {
                  const pIdx = (rowOffset + (x + dx)) * 4;
                  const r = colored[pIdx];
                  const g = colored[pIdx + 1];
                  const b = colored[pIdx + 2];
                  const l = 0.299 * r + 0.587 * g + 0.114 * b;
                  sumR += r;
                  sumG += g;
                  sumB += b;
                  sumL += l;
                  sumL2 += l * l;
                  count++;
                }
              }

              const meanL = sumL / count;
              const variance = sumL2 / count - meanL * meanL;
              if (variance < bestVar) {
                bestVar = variance;
                bestR = sumR / count;
                bestG = sumG / count;
                bestB = sumB / count;
              }
            }

            painted[outIdx] = bestR;
            painted[outIdx + 1] = bestG;
            painted[outIdx + 2] = bestB;
            painted[outIdx + 3] = 255;
          }
        }

        // 5. Gabungkan garis sketsa tinta arsitektur (Ink Sketch Overlay) + Tekstur Kertas Cat Air
        const finalData = ctx.createImageData(w, h);
        const dst = finalData.data;

        for (let y = 0; y < h; y++) {
          const ny = y / h - 0.5;
          for (let x = 0; x < w; x++) {
            const nx = x / w - 0.5;
            const i = y * w + x;
            const idx = i * 4;

            // Efek tekstur kertas cat air halus (cold-pressed paper grain)
            const grain =
              Math.sin(x * 0.75) * Math.cos(y * 0.75) * 3.5 +
              Math.sin((x + y) * 0.35) * 2.5;

            // Garis tinta dari tepi Sobel + efek "wet-edge" pigmen cat air
            const edge = gradMag[i];
            const inkStrength = mode === "sketsa" ? 0.72 : 0.48;
            const inkFactor = Math.max(0, 1 - smoothstep(0.14, 0.58, edge) * inkStrength);

            // Vinyet tepi kertas perkamen
            const distSq = nx * nx + ny * ny;
            const vignette = smoothstep(0.18, 0.55, distSq) * 0.18;

            let r = (painted[idx] + grain) * inkFactor;
            let g = (painted[idx + 1] + grain) * inkFactor;
            let b = (painted[idx + 2] + grain * 0.8) * inkFactor;

            // Tarik tepi luar ke warna kertas perkamen hangat
            r = lerp(r, 238, vignette);
            g = lerp(g, 226, vignette);
            b = lerp(b, 200, vignette);

            dst[idx] = clamp(r);
            dst[idx + 1] = clamp(g);
            dst[idx + 2] = clamp(b);
            dst[idx + 3] = 255;
          }
        }

        ctx.putImageData(finalData, 0, 0);

        // 6. Tulis label "Ilustrasi AI" langsung di pojok kanan bawah gambar (sesuai Aturan #2 Galeri)
        const fontSize = Math.max(11, Math.round(w * 0.018));
        ctx.font = `600 ${fontSize}px sans-serif`;
        const padX = Math.round(fontSize * 0.65);
        const padY = Math.round(fontSize * 0.42);
        const boxH = fontSize + padY * 2;
        const by = h - boxH - 10;

        ctx.fillStyle = "rgba(10, 13, 11, 0.78)";
        ctx.strokeStyle = "rgba(199, 164, 92, 0.65)";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#dcc17a";
        ctx.textBaseline = "middle";

        resolve(canvas.toDataURL("image/jpeg", 0.92));
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error("Gagal memuat foto arsip untuk direkonstruksi"));
    img.src = imageUrl;
  });
}

export function AiReconstruction({
  item,
  initialAi,
}: {
  item: GalleryItem;
  initialAi?: AiIllustration;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    initialAi ? "loaded" : "idle"
  );
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(
    initialAi ? initialAi.src : null
  );
  const [generatedDate, setGeneratedDate] = useState<string>(
    initialAi?.date ?? ""
  );

  const handleGenerate = async () => {
    setStatus("loading");
    setGeneratedDate(
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(new Date())
        .replace(/\//g, "-")
    );

    try {
      const dataUrl = await renderWatercolorReconstruction(item.archive.src, "pagi");
      setGeneratedUrl(dataUrl);
      setStatus("loaded");
    } catch {
      setStatus("error");
    }
  };

  return (
    <figure>
      <div className="border border-emas/30 bg-permukaan/80 p-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-malam">
          {/* State 1: Gambar hasil rekonstruksi sudah siap */}
          {generatedUrl && status === "loaded" && (
            <Image
              src={generatedUrl}
              alt={`Ilustrasi AI, bukan foto: ${item.title}`}
              fill
              unoptimized
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-contain transition-opacity duration-500"
            />
          )}

          {/* Overlay Loading */}
          {status === "loading" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-malam/85 px-6 text-center backdrop-blur-sm">
              <span
                className="size-11 animate-spin rounded-full border-2 border-emas/25 border-t-emas"
                aria-hidden="true"
              />
              <p className="mt-4 font-semibold text-emas-terang">
                Merekonstruksi ilustrasi dari foto arsip…
              </p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-abu">
                Memetakan garis arsitektur foto arsip ke sapuan cat air dan pewarnaan historis.
              </p>
            </div>
          )}

          {/* State Error */}
          {status === "error" && (
            <div className="flex min-h-full flex-col items-center justify-center bg-malam/80 px-5 pt-12 pb-6 text-center">
              <p className="font-semibold text-galat">Gagal memproses gambar arsip</p>
              <p className="mt-1 max-w-xs text-xs text-abu">
                Silakan coba lagi atau gunakan rekonstruksi teks.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => void handleGenerate()}
                  className="tombol-emas cursor-pointer !min-h-0 !px-4 !py-2 text-xs"
                >
                  Coba Lagi
                </button>
                <Link
                  href={`/chat?q=${encodeURIComponent(item.askBot)}`}
                  className="tombol-garis !min-h-0 !px-3.5 !py-2 text-xs"
                >
                  Rekonstruksi Teks
                </Link>
              </div>
            </div>
          )}

          {/* State Awal (Idle): Belum di-klik */}
          {status === "idle" && (
            <div className="flex min-h-full flex-col items-center justify-center bg-malam/75 px-5 pt-12 pb-6 text-center terang:bg-[#f4eee4]/90">
              <span className="flex size-12 items-center justify-center rounded-full border border-dashed border-emas/70 text-emas terang:border-[#8a6036] terang:text-[#8a6036]">
                <IkonPena className="size-5" />
              </span>
              <p className="mt-3 font-semibold text-emas-terang terang:text-[#2a1d14]">
                Rekonstruksi Visual
              </p>
              <p className="mt-1 max-w-xs text-sm text-abu terang:text-[#6f6254]">
                Rekonstruksi gambar berwarna berdasarkan interpretasi historis dari foto arsip di sebelah kiri.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => void handleGenerate()}
                  className="tombol-emas cursor-pointer !min-h-0 !px-4 !py-2 text-center text-xs sm:text-sm"
                >
                  Rekonstruksi Gambar
                </button>
                {/* <Link
                  href={`/chat?q=${encodeURIComponent(item.askBot)}`}
                  className="tombol-garis !min-h-0 !px-3.5 !py-2 text-center text-xs sm:text-sm terang:border-[#8a6036]/50 terang:text-[#2a1d14] terang:hover:border-[#8a6036]"
                >
                  Rekonstruksi Teks
                </Link> */}
              </div>
            </div>
          )}

          {/* Badge Kiri Atas */}
          <span className="absolute top-2 left-2 z-10 bg-emas px-2.5 py-1 text-xs font-semibold tracking-[0.12em] text-malam uppercase">
            Rekonstruksi AI
          </span>
        </div>
      </div>

      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs leading-relaxed text-abu-gelap">
        <span>
          {status === "loaded"
            ? initialAi && generatedUrl === initialAi.src
              ? `Ilustrasi AI, bukan foto. Dibuat dengan ${initialAi.model} oleh ${initialAi.madeBy}, ${initialAi.date}.`
              : `Ilustrasi rekonstruksi cat air, bukan foto asli. Mengikuti bentuk arsip di samping, diproses oleh Kelompok 4${generatedDate ? `, ${generatedDate}` : ""}.`
            : "Ilustrasi dibuat dengan mengacu langsung pada bentuk foto arsip di sebelah kiri."}
        </span>
        {status === "loaded" && (
          <Link
            href={`/chat?q=${encodeURIComponent(item.askBot)}`}
            className="text-emas underline underline-offset-2 hover:text-perkamen"
          >
            Coba rekonstruksi teks →
          </Link>
        )}
      </figcaption>

      <p className="mt-3 flex gap-2.5 border-l-2 px-3.5 py-2.5 text-sm leading-relaxed" style={{color: "#800020", borderColor: "#800020"}}>
        <IkonPerisai className="mt-0.5 size-4 shrink-0" />
        <span>
          <strong className="font-semibold">Perkiraan, bukan kejadian sebenarnya.</strong> Ilustrasi ini dibayangkan dari
          foto arsip di sebelah kiri, sehingga warna dan suasananya tidak 100% sama dengan kondisi aslinya.
        </span>
      </p>
    </figure>
  );
}
