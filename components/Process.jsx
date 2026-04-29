function Process() {
  const stageRef = React.useRef(null);

  const phases = [
    { n: '01', name: 'Listen',  em: '& locate',
      body: 'We begin on the site itself. Walking the plot. Watching how light moves through the day.',
      img:  'assets/architecture.jpg' },
    { n: '02', name: 'Draft',   em: '& detail',
      body: 'Plans develop slowly across the drafting table. Decisions are drawn, not assumed.',
      img:  'assets/draft&detail.jpg' },
    { n: '03', name: 'Build',   em: 'on site',
      body: 'Our own crews break ground. Stone is cut, lime is mixed, terrazzo is poured.',
      img:  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1800&q=80' },
    { n: '04', name: 'Finish',  em: '& hand-over',
      body: 'Floors are honed, doors are hung. Then we live in the house for a week of finishing.',
      img:  'assets/finishing.jpg' },
  ];

  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const stage = stageRef.current;
    const slides = Array.from(stage.querySelectorAll('.kf-pr-slide'));
    const total = slides.length;
    const bar = stage.querySelector('.kf-pr-bar i');
    const counter = stage.querySelector('.kf-pr-counter b');

    // Stack slides: each later slide sits on top via z-index
    slides.forEach((slide, i) => {
      gsap.set(slide, { zIndex: i + 1 });
      const text = slide.querySelector('.kf-pr-text');
      const img  = slide.querySelector('img');
      if (i === 0) {
        gsap.set(slide, { yPercent: 0 });
        gsap.set(text, { opacity: 1, y: 0 });
        gsap.set(img,  { scale: 1 });
      } else {
        // Start below the viewport, hidden by section overflow:hidden
        gsap.set(slide, { yPercent: 100 });
        gsap.set(text, { opacity: 0, y: 50 });
        gsap.set(img,  { scale: 1.06 });
      }
    });

    const scrollDist = window.innerHeight * (total - 1) * 1.25;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => '+=' + scrollDist,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          if (counter) {
            const seg = 1 / (total - 1);
            const idx = Math.min(total - 1, Math.floor(self.progress / seg + 0.05));
            counter.textContent = String(idx + 1).padStart(2, '0');
          }
        }
      }
    });

    for (let i = 1; i < total; i++) {
      const pos  = (i - 1) * 1.0;

      // New image slides up — directly scroll-tied, linear
      tl.to(slides[i],                         { yPercent: 0,   duration: 1,    ease: 'none'     }, pos);
      // Subtle de-scale as it lands
      tl.to(slides[i].querySelector('img'),     { scale: 1,      duration: 1,    ease: 'none'     }, pos);

      // Previous text fades out quickly as image covers it
      tl.to(slides[i-1].querySelector('.kf-pr-text'), { opacity: 0, y: -40, duration: 0.28, ease: 'power2.in' }, pos + 0.05);

      // New text fades in once the image has mostly arrived
      tl.to(slides[i].querySelector('.kf-pr-text'),   { opacity: 1, y: 0,   duration: 0.32, ease: 'power2.out' }, pos + 0.68);

      // Dwell before next transition
      if (i < total - 1) tl.to({}, { duration: 0.3 }, pos + 1);
    }

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section className="kf-process" ref={stageRef} id="process">
      <div className="kf-pr-chrome">
        <div className="kf-pr-eyebrow"><span className="dot" />Process</div>
        <div className="kf-pr-counter"><b>01</b> <span>/ 0{phases.length}</span></div>
      </div>

      <div className="kf-pr-stack">
        {phases.map((p, i) => (
          <div className="kf-pr-slide" key={i}>
            <div className="kf-pr-img">
              <img src={p.img} alt={`${p.name} ${p.em} — KAFF Builders process`} />
              <div className="kf-pr-veil" />
            </div>
            <div className="kf-pr-text">
              <span className="kf-pr-num">{p.n}</span>
              <h2 className="kf-pr-title">{p.name}<br /><em>{p.em}</em></h2>
              <p className="kf-pr-body">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="kf-pr-bar"><i /></div>
    </section>
  );
}
window.Process = Process;
