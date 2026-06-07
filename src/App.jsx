// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import NavBar from "./Component/navBar/NavBar.jsx";
// import Hero from "./Component/hero/Hero.jsx";
// import AllCar from "./Component/allCar/AllCar.jsx";
// import DetailsCar from "./Component/detailsCar/DetailsCar.jsx";
// import Whoarewe from "./Component/whoAreWe/Whoarewe.jsx";
// import Footer from "./Component/footer/Footer.jsx";
// import Contact from "./Component/contact/Contact.jsx";
// import WelcomeSite from "./Component/welcomeSite/WelcomeSite.jsx";
// import CompareBar from "./Component/compare/CompareBar";
// import CompareModal from "./Component/compare/CompareModal";
// import FloatingButtons from "./Component/floatingButtons/FloatingButtons.jsx";

// function App() {
//   const [showWelcome, setShowWelcome] = useState(() => {
//     return !sessionStorage.getItem("has-visited-site");
//   });

//   const [compareCars, setCompareCars] = useState(null); // ✅ جديد

//   const handleWelcomeFinish = () => {
//     setShowWelcome(false);
//     sessionStorage.setItem("has-visited-site", "true");
//   };

//   return (
//     <>
//       {showWelcome && <WelcomeSite onFinish={handleWelcomeFinish} />}
//       <div style={{ visibility: showWelcome ? "hidden" : "visible" }}>
//         <BrowserRouter>
//           <NavBar />
//           <main>
//             <Routes>
//               <Route path="/" element={<Hero />} />
//               <Route path="/allCar" element={<AllCar />} />
//               <Route path="/detailsCar/:id" element={<DetailsCar />} />
//               <Route path="/Whoarewe" element={<Whoarewe />} />
//               <Route path="/Contact" element={<Contact />} />
//             </Routes>
//           </main>
//           <Footer />
//         </BrowserRouter>
//       </div>

//       {/* ✅ نظام المقارنة - خارج BrowserRouter ليظهر على كل الصفحات */}
//       <CompareBar onCompare={(cars) => setCompareCars(cars)} />
//       {compareCars && (
//         <CompareModal cars={compareCars} onClose={() => setCompareCars(null)} />
//       )}
//       <FloatingButtons />
//     </>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./Component/navBar/NavBar.jsx";
import Hero from "./Component/hero/Hero.jsx";
import AllCar from "./Component/allCar/AllCar.jsx";
import DetailsCar from "./Component/detailsCar/DetailsCar.jsx";
import Whoarewe from "./Component/whoAreWe/Whoarewe.jsx";
import Footer from "./Component/footer/Footer.jsx";
import Contact from "./Component/contact/Contact.jsx";
import WelcomeSite from "./Component/welcomeSite/WelcomeSite.jsx";
import CompareBar from "./Component/compare/CompareBar";
import CompareModal from "./Component/compare/CompareModal";
import FloatingButtons from "./Component/floatingButtons/FloatingButtons.jsx";

function App() {
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem("has-visited-site");
  });

  const [compareCars, setCompareCars] = useState(null);

  const handleWelcomeFinish = () => {
    setShowWelcome(false);
    sessionStorage.setItem("has-visited-site", "true");
  };

  // ✅ Dark Mode تلقائي حسب إعدادات الجهاز
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (e) => {
      const savedTheme = localStorage.getItem("site-theme");
      // إذا المستخدم لم يختر يدوياً، اتبع إعدادات الجهاز
      if (!savedTheme) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
      }
    };

    // طبق عند التحميل
    applyTheme(mediaQuery);

    // استمع للتغييرات
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, []);

  return (
    <>
      {showWelcome && <WelcomeSite onFinish={handleWelcomeFinish} />}
      <div style={{ visibility: showWelcome ? "hidden" : "visible" }}>
        <BrowserRouter>
          <NavBar />
          <main>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/allCar" element={<AllCar />} />
              <Route path="/detailsCar/:id" element={<DetailsCar />} />
              <Route path="/Whoarewe" element={<Whoarewe />} />
              <Route path="/Contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>

      {/* نظام المقارنة */}
      <CompareBar onCompare={(cars) => setCompareCars(cars)} />
      {compareCars && (
        <CompareModal cars={compareCars} onClose={() => setCompareCars(null)} />
      )}

      {/* أزرار عائمة */}
      {!showWelcome && <FloatingButtons />}
    </>
  );
}

export default App;