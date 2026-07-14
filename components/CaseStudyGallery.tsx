"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Renders a case study's screenshots as a single horizontally-scrolling
// strip (featured images first, larger, then the rest) so the gallery
// doesn't eat vertical space, and wires every one of them into a shared
// full-screen lightbox — click any image to open it, then step through
// the whole set with the arrows, the filmstrip, or the keyboard.
export function CaseStudyGallery({
  featuredImages = [],
  gallery = [],
  alt,
}: {
  featuredImages?: string[];
  gallery?: string[];
  alt: string;
}) {
  const allImages = [...featuredImages, ...gallery];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (allImages.length === 0) return null;

  return (
    <>
      <div className="mt-16 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {featuredImages.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="block shrink-0 cursor-zoom-in snap-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-72 w-auto rounded-2xl border border-ink/10 shadow-soft transition-opacity hover:opacity-90 sm:h-96"
            />
          </button>
        ))}

        {gallery.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(featuredImages.length + i)}
            className="block shrink-0 cursor-zoom-in snap-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="h-48 w-auto rounded-xl border border-ink/10 shadow-soft transition-opacity hover:opacity-90 sm:h-56"
            />
          </button>
        ))}
      </div>

      <Lightbox
        images={allImages}
        alt={alt}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[];
  alt: string;
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || index === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight")
        onIndexChange((index! + 1) % images.length);
      else if (e.key === "ArrowLeft")
        onIndexChange((index! - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, index, images.length, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {isOpen && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 sm:p-8"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-transform hover:scale-105"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange((index - 1 + images.length) % images.length);
                }}
                aria-label="Previous image"
                className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-transform hover:scale-105 sm:left-4"
              >
                <ChevronIcon direction="left" className="h-5 w-5" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-h-full max-w-full cursor-default rounded-xl object-contain shadow-soft"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange((index + 1) % images.length);
                }}
                aria-label="Next image"
                className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-soft transition-transform hover:scale-105 sm:right-4"
              >
                <ChevronIcon direction="right" className="h-5 w-5" />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
                    i === index
                      ? "border-coral opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6 18 18M6 18 18 6" />
    </svg>
  );
}

function ChevronIcon({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
