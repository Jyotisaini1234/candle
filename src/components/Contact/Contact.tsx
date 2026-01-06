import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Contact.scss";

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">
          Get in <span>Touch</span>
        </h2>
        <p className="contact__subtitle">
          We’d love to hear from you. Reach out anytime ✨
        </p>

        <div className="contact__cards">
          {/* Phone */}
          <div className="contact__card">
            <div className="contact__icon">
              <Phone />
            </div>
            <h3>Phone</h3>
            <p>+91 9289157210</p>
          </div>

          {/* Email */}
          <div className="contact__card">
            <div className="contact__icon">
              <Mail />
            </div>
            <h3>Email</h3>
            <p>jyotiFlam16@gmail.com</p>
          </div>

          {/* Address (optional but professional) */}
          <div className="contact__card">
            <div className="contact__icon">
              <MapPin />
            </div>
            <h3>Support</h3>
            <p>Available 24/7 for you</p>
          </div>
        </div>
      </div>
    </section>
  );
};
