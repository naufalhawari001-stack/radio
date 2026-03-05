"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  analyserRef: React.MutableRefObject<AnalyserNode | null>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const streamUrl = "https://rsm.my.id/radio/8010/radio.mp3";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // ===============================
  // INIT AUDIO ENGINE (ONCE)
  // ===============================
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // WAJIB agar analyser bisa baca stream
    audio.crossOrigin = "anonymous";

    const AudioCtx =
      window.AudioContext || (window as any).webkitAudioContext;

    const audioCtx = new AudioCtx();
    audioContextRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.5;
    analyserRef.current = analyser;

    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    sourceRef.current = source;

    return () => {
      source.disconnect();
      analyser.disconnect();
      audioCtx.close();
    };
  }, []);

  // ===============================
  // TOGGLE PLAY
  // ===============================
  const togglePlay = async () => {
    if (!audioRef.current || !audioContextRef.current) {
      alert("Audio engine belum siap.");
      return;
    }

    const audio = audioRef.current;
    const audioCtx = audioContextRef.current;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (audioCtx.state === "suspended") {
          await audioCtx.resume();
        }

        await audio.play();
        setIsPlaying(true);
      }
    } catch (err: any) {
      console.error("PLAY ERROR:", err);
      alert("Browser memblokir autoplay atau server error.");
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider
      value={{ isPlaying, togglePlay, analyserRef }}
    >
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onError={(e) => {
          console.error("STREAM ERROR:", e);
          alert(
            "Stream rsm.my.id sedang offline atau CORS belum diaktifkan."
          );
          setIsPlaying(false);
        }}
        className="hidden"
      />
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio harus dipakai dalam AudioProvider");
  }
  return context;
};