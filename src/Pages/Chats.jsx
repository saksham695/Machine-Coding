import React, { useMemo } from "react";
import { PROFILES } from "../constants/profiles";
import { CHAT_THREADS } from "../constants/chats";

export default function Chats() {
  const threads = useMemo(()=> Object.entries(CHAT_THREADS).map(([pid, msgs]) => {
    const profile = PROFILES.find(p=>p.id===pid);
    const last = msgs[msgs.length - 1];
    return { pid, profile, last };
  }), []);

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Chats</div>
          <div className="db-tagline">Your conversations</div>
        </div>
      </div>

      <div className="db-list">
        {threads.map(t => (
          <a key={t.pid} className="db-card db-card-pad" href={`#/chat/${t.pid}`} style={{display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'inherit'}}>
            <img src={t.profile.photo} alt={t.profile.name} style={{width:48, height:48, borderRadius:14, objectFit:'cover'}} />
            <div style={{flex:1}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div style={{fontWeight:800}}>{t.profile.name}</div>
                <div style={{fontSize:12, opacity:.7}}>{new Date(t.last.at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
              </div>
              <div className="db-sub" style={{margin:0, whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                {t.last.from === 'me' ? 'You: ' : ''}{t.last.text}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 