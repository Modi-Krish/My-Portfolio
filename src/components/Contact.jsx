import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

      if (!accessKey) {
        console.error('Web3Forms Access Key is missing! Add VITE_WEB3FORMS_KEY to your .env file.');
        throw new Error('API Key Missing');
      }

      const data = new FormData();
      data.append('access_key',  accessKey);
      data.append('from_name',   'Portfolio Contact Form');
      data.append('name',        formData.name);
      data.append('email',       formData.email);
      data.append('subject',     formData.subject || 'New Portfolio Contact');
      data.append('message',     formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'sending': return <><i className="fa-solid fa-spinner fa-spin"></i> Sending…</>;
      case 'success': return <><i className="fa-solid fa-check"></i> Message Sent!</>;
      case 'error':   return <><i className="fa-solid fa-exclamation-triangle"></i> Failed to Send</>;
      default:        return <><i className="fa-solid fa-paper-plane"></i> Send Message</>;
    }
  };

  const getButtonStyle = () => {
    if (status === 'success') return { background: '#111111', color: '#4ade80' };
    if (status === 'error')   return { background: '#CC0000', color: '#ffffff', borderColor: '#CC0000' };
    if (status === 'sending') return { opacity: 0.65 };
    return {};
  };

  return (
    <section className="section" id="contact">
      <div className="section__container">
        <ScrollReveal>
          <div className="section__header">
            <span className="section__label">Contact</span>
            <h2 className="section__title">Let's Work Together</h2>
            <p className="section__subtitle">
              Have a project in mind? Let's bring it to life. I'm always open to new
              opportunities and collaborations.
            </p>
          </div>
        </ScrollReveal>

        {/* 5/7 editorial split */}
        <div className="contact__grid">
          {/* Left — info */}
          <ScrollReveal className="contact__info">
            <div className="contact__card">
              <div className="contact__card-label">Location</div>
              <div className="contact__card-value">Vadodara, Gujarat, India</div>
            </div>

            <a href="mailto:kgmodi3112004@gmail.com" className="contact__card">
              <div className="contact__card-label">Email</div>
              <div className="contact__card-value">kgmodi3112004@gmail.com</div>
            </a>

            <a
              href="https://github.com/Modi-Krish"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card"
            >
              <div className="contact__card-label">GitHub</div>
              <div className="contact__card-value">github.com/Modi-Krish</div>
            </a>

            <a
              href="https://www.linkedin.com/in/modikrish0311/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card"
            >
              <div className="contact__card-label">LinkedIn</div>
              <div className="contact__card-value">linkedin.com/in/modikrish0311</div>
            </a>

            <a
              href="https://wa.me/918160443606"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__card"
            >
              <div className="contact__card-label">WhatsApp</div>
              <div className="contact__card-value">+91 81604 43606</div>
            </a>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__label" htmlFor="contact-name">Your Name</label>
                <input
                  className="form__input"
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="contact-email">Your Email</label>
                <input
                  className="form__input"
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="contact-subject">Subject</label>
                <input
                  className="form__input"
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="Project Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="contact-message">Message</label>
                <textarea
                  className="form__textarea"
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project…"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="btn btn--primary form__submit"
                disabled={status === 'sending'}
                style={getButtonStyle()}
              >
                {getButtonContent()}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
