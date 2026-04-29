function Projects({ cardStyle = 'standard', intensity = 'heavy' }) {
  const wrapRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const barRef   = React.useRef(null);

  const projects = [
    { num: '01', name: 'House of', em: 'Stillness', loc: 'Salem · Fairlands', yr: '2024', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '02', name: 'Cauvery', em: 'Residence', loc: 'Tiruchengode', yr: '2024', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '03', name: 'Lime &', em: 'Light', loc: 'Salem · Hasthampatti', yr: '2023', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '04', name: 'Coorg', em: 'Retreat', loc: 'Yercaud', yr: '2023', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '05', name: 'Granary', em: 'House', loc: 'Namakkal', yr: '2022', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '06', name: 'Mango', em: 'Pavilion', loc: 'Erode', yr: '2022', img: 'https://images.unsplash.com/photo-1600573472556-e636c2acda88?auto=format&fit=crop&w=1200&q=80', tall: false },
    { num: '07', name: 'Twin', em: 'Courtyards', loc: 'Salem · Suramangalam', yr: '2021', img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80', tall: false },
  ];

  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;

    const wrap = wrapRef.current, track = trackRef.current;
    const getDist = () => track.scrollWidth - window.innerWidth + 36;

    const tween = gsap.to(track, {
      x: () => -getDist(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => '+=' + getDist(),
        scrub: intensity === 'subtle' ? 1.2 : 0.6,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => { if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`; }
      }
    });

    // Per-card image cover reveal as it scrolls into view
    const cards = track.querySelectorAll('.kf-proj-card');
    cards.forEach((card) => {
      const imgDiv = card.querySelector('.img');
      if (imgDiv) {
        gsap.fromTo(imgDiv, { '--cover-scale': 1 }, {
          '--cover-scale': 0,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: 'left 80%',
            end:   'left 30%',
            scrub: true,
          }
        });
      }
    });

    return () => { tween.scrollTrigger && tween.scrollTrigger.kill(); tween.kill(); ST.refresh(); };
  }, [intensity]);

  return (
    <section className="kf-projects" id="work" ref={wrapRef}>
      <div className="kf-proj-head">
        <div className="lbl"><div className="kf-eyebrow"><span className="dot" />Selected Work / 03</div></div>
        <h2>Seven houses,<br/>across <em>Tamil Nadu.</em></h2>
      </div>
      <div className="kf-proj-track" ref={trackRef}>
        {projects.map((p, i) => {
          const styleClass = cardStyle === 'overlay' ? 'style-overlay'
                          : cardStyle === 'index'   ? 'style-index'
                          : '';
          return (
            <article className={`kf-proj-card ${p.tall ? 'tall' : ''} ${styleClass}`} key={i} data-cursor="hover">
              <div className="img"><img src={p.img} alt={`${p.name} ${p.em} — ${p.loc}, KAFF Builders`} loading="lazy" /></div>
              <div className="meta">
                <div className="meta-l">
                  {cardStyle !== 'index' && <div className="num">— {p.num}</div>}
                  {cardStyle === 'index' && <div className="num">{p.num}</div>}
                  <h3>{p.name} <em>{p.em}</em></h3>
                  <div className="loc">{p.loc}</div>
                </div>
                <div className="yr">{p.yr}</div>
              </div>
            </article>
          );
        })}
        <div style={{flex:'0 0 20vw'}} />
      </div>
      <div className="kf-proj-foot">
        <span>— Drag · Scroll</span>
        <span>Index 01 / 07</span>
      </div>
      <div className="kf-proj-progress"><div className="bar" ref={barRef} /></div>
    </section>
  );
}
window.Projects = Projects;
