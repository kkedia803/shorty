import { useState, useEffect } from "react";
import {
  FiLink2,
  FiArrowRight,
  FiCopy,
  FiCheck,
  FiScissors,
} from "react-icons/fi";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isValidUrl = (val: string) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  };

  const handleGenerate = async () => {
    try {
      setError("");
      setShortUrl("");

      if (!url.trim()) {
        setError("Please enter a URL.");
        return;
      }

      if (!isValidUrl(url.trim())) {
        setError("Enter a valid URL including https://");
        return;
      }

      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/shorturl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: `${url}` }),
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to shorten URL");
      }

      const dat = await response.json();

      const shorturl = dat.shortUrl;

      setShortUrl(`${import.meta.env.VITE_API_URL}/${shorturl}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);

        setError(err.message);
      } else {
        console.log("Unknown error");

        setError("Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      {/* Full-bleed noise + grid background — no side gaps */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle center radial — white, not purple */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 100%)",
        }}
      />

      {/* Main layout */}
      <div
        className={`relative z-10 flex flex-col flex-1 items-center justify-center transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {/* Top label */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/70 font-light">
          URL Shortener
        </p>

        {/* Headline — big, full-width feel */}
        <h1
          className="text-center font-light text-white tracking-tight leading-[1.1] mb-4 px-6"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
        >
          Long URLs,
          <span className="font-semibold text-white"> cut short.</span>
        </h1>

        {/* Input area — max width but no card boxing */}
        <div className="w-full max-w-2xl px-4 sm:px-8">
          {/* Desktop: inline row */}
          <div className="hidden sm:flex items-center w-full border border-white/10 rounded-2xl bg-white/[0.03] overflow-hidden focus-within:border-white/25 transition-colors duration-200">
            <div className="pl-5 text-white/20 flex-shrink-0">
              <FiLink2 size={16} />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
                setShortUrl("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              placeholder="https://your-very-long-url.com/some/deep/path"
              className="flex-1 bg-transparent text-white text-sm placeholder-white/20 px-4 py-4 outline-none font-mono caret-white min-w-0"
            />
            <div className="p-2 pr-2">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-sm font-medium transition-all hover:bg-white/90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex gap-1 items-center px-2 py-0.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1 h-1 rounded-full bg-black animate-bounce"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </span>
                ) : (
                  <>
                    <FiScissors size={13} /> Shorten <FiArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="flex sm:hidden flex-col gap-2 w-full">
            <div className="flex items-center w-full border border-white/10 rounded-xl bg-white/[0.03] focus-within:border-white/25 transition-colors">
              <div className="pl-4 text-white/20 flex-shrink-0">
                <FiLink2 size={15} />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                  setShortUrl("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="https://your-long-url.com"
                className="flex-1 bg-transparent text-white text-sm placeholder-white/20 px-3 py-3.5 outline-none font-mono caret-white min-w-0"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1 h-1 rounded-full bg-black animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </span>
              ) : (
                <>
                  <FiScissors size={13} /> Shorten <FiArrowRight size={13} />
                </>
              )}
            </button>
          </div>

          {/* Error */}
          {error && <p className="mt-3 text-xs text-white/40 px-1">{error}</p>}

          {/* Result */}
          {shortUrl && !error && (
            <div className="mt-3 w-full flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                <span className="text-white font-mono text-sm truncate">
                  {shortUrl}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  copied
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {copied ? (
                  <>
                    <FiCheck size={12} /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-8 flex justify-center">
        <p className="text-[11px] text-white/40 tracking-widest uppercase">
          Fast · Free · No tracking
        </p>
      </div>
    </div>
  );
}
