import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ✅ props 타입 정의 추가
interface IntroProps {
  onFinish: () => void;
  isMobile: boolean;
}

export default function Intro({ onFinish, isMobile }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isMobile) {
      // 모바일은 영상 끝까지 재생하지 않고 바로 onFinish 호출
      onFinish();
    } else {
      const video = videoRef.current;
      if (video) {
        video.play();
        const handleEnded = () => onFinish();
        video.addEventListener("ended", handleEnded);
        return () => {
          video.removeEventListener("ended", handleEnded);
        };
      }
    }
  }, [onFinish, isMobile]);

  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center">
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        muted
        playsInline
      >
        <source src="/intro.mp4" type="video/mp4" />
        브라우저가 video 태그를 지원하지 않습니다.
      </motion.video>
    </section>
  );
}
