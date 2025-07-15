// components/ProjectHoverCard.tsx

import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";

interface ProjectProps {
  title: string;
  description: string;
  youtube?: string;
}

export default function ProjectHoverCard({
  title,
  description,
  youtube,
}: ProjectProps) {
  return (
    <motion.div
      className="relative w-full h-64 group overflow-hidden bg-yellow-400 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* 노란 배경 (hover 시 부드럽게 확대) */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 z-0"
        initial={{ scale: 1, opacity: 0.9 }}
        whileHover={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* 텍스트 및 인터랙션 */}
      <div className="relative z-10 flex flex-col items-end justify-center h-full p-6 text-right">
        <motion.h3
          className="text-3xl font-bold text-green-900"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* 설명 및 유튜브 링크 */}
        <motion.div
          className="mt-3 text-sm text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p>{description}</p>
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-red-600 hover:underline"
            >
              <FaYoutube size={18} />
              유튜브 보기
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
