import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("IZ1SDCTtcTt7WzbvP"); // Replace with your actual public key
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use sendForm instead of send to handle the form submission
      const result = await emailjs.sendForm(
        'service_c5pc3oj', // Your service ID
        'template_t0b5gxj', // Your template ID
        formRef.current,
        'IZ1SDCTtcTt7WzbvP'  // Your public key
      );

      if (result.status === 200) {
        setLoading(false);
        showAlert({
          show: true,
          text: 'Thank you for your message 😃',
          type: 'success',
        });

        // Reset form
        setForm({
          name: '',
          email: '',
          message: '',
        });

        // Hide alert after 3 seconds
        setTimeout(() => {
          hideAlert();
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      console.error('EmailJS Error:', error);
      
      showAlert({
        show: true,
        text: error.text || "Failed to send message. Please try again later 😢",
        type: 'danger',
      });
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Write me!
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
