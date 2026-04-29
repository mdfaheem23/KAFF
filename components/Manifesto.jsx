function Manifesto() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const words = ref.current.querySelectorAll('.word');
    gsap.set(words, { opacity: 0.15 });
    gsap.to(words, {
      opacity: 1, ease: 'none', stagger: 0.04,
      scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: true }
    });
  }, []);

  const sentence = "Homes that breathe — clean lines, honest materials, light that moves with the day.";
  const words = sentence.split(' ');

  return (
    <section className="kf-manifesto" id="studio">
      <div className="lbl"><div className="kf-eyebrow"><span className="dot" />Studio</div></div>
      <p className="body" ref={ref} data-cursor="text">
        {words.map((w, i) => (
          <span key={i} className="word">
            {w === 'breathe' ? <em>breathe</em> : w}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
window.Manifesto = Manifesto;
