import "./CompareBar.css";
import { useState, useEffect } from "react";
import { FaTimes, FaExchangeAlt } from "react-icons/fa";

// ✅ استخدم localStorage لتخزين السيارات المختارة
const STORAGE_KEY = "compare-cars";

// ✅ دوال مساعدة للـ localStorage
function getStoredCars() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function storeCars(cars) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

export default function CompareBar({ onCompare }) {
  const [cars, setCars] = useState(getStoredCars);
  const [isVisible, setIsVisible] = useState(false);
  const [justAdded, setJustAdded] = useState(null);

  // ✅ استمع لحدث إضافة سيارة
  useEffect(() => {
    const handleAddCar = (e) => {
      const newCar = e.detail;
      const current = getStoredCars();

      // لا تضف أكثر من 3
      if (current.length >= 3) {
        alert("يمكنك مقارنة 3 سيارات فقط");
        return;
      }

      // لا تضف نفس السيارة مرتين
      if (current.find((c) => c._id === newCar._id)) return;

      const updated = [...current, newCar];
      storeCars(updated);
      setCars(updated);
      setIsVisible(true);
      setJustAdded(newCar._id);

      setTimeout(() => setJustAdded(null), 1500);
    };

    window.addEventListener("add-to-compare", handleAddCar);
    return () => window.removeEventListener("add-to-compare", handleAddCar);
  }, []);

  // ✅ حذف سيارة
  const handleRemove = (carId) => {
    const updated = cars.filter((c) => c._id !== carId);
    storeCars(updated);
    setCars(updated);
    if (updated.length === 0) setIsVisible(false);
  };

  // ✅ مسح الكل
  const handleClear = () => {
    storeCars([]);
    setCars([]);
    setIsVisible(false);
  };

  // ✅ فتح المقارنة
  const handleCompare = () => {
    if (cars.length < 2) {
      alert("اختر سيارتين على الأقل للمقارنة");
      return;
    }
    onCompare(cars);
  };

  if (cars.length === 0 && !isVisible) return null;

  return (
    <div
      className={`compare-bar ${isVisible || cars.length > 0 ? "visible" : ""}`}
    >
      <div className="compare-bar-content">
        <div className="compare-bar-cars">
          {cars.map((car) => (
            <div
              key={car._id}
              className={`compare-bar-car ${justAdded === car._id ? "just-added" : ""}`}
            >
              <img src={car.images?.[0] || car.image} alt="" />
              <span>
                {car.brand} {car.model}
              </span>
              <button
                className="remove-btn"
                onClick={() => handleRemove(car._id)}
              >
                <FaTimes />
              </button>
            </div>
          ))}

          {/* خانات فارغة */}
          {[...Array(3 - cars.length)].map((_, i) => (
            <div className="compare-bar-car empty-slot" key={`empty-${i}`}>
              <span>+ اختر</span>
            </div>
          ))}
        </div>

        <div className="compare-bar-actions">
          <button
            className="compare-now-btn"
            onClick={handleCompare}
            disabled={cars.length < 2}
          >
            <FaExchangeAlt /> قارن الآن ({cars.length})
          </button>
          <button className="clear-btn" onClick={handleClear}>
            مسح الكل
          </button>
        </div>
      </div>
    </div>
  );
}
