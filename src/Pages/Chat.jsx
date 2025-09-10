import React, { useEffect, useMemo, useRef, useState } from "react";
import { PROFILES } from "../constants/profiles";
import { CHAT_THREADS } from "../constants/chats";

function getChatIdFromHash() {
  const hash = window.location.hash || "#/chat";
  const parts = hash.split('/');
  return parts.length >= 3 ? parts[2] : null;
}

export default function Chat() {
  const [user, setUser] = useState(null);
  const [chatId, setChatId] = useState(getChatIdFromHash());
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  useEffect(()=>{
    const u = localStorage.getItem("dobaara_user");
    if (u) setUser(JSON.parse(u));
  },[]);

  useEffect(()=>{
    const onHash = () => setChatId(getChatIdFromHash());
    window.addEventListener('hashchange', onHash);
    return ()=> window.removeEventListener('hashchange', onHash);
  },[]);

  const match = useMemo(()=> PROFILES.find(p => p.id === chatId) || PROFILES[0], [chatId]);

  useEffect(()=>{
    const key = `dobaara_chat_${match.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      setMessages(CHAT_THREADS[match.id] || []);
    }
  }, [match.id]);

  useEffect(()=>{
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const conversationStartedByFemale = useMemo(()=> messages.some(m => m.from === 'them'), [messages]);
  const sendingDisabled = user?.gender !== 'female' && !conversationStartedByFemale;

  const persist = (msgs) => {
    localStorage.setItem(`dobaara_chat_${match.id}`, JSON.stringify(msgs));
  };

  const send = () => {
    if (!text.trim() || sendingDisabled) return;
    const next = [...messages, { from: 'me', text: text.trim(), at: Date.now() }];
    setMessages(next);
    persist(next);
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <img src={match.photo} alt={match.name} style={{width:28, height:28, borderRadius:999}} />
          <div>
            <div className="db-brand">{match.name}</div>
            <div className="db-tagline">Video • Voice • Media</div>
          </div>
        </div>
        <div className="db-actions">
          <a className="db-btn" href="#/chat">All</a>
          <button className="db-btn">Voice</button>
          <button className="db-btn db-btn-primary">Video</button>
        </div>
      </div>

      <div className="db-card db-card-pad db-chat" style={{maxHeight:'60vh'}}>
        <div className="db-bubbles" style={{overflowY:'auto'}}>
          {messages.map((m, i) => (
            <div key={i} style={{display:'flex', gap:8, alignItems:'flex-end', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start'}}>
              {m.from !== 'me' && <img src={match.photo} alt="" style={{width:22, height:22, borderRadius:999, opacity:.9}} />}            
              <div className={`db-bubble ${m.from === 'me' ? 'me' : 'them'}`}>
                <div>{m.text}</div>
                <div className="db-bubble-meta">{formatTime(m.at)}</div>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="db-chat-input">
          <textarea className="db-input" rows={1} placeholder={sendingDisabled ? 'Only female users can initiate the conversation' : 'Type a message'} value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={onKeyDown} disabled={sendingDisabled} />
          <button className="db-btn db-btn-primary" onClick={send} disabled={sendingDisabled}>Send</button>
        </div>
      </div>
    </div>
  );
} 