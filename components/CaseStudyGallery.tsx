"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  imageCaption,
  imageIsSmall,
  imageSrc,
  isVideoSrc,
  type GalleryImage,
} from "@/content/caseStudies";

// Renders a GIF-replacement clip (.mp4/.webm) as a looping muted video, or
// a plain photo as an <img> — same call sites, whichever the src needs.
function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return isVideoSrc(src) ? (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

// Renders a case study's screenshots as a single horizontally-scrolling
// strip (featured images first, larger, then the rest) so the gallery
// doesn't eat vertical space, and wires every one of them into a shared
// full-screen lightbox — click any image to open it, then step through
// the whole set with the arrows, the filmstrip, or the keyboard. Captions
// (when set on an image) show as a bar over the bottom edge of the
// thumbnail — faded in on hover on pointer devices, always-on on touch
// devices since there's no hover there — and repeated under the photo in
// the full-screen lightbox.
export function CaseStudyGallery({
  featuredImages = [],
  gallery = [],
  alt,
}: {
  featuredImages?: GalleryImage[];
  gallery?: GalleryImage[];
  alt: string;
}) {
  const allImages = [...featuredImages, ...gallery];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (allImages.length === 0) return null;

  return (
    <>
      <div className="mt-16 flex items-center gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {featuredImages.map((image, i) => (
          <button
            key={imageSrc(image)}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block shrink-0 cursor-zoom-in snap-start"
          >
            <Photo
              src={imageSrc(image)}
              alt={alt}
              className={`w-auto rounded-2xl border border-ink/10 shadow-soft transition-opacity group-hover:opacity-90 ${
                imageIsSmall(image) ? "h-48 sm:h-56" : "h-72 sm:h-96"
              }`}
            />
            <Caption text={imageCaption(image)} rounded="rounded-b-2xl" />
          </button>
        ))}

        {gallery.map((image, i) => (
          <button
            key={imageSrc(image)}
            type="button"
            onClick={() => setOpenIndex(featuredImages.length + i)}
            className="group relative block shrink-0 cursor-zoom-in snap-start"
          >
            <Photo
              src={imageSrc(image)}
              alt={alt}
              className="h-48 w-auto rounded-xl border border-ink/10 shadow-soft transition-opacity group-hover:opacity-90 sm:h-56"
            />
            <Caption text={imageCaption(image)} rounded="rounded-b-xl" />
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

// The caption bar overlaid on a thumbnail's bottom edge. Hidden by default
// and faded in with `group-hover`, but forced visible on touch devices
// (`hover: none`) since there's no hover state to reveal it there.
function Caption({ text, rounded }: { text?: string; rounded: string }) {
  if (!text) return null;
  return (
    <span
      className={`absolute inset-x-0 bottom-0 ${rounded} bg-ink/75 px-3 py-2 text-left text-xs text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 [@media(hover:none)]:opacity-100`}
    >
      {text}
    </span>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onClose,
  onIndexChange,
}: {
  images: GalleryImage[];
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

            <div
              className="relative z-10 flex max-h-full max-w-full flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo
                src={imageSrc(images[index])}
                alt={alt}
                className="max-h-[75vh] max-w-full cursor-default rounded-xl object-contain shadow-soft"
              />
              {imageCaption(images[index]) && (
                <p className="max-w-xl text-center text-sm text-cream/80">
                  {imageCaption(images[index])}
                </p>
              )}
            </div>

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
              {images.map((image, i) => (
                <button
                  key={imageSrc(image)}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
                    i === index
                      ? "border-coral opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Photo
                    src={imageSrc(image)}
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
