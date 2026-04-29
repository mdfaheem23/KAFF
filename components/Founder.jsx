function Founder() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    gsap.from(ref.current.querySelectorAll('.txtcol > *'), {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
      scrollTrigger: { trigger: ref.current, start: 'top 70%' }
    });
    gsap.from(ref.current.querySelector('.imgcol .img img'), {
      scale: 1.25, duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' }
    });
  }, []);

  return (
    <section className="kf-founder" ref={ref}>
      <div className="imgcol">
        <div className="img" data-cursor="hover">
          <img src="assets/image.png" alt="Abdul Khaled, founder of KAFF Builders, Salem" />
        </div>
      </div>
      <div className="txtcol">
        <div className="lbl"><div className="kf-eyebrow"><span className="dot" />Founder</div></div>
        <h2>A studio of <em>two hands</em><br/>and a quiet site.</h2>
        <p>Abdul Khaled founded KAFF Builders in Salem in 2011. Six houses a year — never more.</p>
        <div className="signoff">
          <div className="name">— <em>Abdul Khaled</em></div>
          <div className="role">Founder · Principal builder</div>
        </div>
      </div>
    </section>
  );
}
window.Founder = Founder;
