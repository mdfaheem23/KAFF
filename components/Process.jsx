// Process — Mersi-style full-viewport stage. Whole screen morphs as you scroll.
function Process() {
  const stageRef = React.useRef(null);

  const phases = [
    { n: '01', name: 'Listen',  em: '& locate',
      body: 'We begin on the site itself. Walking the plot. Watching how light moves.',
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
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const stage = stageRef.current;
    const slides = stage.querySelectorAll('.kf-pr-slide');
    const total = slides.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: () => '+=' + (window.innerHeight * total * 1.4),
        scrub: 0.8,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    slides.forEach((slide, i) => {
      const cols = slide.querySelectorAll('.col');
      const num = slide.querySelector('.kf-pr-num');
      const titleWords = slide.querySelectorAll('.kf-pr-title .word');
      const body = slide.querySelector('.kf-pr-body');
      const img = slide.querySelector('img');

      if (i === 0) {
        gsap.set(slide, { autoAlpha: 1 });
        gsap.set(cols, { scaleY: 0, transformOrigin: 'top' });
        gsap.set(titleWords, { yPercent: 0 });
        gsap.set(num, { yPercent: 0 });
        gsap.set(body, { y: 0, opacity: 1 });
      } else {
        gsap.set(slide, { autoAlpha: 0 });
        gsap.set(cols, { scaleY: 1, transformOrigin: 'top' });
        gsap.set(titleWords, { yPercent: 110 });
        gsap.set(num, { yPercent: 110 });
        gsap.set(body, { y: 24, opacity: 0 });
      }

      const t = i;
      if (i > 0) {
        tl.to(slide, { autoAlpha: 1, duration: 0.001 }, t);
        tl.to(cols, { scaleY: 0, duration: 0.7, ease: 'expo.inOut', stagger: 0.06, transformOrigin: 'top', immediateRender: false }, t);
        tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'expo.out', immediateRender: false }, t);
        tl.to(num, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, t + 0.05);
        tl.to(titleWords, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06 }, t + 0.05);
        tl.to(body, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, t + 0.2);
      }

      tl.to({}, { duration: 0.6 }, t + 0.4);

      if (i < total - 1) {
        tl.to(cols, { scaleY: 1, duration: 0.55, ease: 'expo.inOut', stagger: 0.05, transformOrigin: 'bottom' }, t + 0.7);
        tl.to(num, { yPercent: -110, duration: 0.55, ease: 'expo.in' }, t + 0.75);
        tl.to(titleWords, { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.04 }, t + 0.75);
        tl.to(body, { y: -16, opacity: 0, duration: 0.4, ease: 'expo.in' }, t + 0.78);
        tl.to(slide, { autoAlpha: 0, duration: 0.001 }, t + 0.95);
      }
    });

    const bar = stage.querySelector('.kf-pr-bar i');
    const counter = stage.querySelector('.kf-pr-counter b');
    ST.create({
      trigger: stage, start: 'top top',
      end: () => '+=' + (window.innerHeight * total * 1.4),
      onUpdate: (self) => {
        if (bar) bar.style.transform = `scaleX(${self.progress})`;
        if (counter) counter.textContent = String(Math.min(total, Math.floor(self.progress * total) + 1)).padStart(2,'0');
      }
    });

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
              <img src={p.img} alt={`${p.name} ${p.em}`} />
              <div className="kf-pr-cols">
                {Array.from({length:8}).map((_, k) => <span key={k} className="col" />)}
              </div>
              <div className="kf-pr-veil" />
            </div>
            <div className="kf-pr-text">
              <div className="kf-pr-numwrap"><span className="kf-pr-num">{p.n}</span></div>
              <h2 className="kf-pr-title">
                <span className="ln"><span className="word">{p.name}</span></span>
                <span className="ln"><span className="word"><em>{p.em}</em></span></span>
              </h2>
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
