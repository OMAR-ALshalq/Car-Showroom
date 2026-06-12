import "./Footer.css";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// Icon
import { SlSocialFacebook } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";

export default function Footer() {
  return (
    <div className="MainBoxFooter">
      <div className="ContinerFooter" dir="rtl">
        <div className="SectionOne">
          <div className="TextSectionOne">
            <h2>CarShowRoom</h2>
            <p>
              يقدم تنوع رائع في السيارات بمختلف فئاتها و انواعها ,كما يقدم
              التصفح السريع للسيارات المتوفرة في المكتب ويقدم ايضا السرعة و
              الموثوقية في عمليات البيع و الشراء
            </p>
          </div>
          <div className="LinkSocialMedia">
            <a
              href="https://www.facebook.com/omar.alshalak.7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlSocialFacebook className="IconSocialMedia" />
            </a>
            <a
              href="https://www.instagram.com/oalshalak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlSocialInstagram className="IconSocialMedia" />
            </a>
            <a
              href="https://wa.me/963982359538"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsWhatsapp className="IconSocialMedia" />
            </a>
          </div>
        </div>

        <div className="SectionTow">
          <h2>روابط سريعة</h2>
          <div className="LinkSectionTow">
            <ul>
              <li>
                <HashLink smooth to="/#mainpaig">
                  الرئيسية
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/allCar#allCar">
                  جميع السيارات
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#Brand">
                  الماركات
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#BodyType">
                  الاشكال
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/Whoarewe#Whoarewe">
                  من نحن
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/Contact#contact">
                  تواصل معنا
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="SectionThree">
          <h2>اتصل بنا</h2>
          <div className="PartOne">
            <div className="IconPartOne">
              <CiLocationOn />
            </div>
            <div className="TextPartOne">
              <h4>العنوان</h4>
              <p>دمشق ,اوتسراد المزة </p>
            </div>
          </div>
          <div className="PartTow">
            <div className="IconPartTow">
              <MdOutlineMail />
            </div>
            <div className="TextPartTow">
              <h4>البريد الاكتروني</h4>
              <p>omaralshalq@gmail.com</p>
            </div>
          </div>
          <div className="PartThree">
            <div className="IconPartThree">
              <IoIosPhonePortrait />
            </div>
            <div className="TextPartThree">
              <h4>الهاتف</h4>
              <p>+9639468752369</p>
            </div>
          </div>
        </div>
        {/* <div class></div> */}
      </div>
      <div className="CopyRight" dir="rtl">
        <div className="TextCaenter">
          <h5>هذا التصميم من : </h5>
          <h5>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=omaralshalq@gmail.com"
              target="_blank"
            >
              omaralshalq@gmail.com
            </a>
          </h5>
        </div>
        <div className="TextRight">
          <h3>&copy;</h3>
          <h5>2026</h5>
          <h3>CarShowRoom</h3>
          <h5>جميع الحقوق محفوظة</h5>
        </div>
        <div className="TextLeft">
          <h5>سياسة الخصوصية و الشروط</h5>
        </div>
      </div>
    </div>
  );
}
