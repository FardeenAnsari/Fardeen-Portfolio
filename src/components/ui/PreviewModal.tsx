"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Download, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export type PreviewItem = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  downloadUrl?: string;
  category?: string;
  date?: string;
  description?: string;
};

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: PreviewItem | null;
  items?: PreviewItem[];
  onNavigate?: (item: PreviewItem) => void;
}

export function PreviewModal({
  isOpen,
  onClose,
  currentItem,
  items = [],
  onNavigate,
}: PreviewModalProps) {
  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!items || items.length <= 1 || !currentItem) return;

      const currentIndex = items.findIndex((i) => i.id === currentItem.id);
      if (currentIndex === -1) return;

      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % items.length;
        onNavigate?.(items[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onNavigate?.(items[prevIndex]);
      }
    },
    [onClose, items, currentItem, onNavigate]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  const currentIndex = items.findIndex((i) => i.id === currentItem.id);
  const hasMultiple = items.length > 1 && currentIndex !== -1;

  const handlePrev = () => {
    if (!hasMultiple) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate?.(items[prevIndex]);
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate?.(items[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-[var(--color-rule)] bg-[var(--color-paper-2)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
          <div className="space-y-0.5 min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-wider">
                {currentItem.category || "Document Preview"}
              </span>
              {currentItem.date && (
                <>
                  <span className="text-[var(--color-ink-3)] text-xs">·</span>
                  <span className="font-mono text-[11px] text-[var(--color-ink-3)]">
                    {currentItem.date}
                  </span>
                </>
              )}
            </div>
            <h3
              id="preview-modal-title"
              className="text-base sm:text-lg font-bold text-[var(--color-ink)] truncate font-display"
            >
              {currentItem.title}
            </h3>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {currentItem.downloadUrl && (
              <a
                href={currentItem.downloadUrl}
                download
                className="btn-ghost py-1.5 px-3 text-xs flex items-center gap-1.5"
                title="Download file"
                aria-label="Download original document"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Download</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg border border-[var(--color-rule)] text-[var(--color-ink-2)] hover:text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
              aria-label="Close preview modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image Preview Body */}
        <div className="relative flex-1 min-h-[300px] max-h-[68vh] overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[var(--color-paper)]">
          <div className="relative w-full h-full min-h-[280px] max-h-[64vh] flex items-center justify-center">
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.title}
              width={1400}
              height={1000}
              className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg border border-[var(--color-rule)] shadow-lg"
              priority
            />
          </div>

          {/* Prev/Next Navigation Controls for Galleries */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)]/90 text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors shadow-lg"
                aria-label="Previous item"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)]/90 text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors shadow-lg"
                aria-label="Next item"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Footer Bar */}
        {(currentItem.description || currentItem.subtitle) && (
          <div className="px-5 py-3 border-t border-[var(--color-rule)] bg-[var(--color-paper-2)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-ink-2)]">
            <p className="line-clamp-2">
              {currentItem.description || currentItem.subtitle}
            </p>
            {hasMultiple && (
              <span className="font-mono text-[11px] text-[var(--color-ink-3)] flex-shrink-0">
                {currentIndex + 1} of {items.length}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
