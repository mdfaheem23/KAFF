// app.jsx — root composition + tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "bone",
  "cardStyle": "standard",
  "intensity": "heavy"
}/*EDITMODE-END*/;

const PALETTES = {
  bone:    { '--bone':'#14110d','--bone-2':'#1c1813','--beige':'#2a241c','--sand':'#c9a869','--ink':'#f1ead9','--ink-2':'#d8d0bc','--rust':'#c9a869' },
  earth:   { '--bone':'#1a120a','--bone-2':'#241810','--beige':'#3a2818','--sand':'#d4a373','--ink':'#f5e9d4','--ink-2':'#e0cfb2','--rust':'#d4a373' },
  mono:    { '--bone':'#0e0e0c','--bone-2':'#1a1a18','--beige':'#26262422','--sand':'#a09e98','--ink':'#f6f5f2','--ink-2':'#d4d2cc','--rust':'#e8e4d8' },
  warmdark:{ '--bone':'#f3efe7','--bone-2':'#ebe5d9','--beige':'#d8cdb8','--sand':'#8a3f1f','--ink':'#1a1814','--ink-2':'#29261f','--rust':'#8a3f1f' },
};

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.bone;
  const root = document.documentElement;
  Object.entries(p).forEach(([k, v]) => root.style.setProperty(k, v));
  if (name === 'warmdark') {
    root.style.setProperty('--muted', '#6b6557');
    root.style.setProperty('--line', 'rgba(26,24,20,.14)');
  } else {
    root.style.setProperty('--muted', name === 'mono' ? '#9e9c97' : '#8a8270');
    root.style.setProperty('--line', 'rgba(241,234,217,.14)');
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyPalette(t.palette); }, [t.palette]);
  React.useEffect(() => { window.ScrollTrigger && window.ScrollTrigger.refresh(); }, [t.cardStyle, t.intensity]);

  // Lenis smooth scroll wired to GSAP ScrollTrigger
  React.useEffect(() => {
    if (!window.Lenis || !window.gsap) return;
    const lenis = new window.Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    });
    if (window.ScrollTrigger){
      lenis.on('scroll', window.ScrollTrigger.update);
    }
    const driver = (time) => lenis.raf(time * 1000);
    window.gsap.ticker.add(driver);
    window.gsap.ticker.lagSmoothing(0);
    return () => {
      window.gsap.ticker.remove(driver);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <Nav />
      <Hero />
      <Manifesto />
      <Stats />
      <Services />
      <Process />
      <Projects cardStyle={t.cardStyle} intensity={t.intensity} />
      <Founder />
      <Footer />
      <ChatWidget />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio label="Tone" value={t.palette}
          options={[
            { value:'bone',     label:'Espresso' },
            { value:'earth',    label:'Sienna' },
            { value:'mono',     label:'Onyx' },
            { value:'warmdark', label:'Bone' },
          ]}
          onChange={(v) => setTweak('palette', v)} />

        <TweakSection label="Project cards" />
        <TweakRadio label="Style" value={t.cardStyle}
          options={[
            { value:'standard', label:'Standard' },
            { value:'overlay',  label:'Overlay' },
            { value:'index',    label:'Index' },
          ]}
          onChange={(v) => setTweak('cardStyle', v)} />

        <TweakSection label="Motion" />
        <TweakRadio label="Animation" value={t.intensity}
          options={[
            { value:'subtle',   label:'Subtle' },
            { value:'moderate', label:'Moderate' },
            { value:'heavy',    label:'Heavy' },
          ]}
          onChange={(v) => setTweak('intensity', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
