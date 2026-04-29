function Nav() {
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState('');
  const panelRef = React.useRef(null);

  React.useEffect(() => {
    const fmt = () => {
      const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(new Date()) + ' IST');
    };
    fmt();
    const id = setInterval(fmt, 30000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { n:'01', label:'Studio',   href:'#studio' },
    { n:'02', label:'Services', href:'#services' },
    { n:'03', label:'Process',  href:'#process' },
    { n:'04', label:'Work',     href:'#work' },
    { n:'05', label:'Contact',  href:'#contact' },
  ];

  return (
    <>
      <nav className="kf-nav">
        <a href="#top" className="kf-nav-logo">KAFF</a>
        <div className="kf-nav-time">Salem, TN — {time}</div>
        <button className={`kf-nav-burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} data-cursor="hover" aria-label="Menu">
          <span /><span />
        </button>
      </nav>

      <div className={`kf-menu ${open ? 'is-open' : ''}`} ref={panelRef} aria-hidden={!open}>
        <button className="kf-menu-scrim" onClick={() => setOpen(false)} aria-label="Close" />
        <aside className="kf-menu-panel">
          <div className="kf-menu-head">
            <span className="kf-eyebrow"><span className="dot" />Index</span>
            <button className="kf-menu-close" onClick={() => setOpen(false)} data-cursor="hover">Close —</button>
          </div>
          <nav className="kf-menu-list">
            {links.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setOpen(false)} data-cursor="hover">
                <span className="n">— {l.n}</span>
                <span className="lbl">{l.label}</span>
              </a>
            ))}
          </nav>
          <div className="kf-menu-foot">
            <div>
              <div className="kf-eyebrow"><span className="dot" />Studio</div>
              <p>Mohammed Pura Road<br/>Salem 636 001 · Tamil Nadu</p>
            </div>
            <div>
              <div className="kf-eyebrow"><span className="dot" />Reach</div>
              <a href="rwinmotors25@gmail.com">rwinmotors25@gmail.com</a><br/>
              <a href="tel:+919443472006">+91 94434 72006</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
window.Nav = Nav;
