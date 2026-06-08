import "./Hero.css";
import SEO from "../seo/SEO"
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const API_URL = "https://car-showroom-server.onrender.com";

// Libary
import axios from "axios";

// Icon
import { GrSearch } from "react-icons/gr";
import { LuMoveLeft } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { LuMessageCircle } from "react-icons/lu";
import { LuCalculator } from "react-icons/lu";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { LuCalendarSearch } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";
import { TbCashRegister } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCarSport } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";

// Icon الاشكال
import BodyTypeIcon from "../BodyTypeIcon";

export default function Hero() {
  // Start get 8 Car
  const [cars8, setCars8] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ حالة التحميل
  const [affordableCars, setAffordableCars] = useState([]);
  const [loadingAffordable, setLoadingAffordable] = useState(true);
  // ✅ امسح الكاش عند F5
  useEffect(() => {
    const isRefresh =
      performance.navigation?.type === 1 ||
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isRefresh) {
      sessionStorage.removeItem("carsLatest");
      sessionStorage.removeItem("carsAffordable");
    }
  }, []);

  // ✅ جلب البيانات
  useEffect(() => {
    const cachedLatest = sessionStorage.getItem("carsLatest");
    const cachedAffordable = sessionStorage.getItem("carsAffordable");

    if (cachedLatest && cachedAffordable) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCars8(JSON.parse(cachedLatest));
      setAffordableCars(JSON.parse(cachedAffordable));
      setLoading(false);
      setLoadingAffordable(false);
      return;
    }

    setLoading(true);
    setLoadingAffordable(true);

    Promise.all([
      axios.get(`${API_URL}/api/cars/latest`),
      axios.get(`${API_URL}/api/cars/affordable`)
    ])
      .then(([latestRes, affordableRes]) => {
        setCars8(latestRes.data);
        setAffordableCars(affordableRes.data);

        sessionStorage.setItem("carsLatest", JSON.stringify(latestRes.data));
        sessionStorage.setItem(
          "carsAffordable",
          JSON.stringify(affordableRes.data)
        );

        setLoading(false);
        setLoadingAffordable(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
        setLoadingAffordable(false);
      });
  }, []);
  // End get 8 Car
  // Start Slider NewCar
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const { current } = sliderRef;
    const scrollAmount = current.clientWidth;
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  // End Slider NewCar

  // Start Car Price

  // Start Contsoll Slider
  const affordableSliderRef = useRef(null);
  const scrollAffordable = (direction) => {
    const { current } = affordableSliderRef;
    const scrollAmount = current.clientWidth;
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  // End Contsoll Slider
  // End Car Price

  // Start classification
  const [classBrand, setclassBrand] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/brands-with-count`)
      .then((res) => {
        setclassBrand(res.data.data);
        setLoadingBrands(false); // ✅
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoadingBrands(false); // ✅
      });
  }, []);

  const [classBodyType, setclassBodyType] = useState([]);
  const [loadingBodyTypes, setLoadingBodyTypes] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/body-types`)
      .then((res) => {
        setclassBodyType(res.data.data);
        setLoadingBodyTypes(false); // ✅
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoadingBodyTypes(false); // ✅
      });
  }, []);

  // End classification
  // Start Slider Brand
  const sliderBrandRef = useRef(null);
  const scrollBrand = (direction) => {
    const { current } = sliderBrandRef;
    const scrollAmount = 400;
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  // End Slider Brand
  // Start Slider BodyType
  const scrollBodyTypeRef = useRef(null);
  const scrollBodytype = (direction) => {
    const { current } = scrollBodyTypeRef;
    const scrollAmount = 400;
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  // End Slider BodyType

  // Start Select Brand SectionOne
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("اختر الماركة");
  // End Select Brand SectionOne

  // دالة إضافة السيارة للمقارنة
  const addToCompare = (car) => {
    window.dispatchEvent(new CustomEvent("add-to-compare", { detail: car }));
  };

  // ============================================
  // Skeleton مكون
  // ============================================
  const CarCardSkeleton = () => (
    <div className="CardCar skeleton-card">
      <div className="ImagCar">
        <div className="shimmer sk-image-hero"></div>
      </div>
      <div className="BrandAndYear">
        <div className="Brand">
          <div className="shimmer sk-brand"></div>
        </div>
        <div className="Year">
          <div className="shimmer sk-year"></div>
        </div>
      </div>
      <div className="model">
        <div className="shimmer sk-model"></div>
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
      <hr />
      <div className="PriceAndditalsCar">
        <div className="shimmer sk-price-label"></div>
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

  /* ✅ مكون Skeleton للبطاقة */
  const BrandCardSkeleton = () => (
    <div className="CardPartOne skeleton-card">
      <div className="IconBrand">
        <div className="shimmer sk-brand-img"></div>
      </div>
      <div className="BarndNameAndCount">
        <div className="shimmer sk-brand-name"></div>
        <div className="shimmer sk-brand-count"></div>
      </div>
    </div>
  );
  {
    /* ✅ مكون Skeleton لهياكل السيارات */
  }
  const BodyTypeCardSkeleton = () => (
    <div className="CardBodyType skeleton-card">
      <div className="shimmer sk-bodytype-icon"></div>
      <div className="shimmer sk-bodytype-name"></div>
    </div>
  );
  // ============================================
  // Skeleton للقسم الجديد (نفس CardCarSkeleton)
  // ============================================
  const AffordableCarSkeleton = () => (
    <div className="CardCar skeleton-card">
      <div className="ImagCar">
        <div className="shimmer sk-image-hero"></div>
      </div>
      <div className="BrandAndYear">
        <div className="Brand">
          <div className="shimmer sk-brand"></div>
        </div>
        <div className="Year">
          <div className="shimmer sk-year"></div>
        </div>
      </div>
      <div className="model">
        <div className="shimmer sk-model"></div>
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
      <hr />
      <div className="PriceAndditalsCar">
        <div className="shimmer sk-price-label"></div>
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
  return (
    <div className="Box">
      <SEO
        title="الرئيسية"
        description="اكتشف أحدث السيارات الجديدة في سوريا - Almalih Motors"
      />
      <div className="continer HeroContiner">
        <div className="SpacSection" id="mainpaig"></div>
        <div className="SectionOne" dir="rtl">
          <div className="TextAndSearch">
            <div className="Text">
              <h2>تجربة فريدة</h2>
              <h2>لسيارة احلامك</h2>
              <p>عشرات السيارات المعتمدة,اسعار تنافسية,ضمان الجودة</p>
            </div>
            <div className="Search">
              <div className="dropdown-container">
                <div
                  className="dropdown-header"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <p>{selectedBrand}</p>
                  <IoIosArrowDown className={isOpen ? "arrow-up" : ""} />
                </div>
                {isOpen && (
                  <ul className="dropdown-list">
                    {classBrand.map((brand, index) => (
                      <li key={index}>
                        <HashLink
                          smooth
                          to={`/allCar/?brand=${brand.name}#allCar`}
                          onClick={() => {
                            setSelectedBrand(brand.name);
                            setIsOpen(false);
                          }}
                        >
                          {brand.name}
                        </HashLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <HashLink smooth to="/allCar#allCar" className="SearchNew">
                <p>ابحث الان</p>
                <GrSearch />
              </HashLink>
            </div>
          </div>
          <div
            className="ImageSectionOne"
            style={{ backgroundImage: "url('image/imgMain.jpg')" }}
          ></div>
        </div>
        <div className="SpacSection"></div>
        <div className="SectionTow" dir="rtl">
          <div className="TitleSectionTow">
            <div className="Text">
              <h3>سيارات جديدية مقترحة</h3>
              <p>اكتشف أكبر مجموعة من السيارات الجديدة المعتمدة في سوريا</p>
            </div>
            <div className="Link">
              <HashLink smooth to="/allCar#allCar">
                تصفح المزيد
              </HashLink>
              <LuMoveLeft className="IconLinkSectionTow" />
            </div>
          </div>
          <div className="SliderContainer" style={{ position: "relative" }}>
            <div className="NewCar" ref={sliderRef}>
              {/* ✅ Skeleton أثناء التحميل */}
              {loading
                ? [1, 2, 3, 4].map((n) => <CarCardSkeleton key={n} />)
                : cars8.map((car) => (
                    <div className="CardCar" key={car._id}>
                      <div className="ImagCar">
                        <img src={car.images[0]} />
                        <IoIosGitCompare
                          className="iconCompare"
                          onClick={() => addToCompare(car)}
                        />
                      </div>
                      <div className="BrandAndYear">
                        <div className="Brand">
                          <h4>{car.brand}</h4>
                        </div>
                        <div className="Year">
                          <h5>{car.year}</h5>
                          <CiCalendarDate className="IconYearCar" />
                        </div>
                      </div>
                      <div className="model">
                        <h3>{car.model}</h3>
                      </div>
                      <div className="DisCar">
                        <LuMessageCircle className="IconDisCar" />
                        <div className="TextDisCar">
                          <p>{car.description}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="PriceAndditalsCar">
                        <h3>السعر :</h3>
                        <div className="price">
                          <h3>{car.price?.toLocaleString()}</h3>
                          <LuCalculator />
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
                  ))}
            </div>
            <IoIosArrowDropleftCircle
              className="Left"
              onClick={() => scroll("left")}
            />
            <IoIosArrowDroprightCircle
              className="Right"
              onClick={() => scroll("right")}
            />
          </div>
        </div>

        <div className="SpacSection"></div>
        <div className="SectionThree" dir="rtl">
          <div className="BoxSectionThree">
            <div className="TitleSectionThree">
              <h3>لماذا يجب عليك التعامل معنا؟</h3>
            </div>
            <div className="BoxCardSectionThree">
              <div className="CardSectionThree">
                <div className="Card">
                  <div className="IconCardSectionThree">
                    <LuCalendarSearch />
                  </div>
                  <div className="TitleCardSectionThree">
                    <h4>البحث عن سيارتك</h4>
                  </div>
                  <div className="DisCardSectionThree">
                    <p>اسهل وسيلة لكي تبحث عن السيارة التي تريدها</p>
                  </div>
                </div>
                <div className="Card">
                  <div className="IconCardSectionThree">
                    <BiSolidPhoneCall />
                  </div>
                  <div className="TitleCardSectionThree">
                    <h4>اتصل بنا</h4>
                  </div>
                  <div className="DisCardSectionThree">
                    <p>فريق خدمة عملاء على مدار الساعة، في خدمتك كل الأوقات</p>
                  </div>
                </div>
                <div className="Card">
                  <div className="IconCardSectionThree">
                    <TbCashRegister />
                  </div>
                  <div className="TitleCardSectionThree">
                    <h4>سهول الدفع</h4>
                  </div>
                  <div className="DisCardSectionThree">
                    <p>
                      سهولة فائقة في طرق الدفع ,يمكنك الدفع كاش او من خلال
                      البنوك
                    </p>
                  </div>
                </div>
                <div className="Card">
                  <div className="IconCardSectionThree">
                    <TbTruckDelivery />
                  </div>
                  <div className="TitleCardSectionThree">
                    <h4>استلم سيارتك</h4>
                  </div>
                  <div className="DisCardSectionThree">
                    <p>توصيل سيارتك الى منزلك ضمن دمشق</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="SpacSection"></div>
        <div className="SectionTow" dir="rtl">
          {/* نفس تنسيق SectionTow */}
          <div className="TitleSectionTow">
            <div className="Text">
              <h3>أقل من 15,000$</h3>
              <p>سيارات اقتصادية بأسعار مناسبة للجميع</p>
            </div>
            <div className="Link">
              <HashLink smooth to="/allCar?maxPrice=15000#allCar">
                عرض الكل
              </HashLink>
              <LuMoveLeft className="IconLinkSectionTow" />
            </div>
          </div>
          <div className="SliderContainer" style={{ position: "relative" }}>
            <div className="NewCar" ref={affordableSliderRef}>
              {loadingAffordable
                ? [1, 2, 3, 4].map((n) => <AffordableCarSkeleton key={n} />)
                : affordableCars.map((car) => (
                    <div className="CardCar" key={car._id}>
                      <div className="ImagCar">
                        <img src={car.images[0]} />
                        <IoIosGitCompare
                          className="iconCompare"
                          onClick={() => addToCompare(car)}
                        />
                      </div>
                      <div className="BrandAndYear">
                        <div className="Brand">
                          <h4>{car.brand}</h4>
                        </div>
                        <div className="Year">
                          <h5>{car.year}</h5>
                          <CiCalendarDate className="IconYearCar" />
                        </div>
                      </div>
                      <div className="model">
                        <h3>{car.model}</h3>
                      </div>
                      <div className="DisCar">
                        <LuMessageCircle className="IconDisCar" />
                        <div className="TextDisCar">
                          <p>{car.description}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="PriceAndditalsCar">
                        <h3>السعر :</h3>
                        <div className="price">
                          <h3>{car.price?.toLocaleString()}</h3>
                          <LuCalculator />
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
                  ))}
              <IoIosArrowDropleftCircle
                className="Left"
                onClick={() => scrollAffordable("left")}
              />
              <IoIosArrowDroprightCircle
                className="Right"
                onClick={() => scrollAffordable("right")}
              />
            </div>
          </div>
        </div>
        <div className="SpacSection"></div>
        <div className="SectionFor">
          <div className="TitleSectionFor" id="Brand">
            <h3>اكتشف الخيارات المتاحة في سوريا</h3>
            <p>نحن نضمن لك تجربة استثنائية مع افضل الشركات</p>
          </div>
          <div className="BoxParts">
            <div className="TitlePartOne">
              <h4>الماركات</h4>
            </div>
            <div className="SliderBrand" id="BodyType">
              <IoIosArrowDropleftCircle
                className="nav-btn prev"
                onClick={() => scrollBrand("left")}
              />
              <IoIosArrowDroprightCircle
                className="nav-btn next"
                onClick={() => scrollBrand("right")}
              />
              <div className="PartOneSectionFor" dir="rtl" ref={sliderBrandRef}>
                {loadingBrands
                  ? [1, 2, 3, 4, 5, 6].map((n) => <BrandCardSkeleton key={n} />)
                  : classBrand.map((brand) => (
                      <HashLink
                        key={brand._id}
                        smooth
                        to={`/allCar/?brand=${brand.name}#allCar`}
                        className="CardWrapper"
                      >
                        <div className="CardPartOne">
                          <div className="IconBrand">
                            <img src={brand.image} alt={brand.name} />
                          </div>
                          <div className="BarndNameAndCount">
                            <h5>{brand.name}</h5>
                            <p>
                              {brand.carsCount}
                              <IoCarSport />
                            </p>
                          </div>
                        </div>
                      </HashLink>
                    ))}
              </div>
            </div>
            <div className="TitlePartTow">
              <h4>الاشكال</h4>
            </div>
            <div className="SliderBodyType" dir="rtl">
              <IoIosArrowDropleftCircle
                className="btnSliderBodyType Left"
                onClick={() => scrollBodytype("left")}
              />
              <IoIosArrowDroprightCircle
                className="btnSliderBodyType Right"
                onClick={() => scrollBodytype("right")}
              />
              <div className="PartTowSectionFor" ref={scrollBodyTypeRef}>
                {loadingBodyTypes
                  ? [1, 2, 3, 4, 5, 6].map((n) => (
                      <BodyTypeCardSkeleton key={n} />
                    ))
                  : classBodyType.map((bodyType) => (
                      <HashLink
                        key={bodyType._id || bodyType.name}
                        smooth
                        to={`/allCar?bodyType=${bodyType.name}#allCar`}
                      >
                        <div className="CardBodyType">
                          <BodyTypeIcon
                            name={bodyType.name}
                            className="iconBodyType"
                          />
                          <h4>{bodyType.name}</h4>
                        </div>
                      </HashLink>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
