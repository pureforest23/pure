import { FaYoutube } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen p-8">
      <h2 className="text-2xl font-serifTitle text-forest4">문의</h2>
      <p className="text-gray-600 mb-4">이메일 및 연락처 정보</p>

      {/* 유튜브 아이콘 링크 */}
      <div className="flex items-center space-x-2 mt-4">
        <a
          href="https://www.youtube.com/@순숲"
          target="_blank"
          rel="noopener noreferrer"
          className="py-16 px-6 bg-forest-light rounded-lg"
        >
          <FaYoutube />
        </a>
        <span className="text-gray-600 text-sm">YouTube 채널</span>
      </div>
    </section>
  );
}
