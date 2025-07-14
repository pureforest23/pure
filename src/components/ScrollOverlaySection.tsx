import { useState } from "react";

export default function ScrollOverlaySection() {
  const [sliderValue, setSliderValue] = useState(0);

  const images = [
    "/images/1.png",
    "/images/2.2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ];

  const labels = ["계획", "기초모델링", "디테일링", "랜더링", "완료"];
  const stepCount = images.length;

  const exactIndex = sliderValue * (stepCount - 1);

  return (
    <section
      id="process"
      className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center"
    >
      {/* 제목 */}
      <h2 className="absolute top-10 left-10 text-3xl font-bold z-20">
        작업과정
      </h2>

      {/* 이미지 오버레이 */}
      <div className="relative w-full h-full">
        {images.map((src, idx) => {
          const distance = Math.abs(idx - exactIndex);
          const opacity = Math.max(1 - distance, 0);

          return (
            <img
              key={idx}
              src={src}
              alt={`step-${idx}`}
              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-opacity duration-150 ease-in-out"
              style={{
                opacity,
                zIndex: Math.round(opacity * 10), // 더 진한 이미지가 위에 오게
              }}
            />
          );
        })}
      </div>

      {/* 슬라이더 바 */}
      <div className="absolute z-30 bottom-1/2 translate-y-1/2 w-[60%]">
        <div className="relative flex flex-col items-center">
          {/* 슬라이더 */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={sliderValue}
            onChange={(e) => setSliderValue(parseFloat(e.target.value))}
            className="w-full h-3 appearance-none bg-gray-300 rounded-full outline-none cursor-pointer"
            style={{ accentColor: "#15803d" }}
          />

          {/* 텍스트 레이블 */}
          <div className="absolute top-6 left-0 w-full flex justify-between">
            {labels.map((label, idx) => {
              const isActive = Math.abs(exactIndex - idx) < 0.5;

              return (
                <div
                  key={idx}
                  className={`text-xs md:text-sm text-center w-24 transition-all duration-200  whitespace-nowrap ${
                    isActive
                      ? "text-white bg-green-700 px-2 py-1 rounded-full font-semibold shadow"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
