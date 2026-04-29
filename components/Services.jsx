function Services() {
  const ref = React.useRef(null);
  const imgsRef = React.useRef(null);

  const services = [
    { name: 'Residential', em: 'Build',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80' },
    { name: 'Architecture', em: 'Detailing',
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Interior', em: 'Finishing',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80' },
    { name: 'Restoration', em: '& Renovation',
      img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80' },
  ];

  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    gsap.from(ref.current.querySelectorAll('.kf-svc'), {
      y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 75%' }
    });

    // Cursor-following preview image
    const wrap = imgsRef.current;
    const imgs = wrap.querySelectorAll('.kf-svc-prev');
    let mx = 0, my = 0, cx = 0, cy = 0, raf;
    let activeIdx = -1;

    const onMove = (e) => {
      const r = ref.current.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      wrap.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    ref.current.addEventListener('mousemove', onMove);

    const rows = ref.current.querySelectorAll('.kf-svc');
    rows.forEach((row, i) => {
      const enter = () => {
        if (activeIdx === i) return;
        activeIdx = i;
        imgs.forEach((im, k) => {
          gsap.to(im, { autoAlpha: k === i ? 1 : 0, scale: k === i ? 1 : 0.96, duration: 0.6, ease: 'expo.out' });
        });
      };
      const leave = () => {
        activeIdx = -1;
        imgs.forEach((im) => gsap.to(im, { autoAlpha: 0, scale: 0.96, duration: 0.5, ease: 'expo.out' }));
      };
      row.addEventListener('mouseenter', enter);
      row.addEventListener('mouseleave', leave);
    });

    return () => {
      cancelAnimationFrame(raf);
      ref.current?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="kf-services" id="services" ref={ref}>
      <div className="kf-services-head">
        <div className="lbl"><div className="kf-eyebrow"><span className="dot" />Services</div></div>
        <h2>What we <em>build.</em></h2>
      </div>

      <div className="kf-svc-imgs" ref={imgsRef}>
        {services.map((s, i) => (
          <div key={i} className="kf-svc-prev" style={{opacity:0}}>
            <img src={s.img} alt={`${s.name} ${s.em}`} loading="lazy" />
          </div>
        ))}
      </div>

      <div className="kf-svc-list">
        {services.map((s, i) => (
          <div className="kf-svc" key={i} data-cursor="hover">
            <div className="idx">— {String(i+1).padStart(2,'0')}</div>
            <div className="name">{s.name} <em>{s.em}</em></div>
            <div className="arrow">↗</div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Services = Services;
