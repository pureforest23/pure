export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  const container = document.querySelector("main");

  if (!section || !container) return;

  // 포트폴리오 섹션만 yOffset 적용
  const yOffset = id === "portfolio" ? +600 : 0;

  const targetY =
    section.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop +
    yOffset;

  (container as HTMLElement).scrollTo({ top: targetY, behavior: "smooth" });
};
