"use client";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/context/AudioContext";

export default function LiveSection() {
  const { isPlaying, togglePlay, analyserRef } = useAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [metadata, setMetadata] = useState({
    title: "Memuat Siaran...",
    artist: "Radio Suara Al Muttaqin",
    art: "/bg-player.png",
  });

  const [listeners, setListeners] = useState(0);

  // ===============================
  // FETCH AZURACAST DATA
  // ===============================
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch(
          "https://rsm.my.id/api/nowplaying/2",
          { cache: "no-store" }
        );

        const data = await res.json();
        const apiData = Array.isArray(data) ? data[0] : data;

        if (apiData?.now_playing?.song) {
          setMetadata({
            title:
              apiData.now_playing.song.title ||
              "Radio Suara Al Muttaqin",
            artist:
              apiData.now_playing.song.artist ||
              "Menginspirasi Hati, Menguatkan Iman",
            art:
              apiData.now_playing.song.art ||
              "/bg-player.png",
          });
        }

        setListeners(apiData?.listeners?.current || 0);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchMetadata();
    const interval = setInterval(fetchMetadata, 8000);
    return () => clearInterval(interval);
  }, []);

  // ===============================
  // ULTRA LIGHTNING SPECTRUM
  // ===============================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let animationId: number;
    let flashAlpha = 0;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isPlaying || !analyserRef?.current) return;

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const centerY = canvas.height / 2;
      const width = canvas.width;
      const height = canvas.height;

      // HITUNG BASS ENERGY
      let bass = 0;
      for (let i = 0; i < 10; i++) {
        bass += dataArray[i];
      }
      bass = bass / 10;

      // FLASH SAAT BASS DROP
      if (bass > 180) {
        flashAlpha = 0.5;
      }

      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(0,255,200,${flashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        flashAlpha -= 0.03;
      }

      const barCount = 120;
      const spacing = width / barCount;

      ctx.shadowBlur = 25;
      ctx.shadowColor = "#00ffcc";

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * 2] / 255;
        const barHeight = value * centerY * 1.4;
        const x = i * spacing;

        const gradient = ctx.createLinearGradient(
          0,
          centerY - barHeight,
          0,
          centerY + barHeight
        );

        gradient.addColorStop(0, "#00ffcc");
        gradient.addColorStop(0.3, "#10b981");
        gradient.addColorStop(0.6, "#065f46");
        gradient.addColorStop(1, "#001f1f");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(x, centerY - barHeight);
        ctx.lineTo(x, centerY + barHeight);
        ctx.stroke();

        // PETIR SPIKE
        if (value > 0.75) {
          ctx.beginPath();
          ctx.moveTo(x, centerY - barHeight);
          ctx.lineTo(
            x + (Math.random() * 6 - 3),
            centerY - barHeight - 15
          );
          ctx.stroke();
        }
      }

      // BASS EXPLOSION CENTER GLOW
      const glowRadius = bass * 1.2;

      const radial = ctx.createRadialGradient(
        width / 2,
        centerY,
        0,
        width / 2,
        centerY,
        glowRadius
      );

      radial.addColorStop(0, "rgba(0,255,200,0.4)");
      radial.addColorStop(1, "rgba(0,255,200,0)");

      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(width / 2, centerY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isPlaying, analyserRef]);

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/80 to-black"></div>

      <div className="relative z-20 max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-black text-emerald-400 tracking-[0.5em] uppercase mb-10">
          ⚡ ON AIR NOW ⚡
        </h2>

        <div className="w-full bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">

          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div className="relative w-44 h-44">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl animate-pulse rounded-2xl"></div>

              <img
                src={metadata.art}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "/bg-player.png")
                }
                className="relative z-10 w-full h-full object-cover rounded-2xl border border-white/20"
                alt="Cover"
              />
            </div>

            <div className="flex-1 w-full space-y-6">
              <div className="h-28 bg-black rounded-xl overflow-hidden border border-emerald-500/20">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white uppercase">
                  {metadata.title}
                </h3>
                <p className="text-emerald-400 text-sm tracking-widest uppercase">
                  {metadata.artist}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">

            <div className="text-emerald-400 text-sm font-bold tracking-widest">
              👥 {listeners} Pendengar
            </div>

            <button
              onClick={togglePlay}
              className={`px-12 py-4 rounded-xl font-black tracking-widest uppercase transition-all active:scale-90 shadow-xl ${
                isPlaying
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >
              {isPlaying ? "Stop Radio" : "Putar Radio"}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}