import "./FloatingButtons.css";
import { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa6";

export default function FloatingButtons() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [hideWhatsApp, setHideWhatsApp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);

      const footer = document.querySelector("footer, .MainBoxFooter, .Footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setHideWhatsApp(footerTop < windowHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ زر واتساب - أسفل اليسار */}
      <a
        href="https://wa.me/963982359538"
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-btn whatsapp-btn ${hideWhatsApp ? "hidden" : ""}`}
        title="تواصل معنا على واتساب"
      >
        <BsWhatsapp />
        <span className="pulse-ring"></span>
      </a>

      {/* ✅ زر العودة للأعلى - أسفل اليمين */}
      <button
        className={`floating-btn scroll-top-btn ${showScrollBtn ? "visible" : ""}`}
        onClick={scrollToTop}
        title="العودة للأعلى"
      >
        <FaArrowUp />
      </button>
    </>
  );
}
