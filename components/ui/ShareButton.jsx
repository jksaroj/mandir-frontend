"use client";

import { useMemo, useState } from "react";
import { Copy, MoreHorizontal, Share2 } from "lucide-react";

function currentUrl(fallback = "") {
  if (typeof window === "undefined") return fallback;
  return window.location.href;
}

function resolveShareUrl(url) {
  if (typeof window === "undefined") return url || "";
  if (!url) return window.location.href;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${window.location.origin}${url}`;
  return url;
}

export default function ShareButton({
  title = "Sri Devasthanam",
  url = "",
  label = "Share",
  modalTitle = "Share this page",
  iconOnly = false,
  className = "",
  iconSize = 16,
}) {
  const [open, setOpen] = useState(false);
  const shareUrl = useMemo(() => resolveShareUrl(url) || currentUrl("/"), [url]);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
    } catch {
      /* clipboard may be unavailable */
    }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-label={label}
      >
        <Share2 size={iconSize} />
        {!iconOnly && <span>{label}</span>}
      </button>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/20 px-4" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-4 text-gray-800 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-center text-sm font-extrabold text-gray-900">{modalTitle}</h2>
            <div className="mt-4 grid grid-cols-4 gap-3 text-center text-[10px] font-semibold text-gray-600">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`} className="space-y-1" target="_blank" rel="noreferrer">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white">
                  <Share2 size={15} />
                </span>
                WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} className="space-y-1" target="_blank" rel="noreferrer">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M24 12a12 12 0 1 0-13.9 11.8v-8.4H7.9V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.9 0 1.9.2 1.9.2v2.1h-1.1c-1.1 0-1.4.7-1.4 1.4V12h2.4l-.4 2.4h-2v8.4A12 12 0 0 0 24 12z" />
                  </svg>
                </span>
                Facebook
              </a>
              <button type="button" className="space-y-1" onClick={copy}>
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                Instagram
              </button>
              <button type="button" className="space-y-1" onClick={copy}>
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                  <MoreHorizontal size={15} />
                </span>
                More
              </button>
            </div>
            <button
              type="button"
              onClick={copy}
              className="mt-4 flex w-full items-center justify-between rounded border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span className="inline-flex items-center gap-2">
                <Copy size={13} />
                Copy Link
              </span>
              <Copy size={13} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
