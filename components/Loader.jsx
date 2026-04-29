function Loader() {
  const ref = React.useRef(null);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const el = ref.current;
    const ka = el.querySelector('.kf-ld-ka');
    const ff = el.querySelector('.kf-ld-ff');

    document.fonts.ready.then(() => {
      gsap.fromTo([ka, ff], { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out',
        onComplete: () => {
          gsap.to(ka, { y: '-50vh', opacity: 0, duration: 1.2, ease: 'power3.inOut', delay: 0.6 });
          gsap.to(ff, { y: '50vh', opacity: 0, duration: 1.2, ease: 'power3.inOut', delay: 0.6, onComplete: () => setDone(true) });
        }
      });
    });
  }, []);

  if (done) return null;
  return (
    <div className="kf-loader" ref={ref}>
      <span className="kf-ld-ka" style={{opacity:0}}>KA</span>
      <span className="kf-ld-ff" style={{opacity:0}}>FF</span>
    </div>
  );
}
window.Loader = Loader;
