import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

// 🔽 Work 타입 정의 추가
interface Work {
  title: string;
  award?: string;
  period?: string;
  description?: string;
  client?: string;
  role?: string;
  images?: string[];
  videoUrl?: string;
}

export default function Works() {
  const works: Work[] = [
    {
      title: "전주정원산업박람회",
      award: "대상",
      period: "2025",
      description: "시민작가 부문",
      images: ["/images/개념.png", "/images/전주정원이미지.jpg"],
      videoUrl: "https://youtu.be/CpuszDeLFqw?si=5GKx4G7BX9WZmJNc",
    },
    {
      title: "전라남도정원페스티벌",
      award: "최우수상",
      period: "2025",
      images: ["/images/전남정원.png"],
      videoUrl: "https://youtu.be/CpuszDeLFqw?si=5GKx4G7BX9WZmJNc",
    },
    {
      title: "고창군 성내어울림체육센터 디자인",
      period: "2025.04~.06",
      client: "고창군",
      role: "투시도/영상",
      images: ["/images/성내면.jpg"],
    },
    {
      title: "고창군 죽산마을 시공",
      period: "2024.11.",
      client: "고창군",
      role: "시공/투시도",
      images: [
        "/images/죽산 (8).jpg",
        "/images/죽산 (9).jpg",
        "/images/죽산랜.jpg",
      ],
    },
    {
      title: "고창군 장두마을 시공",
      period: "2024.10.",
      client: "고창군",
      role: "시공/투시도",
      images: [
        "/images/장두 (1).jpg",
        "/images/장두 (2).jpg",
        "/images/장두 (3).jpg",
        "/images/장두 (4).jpg",
      ],
    },
  ];

  return (
    <section id="works" className="py-16 px-6">
      <h2 className="text-2xl font-serifTitle text-forest mb-10">
        실적 및 수상
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {works.map((work) => (
          <WorkCard key={work.title} work={work} />
        ))}
      </div>
    </section>
  );
}

// 🔽 WorkCard의 props 타입 명시
function WorkCard({ work }: { work: Work }) {
  const validImages = (work.images || []).filter(
    (src) => typeof src === "string" && src.trim() !== ""
  );
  const imageCount = validImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative bg-white h-[500px] flex items-center justify-center">
        {imageCount === 0 && <div className="text-gray-400">이미지 없음</div>}

        {imageCount === 1 && (
          <img
            src={validImages[0]}
            alt={`${work.title} 이미지`}
            className="w-full h-[500px] object-contain"
          />
        )}

        {imageCount > 1 && (
          <div className="relative w-full h-[500px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(100 / imageCount) * currentIndex}%)`,
                width: `${imageCount * 100}%`,
              }}
            >
              {validImages.map((src, i) => (
                <div
                  key={`${work.title}-${i}`}
                  className="flex-shrink-0 w-full flex items-center justify-center"
                  style={{ width: `${100 / imageCount}%` }}
                >
                  <img
                    src={src}
                    alt={`${work.title} 이미지 ${i + 1}`}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              ))}
            </div>

            {/* Prev / Next buttons */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-3xl z-10"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full text-3xl z-10"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-1">
        {work.title && <h3 className="text-lg font-semibold">{work.title}</h3>}
        {work.award && <p className="text-sm text-gray-500">{work.award}</p>}
        {work.description && (
          <p className="text-sm text-gray-600">{work.description}</p>
        )}
        {(work.period || work.client || work.role) && (
          <div className="text-sm text-gray-400 mt-2 space-y-1">
            {work.period && (
              <p>
                <strong>기 간:</strong> {work.period}
              </p>
            )}
            {work.client && (
              <p>
                <strong>발주처:</strong> {work.client}
              </p>
            )}
            {work.role && (
              <p>
                <strong>참여분야:</strong> {work.role}
              </p>
            )}
          </div>
        )}
        {work.videoUrl && (
          <a
            href={work.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 mt-2 text-sm text-forest hover:underline"
          >
            <FaYoutube className="text-red-500 text-2xl" />
            <span>영상 보기</span>
          </a>
        )}
      </div>
    </div>
  );
}
