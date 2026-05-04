function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);

    // ── Wire your LangGraph backend here ──────────────────────────────
    // Replace this fetch with your actual API endpoint once agent.py is running:
    //   fetch('http://localhost:8000/chat', { method:'POST', body: JSON.stringify({ message: text }) })
    //     .then(r => r.json()).then(data => { setMessages(m => [...m, { role:'agent', content: data.reply }]); setLoading(false); })
    // ─────────────────────────────────────────────────────────────────
    fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    })
      .then(r => r.json())
      .then(data => {
        setMessages(m => [...m, { role: 'agent', content: data.reply }]);
        setLoading(false);
      })
      .catch(() => {
        setMessages(m => [...m, { role: 'agent', content: 'Could not reach the agent. Make sure agent.py is running on port 8000.' }]);
        setLoading(false);
      });
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        className={`kf-chat-btn${open ? ' is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        <span className="kf-chat-btn-icon">
          {open
            ? <svg viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            : <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" fill="currentColor" opacity=".9"/><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1" opacity=".45"/><path d="M10 2.5v1M10 16.5v1M2.5 10h1M16.5 10h1M4.4 4.4l.7.7M14.9 14.9l.7.7M14.9 4.4l-.7.7M4.4 14.9l.7.7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6"/></svg>
          }
        </span>
        <span className="kf-chat-btn-label">{open ? 'Close' : 'Agent'}</span>
      </button>

      {/* Chat panel */}
      <div className={`kf-chat-panel${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="AI Agent">
        {/* Header */}
        <div className="kf-chat-head">
          <div className="kf-chat-head-left">
            <span className="kf-chat-pulse" />
            <span className="kf-chat-title">KAFF Agent</span>
          </div>
          <span className="kf-chat-sub">Powered by LangGraph</span>
        </div>

        {/* Messages */}
        <div className="kf-chat-body">
          {messages.length === 0 && (
            <div className="kf-chat-empty">
              <p>Ask me anything about KAFF Builders — projects, process, or getting started.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`kf-chat-msg kf-chat-msg--${m.role}`}>
              <span className="kf-chat-msg-label">{m.role === 'user' ? 'You' : 'Agent'}</span>
              <p>{m.content}</p>
            </div>
          ))}
          {loading && (
            <div className="kf-chat-msg kf-chat-msg--agent">
              <span className="kf-chat-msg-label">Agent</span>
              <p className="kf-chat-typing"><span/><span/><span/></p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="kf-chat-foot">
          <textarea
            ref={inputRef}
            className="kf-chat-input"
            placeholder="Message the agent…"
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            className={`kf-chat-send${input.trim() ? ' has-text' : ''}`}
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <svg viewBox="0 0 20 20" fill="none"><path d="M3 10L17 3l-4 7 4 7-14-7z" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
window.ChatWidget = ChatWidget;
