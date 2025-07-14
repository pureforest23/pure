import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function About({ onFinish }: { onFinish: () => void }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.8 });

  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setStep(3);
      setLocked(false);
      setFinalVisible(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (locked) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [locked]);

  useEffect(() => {
    if (!isMobile && isInView && step < 3) setLocked(true);
    if (!isMobile && isInView && step === 3) {
      const timeout = setTimeout(() => setLocked(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isMobile, isInView, step]);

  useEffect(() => {
    if (isMobile) return;
    let wheelCount = 0;
    const handleWheel = () => {
      if (!isInView || step >= 3) return;
      wheelCount++;
      if (wheelCount % 9 === 0) {
        setStep((prev) => Math.min(prev + 1, 3));
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isMobile, isInView, step]);

  useEffect(() => {
    if (finalVisible) {
      setTimeout(() => onFinish(), 800);
    }
  }, [finalVisible, onFinish]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 space-y-10"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-serifTitle text-forest text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        자연을 담는 디자인
      </motion.h2>

      {step >= 1 && (
        <motion.p
          className="text-lg md:text-xl text-gray-800 text-center font-serifTitle leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          저희는 정원과 자연을 기반으로 공간을 디자인하는 스튜디오입니다.
        </motion.p>
      )}

      {step >= 2 && (
        <motion.p
          className="text-lg md:text-xl text-gray-800 text-center font-serifTitle leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          단순한 조경을 넘어, 시간이 머무는 감성적 풍경을 만들어갑니다.
        </motion.p>
      )}

      {step >= 3 && (
        <motion.p
          className="text-lg md:text-xl text-gray-800 text-center font-serifTitle leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setFinalVisible(true)}
        >
          작업의 시작부터 마무리까지, 진정성과 섬세함으로 완성합니다.
        </motion.p>
      )}
    </section>
  );
}
