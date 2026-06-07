import "./SearchDropdown.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import axios from "axios";

const API_URL = "https://car-showroom-server.onrender.com";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [allCars, setAllCars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ جلب البيانات
  useEffect(() => {
    axios
      .get(`${API_URL}/api/cars`)
      .then((res) => {
        const cars = Array.isArray(res.data) ? res.data : res.data.cars || [];
        setAllCars(cars);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  // ✅ حساب النتائج بدون setState
  const results = useMemo(() => {
    if (query.trim().length < 1) return [];
    return allCars
      .filter((car) => {
        const searchStr = `${car.brand} ${car.model} ${car.year}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
      })
      .slice(0, 8);
  }, [query, allCars]);

  // ✅ فتح القائمة تلقائياً عند الكتابة
  useEffect(() => {
    if (query.trim().length >= 1 && results.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    } else if (query.trim().length === 0) {
      setIsOpen(false);
    }
  }, [query, results]);

  // ✅ إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCar = (car) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/detailsCar/${car._id}`);
    // ✅ انتظر تحميل الصفحة ثم اسكرول
    setTimeout(() => {
      const element = document.getElementById("detailsCar");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery("");
      setIsOpen(false);
      navigate(`/allCar?search=${encodeURIComponent(query.trim())}`);
      // ✅ انتظر قليلاً حتى تتحمل الصفحة ثم اسكرول
      setTimeout(() => {
        const element = document.getElementById("allCar");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const showDropdown = isOpen && query.trim().length >= 1;

  return (
    <form
      className="search-container"
      onSubmit={handleSubmit}
      ref={dropdownRef}
    >
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="ابحث عن سيارتك..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <GrSearch className="search-icon" onClick={handleSubmit} />
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((car) => (
            <li key={car._id} onClick={() => handleSelectCar(car)}>
              <img src={car.images?.[0] || car.image} alt="" />
              <div className="search-result-info">
                <span className="search-result-name">
                  {car.brand} {car.model}
                </span>
                <span className="search-result-year">
                  {car.year} - ${car.price?.toLocaleString()}
                </span>
              </div>
            </li>
          ))}
          <li className="search-view-all" onClick={handleSubmit}>
            <GrSearch /> عرض جميع النتائج لـ "{query}"
          </li>
        </ul>
      )}

      {showDropdown && query && results.length === 0 && (
        <ul className="search-dropdown">
          <li className="search-no-results">لا توجد نتائج لـ "{query}"</li>
        </ul>
      )}
    </form>
  );
}
