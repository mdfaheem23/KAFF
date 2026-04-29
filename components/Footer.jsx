function Footer() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const cta = ref.current.querySelector('.kf-footer-cta');
    if (cta) {
      const words = cta.querySelectorAll('.word');
      gsap.from(words, {
        yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: cta, start: 'top 80%' }
      });
    }
    const mark = ref.current.querySelector('.kf-footer-mark');
    if (mark) {
      gsap.from(mark, {
        yPercent: 30, opacity: 0, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: mark, start: 'top 90%' }
      });
    }
  }, []);

  // wrap each word for masking
  const wrapWords = (text) => text.split(' ').map((w, i, arr) => (
    <span key={i} className="ln" style={{display:'inline-block',overflow:'hidden',verticalAlign:'bottom'}}>
      <span className="word" style={{display:'inline-block'}}>{w}{i < arr.length - 1 ? '\u00A0' : ''}</span>
    </span>
  ));

  return (
    <footer className="kf-footer" id="contact" ref={ref}>
      <h2 className="kf-footer-cta">
        {wrapWords('Have a site,')}<br/>
        <span className="ln" style={{display:'inline-block',overflow:'hidden',verticalAlign:'bottom'}}>
          <span className="word" style={{display:'inline-block'}}>or a&nbsp;</span>
        </span>
        <span className="ln" style={{display:'inline-block',overflow:'hidden',verticalAlign:'bottom'}}>
          <span className="word" style={{display:'inline-block'}}><em>house in mind?</em></span>
        </span><br/>
        <span className="ln" style={{display:'inline-block',overflow:'hidden',verticalAlign:'bottom'}}>
          <span className="word" style={{display:'inline-block'}}><a href="mailto:rwinmotors25@gmail.com" data-cursor="hover">Write to us. ↗</a></span>
        </span>
      </h2>

      <div className="kf-footer-grid">
        <div className="kf-footer-col">
          <div className="lbl">Studio</div>
          <p>Mohammed Pura Road<br/>Salem 636 001<br/>Tamil Nadu, India</p>
        </div>
        <div className="kf-footer-col">
          <div className="lbl">Contact</div>
          <a href="mailto:rwinmotors25@gmail.com">rwinmotors25@gmail.com</a>
          <a href="tel:+919443472006">+91 94434 72006</a>
        </div>
        <div className="kf-footer-col">
          <div className="lbl">Elsewhere</div>
          <a href="#" data-cursor="hover">Instagram ↗</a>
          <a href="#" data-cursor="hover">Houzz ↗</a>
          <a href="#" data-cursor="hover">Google Reviews ↗</a>
        </div>
        <div className="kf-footer-col">
          <div className="lbl">Index</div>
          <a href="#work">Selected work</a>
          <a href="#services">Services</a>
          <a href="#studio">Studio</a>
          <a href="#" data-cursor="hover">Press kit ↗</a>
        </div>
      </div>

      <div className="kf-footer-mark">KAFF<em>·</em></div>

      <div className="kf-footer-bottom">
        <span>© 2026 KAFF Builders · Abdul Khaled</span>
        <span>Salem · Tiruchengode · Namakkal · Erode · Yercaud</span>
        <span>v.01 — Edition 2026</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
