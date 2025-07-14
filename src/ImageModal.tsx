// src/utils/ImageModal.tsx
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  description?: string;
  youtubeLink?: string;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  description,
  youtubeLink,
  onNext,
  onPrev,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
        >
          ✕
        </button>

        <div className="relative w-full h-[80vh] bg-black flex items-center justify-center">
          <img
            src={imageSrc}
            alt="Expanded"
            className="max-h-full max-w-full object-contain"
          />

          {description && (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-30 text-white text-lg p-4 text-center">
              {description}
            </div>
          )}

          {youtubeLink && (
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white underline z-10"
            >
              유튜브 영상 보기
            </a>
          )}

          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
            >
              ◀
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
