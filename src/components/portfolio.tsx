import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const projects = [
  {
    images: [
      {
        src: "/portfolio/M.png",
        title: "건축물 조성",
        description: "디자인(2024.08)",
      },
      {
        src: "/portfolio/P.png",
        title: "어린이공원 조성",
        description: "식재 컨설팅 및 디자인(2024.02)",
      },
      {
        src: "/portfolio/H.png",
        title: "공원 쉼터",
        description: "디자인(2025.04)",
      },
      {
        src: "/portfolio/D.png",
        title: "구도심 거리 조성",
        description: "디자인(2025.03)",
      },
      {
        src: "/portfolio/C.png",
        title: "대나무숲 공원",
        description: "식재 컨설팅 및 디자인(2025.03.04)",
      },
      {
        src: "/portfolio/B.png",
        title: "소공원",
        description: "식재 컨설팅 및 디자인(2025.02)",
      },
      {
        src: "/portfolio/E.png",
        title: "메타세쿼이아 식재",
        description: "식재 컨설팅 및 디자인(2025.04)",
      },
      {
        src: "/portfolio/F.png",
        title: "공원 조성",
        description: "디자인(2024.11)",
      },
      {
        src: "/portfolio/G.png",
        title: "데크로드 조성",
        description: "디자인(2025.04)",
      },
      {
        src: "/portfolio/I.png",
        title: "전시관 조성",
        description: "식재/시공 및 디자인(2025.05)",
      },
      {
        src: "/portfolio/J.png",
        title: "드론센터 조성",
        description: "디자인(2024.12)",
      },
      {
        src: "/portfolio/K.png",
        title: "건축물 조성",
        description: "디자인(2024.11)",
      },
      {
        src: "/portfolio/L.png",
        title: "공원 식재",
        description: "식재 컨설팅 및 디자인(2024.10)",
      },
      {
        src: "/portfolio/O.png",
        title: "유원지 조성",
        description: "식재 컨설팅 및 디자인(2024.07)",
      },
    ],
  },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<{
    src: string;
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children);
      let closestIdx = 0;
      let minDistance = Infinity;

      children.forEach((child, idx) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 - window.innerWidth / 2
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setCenterIdx(closestIdx);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const wrapper = document.getElementById("portfolio-scroll-area");
      if (!wrapper?.contains(e.target as Node)) return;

      e.preventDefault();
      if (!containerRef.current || isScrolling) return;

      setIsScrolling(true);
      if (e.deltaY < 0) {
        containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
      setTimeout(() => setIsScrolling(false), 600);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling]);

  return (
    <section
      id="portfolio"
      className="min-h-[200vh] py-60 px-6 bg-white relative flex flex-col justify-center"
    >
      <h2 className="text-2xl font-serifTitle text-center text-forest mb-10">
        포트폴리오
      </h2>


      <div
        id="portfolio-scroll-area"
        className="w-full overflow-hidden min-h-[90vh] flex items-center"
      >
        <div
          ref={containerRef}
          className="overflow-x-scroll no-scrollbar flex items-center space-x-10 px-[50vw] snap-x snap-mandatory transition-all opacity duration-300 ease-in-out py-40"
        >
          {projects[0].images.map((image, idx) => {
            const isCenter = idx === centerIdx;

            return (
              <div
                key={idx}
                className={clsx(
                  "snap-center shrink-0 relative",
                  "w-[320px] h-[540px] md:w-[400px] md:h-[600px]",
                  "transition-all duration-700 ease-in-out",
                  isCenter ? "z-30" : "opacity-50"
                )}
              >
                <div
                  className={clsx(
                    "relative w-full h-full overflow-hidden rounded-lg",
                    "transition-all duration-700 ease-in-out"
                  )}
                  style={{
                    transform: isCenter ? "scale(1.15)" : "scale(0.9)",
                    filter: isCenter ? "blur(0px)" : "blur(4px)",
                    willChange: "transform, filter",
                  }}
                >
                  <img
                    src={image.src}
                    alt={`프로젝트 이미지 ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg cursor-zoom-in pointer-events-auto"
                    onClick={() => {
                      setModalImage({
                        src: image.src,
                        title: image.title,
                        description: image.description,
                      });
                      setIsModalOpen(true);
                    }}
                  />
                </div>

                {isCenter && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 pointer-events-none">
                    <h3 className="text-2xl md:text-2x1 font-bold drop-shadow-md">
                      {image.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-sm font-bold drop-shadow-md">
                      {image.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute top-10 left-10 bg-black bg-opacity-50 text-white p-4 rounded-lg max-w-sm">
            <h3 className="text-xl font-bold">{modalImage.title}</h3>
            <p className="text-sm mt-2">{modalImage.description}</p>
          </div>
          <img
            src={modalImage.src}
            alt="원본 이미지"
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
