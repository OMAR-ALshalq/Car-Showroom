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
                [
                  "السعر",
                  (c) => (c.price ? `$${c.price.toLocaleString()}` : "N/A")
                ],
                ["السنة", (c) => c.year || "N/A"],
                [
                  "الممشى",
                  (c) =>
                    c.mileage?.value
                      ? `${c.mileage.value} ${c.mileage?.unit || "km"}`
                      : "N/A"
                ],
                ["اللون", (c) => c.color || c.colour || "N/A"],
                [
                  "ناقل الحركة",
                  (c) =>
                    c.engine?.transmission === "automatic"
                      ? "أوتوماتيك"
                      : c.engine?.transmission === "normal"
                        ? "عادي"
                        : c.engine?.transmission || "N/A"
                ],
                [
                  "نوع الوقود",
                  (c) => c.engine?.fuelType || c.engine?.fulType || "N/A"
                ],
                [
                  "الحصان",
                  (c) =>
                    c.engine?.horsepower ? `${c.engine.horsepower} HP` : "N/A"
                ],
                [
                  "سعة المحرك",
                  (c) =>
                    c.engine?.capacityLitre
                      ? `${c.engine.capacityLitre}L`
                      : "N/A"
                ],
                ["الشكل", (c) => c.bodyType || c.bodytype || "N/A"],
                [
                  "الحالة",
                  (c) =>
                    c.status === "available"
                      ? "✅ متوفرة"
                      : c.status === "sold"
                        ? "❌ مباعة"
                        : c.status || "N/A"
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
