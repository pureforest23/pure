import { useRef, useEffect, useState } from "react";

export default function ScrollOverlaySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const imageCount = 5;
  const images = [
    "/images/bf.jpg",
    "/images/mis.jpg",
    "/images/mi.jpgg",
    "/images/step4.png",
    "/images/af.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = scrollRef.current?.scrollLeft || 0;
      const scrollWidth =
        (scrollRef.current?.scrollWidth || 1) -
        (scrollRef.current?.clientWidth || 1);
      const percent = scrollLeft / scrollWidth;
      setScrollPercent(percent);
    };

    const container = scrollRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="scroll-overlay"
      className="relative w-full h-screen bg-black text-white"
    >
      <h2 className="absolute top-10 left-10 text-3xl font-bold z-20">
        작업과정
      </h2>

      <div
        ref={scrollRef}
        className="absolute bottom-0 left-0 w-full h-full overflow-x-scroll whitespace-nowrap"
      >
        <div className="w-[500vw] h-full relative">
          {images.map((src, idx) => {
            const threshold = (idx + 1) / imageCount;
            const isVisible = scrollPercent >= threshold - 0.2;
            return (
              <img
                key={idx}
                src={src}
                alt={`step-${idx}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
