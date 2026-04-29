function Stats() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const nums = ref.current.querySelectorAll('.num span.cnt');
    nums.forEach((el) => {
      const target = parseFloat(el.dataset.to);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2.2, ease: 'expo.out',
        onUpdate: () => { el.textContent = Math.round(obj.v); },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      });
    });
    gsap.from(ref.current.querySelectorAll('.kf-stat'), {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' }
    });
  }, []);

  const stats = [
    { n: 15, sup: 'yr', lbl: 'Practice' },
    { n: 84, sup: '+',  lbl: 'Homes delivered' },
    { n: 12, sup: '',   lbl: 'Towns served' },
  ];
  return (
    <section className="kf-stats" ref={ref}>
      {stats.map((s, i) => (
        <div className="kf-stat" key={i}>
          <div className="num"><span className="cnt" data-to={s.n}>0</span>{s.sup && <sup>{s.sup}</sup>}</div>
          <div className="lbl">— {s.lbl}</div>
        </div>
      ))}
    </section>
  );
}
window.Stats = Stats;
