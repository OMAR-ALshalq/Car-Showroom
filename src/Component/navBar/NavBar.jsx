import "./NavBar.css";
import SearchDropdown from "./SearchDropdown";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
// Icon
import { MdOutlineDarkMode } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { GrSearch } from "react-icons/gr";
import { FaThList } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export default function NavBar() {
  // start DarkMod
const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem("site-theme"); // ✅ localStorage
  if (savedTheme) return savedTheme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});

useEffect(() => {
  const theme = isDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("site-theme", theme); // ✅ localStorage
}, [isDark]);
  // End DarkMod

  //Start inmationTag
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    { name: "الرئيسية", path: "/#mainpaig" },
    { name: "جميع السيارات", path: "/allCar#allCar" },
    { name: "الماركات", path: "/#Brand" },
    { name: "الاشكال", path: "/#BodyType" },
    { name: "من نحن", path: "/Whoarewe#Whoarewe" },
    { name: "تواصل معنا", path: "/Contact#contact" }
  ];
  //End inmationTag

  //Start ShowListTag
  const [showtags, setshowtags] = useState(false);
  const [animation, setAnimation] = useState("");
  function handeltags() {
    setshowtags(true);
    setAnimation("show");
  }

  function closeTags() {
    setAnimation("hide");
  }
  //End ShowListTag
  return (
    <div className="Box">
      <div className="continer NavBarContiner" dir="rtl">
        <div className="BoxMainNavBar">
          <div className="IconNavBar">
            <h2>CarShowRoom</h2>
            <div className="DarkMod" onClick={() => setIsDark(!isDark)}>
              {isDark ? (
                <GoSun /> // تظهر أيقونة الشمس عندما يكون الوضع داكناً للعودة للفاتح
              ) : (
                <MdOutlineDarkMode />
                // تظهر أيقونة القمر عندما يكون الوضع فاتحاً للتحويل للداكن
              )}
            </div>
          </div>
          <div>
            <SearchDropdown />
            {/* <input type="text" placeholder="ابحث الان عن سيارتك" />
            <GrSearch className="IconSearch" /> */}
          </div>
          <div className="IconTagList">
            <FaThList onClick={handeltags} />
          </div>
          <div className="TagNavBar">
            {links.map((link, index) => (
              <HashLink
                smooth
                key={index}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.div layoutId="underline" className="underline" />
                )}
              </HashLink>
            ))}
          </div>
        </div>
      </div>
      {showtags && (
        <div
          className={`tagsTow ${
            animation === "show" ? "animateShow" : "animateHide"
          }`}
          onAnimationEnd={() => {
            if (animation === "hide") setshowtags(false);
          }}
        >
          <div className="divClosTags">
            <GrClose className="Closeicon" onClick={closeTags} />
          </div>
          <div className="ListLinkTags" dir="rtl">
            {links.map((link, index) => (
              <HashLink
                smooth
                key={index}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={closeTags}
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.div layoutId="underline" className="underline" />
                )}
              </HashLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
