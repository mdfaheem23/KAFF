function Hero() {
  const titleRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.gsap) return;
    const gsap = window.gsap;

    const words = titleRef.current.querySelectorAll('.word');
    gsap.set(words, { yPercent: 120, rotate: 4 });
    gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.4, ease: 'expo.out', stagger: 0.08, delay: 0.6 });

    gsap.from('.kf-hero-meta > div, .kf-hero-foot > *', {
      y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.07, delay: 1.2
    });

    const cover = document.querySelector('.kf-hero-vidcover');
    if (cover) {
      gsap.fromTo(cover, { scaleY: 1 }, { scaleY: 0, duration: 1.6, ease: 'expo.inOut', delay: 0.3, transformOrigin: 'top' });
    }

    // Title exits after 3.5s, scroll indicator appears
    gsap.to(titleRef.current, {
      yPercent: -30, opacity: 0, duration: 1.2, ease: 'expo.inOut', delay: 4.5,
      onComplete: () => {
        gsap.fromTo(scrollRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }
        );
        gsap.to(scrollRef.current.querySelector('.kf-scroll-arrow'), {
          y: 8, repeat: -1, yoyo: true, duration: 0.8, ease: 'sine.inOut'
        });
      }
    });

    if (window.ScrollTrigger) {
      gsap.to('.kf-hero-title', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.kf-hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      // Disable video parallax on mobile — causes jank and bad framing
      if (window.innerWidth > 900) {
        gsap.to('.kf-hero-vidwrap', {
          yPercent: 12, ease: 'none',
          scrollTrigger: { trigger: '.kf-hero', start: 'top top', end: 'bottom top', scrub: true }
        });
      }
    }
  }, []);

  const Line = ({ children }) => (
    <span className="ln">
      {React.Children.map(children, (c, i) =>
        typeof c === 'string'
          ? c.split(' ').map((w, j, arr) => <span key={i+'-'+j} className="word">{w}{j < arr.length - 1 ? ' ' : ''}</span>)
          : <span className="word">{c}</span>
      )}
    </span>
  );

  return (
    <section className="kf-hero" id="top">
      <div className="kf-hero-vidwrap">
        <video ref={videoRef} className="kf-hero-video" autoPlay muted loop playsInline preload="auto" poster="assets/related-01.jpg">
          <source src="assets/video.mp4" type="video/mp4" />
        </video>
        <div className="kf-hero-vidveil" />
        <div className="kf-hero-vidcover" />
      </div>

      <div className="kf-hero-meta">
        <div>Founded<b>2011 — Salem</b></div>
        <div>Practice<b>Abdul Khaled</b></div>
      </div>

      <h1 className="kf-hero-title" ref={titleRef}>
        <Line>We build</Line>
        <Line>what <em>lasts.</em></Line>
      </h1>

      <div className="kf-hero-scrollhint" ref={scrollRef}>
        <span>Scroll</span>
        <div className="kf-scroll-arrow">↓</div>
      </div>

      <div className="kf-hero-foot">
        <p>Residential practice of Abdul Khaled — modern minimalist homes across Tamil Nadu since 2011.</p>
        <div />
      </div>
    </section>
  );
}
window.Hero = Hero;
