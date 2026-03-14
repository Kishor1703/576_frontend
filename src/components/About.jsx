import { useReveal } from '../hooks/useReveal';
import aboutImg from '../assests/sathis.jpeg';
import './About.css';

const About = () => {
  const sectionRef = useReveal();
  const imgRef = useReveal(0.2);
  const textRef = useReveal(0.2);

  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-visual reveal-left" ref={imgRef}>
          <div className="about-frame">
            <img
              src={aboutImg}
              alt="Photographer portrait"
              className="about-img-main"
            />
            <div className="about-badge">
              <span>2+</span>
              <small>Years Exp.</small>
            </div>
          </div>
        </div>

        <div className="about-content reveal-right" ref={textRef}>
          <p className="section-eyebrow" style={{ textAlign: 'left' }}>About Me</p>
          <h2 className="about-heading">
            More Than<br />
            Just <em>Photography</em>
          </h2>
          <div className="black-line" style={{ margin: '1.5rem 0 2rem' }}></div>

          <p className="about-text">
            With over 8 years behind the lens, I specialize in capturing the authentic emotions and
            fleeting moments that make each event uniquely yours. From the tender chaos of a wedding
            morning to the quiet joy of a baby shower, I bring artistry to every frame.
          </p>
          <p className="about-text">
            Based in Chennai, I've had the privilege of documenting love stories across India —
            each one a new adventure, a new story waiting to be told through light and shadow.
          </p>

          <div className="about-skills">
            {['Wedding Photography', 'Baby Showers', 'Portrait Sessions', 'Engagement Shoots', 'Corporate Events', 'Birthday Celebrations'].map(s => (
              <span key={s} className="skill-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
