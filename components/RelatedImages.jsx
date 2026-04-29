function RelatedImages() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;

    const items = ref.current.querySelectorAll('.kf-ri-item');
    items.forEach((el, i) => {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
      const img = el.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.12 },
          { scale: 1, duration: 1.4, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        );
      }
    });

    // Parallax drift on scroll
    items.forEach((el, i) => {
      const depth = i % 3 === 1 ? -18 : i % 3 === 2 ? -10 : -6;
      gsap.to(el.querySelector('img'), {
        yPercent: depth,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }, []);

  const images = [
    { src: 'assets/related-01.jpg', alt: 'Modern minimalist living room — KAFF Builders Salem', span: 'wide' },
    { src: 'assets/related-02.jpg', alt: 'Residential exterior with clean lines — KAFF Builders Tamil Nadu', span: 'tall' },
    { src: 'assets/related-03.jpg', alt: 'Interior detail with natural light — KAFF Builders', span: 'normal' },
    { src: 'assets/related-04.jpg', alt: 'Kitchen finishing detail — KAFF Builders Salem', span: 'normal' },
    { src: 'assets/related-05.jpg', alt: 'Open plan living area — KAFF Builders Tamil Nadu', span: 'wide' },
    { src: 'assets/related-06.jpg', alt: 'Staircase architecture detail — KAFF Builders Salem', span: 'tall' },
    { src: 'assets/related-07.jpg', alt: 'Bedroom with considered materials — KAFF Builders', span: 'normal' },
    { src: 'assets/related-08.jpg', alt: 'Courtyard and landscape — KAFF Builders Tamil Nadu', span: 'normal' },
  ];

  return (
    <section className="kf-related" ref={ref}>
      <div className="kf-related-head">
        <div className="lbl"><div className="kf-eyebrow"><span className="dot" />Gallery / 04</div></div>
        <h2>From the <em>field.</em></h2>
      </div>

      <div className="kf-related-grid">
        {images.map((img, i) => (
          <div key={i} className={`kf-ri-item kf-ri-${img.span}`} data-cursor="hover">
            <div className="kf-ri-img">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.RelatedImages = RelatedImages;
