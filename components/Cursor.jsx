// Cursor — Maxima-style soft trailing blob + tiny precision dot
function Cursor() {
  const blob = React.useRef(null);
  const dot  = React.useRef(null);

  React.useEffect(() => {
    const b = blob.current, d = dot.current;
    if (!b || !d) return;

    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let bx = mx, by = my;        // blob position (lerped)
    let dx = mx, dy = my;        // dot position (snappier)
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      bx += (mx - bx) * 0.12;
      by += (my - by) * 0.12;
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      b.style.transform = `translate(${bx}px, ${by}px) translate(-50%,-50%)`;
      d.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);

    // hover detection
    const onOver = (e) => {
      const t = e.target;
      if (!t.closest) return;
      if (t.closest('[data-cursor="hover"], a, button, .kf-svc, .kf-proj-card')) {
        b.classList.add('is-hover'); b.classList.remove('is-text');
      } else if (t.closest('[data-cursor="text"], p, h1, h2, h3, .kf-manifesto .body')) {
        b.classList.add('is-text'); b.classList.remove('is-hover');
      } else {
        b.classList.remove('is-hover','is-text');
      }
    };
    document.addEventListener('mouseover', onOver);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); };
  }, []);

  return (
    <>
      <div ref={blob} className="kf-cursor" />
      <div ref={dot}  className="kf-cursor-dot" />
    </>
  );
}

window.Cursor = Cursor;
