// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serifTitle: ["'DM Serif Display'", "serif"], // 제목용 폰트
        body: ["Inter", "sans-serif"], // 본문용 폰트
      },
      colors: {
        forest: {
          DEFAULT: "#3f5d45", // 진한 녹색 톤 (주요 강조 컬러)
          light: "#e5ede3", // 밝은 자연 베이지 톤 (배경, 강조 배경)
          dark: "#2f4835", // 좀 더 어두운 포인트 (호버, 텍스트)
          text: "#4a5b50", // 서브 텍스트
        },
        gray: {
          100: "#f7f7f7",
          200: "#eaeaea",
          300: "#d1d1d1",
          500: "#888888",
          700: "#4a4a4a",
        },
      },
    },
  },
  plugins: [],
};
