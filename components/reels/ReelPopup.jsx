"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Copy, Eye, Share2, X } from "lucide-react";
import { apiPost } from "@/lib/api";
import { resolveImageUrl } from "@/lib/images";

// ─── helpers ─────────────────────────────────────────────────────────────────

function youtubeIdFromUrl(url) {
  const raw = String(url || "");
  const patterns = [
    /youtube\.com\/shorts\/([^?&/]+)/i,
    /youtube\.com\/watch\?v=([^?&/]+)/i,
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
  ];
  for (const p of patterns) {
    const m = raw.match(p);
    if (m?.[1]) return m[1];
  }
  return "";
}

function formatCount(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return String(num);
}

function isFallback(id) {
  return !id || String(id).startsWith("fallback-") || String(id).startsWith("api-");
}

// ─── share button ─────────────────────────────────────────────────────────────

function ShareBtn({ label, icon, onClick, colorClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={"Share on " + label}
      className="flex flex-col items-center gap-1.5 transition-transform active:scale-95"
    >
      <span className={"flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md " + colorClass}>
        {icon}
      </span>
      <span className="text-[10px] font-semibold text-white/50">{label}</span>
    </button>
  );
}

// ─── SVG brand icons ──────────────────────────────────────────────────────────

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// ─── main component ───────────────────────────────────────────────────────────

export default function ReelPopup({ reels = [], initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [views, setViews] = useState({});
  const [shareCounts, setShareCounts] = useState({});
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef(null);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef(null);

  const reel = reels[index];
  const reelId = reel?._id || reel?.id;

  const youtubeId = reel?.sourceType === "youtube"
    ? youtubeIdFromUrl(reel?.videoUrl || "")
    : "";

  const shareUrl = (() => {
    if (youtubeId) return "https://www.youtube.com/watch?v=" + youtubeId;
    if (reel?.videoFile) return resolveImageUrl(reel.videoFile, "");
    if (reel?.videoUrl) return reel.videoUrl;
    return typeof window !== "undefined" ? window.location.href : "/reels";
  })();

  const currentViews  = views[reelId]      ?? (Number(reel?.views)      || 0);
  const currentShares = shareCounts[reelId] ?? (Number(reel?.shareCount) || 0);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, reels.length - 1));
  }, [reels.length]);

  // Portal mount guard
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll (iOS-safe: position fixed)
  useEffect(() => {
    const scrollY = window.scrollY;
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevWidth    = document.body.style.width;
    const prevTop      = document.body.style.top;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width    = "100%";
    document.body.style.top      = "-" + scrollY + "px";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.width    = prevWidth;
      document.body.style.top      = prevTop;
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")                               onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown")  { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")    { e.preventDefault(); goPrev(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goNext, goPrev, onClose]);

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaY) < 35 || wheelLockRef.current) return;
    e.preventDefault();
    wheelLockRef.current = true;
    if (e.deltaY > 0) goNext();
    else goPrev();
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, 450);
  }, [goNext, goPrev]);

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (touchStartRef.current) e.preventDefault();
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches?.[0];
    touchStartRef.current = null;
    if (!start || !touch) return;

    const dy = touch.clientY - start.y;

    if (Math.abs(dy) < 45) return;
    if (dy > 0) goNext();
    else goPrev();
  }, [goNext, goPrev]);

  // Increment view count when reel changes
  useEffect(() => {
    if (!reelId || isFallback(reelId)) return;
    if (views[reelId] != null) return;
    setViews((prev) => ({ ...prev, [reelId]: (reel?.views || 0) + 1 }));
    apiPost("/reels/" + reelId + "/view")
      .then((res) => {
        if (res?.data?.views != null)
          setViews((prev) => ({ ...prev, [reelId]: res.data.views }));
      })
      .catch(() => {});
  }, [reelId]); // eslint-disable-line react-hooks/exhaustive-deps

  const trackShare = useCallback(() => {
    if (!reelId || isFallback(reelId)) return;
    setShareCounts((prev) => ({ ...prev, [reelId]: (prev[reelId] ?? currentShares) + 1 }));
    apiPost("/reels/" + reelId + "/share")
      .then((res) => {
        if (res?.data?.shareCount != null)
          setShareCounts((prev) => ({ ...prev, [reelId]: res.data.shareCount }));
      })
      .catch(() => {});
  }, [reelId, currentShares]);

  const handleShare = useCallback((platform) => {
    const title = encodeURIComponent(reel?.title || "Divine Reel");
    const url   = encodeURIComponent(shareUrl);
    const links = {
      whatsapp: "https://wa.me/?text=" + title + "%20" + url,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + url,
      telegram: "https://t.me/share/url?url=" + url + "&text=" + title,
    };
    if (platform === "instagram") {
      if (navigator.share) navigator.share({ title: reel?.title || "Divine Reel", url: shareUrl });
      else navigator.clipboard.writeText(shareUrl).catch(() => {});
    } else if (links[platform]) {
      window.open(links[platform], "_blank", "noopener,noreferrer");
    }
    trackShare();
  }, [reel, shareUrl, trackShare]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    trackShare();
  }, [shareUrl, trackShare]);

  if (!mounted || !reel) return null;

  const content = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={reel?.title ? "Playing: " + reel.title : "Reel player"}
    >
      {/* ── Modal card ── */}
      <div className="relative flex h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-[#0e0808] shadow-2xl sm:h-auto sm:max-w-sm sm:rounded-2xl">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Counter badge */}
        {reels.length > 1 && (
          <div className="absolute left-3 top-3 z-20 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {index + 1} / {reels.length}
          </div>
        )}

        {/* ── Video area (9:16) ── */}
        <div className="relative min-h-0 flex-1 bg-black sm:aspect-[9/16] sm:w-full sm:flex-none">
          {youtubeId ? (
            <iframe
              key={youtubeId}
              title={reel?.title}
              src={"https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&playsinline=1&modestbranding=1&rel=0"}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : reel?.videoFile ? (
            <video
              key={reel.videoFile}
              src={resolveImageUrl(reel.videoFile, "")}
              className="absolute inset-0 h-full w-full object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            /* Fallback: sample video so player is always functional */
            <video
              key="fallback"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              poster={reel?.thumbnail || "/reels/shiva.svg"}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              autoPlay
              playsInline
            />
          )}

          {reel?.deity && (
            <span className="absolute left-3 bottom-3 z-20 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-bold text-[#d9a441] backdrop-blur-sm">
              #{reel.deity}
            </span>
          )}

          {reels.length > 1 && (
            <div
              className="absolute inset-0 z-10 cursor-ns-resize touch-none"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-hidden="true"
            />
          )}
        </div>

        {/* ── Footer ── */}
        <div className="bg-[#170d0d] px-4 pb-5 pt-3">
          <h2 className="line-clamp-1 text-sm font-extrabold text-white">{reel?.title}</h2>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-white/45">
            <span className="flex items-center gap-1"><Eye size={12} />{formatCount(currentViews)} views</span>
            <span className="flex items-center gap-1"><Share2 size={12} />{formatCount(currentShares)} shares</span>
          </div>
          <div className="my-3 h-px w-full bg-white/10" />
          <div className="flex items-center justify-around">
            <ShareBtn label="WhatsApp"  icon={<WhatsAppIcon />}  onClick={() => handleShare("whatsapp")}  colorClass="bg-[#25D366]" />
            <ShareBtn label="Facebook"  icon={<FacebookIcon />}  onClick={() => handleShare("facebook")}  colorClass="bg-[#1877F2]" />
            <ShareBtn label="Instagram" icon={<InstagramIcon />} onClick={() => handleShare("instagram")} colorClass="bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" />
            <ShareBtn label="Telegram"  icon={<TelegramIcon />}  onClick={() => handleShare("telegram")}  colorClass="bg-[#2AABEE]" />
            <ShareBtn
              label={copied ? "Copied!" : "Copy"}
              icon={copied ? <Check size={20} /> : <Copy size={20} />}
              onClick={handleCopy}
              colorClass={copied ? "bg-green-500" : "bg-white/20"}
            />
          </div>
        </div>
      </div>

    </div>
  );

  return createPortal(content, document.body);
}
