import "./Contact.css";
import SEO from "../seo/SEO";
import { useState } from "react";
import { showSuccess, showError } from "../toast/Toast";
// Icon
import { VscCallOutgoing } from "react-icons/vsc";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserLocationFill } from "react-icons/ri";
import { SlSocialFacebook } from "react-icons/sl";
import { BsWhatsapp } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

// ⚠️ استبدل هذه بالقيم الخاصة بك من EmailJS
const EMAILJS_PUBLIC_KEY = "q1NS15pvkXyOQjQPb";
const EMAILJS_SERVICE_ID = "service_ivcdjf7";
const EMAILJS_TEMPLATE_ID = "template_nv6yqig";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showError("الرجاء إدخال الاسم الكامل", "حقل فارغ");
      return;
    }
    if (!formData.email.trim()) {
      showError("الرجاء إدخال الايميل", "حقل فارغ");
      return;
    }
    if (!formData.message.trim()) {
      showError("الرجاء كتابة الرسالة", "حقل فارغ");
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message
            }
          })
        }
      );

      if (response.ok) {
        showSuccess("تم إرسال رسالتك بنجاح، سنتواصل معك قريباً");
        setFormData({ name: "", email: "", message: "" });
      } else {
        showError("فشل إرسال الرسالة، حاول مرة أخرى");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      showError("حدث خطأ في الاتصال، تأكد من اتصالك بالإنترنت");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="MainBoxConatct" id="contact">
      <SEO
        title="اتصل بنا"
        description="تواصل مع فريقنا - نحن هنا لمساعدتك في اختيار سيارتك المناسبة"
      />
      <div className="ContinerContact" dir="rtl">
        <div className="TitileConatct">
          <h3>نحن هنا لمساعدتك!</h3>
          <p>
            فريقنا جاهز لمساعدتك على اختيار السيارة المناسبة وانهاء اجراءات
            البيع في اسرع وقت ز تواصل معنا الان!
          </p>
        </div>
        <div className="BoxConatcts">
          <div className="Address">
            <div className="TitleAddress">
              <h3>اتصل بنا</h3>
            </div>
            <div className="BoxAddress">
              <div className="Phone">
                <VscCallOutgoing className="IconPhone" />
                <div className="TextPhone">
                  <h5>اتصل بنا هاتفيا</h5>
                  <a href="tel:+963982359538">963982359538+</a>
                </div>
              </div>
              <div className="Email">
                <HiOutlineMail className="IconEmail" />
                <div className="TextEmail">
                  <h5>أرسل لنا رسالة</h5>
                  <a href="mailto:omaralshalq@gmail.com">
                    omaralshalq@gmail.com
                  </a>
                </div>
              </div>
              <div className="Location">
                <RiUserLocationFill className="IconLocation" />
                <div className="TextLocation">
                  <h5>الموقع</h5>
                  <a
                    href="https://maps.google.com/?q=دمشق,اوتسراد المزة"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    دمشق ,اوتسراد المزة
                  </a>
                </div>
              </div>
            </div>
            <div className="BoxSocial">
              <h4>تابعنا على مواقع التواصل الاجتماعي</h4>
              <div className="BoxUrlSocial">
                <a
                  href="https://www.facebook.com/omar.alshalak.7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SlSocialFacebook />
                </a>
                <a
                  href="https://wa.me/963982359538"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsWhatsapp />
                </a>
                <a
                  href="https://www.instagram.com/oalshalak"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SlSocialInstagram />
                </a>
              </div>
            </div>
          </div>
          <div className="FormEmail">
            <div className="BoxMessage">
              <div className="TitleBoxMessage">
                <h4>نرحب بمساعدتكم!</h4>
                <p>
                  سيتم التواصل معكم في ساعات العمل من 9 صباحا حتى الخامسة مساء
                  من الأحد للخميس.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="NameUser">
                  <label>الاسم الكامل:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="EmailUser">
                  <label>الايميل:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="TextMessag">
                  <textarea
                    name="message"
                    placeholder="اكتب الرسالة"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" disabled={sending}>
                  {sending ? (
                    <div className="Loding">
                      جاري الإرسال
                      <FaSpinner className="spinner-icon" />
                    </div>
                  ) : (
                    "ارسال"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="MainLocation">
          <div className="TextLocation">
            <h4>نسعى دائما لتسهيل عملية التواصل معنا.</h4>
            <h4>يمكنك زيارة معرضنا في العنوان التالي</h4>
            <p>
              لراحتك، يمكنك أيضاً الاطلاع على موقعنا على خريطة جوجل والتعرف على
              أوقات العمل والمزيد من التفاصيل
            </p>
            <a
              href="https://www.google.com/maps/place/AL+MALIH+MOTORS+%D9%85%D8%AD%D9%85%D8%AF+%D8%A7%D9%84%D9%85%D9%84%D9%8A%D8%AD+%D9%85%D9%88%D8%AA%D9%88%D8%B1%D8%B2%E2%80%AD/@33.4932102,36.2435685,16.11z/data=!4m6!3m5!1s0x1518dfb6eecc799f:0x352f1304cb595797!8m2!3d33.4931685!4d36.2404352!16s%2Fg%2F11rjkcl5s0?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              موقع مكتبنا على الخريطة <FaArrowLeftLong />
            </a>
          </div>
          <div className="MapLocation">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6151.930829327943!2d36.24356847027653!3d33.49321016936578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518dfb6eecc799f%3A0x352f1304cb595797!2zQUwgTUFMSUggTU9UT1JTINmF2K3ZhdivINin2YTZhdmE2YrYrSDZhdmI2KrZiNix2LI!5e0!3m2!1sar!2sde!4v1778503032523!5m2!1sar!2sde"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
