import { useState, useEffect, useRef } from "react";
import "./index.css";
import Sidebar from "./components/sidebar";
import Intro from "./components/intro";
import About from "./components/about";
import ScrollOverlaySection from "./components/ScrollOverlaySection";
import Portfolio from "./components/portfolio";
import Works from "./components/works";
import Contact from "./components/contact";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [aboutDone, setAboutDone] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 모바일 여부 체크
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ 모바일일 경우 바로 Intro/About 완료 처리
  useEffect(() => {
    if (isMobile) {
      setIntroDone(true);
      setAboutDone(true);
    }
  }, [isMobile]);

  // ✅ 스크롤 허용 조건
  useEffect(() => {
    if (mainRef.current) {
      const allowScroll = isMobile || (introDone && aboutDone);
      mainRef.current.style.overflowY = allowScroll ? "scroll" : "hidden";

      // ✅ 모바일은 body도 강제 허용
      if (isMobile) {
        document.body.style.overflowY = "auto";
      }
    }
  }, [introDone, aboutDone, isMobile]);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* ✅ 모바일 햄버거 */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 text-3xl md:hidden"
        >
          ☰
        </button>
      )}

      <main ref={mainRef} className="w-full md:w-4/5 scroll-smooth">
        {isMobile ? (
          <>
            <Intro onFinish={() => {}} isMobile={true} />
            <About onFinish={() => {}} isMobile={true} />
            <ScrollOverlaySection />
            <Portfolio />
            <Works />
            <Contact />
          </>
        ) : (
          <>
            {!introDone && (
              <Intro onFinish={() => setIntroDone(true)} isMobile={false} />
            )}
            {introDone && !aboutDone && (
              <About onFinish={() => setAboutDone(true)} isMobile={false} />
            )}
            {introDone && aboutDone && (
              <>
                <ScrollOverlaySection />
                <Portfolio />
                <Works />
                <Contact />
              </>
            )}
          </>
        )}
      </main>

      <Sidebar
        introUnlocked={introDone && aboutDone}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
