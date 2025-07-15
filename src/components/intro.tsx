import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ✅ props 타입을 컴포넌트 밖에서 선언
interface IntroProps {
  onFinish: () => void;
  isMobile: boolean;
}

export default function Intro({ onFinish, isMobile }: IntroProps) {
  const ref = useRef(null);
  const [wheelCount, setWheelCount] = useState(0);
  const [startFadeOut, setStartFadeOut] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  const maxScrolls = 10;
  const progress = Math.min(wheelCount / maxScrolls, 1);
  const opacity = startFadeOut ? 0 : 1 - progress;

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (animationDone) return;
      e.preventDefault();
      if (wheelCount < maxScrolls && !startFadeOut) {
        setWheelCount((prev) => Math.min(prev + 1, maxScrolls));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [wheelCount, startFadeOut, animationDone, isMobile]);

  useEffect(() => {
    if (!isMobile && progress === 1 && !startFadeOut) {
      setStartFadeOut(true);
      setTimeout(() => {
        setAnimationDone(true);
        document.body.style.overflow = "auto";
        onFinish();
      }, 1400);
    }
  }, [progress, startFadeOut, onFinish, isMobile]);

  return (
    <section
      ref={ref}
      id="intro"
      className={`relative min-h-screen w-full ${
        isMobile ? "overflow-auto" : "overflow-hidden"
      } flex items-center justify-center bg-white`}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-0"
        animate={
          isMobile
            ? {}
            : {
                scaleX: 1 - 0.7 * progress,
                scaleY: 1 - 0.3 * progress,
                opacity,
              }
        }
        transition={{
          scaleX: { duration: 2 },
          scaleY: { duration: 2 },
          opacity: { duration: 1.4 },
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover"
        >
          <source src="/video/intro-garden.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent z-10" />
        <motion.img
          src="images/logo.png"
          alt="로고"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-10 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </motion.div>

      <h1 className="absolute z-30 text-[#1c3c2f] text-5xl md:text-6xl font-serifTitle text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        정원, 자연, 디자인
      </h1>
    </section>
  );
}
