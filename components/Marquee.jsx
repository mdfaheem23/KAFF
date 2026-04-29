function Marquee({ items, accent }) {
  const trackRef = React.useRef(null);
  React.useEffect(() => {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const track = trackRef.current;
    if (!track) return;
    const w = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: -w, duration: 40, ease: 'none', repeat: -1, modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % -w) }
    });
    return () => tween.kill();
  }, []);
  const list = [...items, ...items];
  return (
    <div className="kf-marquee">
      <div className="kf-marquee-track" ref={trackRef}>
        {list.map((it, i) => (
          <span key={i} className="kf-marquee-item">
            {it} <span className="kf-marquee-sep">{accent || '✦'}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
window.Marquee = Marquee;
