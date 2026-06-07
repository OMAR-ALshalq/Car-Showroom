import "./CompareModal.css";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";

export default function CompareModal({ cars, onClose }) {
  useEffect(() => {
    document.body.classList.add("compare-modal-open");
    return () => document.body.classList.remove("compare-modal-open");
  }, []);
  if (!cars || cars.length < 2) return null;

  return (
    <div className="compare-modal-overlay" onClick={onClose}>
      <div
        className="compare-modal"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="compare-modal-header">
          <h2>مقارنة السيارات</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="compare-modal-table">
          <table>
            <thead>
              <tr>
                <th>المواصفة</th>
                {cars.map((car) => (
                  <th key={car._id}>
                    <img src={car.images?.[0] || car.image} alt="" />
                    <span>
                      {car.brand} {car.model}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["السعر", (c) => `$${c.price?.toLocaleString()}`],
                ["السنة", (c) => c.year],
                ["الممشى", (c) => `${c.mileage?.value} ${c.mileage?.unit}`],
                ["اللون", (c) => c.color],
                [
                  "ناقل الحركة",
                  (c) =>
                    c.engine?.transmission === "automatic"
                      ? "أوتوماتيك"
                      : "عادي"
                ],
                ["نوع الوقود", (c) => c.engine?.fulType],
                ["الحصان", (c) => `${c.engine?.horsepower} HP`],
                ["سعة المحرك", (c) => `${c.engine?.capacityLitre}L`],
                ["الشكل", (c) => c.bodyType],
                [
                  "الحالة",
                  (c) => (c.status === "available" ? "✅ متوفرة" : "❌ مباعة")
                ]
              ].map(([label, fn]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {cars.map((car) => (
                    <td key={car._id}>{fn(car)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
