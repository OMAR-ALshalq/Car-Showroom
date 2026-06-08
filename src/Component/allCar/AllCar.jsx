import "./AllCar.css";
import SEO from "../seo/SEO";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSearchParams } from "react-router-dom";
const API_URL = "https://car-showroom-server.onrender.com";

// Libary
import axios from "axios";

// Icon
import { GrSearch } from "react-icons/gr";
import { LuMoveLeft } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";
import { LuCalculator } from "react-icons/lu";
import { FaFilter } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoIosGitCompare } from "react-icons/io";

export default function AllCar() {
  const sliderCardRef = useRef(null);
  const [searchParams] = useSearchParams();
  const brandFromUrl = searchParams.get("brand") || "";
  const bodyTypeFromUrl = searchParams.get("bodyType") || "";
  const searchFromUrl = searchParams.get("search") || "";

  const [loading, setLoading] = useState(true);
  const [allCar, setAllcar] = useState([]);

  // ✅ جلب جميع السيارات
  // ✅ امسح الكاش عند F5
  useEffect(() => {
    const isRefresh =
      performance.navigation?.type === 1 ||
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isRefresh) {
      sessionStorage.removeItem("allCars");
    }
  }, []);

  // ✅ جلب البيانات
  useEffect(() => {
    const cached = sessionStorage.getItem("allCars");

    if (cached) {
      setAllcar(JSON.parse(cached));
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`${API_URL}/api/cars`)
      .then((res) => {
        setAllcar(res.data);
        sessionStorage.setItem("allCars", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  // ✅ استخراج البراندات
  const [uniqueBrands, setUniqueBrands] = useState([]);
  useEffect(() => {
    if (allCar.length > 0) {
      const brands = [...new Set(allCar.map((car) => car.brand))];
      setUniqueBrands(brands);
    }
  }, [allCar]);

  // ✅ استخراج BodyTypes
  const [uniqueBodyTypes, setUniqueBodyTypes] = useState([]);
  useEffect(() => {
    if (allCar.length > 0) {
      const types = [
        ...new Set(allCar.map((car) => car.bodyType).filter(Boolean))
      ];
      setUniqueBodyTypes(types);
    }
  }, [allCar]);

  // ✅ حالات الفلترة
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  const [searchModel, setSearchModel] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(brandFromUrl);
  const [selectedBodyType, setSelectedBodyType] = useState(bodyTypeFromUrl);
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ مزامنة searchTerm + تحديد Radio Button
  useEffect(() => {
    setSearchTerm(searchFromUrl);

    if (searchFromUrl && uniqueBrands.length > 0) {
      // ✅ مطابقة جزئية (وليس كاملة)
      const matchedBrand = uniqueBrands.find((b) =>
        b.toLowerCase().includes(searchFromUrl.toLowerCase())
      );
      if (matchedBrand) {
        setSelectedBrand(matchedBrand);
        setSearchTerm("");
        return;
      }
    }

    if (searchFromUrl && uniqueBodyTypes.length > 0) {
      // ✅ مطابقة جزئية
      const matchedBody = uniqueBodyTypes.find((b) =>
        b.toLowerCase().includes(searchFromUrl.toLowerCase())
      );
      if (matchedBody) {
        setSelectedBodyType(matchedBody);
        setSearchTerm("");
        return;
      }
    }
  }, [searchFromUrl, uniqueBrands, uniqueBodyTypes]);

  // ✅ مزامنة selectedBrand مع الرابط
  useEffect(() => {
    setSelectedBrand(brandFromUrl);
  }, [brandFromUrl]);

  // ✅ مزامنة selectedBodyType مع الرابط
  useEffect(() => {
    setSelectedBodyType(bodyTypeFromUrl);
  }, [bodyTypeFromUrl]);

  // ✅ فلترة السيارات
  const filteredCars = allCar.filter((car) => {
    const matchesBrand = selectedBrand === "" || car.brand === selectedBrand;
    const matchesPrice = maxPrice === "" || car.price <= Number(maxPrice);
    const matchesModel = car.model
      .toLowerCase()
      .includes(searchModel.toLowerCase());

    const query = searchTerm.toLowerCase();
    const searchWords = query.split(" ").filter((word) => word);
    const matchesGeneralSearch =
      searchWords.length > 0
        ? searchWords.every(
            (word) =>
              car.brand.toLowerCase().includes(word) ||
              car.model.toLowerCase().includes(word) ||
              car.bodyType?.toLowerCase().includes(word) ||
              car.year?.toString().includes(word)
          )
        : true;

    const matchesBodyType =
      selectedBodyType === "" || car.bodyType === selectedBodyType;

    return (
      matchesBrand &&
      matchesPrice &&
      matchesModel &&
      matchesGeneralSearch &&
      matchesBodyType
    );
  });

  // ✅ Skeleton
  const CarSkeleton = () => (
    <div className="Card skeleton-card">
      <div className="ImagCar">
        <div className="shimmer sk-image-hero"></div>
      </div>
      <div className="brandAndyear">
        <div className="brand">
          <div className="shimmer sk-brand"></div>
        </div>
        <div className="year">
          <div className="shimmer sk-year"></div>
        </div>
      </div>
      <div className="modelAndbodyType">
        <div className="model">
          <div className="shimmer sk-model"></div>
        </div>
        <div className="bodytype">
          <div className="shimmer sk-bodytype"></div>
        </div>
      </div>
      <div className="DisCar">
        <div className="IconDisCar">
          <div className="shimmer sk-icon"></div>
        </div>
        <div className="TextDisCar">
          <div className="shimmer sk-text"></div>
          <div className="shimmer sk-text-short"></div>
        </div>
      </div>
      <div className="priceAndSitels">
        <hr />
        <h3>السعر :</h3>
        <div className="price">
          <div className="shimmer sk-price"></div>
          <div className="shimmer sk-calc-icon"></div>
        </div>
        <div className="ditalsCar">
          <div className="shimmer sk-btn"></div>
        </div>
      </div>
    </div>
  );

  // ✅ فلتر منبثق
  const [showFilter, setshowFilter] = useState(false);
  const [animationFilter, setAnimationFilter] = useState("");

  function handelFilter() {
    setshowFilter(true);
    setAnimationFilter("show");
  }
  function closeTags() {
    setAnimationFilter("hide");
  }

  // ✅ إضافة للمقارنة
  const addToCompare = (car) => {
    window.dispatchEvent(new CustomEvent("add-to-compare", { detail: car }));
  };

  return (
    <div className="Box">
      <SEO
        title="جميع السيارات"
        description="تصفح جميع السيارات المتوفرة - أسعار مناسبة وجودة مضمونة"
      />
      <div className="continer AllCarContiner" id="allCar" dir="rtl">
        <div className="BoxMainAllCar">
          <div className="TitleBoxMainAllCar">
            <div className="Text">
              <h3>المنتجات</h3>
              <p>اكتشف أحدث السيارات الجديدة لدينا</p>
            </div>
            <hr />
          </div>

          <div className="BoxAllCarAndFilter">
            {/* فلتر الموبايل */}
            <div className="BoxFilterTow">
              <div className="boxIconfilterTow">
                <FaFilter className="IconFilter" onClick={handelFilter} />
                <p>Filter</p>
              </div>
              <div className="searchBoxFilterTow">
                <GrSearch className="IconSearchFiltertow" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* فلتر سطح المكتب */}
            <div className="FilterCar">
              <div className="BoxFilterCar">
                <div className="TitleFilterCar">
                  <h3>صنف السيارات:</h3>
                </div>

                <div className="filterPrice">
                  <h5>اكتب السعر المناسب لك:</h5>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <hr />

                <div className="BrandFilterCar">
                  <h5>اختر الماركة:</h5>
                  <div className="radioFilter">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === ""}
                      onChange={() => setSelectedBrand("")}
                    />
                    <p>All</p>
                  </div>
                  {uniqueBrands.map((brand) => (
                    <div className="radioFilter" key={brand}>
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                      />
                      <p>{brand}</p>
                    </div>
                  ))}
                </div>
                <hr />

                <div className="bodyTypeFilterCar">
                  <h5>اختر الشكل:</h5>
                  <div className="radioFilter">
                    <input
                      type="radio"
                      name="bodyType"
                      value=""
                      checked={selectedBodyType === ""}
                      onChange={(e) => setSelectedBodyType(e.target.value)}
                    />
                    <p>الكل</p>
                  </div>
                  {uniqueBodyTypes.map((bodyType) => (
                    <div className="radioFilter" key={bodyType}>
                      <input
                        type="radio"
                        name="bodyType"
                        value={bodyType}
                        checked={selectedBodyType === bodyType}
                        onChange={(e) => setSelectedBodyType(e.target.value)}
                      />
                      <p>{bodyType}</p>
                    </div>
                  ))}
                </div>
                <hr />

                <div className="fitlerModel">
                  <h5>ابحث عن موديل محدد:</h5>
                  <input
                    type="text"
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
                  />
                </div>

                {/* زر إعادة تعيين */}
                {(searchTerm ||
                  selectedBrand ||
                  selectedBodyType ||
                  maxPrice ||
                  searchModel) && (
                  <button
                    className="reset-all-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedBrand("");
                      setSelectedBodyType("");
                      setMaxPrice("");
                      setSearchModel("");
                      window.history.replaceState({}, "", "/allCar#allCar");
                      if (sliderCardRef.current)
                        sliderCardRef.current.scrollTo({
                          top: 0,
                          behavior: "smooth"
                        });
                    }}
                  >
                    اعادة تعين
                  </button>
                )}
              </div>
            </div>

            {/* بطاقات السيارات */}
            <div className="BoxAllCar" ref={sliderCardRef}>
              <div className="SliderCardAllCar">
                <div className="CardAllCar">
                  {loading ? (
                    [...Array(6)].map((_, index) => <CarSkeleton key={index} />)
                  ) : filteredCars.length > 0 ? (
                    filteredCars
                      .slice()
                      .reverse()
                      .map((car) => (
                        <div className="Card" key={car._id}>
                          <div className="ImagCar">
                            <img src={car.images[0]} alt={car.model} />
                            <IoIosGitCompare
                              className="iconCompare"
                              onClick={() => addToCompare(car)}
                            />
                          </div>
                          <div className="brandAndyear">
                            <div className="brand">
                              <h4>{car.brand}</h4>
                            </div>
                            <div className="year">
                              <h5>{car.year}</h5>
                              <CiCalendarDate className="IconYearCar" />
                            </div>
                          </div>
                          <div className="modelAndbodyType">
                            <div className="model">
                              <h3>{car.model}</h3>
                            </div>
                            <div className="bodytype">
                              <h3>{car.bodyType}</h3>
                            </div>
                          </div>
                          <div className="DisCar">
                            <div className="IconDisCar">
                              <LuMessageCircle />
                            </div>
                            <div className="TextDisCar">
                              <p>{car.description}</p>
                            </div>
                          </div>
                          <div className="priceAndSitels">
                            <hr />
                            <h3>السعر :</h3>
                            <div className="price">
                              <h3>{car.price?.toLocaleString()}</h3>
                              <LuCalculator className="IconPrice" />
                            </div>
                            <div className="ditalsCar">
                              <HashLink
                                smooth
                                to={`/detailsCar/${car._id}#detailsCar`}
                              >
                                التفاصيل
                              </HashLink>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="no-results">
                      لا توجد سيارات تطابق بحثك حالياً
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* فلتر منبثق للموبايل */}
        {showFilter && (
          <div
            className={`FilterTow ${animationFilter === "show" ? "animateShowFilter" : "animateHideFilter"}`}
            onAnimationEnd={() => {
              if (animationFilter === "hide") setshowFilter(false);
            }}
          >
            <div className="BoxFilterCar">
              <GrClose className="CloseiconFilter" onClick={closeTags} />
              <div className="TitleFilterCar">
                <h3>صنف السيارات:</h3>
              </div>
              <div className="filterPrice">
                <h5>اكتب السعر المناسب لك:</h5>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
              <hr />
              <div className="BrandFilterCar">
                <h5>اختر الماركة:</h5>
                <div className="radioFilter">
                  <input
                    type="radio"
                    name="brandTow"
                    checked={selectedBrand === ""}
                    onChange={() => setSelectedBrand("")}
                  />
                  <p>الكل</p>
                </div>
                {uniqueBrands.map((brand) => (
                  <div className="radioFilter" key={brand}>
                    <input
                      type="radio"
                      name="brandTow"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                    />
                    <p>{brand}</p>
                  </div>
                ))}
              </div>
              <hr />
              <div className="bodyTypeFilterCar">
                <h5>اختر الشكل:</h5>
                <div className="radioFilter">
                  <input
                    type="radio"
                    name="bodyType"
                    value=""
                    checked={selectedBodyType === ""}
                    onChange={(e) => setSelectedBodyType(e.target.value)}
                  />
                  <p>الكل</p>
                </div>
                {uniqueBodyTypes.map((bodyType) => (
                  <div className="radioFilter" key={bodyType}>
                    <input
                      type="radio"
                      name="bodyType"
                      checked={selectedBodyType === bodyType}
                      onClick={() => setSelectedBodyType(bodyType)}
                      readOnly
                    />
                    <p>{bodyType}</p>
                  </div>
                ))}
              </div>
              <hr />
              <div className="fitlerModel">
                <h5>ابحث عن موديل محدد:</h5>
                <input
                  type="text"
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}