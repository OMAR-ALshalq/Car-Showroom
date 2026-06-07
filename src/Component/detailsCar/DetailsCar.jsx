import "./DetailsCar.css";
import SEO from "../seo/SEO"
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
const API_URL = "https://car-showroom-server.onrender.com";

// Libary
import axios from "axios";

// Icon
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { TbManualGearboxFilled } from "react-icons/tb";
import { FaGasPump } from "react-icons/fa6";
import { SiSpeedtest } from "react-icons/si";
import { PiCylinderBold } from "react-icons/pi";
import { PiGasCanFill } from "react-icons/pi";
import { TbEngineFilled } from "react-icons/tb";
import { LuStretchVertical } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";

export default function DetailsCar() {
  const { id } = useParams();
  const [dataCar, setDataCar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("safety");
  const [relatedCars, setRelatedCars] = useState({
    exactMatch: [],
    brandModel: [],
    brandOnly: []
  });
  const [loadingRelated, setLoadingRelated] = useState(true);

  // ✅ جلب تفاصيل السيارة
  useEffect(() => {
    axios
      .get(`${API_URL}/api/cars/${id}`)
      .then((res) => setDataCar(res.data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  // ✅ جلب سيارات ذات صلة
  useEffect(() => {
    if (!dataCar) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadingRelated(true);

    const { brand, model, bodyType } = dataCar;

    Promise.all([
      axios.get(
        `${API_URL}/api/search/${brand}/${model}/${bodyType}`
      ),
      axios.get(`${API_URL}/api/search/${brand}/${model}`),
      axios.get(`${API_URL}/api/search/${brand}`)
    ])
      .then(([exactRes, brandModelRes, brandOnlyRes]) => {
        const currentId = dataCar._id;

        const exactMatch = (exactRes.data.cars || [])
          .filter((c) => c._id !== currentId)
          .slice(0);

        const exactIds = exactMatch.map((c) => c._id);

        const brandModel = (brandModelRes.data.cars || [])
          .filter((c) => c._id !== currentId && !exactIds.includes(c._id))
          .slice(0);

        const allMatchedIds = [...exactIds, ...brandModel.map((c) => c._id)];

        const brandOnly = (brandOnlyRes.data.cars || [])
          .filter((c) => c._id !== currentId && !allMatchedIds.includes(c._id))
          .slice(0);

        setRelatedCars({ exactMatch, brandModel, brandOnly });
        setLoadingRelated(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setRelatedCars({ exactMatch: [], brandModel: [], brandOnly: [] });
        setLoadingRelated(false);
      });
  }, [dataCar]);

  // ✅ دوال السلايدر
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === dataCar?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? dataCar?.images?.length - 1 : prev - 1
    );
  };

  // ✅ سكيلتون
  const RelatedCarSkeleton = () => (
    <div className="related-skeleton skeleton-card">
      <div className="shimmer shimmer-img"></div>
      <div className="shimmer-info">
        <div className="shimmer shimmer-title"></div>
        <div className="shimmer shimmer-subtitle"></div>
        <div className="shimmer shimmer-price"></div>
      </div>
    </div>
  );

  const addToCompare = (car) => {
    window.dispatchEvent(new CustomEvent("add-to-compare", { detail: car }));
  };
  // ✅ بطاقة سيارة ذات صلة
  const RelatedCarCard = ({ car }) => (
    <HashLink
      smooth
      to={`/detailsCar/${car._id}#detailsCar`}
      className="related-car-card"
    >
      <IoIosGitCompare
        onClick={(e) => {
          e.stopPropagation();    
          e.preventDefault();
          addToCompare(car);
        }}
        className="IconaddCompare"
      />
      <img src={car.images?.[0]} alt={`${car.brand} ${car.model}`} />
      <div className="related-car-info">
        <h4>
          {car.brand} {car.model}
        </h4>
        <span className="related-year">
          {car.year} - {car.bodyType}
        </span>
        <span className="related-price">${car.price?.toLocaleString()}</span>
      </div>
    </HashLink>
  );
  // دالة إضافة السيارة للمقارنة

  // ✅ التحقق بعد كل الـ Hooks
  if (!dataCar) {
    return <div className="loading-state">جاري تحميل تفاصيل السيارة...</div>;
  }

  return (
    <div className="MainBoxdetails" id="detailsCar">
      <SEO
        title={`${dataCar.brand} ${dataCar.model} ${dataCar.year}`}
        description={dataCar.description?.substring(0, 150)}
        image={dataCar.images?.[0]}
      />
      <div className="detailsCar" dir="rtl">
        {/* شريط العنوان والسعر */}
        <div className="BoxAddressPage">
          <div className="AddressPage">
            <h3>
              {dataCar.brand} {"\u00A0"}
            </h3>
            <h3>
              {dataCar.model} {"\u00A0"}
            </h3>
            <h3>{dataCar.year}</h3>
          </div>
          <div className="PriceCar">
            <h3>
              ${"\u00A0"} {dataCar.price?.toLocaleString()}
            </h3>
            <a
              href="https://wa.me/963982359538"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              للتواصل <IoLogoWhatsapp />
            </a>
          </div>
        </div>

        {/* صور السيارة + معلومات */}
        <div className="ImagCarAndInfoCar">
          <div className="ImageContainerSection">
            <div className="ImageCar">
              <img
                src={dataCar.images[currentIndex]}
                alt={`Car ${currentIndex}`}
              />
              <IoIosArrowDropleftCircle
                className="IconLeftImag"
                onClick={prevImage}
              />
              <IoIosArrowDroprightCircle
                className="IconRightImag"
                onClick={nextImage}
              />
            </div>
            <div className="ThumbnailsContainer">
              {dataCar.images.map((img, index) => (
                <div
                  key={index}
                  className={`ThumbnailItem ${currentIndex === index ? "active-thumb" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img src={img} alt={`Thumb ${index}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="InfoCar">
            <div className="AddressInfoCar">
              <p>{dataCar.brand}</p>
              <p>{dataCar.model}</p>
              <p>{dataCar.bodyType}</p>
              <p>{dataCar.year}</p>
            </div>
            <div className="detailsEngine">
              <div className="transmission">
                <TbManualGearboxFilled className="Icontransmission" />
                <h4>ناقل الحركة:</h4>
                <h5>{dataCar.engine.transmission}</h5>
              </div>
              <div className="fulType">
                <FaGasPump className="IconfulType" />
                <h4>نوع الوقود:</h4>
                <h5>{dataCar.engine.fulType}</h5>
              </div>
              <div className="horsepower">
                <SiSpeedtest className="Iconhorsepower" />
                <h4>القدرة الحصانية:</h4>
                <h5>{dataCar.engine.horsepower}</h5>
              </div>
              <div className="cylinders">
                <PiCylinderBold className="Iconcylinders" />
                <h4>عدد الاسطوانات:</h4>
                <h5>{dataCar.engine.cylinders}</h5>
              </div>
              <div className="capacityengine">
                <PiGasCanFill className="Iconcapacity" />
                <h4>سعة المحرك:</h4>
                <h5>{`${dataCar.engine.capacityLitre} liter`}</h5>
                <p>/</p>
                <h5>{`${dataCar.engine.capacityCC} CC`}</h5>
              </div>
              <div className="mileagCar">
                <LuStretchVertical className="IconmileagCar" />
                <h4>المسافة المقطوعة:</h4>
                <h5>{`${dataCar.mileage.value} / ${dataCar.mileage.unit}`}</h5>
              </div>
            </div>
            <div className="dicCar">
              <h4>وصف السيارة:</h4>
              <p>{dataCar.description}</p>
            </div>
          </div>
        </div>

        {/* الميزات */}
        <div className="FeaturesCar">
          <div className="TitleFeaturesCar">
            <h3>الميزات</h3>
          </div>
          <div className="bodyFeaturesCar">
            <div className="tabs-header">
              <button
                className={activeTab === "safety" ? "active" : ""}
                onClick={() => setActiveTab("safety")}
              >
                ميزات الأمان
              </button>
              <button
                className={activeTab === "comfort" ? "active" : ""}
                onClick={() => setActiveTab("comfort")}
              >
                ميزات الراحة
              </button>
              <button
                className={activeTab === "tech" ? "active" : ""}
                onClick={() => setActiveTab("tech")}
              >
                ميزات التكنولوجيا
              </button>
            </div>
            <div className="tabs-content">
              <ul className="features-grid">
                {activeTab === "safety" &&
                  dataCar.safetyFeatures.map((item, index) => (
                    <li key={index}>
                      <FaCheck className="check-icon" /> {item}
                    </li>
                  ))}
                {activeTab === "comfort" &&
                  dataCar.comfortFeatures.map((item, index) => (
                    <li key={index}>
                      <FaCheck className="check-icon" /> {item}
                    </li>
                  ))}
                {activeTab === "tech" &&
                  dataCar.techFeatures.map((item, index) => (
                    <li key={index}>
                      <FaCheck className="check-icon" /> {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ سيارات ذات صلة */}
        <div className="RelatedCars" dir="rtl">
          <div className="TitleRelatedCars">
            <h3>سيارات ذات صلة</h3>
          </div>

          {loadingRelated ? (
            <div className="related-cars-grid">
              {[1, 2, 3, 4].map((n) => (
                <RelatedCarSkeleton key={n} />
              ))}
            </div>
          ) : (
            <>
              {relatedCars.exactMatch.length > 0 && (
                <div className="related-group">
                  <h4 className="related-group-title">
                    {/* 🎯 تطابق <span>كامل</span> - نفس الماركة والموديل والهيكل */}
                  </h4>
                  <div className="related-cars-grid">
                    {relatedCars.exactMatch.map((car) => (
                      <RelatedCarCard key={car._id} car={car} />
                    ))}
                  </div>
                </div>
              )}

              {relatedCars.brandModel.length > 0 && (
                <div className="related-group">
                  <h4 className="related-group-title">
                    <span>{` ${dataCar.brand} / ${dataCar.model}`}</span>
                    {/* <p>{dataCar.brand}</p>
                    <p>{dataCar.model}</p> */}
                  </h4>
                  <div className="related-cars-grid">
                    {relatedCars.brandModel.map((car) => (
                      <RelatedCarCard key={car._id} car={car} />
                    ))}
                  </div>
                </div>
              )}

              {relatedCars.brandOnly.length > 0 && (
                <div className="related-group">
                  <h4 className="related-group-title">
                    <span>{dataCar.brand}</span>
                  </h4>
                  <div className="related-cars-grid">
                    {relatedCars.brandOnly.map((car) => (
                      <RelatedCarCard key={car._id} car={car} />
                    ))}
                  </div>
                </div>
              )}

              {relatedCars.exactMatch.length === 0 &&
                relatedCars.brandModel.length === 0 &&
                relatedCars.brandOnly.length === 0 && (
                  <p className="no-related">لا توجد سيارات مشابهة حالياً</p>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
