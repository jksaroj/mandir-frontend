"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FALLBACK_TEMPLE_IMAGE,
  isBackendUploadUrl,
  isValidImageSrc,
  resolveImageUrl,
} from "@/lib/images";

/**
 * next/image with backend upload support (unoptimized localhost) and fallback on error.
 */
export default function OptimizedImage({
  src,
  alt = "",
  fill,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  quality = 85,
  fallbackLabel,
}) {
  const initial = resolveImageUrl(src, FALLBACK_TEMPLE_IMAGE);
  const [imgSrc, setImgSrc] = useState(initial);

  useEffect(() => {
    setImgSrc(resolveImageUrl(src, FALLBACK_TEMPLE_IMAGE));
  }, [src]);

  const handleError = () => {
    if (imgSrc !== FALLBACK_TEMPLE_IMAGE) {
      setImgSrc(FALLBACK_TEMPLE_IMAGE);
    }
  };

  if (!isValidImageSrc(imgSrc)) {
    if (fallbackLabel) {
      return (
        <div
          className={`flex items-center justify-center bg-[#f5ebe0] text-sm font-semibold text-[#9b5252] ${className}`}
          role="img"
          aria-label={alt || fallbackLabel}
        >
          {fallbackLabel}
        </div>
      );
    }
    return null;
  }

  const unoptimized = isBackendUploadUrl(imgSrc);

  const props = {
    src: imgSrc,
    alt: alt.trim() || "Temple image",
    className,
    priority,
    quality,
    sizes: sizes || (fill ? "100vw" : undefined),
    unoptimized,
    onError: handleError,
  };

  if (fill) {
    return <Image {...props} fill />;
  }

  return (
    <Image
      {...props}
      width={width ?? 800}
      height={height ?? 600}
    />
  );
}
