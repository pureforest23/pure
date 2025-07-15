import { FaYoutube } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-20 sm:px-4 sm:py-12 bg-white">
      <h2 className="text-2xl font-serifTitle text-forest4">문의</h2>
      <p className="text-gray-600 mb-4">이메일 및 연락처 정보</p>

      <p className="text-gray-800 mt-2">
        이메일: <a href="mailto:your@email.com" className="underline">your@email.com</a>
      </p>
      <p className="text-gray-800">
        연락처: <span className="font-medium">010-1234-5678</span>
      </p>

      <div className="flex items-center space-x-2 mt-8">
        <a
          href="https://www.youtube.com/@순숲"
          target="_blank"
          rel="noopener noreferrer"
          className="py-4 px-4 bg-forest-light rounded-lg hover:bg-forest transition-colors duration-300"
        >
          <FaYoutube size={32} className="text-red-500" />
        </a>
        <span className="text-gray-600 text-sm">YouTube 채널</span>
      </div>
    </section>
  );
}
