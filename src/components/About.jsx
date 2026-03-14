import { useReveal } from '../hooks/useReveal';
import aboutImg from '../assests/sathis.jpeg';
import './About.css';

const SKILLS = ['Wedding Photography', 'Baby Showers', 'Portrait Sessions', 'Engagement Shoots', 'Corporate Events', 'Birthday Celebrations'];

const About = () => {
  const imgRef  = useReveal(0.15);
  const textRef = useReveal(0.15);

  return (
    <section id="about" className="about">
      <div className="about-inner">

        {/* Image side */}
        <div className="about-img-col reveal-left" ref={imgRef}>
          <div className="about-img-frame">
            <img src={aboutImg} alt="Photographer portrait" className="about-photo" />
            {/* Decorative border offset */}
            <div className="about-img-border" />
          </div>
          {/* Floating badge */}
          <div className="about-badge">
            <span className="ab-num">2+</span>
            <span className="ab-label">Years of Excellence</span>
          </div>
        </div>

        {/* Text side */}
        <div className="about-text-col reveal-right" ref={textRef}>
          <p className="eyebrow">About Me</p>

          <h2 className="about-heading">
            Passion Meets<br />
            <em>Precision</em>
          </h2>
          <div className="gold-rule" />

          <p className="about-body">
            Based in the heart of Dindigul, Tamil Nadu, I am a passionate photographer
            who believes every moment deserves to be immortalized. With a keen eye for
            authentic emotion and perfect light, I craft images that you'll treasure forever.
          </p>
          <p className="about-body">
            From intimate wedding ceremonies to joyful baby showers, each session is
            approached with care, creativity, and an unwavering commitment to quality.
            Your story deserves nothing less than extraordinary.
          </p>

          <div className="about-skills">
            {SKILLS.map(s => (
              <span key={s} className="about-skill">{s}</span>
            ))}
          </div>

          <div className="about-contact-row">
            <a href="tel:+919994700481" className="about-contact-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.08 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +91 99947 00481
            </a>
            <a href="mailto:megapixelsphotography018@gmail.com" className="about-contact-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
