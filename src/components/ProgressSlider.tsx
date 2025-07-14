import { useState } from "react";

const steps = [
  { label: "계획", sub: "01" },
  { label: "설계", sub: "02" },
  { label: "조감도", sub: "03" },
  { label: "시공", sub: "04" },
  { label: "완료", sub: "05" },
];

export default function ProgressSlider() {
  const [currentStep, setCurrentStep] = useState(2); // 가운데 항목부터 시작

  return (
    <div className="w-full h-40 flex items-center justify-center bg-white">
      <div className="w-4/5 bg-gray-100 rounded-full shadow-inner p-4 flex items-center justify-around relative h-24">
        {steps.map((step, index) => {
          const isActive = index === currentStep;

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-green-600 text-white rounded-full px-6 py-3 shadow-lg scale-110 z-10"
                  : "text-gray-700"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="text-xs uppercase tracking-wider">
                {step.label}
              </div>
              <div className="text-2xl font-bold">{step.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
